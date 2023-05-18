import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { CommonService } from "@services/common.service";
import { BackendApiService } from "@services/backendapi.service";
import { MatDialog } from "@angular/material/dialog";
import { Subscription, Observable } from "rxjs";
import {
  uiAccessRoles,
  technicalAlertItems,
  isAllowedRole,
  alertConfigMinMaxValues,
} from "src/app/utils/helpers";
import {
  AlertConfigurationModels,
  AlertConfigurationStoreActions,
  AlertConfigurationStoreSelectors,
  AlertConfigurationStoreState,
} from "../store";
import { Store } from "@ngrx/store";
import { AuthenticationService } from "@services/authentication.service";
import { LSColumn, LSTableConfig } from "../../../life-signals/_models/ls-column.model";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { UserPreferenceService } from "@services/user-preference.service";
import { environment } from "src/environments/environment";
import { Group } from "src/app/manage-group/models/manage-groups.model";
import { AlertConfigurationsService } from "../services/alert-configuration.service";
import { SnackbarService } from "@services/snackbar.service";

@Component({
  selector: "app-technical-alerts",
  templateUrl: "./technical-alerts.component.html",
  styleUrls: ["./technical-alerts.component.scss"],
})
export class TechnicalAlertsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  @Output() reloadData = new EventEmitter<any>(true);
  @Input() patientData: any;
  config: LSTableConfig = {
    id: "alert_config_module",
    rowSelectEnabled: false,
    translate: true,
    translateKey: "alert_config_module",
    showExtraHeader: true,
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
      style: "min-width: 250px"
    },
    {
      id: "alert_freq",
      sortable: false,
      headerClass: ["align-center"],
      cellClass: ["text-center"],
      extraHeaderClass: ["text-start"],
      //style: "width: 360px;",
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
    private userPreference: UserPreferenceService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private backendApiService: BackendApiService,
    private autheticationService: AuthenticationService,
    private store$: Store<AlertConfigurationStoreState.patientAlertConfigurationState>,
    private snackbar: SnackbarService,
    public alertService : AlertConfigurationsService
  ) {}

  editAlertFrequency = [false];
  editAlertFrequencyUnAck = [false];
  editDelaytime = [false];

  roles: string[];
  technicalAlertAccess: any =
    uiAccessRoles.ALERT_CONFIGURATIONS.TECHNICAL_ALERT;
  isEditAccess: boolean = false;
  selectedTab = "parameter";
  showActionButtons: boolean = false;
  isShowResetButton: boolean = false;
  technicalAlert = technicalAlertItems;
  masterData: any = {};
  technicalAlertSettings: any = [];
  technicalAlertSettingsCopy: any = [];
  cfId: string = "";
  alertId: any = null;
  GroupId: string = "";
  error: string;
  alertSettings: any = {};
  alertSettingsStatus$: Observable<string>;
  alertSettingsMessage$: Observable<string>;
  accessRoles: any = uiAccessRoles;
  clinicalFacilityGroups: Group[];
  clinicalFacilityGroupId: any = null;
  patientId: string = "PATALDRT1";
  alertSettings$: Observable<AlertConfigurationModels.AlertConfigurationData>;
  technicalAlertMinMax = alertConfigMinMaxValues.technicalAlert;
  timeZone: string;
  readonly timeFmt: string = environment.customization.timeFormat;
  lastUpdated;
  loaderSubscription;
  loader = true;

  ngOnInit() {
    this.roles = this.autheticationService.getRoles();
    this.timeZone = this.userPreference.getUserTimeZone();
    this.cfId = this.autheticationService.getCfId();
    this.patientId = this.patientData.patientId;

    this.alertSettings$ = this.store$.select(
      AlertConfigurationStoreSelectors.getAlertConfigurations
    );
    this.alertSettingsStatus$ = this.store$.select(
      AlertConfigurationStoreSelectors.getAlertConfigurationStatus
    );
    this.alertSettingsMessage$ = this.store$.select(
      AlertConfigurationStoreSelectors.getAlertConfigurationMessage
    );
    this.loaderSubscription = this.store$
        .select(AlertConfigurationStoreSelectors.getLoaderStatus)
        .subscribe((loaded) => {
          this.loader = !loaded;
        });
    this.getSettings();
    
    this.alertSettings$.subscribe((data) => {
      //this.loader = false;
      this.lastUpdated = new Date().toUTCString();
      this.masterData = { ...data };
      this.masterData.GroupId = "";
      this.masterData.PatientId = this.patientId;
      this.masterData.FacilityId = this.cfId;
      this.masterData.AlertId = "";
      const alerts = [];
      this.technicalAlert.forEach(
        (element: { key: string | number; alerts: any; unit: any; units: any }, i) => {
          const settings = data.Setting.Param.TechParam[element.key];
          if(settings) {
            alerts.push({
              ...settings,
              ...this.masterData.Setting.Common.TechCommon[element.key],
              alert: element.alerts,
              unit: element.unit,
              units: element.units,
              key: element.key,
              index: i
            });
          }
        }
      );
      this.technicalAlertSettings = alerts;
      this.technicalAlertSettingsCopy = JSON.parse(JSON.stringify(alerts));
    });
    this.commonService.settingsAlertActionButtonsShow.subscribe((isShow) => {
      if (this.showActionButtons !== isShow) {
        this.showActionButtons = isShow;
      }
    });
    this.alertSettings$.subscribe((data) => {
      this.commonService.setSettingsAlertActionButtons(false);
      this.commonService.setTechnicalAlertEditSubmit(false);
      this.hideTechnicalAlertEdit();
      this.alertSettings = { ...data };
      this.alertId = this.alertSettings.AlertId;
      this.isShowResetButton = this.alertSettings?.IsForPatient;
    });
    if (isAllowedRole(this.technicalAlertAccess["EDIT"], this.roles)) {
      this.isEditAccess = true;
    }
    this.subscriptions.push(
      this.commonService.technicalAlertEditHide.subscribe((isHide) => {
        if (isHide) {
          this.technicalAlertSettings = JSON.parse(
            JSON.stringify(this.technicalAlertSettingsCopy)
          );
          this.hideTechnicalAlertEdit();
        }
      })
    );
    this.subscriptions.push(
      this.commonService.technicalAlertEditSubmit.subscribe((isSubmit) => {
        if (isSubmit) {
          this.updateTechnicalSettings();
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

  getSettings = () => {
    let patientId = encodeURIComponent(this.patientId);
    let url = `alert-settings/patient/${this.cfId}/${patientId}`;
    this.store$.dispatch(
      new AlertConfigurationStoreActions.loadAlertConfigurationRequestAction({
        url,
      })
    );
    this.store$
      .select(AlertConfigurationStoreSelectors.getAlertConfigurationError)
      .subscribe((data: any) => {
        this.error = data;
        if(data?.error?.errorMessage === 'ACCESS_DENIED') {
          this.snackbar.openCustomSnackBar("alert_config_module.messages.access_denied", 'bottom', 'center', true);
        }
      });
  };

  
  ngOnDestroy() {
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
  }

  showEditAlertFrequency(index: string | number) {
    this.editAlertFrequency[index] = true;
  }
  hideEditAlertFrequency(index: string | number) {
    this.editAlertFrequency[index] = false;
  }

  showEditAlertFrequencyUnAck(index: string | number) {
    this.editAlertFrequencyUnAck[index] = true;
  }
  hideEditAlertFrequencyUnAck(index: string | number) {
    this.editAlertFrequencyUnAck[index] = false;
  }

  showEditDelaytime(index: string | number) {
    this.editDelaytime[index] = true;
  }
  hideEditDelaytime(index: string | number) {
    this.editDelaytime[index] = false;
  }

  // Hide all active edit buttons
  hideTechnicalAlertEdit() {
    this.editAlertFrequency = [false];
    this.editDelaytime = [false];
    this.editAlertFrequencyUnAck = [false];
  }
  async updateTechnicalSettings() {
    const technicalParameter: any = {};
    const technicalCommonParameter: any = {};
    this.technicalAlertSettings.forEach(
      (element: {
        key: string | number;
        Enabled: any;
        CondDelay: string;
        Frequency_Ack: any;
        Frequency_UnAck: any;
      }) => {
        technicalParameter[element.key] = {
          Enabled: element.Enabled,
        };
        technicalCommonParameter[element.key] = {
          CondDelay: parseInt(element.CondDelay),
          Frequency_UnAck: parseInt(element.Frequency_UnAck),
          Frequency_Ack: parseInt(element.Frequency_Ack),
        };
      }
    );

    const payload = { ...this.masterData };
    payload["Setting"]["Param"]["TechParam"] = technicalParameter;
    payload.Setting = payload?.Setting || {};
    payload.Setting.Common = payload.Setting?.Common || {};
    payload.Setting.Common.TechCommon = technicalCommonParameter;
    delete payload["auditloginfotype"];
    let patientId = encodeURIComponent(this.patientId);
    let url = `alert-settings/patient-edit/${this.cfId}/${patientId}`;
   
    try {
      
      const resp = await this.backendApiService
      .post(environment.dataApiUrl + url, payload)
      .toPromise();
      if (resp.status === "OK") {
        this.reloadData.emit();
        this.snackbar.openCustomSnackBar("Settings has been updated successfully", 'bottom', 'center');
        this.commonService.setSettingsAlertActionButtons(false);
        this.commonService.setTechnicalAlertEditSubmit(false);
        this.hideTechnicalAlertEdit();
        this.getSettings();
      }
    } catch (error) {}
  }
  // Show and Hide Table Edit fields
  showHideEdit(index: number, type: string) {
    switch (type) {
      case "alertFrequencyACK":
        this.editAlertFrequency[index] = !this.editAlertFrequency[index];
        break;
      case "alertFrequencyNACK":
        this.editAlertFrequencyUnAck[index] =
          !this.editAlertFrequencyUnAck[index];
        break;
      case "delay":
        this.editDelaytime[index] = !this.editDelaytime[index];
        break;
      default:
        break;
    }
  }

  toggle(i: number) {
    this.editAlertFrequency[i] = false;
    this.editDelaytime[i] = false;
    this.editAlertFrequencyUnAck[i] = false;
    this.updated();
  }

  // Handle Alert Settings Edit Cancel Button
  handleAlertSettingsEditCancel() {
    this.commonService.setSettingsAlertActionButtons(false);
    this.commonService.setTechnicalAlertEditSubmit(false);
    this.hideTechnicalAlertEdit();
    this.technicalAlertSettings = JSON.parse(
      JSON.stringify(this.technicalAlertSettingsCopy)
    );
    
  }
  // Handle Alert Settings Edit Cancel Button
  handleAlertSettingsSave() {
   this.updateTechnicalSettings();
  }
  
   // Handle alert setting factory reset action
   async handleFactoryReset() {
     const patientId = encodeURIComponent(this.patientId);
    const url = `alert-settings/patient-reset/${this.cfId}/${patientId}/${this.alertId}`;
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


  // input filed validation
  technicalParamInputChanged(index: number, key: string, minMax: any) {
    const keyMapping = {
      Frequency_Ack: "invalid_alertfreq_ack",
      Frequency_UnAck: "invalid_alertfreq_unack",
      CondDelay: "invalid_delay_time",
    };
    this.updated();
    if (
        this.technicalAlertSettings[index][key] < minMax["MIN"][key] ||
        this.technicalAlertSettings[index][key] > minMax["MAX"][key]
    ) {
      this.technicalAlertSettings[index][key] =
          this.technicalAlertSettingsCopy[index][key];
      let range = `${minMax["MIN"][key]} & ${minMax["MAX"][key]}`;
      this.snackbar.openCustomSnackBar("alert_config_module.messages.incorrect_alertfreq_ack", 'bottom', 'center', true, '', range);
      this.commonService.setSettingsAlertActionButtons(false);
    }
    if (key === "Frequency_Ack") {
      if (
          this.technicalAlertSettings[index][key] <=
          this.technicalAlertSettings[index]["Frequency_UnAck"]
      ) {
        this.technicalAlertSettings[index][key] =
            this.technicalAlertSettingsCopy[index][key];
        this.snackbar.openCustomSnackBar("alert_config_module.messages.incorrect_alertfreq_ack", 'bottom', 'center', true);
        this.commonService.setSettingsAlertActionButtons(false);
      }
    }
    if (key === "Frequency_UnAck") {
      if (
          this.technicalAlertSettings[index][key] >=
          this.technicalAlertSettings[index]["Frequency_Ack"]
      ) {
        this.technicalAlertSettings[index][key] =
            this.technicalAlertSettingsCopy[index][key];
        this.snackbar.openCustomSnackBar("alert_config_module.messages.incorrect_alertfreq_unack", 'bottom', 'center', true);
        this.commonService.setSettingsAlertActionButtons(false);
      }
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
  updated() {
    if (JSON.stringify(this.technicalAlertSettings) !== JSON.stringify(this.technicalAlertSettingsCopy)) {
      this.commonService.setSettingsAlertActionButtons(true);
    } else {
      this.commonService.setSettingsAlertActionButtons(false);
    }
  }
}
