import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  priorityColorCode,
  alertPriorityOptions,
  uiAccessRoles,
  parameterAlertItems,
  isAllowedRole,
  postures
} from "@utils/helpers";
import { CommonService } from "@services/common.service";
import { BackendApiService } from "@services/backendapi.service";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import {
  AlertConfigurationModels,
  AlertConfigurationStoreSelectors,
  AlertConfigurationStoreState,
} from "../store";
import { AuthenticationService } from "@services/authentication.service";
import {LSColumn, LSTableConfig} from "../../../life-signals/_models/ls-column.model";
import {AlertConfigurationsService} from "../services/alert-configuration.service";
import { UserPreferenceService } from "@services/user-preference.service";
import { environment } from "src/environments/environment";
import { SnackbarService } from "@services/snackbar.service";

@Component({
  selector: "app-parameter-alerts",
  templateUrl: "./parameter-alerts.component.html",
  styleUrls: ["./parameter-alerts.component.scss"],
})
export class ParameterAlertsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  @Output() reloadData = new EventEmitter<any>(true);

  priorityHexCode: any = priorityColorCode;
  alertPriority: any = alertPriorityOptions;
  parameterAlert = parameterAlertItems;
  parameterAlertSettings: any = [];
  parameterAlertSettingsCopy: any = [];
  masterData: any = {};
  roles: string[];
  parameterAlertAccess: any =
    uiAccessRoles.ALERT_CONFIGURATIONS.ALERT_PARAMETER;
  isEditAccess: boolean = false;
  alertGroupId: any = null;
  alertGroupId$: Observable<string>;
  alertSettings$: Observable<AlertConfigurationModels.AlertConfigurationData>;
  userPreferenceUnit;
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
     style: "width: 60px",
    },
    {
      id: "alerts",
      sortable: false,
      headerClass: ["align-left"],
      cellClass: ["fw-700"],
     style: "min-width: 250px",
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
      cellClass: ["px-0"],
     // style: "width: 40px"
    },
    {
      id: "priority",
      sortable: false,
      headerClass: ["align-right"],
      //style: "width: 150px;",
      cellClass: ["text-end", "d-flex", "justify-content-end"],
    },
    {
      id: "editPriority",
      sortable: false,
      headerClass: ["align-left"],
      cellClass: ["px-0"],
      //style: "width: 40px"
    },
    {
      id: "delayTime",
      sortable: false,
      headerClass: ["align-center"],
      //style: "width: 180px;",
      cellClass: ["text-end"],
    },
    {
      id: "modified",
      sortable: false,
      headerClass: ["align-left"],
      //style: "min-width: 200px",
      cellClass: ["text-start"],
    },
    {
      id: "spacer",
      sortable: false,
      headerClass: ["align-left"],
      //style: "min-width: 20px"
    },
  ];

  constructor(
    private commonService: CommonService,
    private userPreference: UserPreferenceService,
    private backendApiService: BackendApiService,
    private snackbar: SnackbarService,
    private autheticationService: AuthenticationService,
    private store$: Store<AlertConfigurationStoreState.AlertConfigurationState>,
    public alertService: AlertConfigurationsService,
  ) {}

  private tempConvFunction: (value: number) => number;

  editThreshold = [false];
  editPrior = [false];
  editDelay = [false];
  parameterMinMax;
  timeZone: string;
  readonly timeFmt: string = environment.customization.timeFormat;
  ngOnInit() {
    this.postures = postures;
    this.roles = this.autheticationService.getRoles();
    this.userPreferenceUnit = this.userPreference.getUserUnitSystem();
    if (this.userPreferenceUnit === 'IS') {
      this.tempConvFunction = this.userPreference.convertFtoC;
    } else {
      this.tempConvFunction = (temp: number) => temp;
    }
    this.timeZone = this.userPreference.getUserTimeZone();
    this.parameterMinMax = this.alertService.getParameterMinMax() ;
    this.alertSettings$ = this.store$.select(
      AlertConfigurationStoreSelectors.getAlertConfigurations
    );
    this.alertGroupId$ = this.store$.select(
      AlertConfigurationStoreSelectors.getAlertGroupId
    );

    this.alertSettings$.subscribe((data) => {
      this.commonService.setSettingsAlertActionButtons(false);
      this.commonService.setParameterAlertEditSubmit(false);
      this.hideParameterEdit();
      this.masterData = { ...data };
      let alerts = [];
      this.parameterAlert.forEach(
        (element: { key: string | number; alerts: any; unit: any }, i) => {
          if(data?.Setting?.Param?.PhyParam[element.key]) {
            const settings = data?.Setting.Param.PhyParam[element.key];
            alerts.push({
              ...settings,
              alert: element.alerts,
              unit: element.unit,
              key: element.key,
              index: i,
            });
          }
        }
      );
      if (this.userPreferenceUnit === 'SI') {
        alerts.forEach(setting => {
          if((setting.key === 'BODYTEMP' || setting.key === 'SKINTEMP')) {
            setting.LowThr = Math.round(setting.LowThr/100)/10;
            setting.HighThr = Math.round(setting.HighThr/100)/10;
            setting.unit = "°C";
          }
              });
      } else {
        alerts.forEach(setting => {
          if((setting.key === 'BODYTEMP' || setting.key === 'SKINTEMP')) {
            setting.LowThr = this.userPreference.convertCtoF(setting.LowThr/1000);
            setting.HighThr = this.userPreference.convertCtoF(setting.HighThr/1000);
            setting.unit = "°F";
          }
        });
      }
      this.parameterAlertSettings = alerts;
      this.parameterAlertSettingsCopy = JSON.parse(JSON.stringify(alerts));
    });
    if (isAllowedRole(this.parameterAlertAccess["EDIT"], this.roles)) {
      this.isEditAccess = true;
    }
    this.subscriptions.push(
      this.commonService.parameterAlertEditHide.subscribe((isHide) => {
        if (isHide) {
          this.parameterAlertSettings = JSON.parse(
            JSON.stringify(this.parameterAlertSettingsCopy)
          );
          this.hideParameterEdit();
        }
      })
    );
    this.subscriptions.push(
      this.commonService.parameterAlertEditSubmit.subscribe((isSubmit) => {
        if (isSubmit) {
          this.updateParameterSettings();
        }
      })
    );

    this.alertGroupId$.subscribe((data) => {
      this.alertGroupId = data;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
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
    // this.commonService.setSettingsAlertActionButtons(true);
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

  async updateParameterSettings() {
    let parameterAlert: any = {};
    console.log(this.parameterAlertSettings);
    let settings = [...this.parameterAlertSettings];
    settings = settings.map(setting =>
        setting.key === 'BODYTEMP' || setting.key === 'SKINTEMP'
            ? { ...setting, LowThr: Math.floor(this.tempConvFunction(setting.LowThr)*1000),
              HighThr:  Math.floor(this.tempConvFunction(setting.HighThr)*1000),}
            : setting
    );
    // settings = settings.map(setting =>
    //     setting.key === 'POSTURE_ALERT' ? { ...setting, LowThr: setting.HighThr} : setting
    // );
    settings.forEach((element) => {
      parameterAlert[element.key] = {
        Enabled: element.Enabled,
        Priority: element.Priority,
        LowThr: element.LowThr,
        HighThr: element.HighThr,
        CondDelay: parseInt(element.CondDelay)
      };
    });
    const payload = { ...this.masterData };
    payload["Setting"]["Param"]["PhyParam"] = parameterAlert;
    delete payload["auditloginfotype"];
    let url = "alert-settings/";
    if (this.alertGroupId) {
      payload.GroupId = this.alertGroupId;
      url += "group-edit";
    } else {
      url += "root-edit";
    }

    try {
      const resp = await this.backendApiService
        .post(environment.dataApiUrl + url, payload)
        .toPromise();
      if (resp.status === "OK") {
        this.reloadData.emit();
        this.snackbar.openCustomSnackBar("Settings has been updated successfully", 'bottom', 'center');
        this.commonService.setSettingsAlertActionButtons(false);
        this.commonService.setParameterAlertEditSubmit(false);
        this.hideParameterEdit();
      }
    } catch (error) {}
  }

  // Threshold input filed validation
  parameterThresholdChanged(index: number, key: string, minMax: any) {
    const keyMapping = {
      LowThr: "invalid_low_threshold",
      HighThr: "invalid_high_threshold",
      CondDelay: "invalid_delay_time",
    };
    this.updated();
    if (
      this.parameterAlertSettings[index][key] < minMax["MIN"][key] ||
      this.parameterAlertSettings[index][key] > minMax["MAX"][key]
    ) {
      this.parameterAlertSettings[index][key] =
        this.parameterAlertSettingsCopy[index][key];
      let range = `${minMax["MIN"][key]} & ${minMax["MAX"][key]}`;
      this.snackbar.openCustomSnackBar("alert_config_module.messages." + keyMapping[key], 'bottom', 'center', true, '', range);
      this.commonService.setSettingsAlertActionButtons(false);
      // to do specific error message
    }

    if (key === "LowThr") {
      if (
        this.parameterAlertSettings[index][key] >=
        this.parameterAlertSettings[index]["HighThr"]
      ) {
        this.parameterAlertSettings[index][key] =
          this.parameterAlertSettingsCopy[index][key];
        this.snackbar.openCustomSnackBar("alert_config_module.messages.incorrect_low_threshold", 'bottom', 'center', true);
        this.commonService.setSettingsAlertActionButtons(false);
      }
    }
    if (key === "HighThr") {
      if (
        this.parameterAlertSettings[index][key] <=
        this.parameterAlertSettings[index]["LowThr"]
      ) {
        this.parameterAlertSettings[index][key] =
          this.parameterAlertSettingsCopy[index][key];
        this.snackbar.openCustomSnackBar("alert_config_module.messages.incorrect_high_threshold", 'bottom', 'center', true);
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
  limitChar(control, event) {
    if(control === 'BODYTEMP' || control === 'SKINTEMP') {
      if(event.target.value.toString().length>5){
        event.target.value = event.target.value.substr(0, 5);
      }
    } else {
      if(event.key==='.'){
        event.preventDefault();
      }
    }
  }
  updated() {
    if (JSON.stringify(this.parameterAlertSettings) !== JSON.stringify(this.parameterAlertSettingsCopy)) {
      this.commonService.setSettingsAlertActionButtons(true);
    } else {
      this.commonService.setSettingsAlertActionButtons(false);
    }
  }
  numericsOnly(control: string, event: KeyboardEvent) {
    let numericsOnlyPattern = /^[0-9]$/;
    let key = event.key;
    console.log(key);
    console.log(control);
    if(control === 'BODYTEMP' || control === 'SKINTEMP') {
      return true
    } else {
      if (numericsOnlyPattern.test(key)) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    }
  }
}
