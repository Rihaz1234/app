import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from "@angular/core";
import { CommonService } from "@services/common.service";
import { MatDialog } from "@angular/material/dialog";
import {
  priorityColorCode,
  arrhythmiaAlertPriorityOptions,
  uiAccessRoles,
  ArrhythmiaParameterAlertItems,
  isAllowedRole,
  postures
} from "@utils/helpers";
import { BackendApiService } from "@services/backendapi.service";
import {
  AlertConfigurationModels,
  AlertConfigurationStoreActions,
  AlertConfigurationStoreSelectors,
  AlertConfigurationStoreState,
} from "../store";
import { AuthenticationService } from "@services/authentication.service";
import { Store } from "@ngrx/store";
import { Subscription, Observable } from "rxjs";
import { LSColumn, LSTableConfig } from "../../../life-signals/_models/ls-column.model";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { AlertConfigurationsService } from "../services/alert-configuration.service";
import { UserPreferenceService } from "@services/user-preference.service";
import { environment } from "src/environments/environment";
import { Group } from "src/app/manage-group/models/manage-groups.model";
import { SnackbarService } from "@services/snackbar.service";
import { settings } from "cluster";

@Component({
  selector: "app-arrhythmia-alerts",
  templateUrl: "./arrhythmia-alerts.component.html",
  styleUrls: ["./arrhythmia-alerts.component.scss"],
})
export class ArrhythmiaAlertsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  @Output() reloadData = new EventEmitter<any>(true);
  @Input() patientData: any;
  loading: boolean = false;

  priorityHexCode: any = priorityColorCode;
  alertPriority: any = arrhythmiaAlertPriorityOptions;
  parameterAlert = ArrhythmiaParameterAlertItems;
  parameterAlertSettings: any = [];
  parameterAlertSettingsCopy: any = [];
  masterData: any = {};
  roles: string[];
  parameterAlertAccess: any =
    uiAccessRoles.ALERT_CONFIGURATIONS.ARRHYTHMIA_ALERT;
  alertSettings$: Observable<AlertConfigurationModels.ArrhythmiaAlertConfigurationData>;
  isEditAccess: boolean = false;
  showActionButtons: boolean = false;
  isShowResetButton: boolean = false;
  selectedTab = "parameter";
  error: string;
  alertSettings: any = {};
  alertSettingsStatus$: Observable<string>;
  alertSettingsMessage$: Observable<string>;
  cfId: string = "";
  alertId: any = null;
  accessRoles: any = uiAccessRoles;
  clinicalFacilityGroups: Group[];
  clinicalFacilityGroupId: any = null;
  GroupId: string = "";
  patientId: string = "PATALDRT1";
  userPreferenceUnit;
  timeZone: string;
  readonly timeFmt: string = environment.customization.timeFormat;
  lastUpdated;
  loaderSubscription
  loader = true;
  postures;
  config: LSTableConfig = {
    id: "alert_config_module",
    rowSelectEnabled: false,
    translate: true,
    translateKey: "alert_config_module",
  };
  columns: LSColumn[] = [
    {
      id: "enabled",
      label: "",
      sortable: false,
      style: "width: 70px",
    },
    {
      id: "alerts",
      sortable: false,
      headerClass: ["align-left"],
      cellClass: ["fw-700"],
      style: "min-width: 200px",
    },
    {
      id: "threshold",
      sortable: false,
      headerClass: ["align-center"],
      cellClass: ["text-center"],
      style: "width: 160px"
    },
    {
      id: "editThreshold",
      sortable: false,
      headerClass: ["align-left"],
      style: "width: 50px"
    },
    {
      id: "priority",
      sortable: false,
      headerClass: ["align-right"],
      style: "width: 180px;",
      cellClass: ["text-end"],
    },
    {
      id: "editPriority",
      sortable: false,
      headerClass: ["align-left"],
      style: "width: 50px"
    },
    {
      id: "delayTime",
      sortable: false,
      headerClass: ["align-center"],
      style: "width: 180px;",
      cellClass: ["text-end"],
    },
    {
      id: "modified",
      sortable: false,
      headerClass: ["align-left"],
      //style: "min-width: 200px",
      cellClass: ["text-start"],
    },
  ];
  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
    private userPreference: UserPreferenceService,
    private snackbar: SnackbarService,
    private backendApiService: BackendApiService,
    private autheticationService: AuthenticationService,
    private store$: Store<AlertConfigurationStoreState.patientAlertConfigurationState>,
    public alertService: AlertConfigurationsService
  ) { }

  private tempConvFunction: (value: number) => number;

  editThreshold = [false];
  editPrior = [false];
  editDelay = [false];
  parameterMinMax;

  ngOnInit() {
    this.postures = postures;
    this.roles = this.autheticationService.getRoles();
    this.timeZone = this.userPreference.getUserTimeZone();
    this.userPreferenceUnit = this.userPreference.getUserUnitSystem();
    if (this.userPreferenceUnit === 'IS') {
      this.tempConvFunction = this.userPreference.convertFtoC;
    } else {
      this.tempConvFunction = (temp: number) => temp;
    }
    this.parameterMinMax = this.alertService.getParameterMinMax();
    this.cfId = this.autheticationService.getCfId();
    this.patientId = this.patientData.patientId;

    this.alertSettings$ = this.store$.select(
      AlertConfigurationStoreSelectors.getArrhythmiaAlertConfigurations
    );

    this.alertSettingsStatus$ = this.store$.select(
      AlertConfigurationStoreSelectors.getAlertConfigurationStatus
    );
    this.alertSettingsMessage$ = this.store$.select(
      AlertConfigurationStoreSelectors.getAlertConfigurationMessage
    );
    this.store$
      .select(AlertConfigurationStoreSelectors.getAlertConfigurationError)
      .subscribe((data: any) => {

        this.error = data;
        if (data?.error?.errorMessage === 'ACCESS_DENIED') {
          this.snackbar.openCustomSnackBar('alert_config_module.messages.access_denied', 'bottom', 'center', true);
        }
      });
    this.loaderSubscription = this.store$
      .select(AlertConfigurationStoreSelectors.getLoaderStatus)
      .subscribe((loaded) => {
        this.loader = !loaded;
      });

    this.getSettings();
    this.alertSettings$.subscribe((data) => { 
      //this.loader = false;
      this.lastUpdated = new Date().toUTCString();
      this.commonService.setSettingsAlertActionButtons(false);
      this.commonService.setArrhythmiaParameterAlertEditSubmit(false);
      this.hideParameterEdit();
      this.masterData = { ...data };
      this.masterData.GroupId = "";
      this.masterData.PatientId = this.patientId;
      this.masterData.FacilityId = this.cfId;
      this.masterData.AlertId = "";
      const alerts = [];
      this.parameterAlert.forEach(
        (element: { key: string | number; alerts: any; unit: any }, i) => {
          if (data?.Setting[element.key]) {
            const settings = data.Setting[element.key];
            alerts.push({
              ...settings,
              alert: element.alerts,
              unit: element.unit,
              key: element.key,
              index: i
            });
          }
        }
      );
      this.parameterAlertSettings = alerts;
      this.parameterAlertSettingsCopy = JSON.parse(JSON.stringify(alerts));
      this.loading = false;
    }, (err) => {
      this.loading = false;
    });
    this.commonService.settingsAlertActionButtonsShow.subscribe((isShow) => {
      if (this.showActionButtons !== isShow) {
        this.showActionButtons = isShow;
      }
    });
    this.alertSettings$.subscribe((data) => {
      this.alertSettings = { ...data };
      this.alertId = this.alertSettings.ArrhythmiaId;
      this.isShowResetButton = this.alertSettings?.IsForPatient;
    });
    if (isAllowedRole(this.parameterAlertAccess["EDIT"], this.roles)) {
      this.isEditAccess = true;
    }
    this.subscriptions.push(
      this.commonService.arrhythmiaParameterAlertEditHide.subscribe((isHide) => {
        if (isHide) {
          this.parameterAlertSettings = JSON.parse(
            JSON.stringify(this.parameterAlertSettingsCopy)
          );
          this.hideParameterEdit();
        }
      })
    );
    this.subscriptions.push(
      this.commonService.arrhythmiaParameterAlertEditSubmit.subscribe((isSubmit) => {
        if (isSubmit) {
            this.updateParameterSettings();
        }
      })
    );
  }

  openDialog() {
    const SaveChanges = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "95vw",
      maxHeight: "95vh",
      data: {
        body: {
          title: "shared.confirm_text",
          text: "additional_devices.confirm_reset",
        },
      },
      disableClose: true,
    });
    SaveChanges.afterClosed().subscribe((data) => {
      if (data) {
        this.handleFactoryReset();
      }
    });
  }
  // Fetch alert settings - API Call
  getSettings = () => {
    this.loading = true;
    let patientId = encodeURIComponent(this.patientId);
    let url = `arrhythmia-alert-settings/patient/${this.cfId}/${patientId}`;
    this.store$.dispatch(
      new AlertConfigurationStoreActions.loadArrhythmiaAlertConfigurationRequestAction({
        url,
      })
    );
    this.store$
      .select(AlertConfigurationStoreSelectors.getAlertConfigurationError)
      .subscribe((data) => {
        this.error = data;
      });
  };////
  showEdit(index) {
    this.editThreshold[index] = true;
  }
  hideEdit(index) {
    this.editThreshold[index] = false;
  }

  showEditPrior(index) {
    this.editPrior[index] = true;
  }
  hideEditPrior(index) {
    this.editPrior[index] = false;
  }

  showEditDelay(index) {
    this.editDelay[index] = true;
  }
  hideEditDelay(index) {
    this.editDelay[index] = false;
  }

  // Hide all active edit buttons
  hideParameterEdit() {
    this.editThreshold = [false];
    this.editPrior = [false];
    this.editDelay = [false];
  }

  toggle(i: number) {
    this.editThreshold[i] = false;
    this.editPrior[i] = false;
    this.editDelay[i] = false;
    this.updated();
  }
  // Show and Hide Table Edit fields
  showHideEdit(index: number, type: string) {
    switch (type) {
      case "threshold":
        this.editThreshold[index] = !this.editThreshold[index];
        break;
      case "priority":
        this.editPrior[index] = !this.editPrior[index];
        break;
      case "delay":
        this.editDelay[index] = !this.editDelay[index];
        break;
      default:
        break;
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
  }

  async updateParameterSettings() {
    const parameterAlert: any = {};
    let settings = [...this.parameterAlertSettings];
    settings.forEach((element) => {
      parameterAlert[element.key] = {
        Enabled: element.Enabled,
        Priority: element.Priority,
        LowThr: element.LowThr,
        HighThr: element.HighThr,
        Thr:element.Thr,
        CondDelay: parseInt(element.CondDelay)
      };
    });
    const payload = { ...this.masterData };
    payload["Setting"] = parameterAlert;
    delete payload["auditloginfotype"];
    let patientId = encodeURIComponent(this.patientId);
    let url = `arrhythmia-alert-settings/patient-edit/${this.cfId}/${patientId}`;

    try {
      const resp = await this.backendApiService
        .post(environment.dataApiUrl + url, payload)
        .toPromise();
      if (resp.status === "OK") {
        this.reloadData.emit();
        this.snackbar.openCustomSnackBar('Settings has been updated successfully', 'bottom', 'center');
        this.commonService.setSettingsAlertActionButtons(false);
        this.commonService.setArrhythmiaParameterAlertEditSubmit(false);
        this.hideParameterEdit();
        this.getSettings();
      }
    } catch (error) {
      this.error = error;
    }
  }
  // Handle Alert Settings Edit Cancel Button
  handleAlertSettingsEditCancel() {
    this.parameterAlertSettings = JSON.parse(
      JSON.stringify(this.parameterAlertSettingsCopy)
    );
    this.commonService.setSettingsAlertActionButtons(false);
    this.commonService.setArrhythmiaParameterAlertEditSubmit(false);
    this.hideParameterEdit();

  }

  // Handle Alert Settings Edit Cancel Button
  handleAlertSettingsSave() {

     this.updateParameterSettings();
  }
  // Handle alert setting factory reset action
  async handleFactoryReset() {
    const patientId = encodeURIComponent(this.patientId);
    const url = `arrhythmia-alert-settings/patient-reset/${this.cfId}/${patientId}/${this.alertId}`;
    try {
      const resp: any = await this.backendApiService
        .post(environment.dataApiUrl + url, {})
        .toPromise();
      if (resp.status === "OK") {
        this.snackbar.openCustomSnackBar("alert_config_module.reset_success", 'bottom', 'center',true);
        this.getSettings();
      }
    } catch (error) {
      this.snackbar.openCustomSnackBar("alert_config_module.reset_error", 'bottom', 'center', true);
    }

  }

  selectTab(value: string) {
    if (this.selectedTab !== value) {
      this.commonService.setSettingsAlertActionButtons(false);
    }
    this.selectedTab = value;
  }
  checkRole(allowedRoles: any, userRoles: any) {
    if (allowedRoles.some((ai: any) => userRoles.includes(ai))) {
      return true;
    } else {
      return false;
    }
  }
  // Threshold input filed validation
  parameterThresholdChanged(index: number, key: string, minMax: any) {
    const keyMapping = {
      LowThr: "invalid_low_threshold",
      HighThr: "invalid_high_threshold",
      CondDelay: "invalid_delay_time",
      Thr: "invalid_threshold",
    };
    this.updated();
    if (
      this.parameterAlertSettings[index][key] < minMax["MIN"][key] ||
      this.parameterAlertSettings[index][key] > minMax["MAX"][key]
    ) {
      this.parameterAlertSettings[index][key] =
        this.parameterAlertSettingsCopy[index][key];
      let range = `${minMax["MIN"][key]} & ${minMax["MAX"][key]}`;
      let translate_txt = "alert_config_module.messages." + keyMapping[key];
      this.snackbar.openCustomSnackBar(translate_txt, 'bottom', 'center', true, '', range);
      this.commonService.setSettingsAlertActionButtons(false);
      // to do specific error message
    }
  }
  isBlank(str) {
    return (
      !str ||
      0 === str.length ||
      str === " " ||
      str === "null" ||
      str === "undefined"
    );
  }

  updated() {
    if (JSON.stringify(this.parameterAlertSettings) !== JSON.stringify(this.parameterAlertSettingsCopy)) {
      this.commonService.setSettingsAlertActionButtons(true);
    } else {
      this.commonService.setSettingsAlertActionButtons(false);
    }
  }
  limitdelay(event) {
    if (event.key === '.') {
      event.preventDefault();
    }
    if (event.target.value.toString().length > 5) {
      event.target.value = event.target.value.substr(0, 5);
    }
  }
  numericsOnly(control: string, event: KeyboardEvent) {
    let numericsOnlyPattern = /^[0-9_]$/;
    let key = event.key;
    if (numericsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
