import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from "@angular/core";
import { BackendApiService } from "@services/backendapi.service";
import { Subscription, Observable } from "rxjs";
import {
  uiAccessRoles,
  technicalAlertItems,
  isAllowedRole,
  alertConfigMinMaxValues,
} from "src/app/utils/helpers";
import {
  AlertConfigurationModels,
  AlertConfigurationStoreSelectors,
  AlertConfigurationStoreState,
} from "../store";
import { Store } from "@ngrx/store";
import { AuthenticationService } from "@services/authentication.service";
import { LSColumn, LSTableConfig } from "../../../life-signals/_models/ls-column.model";
import { UserPreferenceService } from "@services/user-preference.service";
import { CommonService } from "@services/common.service";
import { environment } from "src/environments/environment";
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
  loading = false;
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
      style: "width:60px",
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
      extraHeaderClass: ["text-end"],
      //style: "width: 360px;",
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
      //style: "width: 200px",
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
    private userPreference: UserPreferenceService,
    private commonService: CommonService,
    private backendApiService: BackendApiService,
    private autheticationService: AuthenticationService,
    private store$: Store<AlertConfigurationStoreState.AlertConfigurationState>,
    private snackbar: SnackbarService,
    public alertService : AlertConfigurationsService
  ) { }

  editAlertFrequency = [false];
  editAlertFrequencyUnAck = [false];
  editDelaytime = [false];

  roles: string[];
  technicalAlertAccess: any =
    uiAccessRoles.ALERT_CONFIGURATIONS.ALERT_TECHNICAL;
  isEditAccess: boolean = false;

  technicalAlert = technicalAlertItems;
  masterData: any = {};
  technicalAlertSettings: any = [];
  technicalAlertSettingsCopy: any = [];
  alertSettings$: Observable<AlertConfigurationModels.AlertConfigurationData>;

  alertGroupId: any = null;
  alertGroupId$: Observable<string>;
  technicalAlertMinMax = alertConfigMinMaxValues.technicalAlert;
  timeZone: string;
  readonly timeFmt: string = environment.customization.timeFormat;
  ngOnInit() {
    this.roles = this.autheticationService.getRoles();
    this.timeZone = this.userPreference.getUserTimeZone();
    this.alertSettings$ = this.store$.select(
      AlertConfigurationStoreSelectors.getAlertConfigurations
    );

    this.alertGroupId$ = this.store$.select(
      AlertConfigurationStoreSelectors.getAlertGroupId
    );

    this.alertSettings$.subscribe((data) => {
      this.commonService.setSettingsAlertActionButtons(false);
      this.commonService.setTechnicalAlertEditSubmit(false);
      this.hideTechnicalAlertEdit();
      this.masterData = { ...data };
      const alerts = [];
      this.technicalAlert.forEach(
        (element: { key: string | number; alerts: any; unit: any; units: any }, i) => {
          const settings = data?.Setting?.Param.TechParam[element.key];
          if(settings) {
            alerts.push({
              ...settings,
              ...this.masterData?.Setting?.Common?.TechCommon[element.key],
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

  // Hide all active edit buttons
  hideTechnicalAlertEdit() {
    this.editAlertFrequency = [false];
    this.editDelaytime = [false];
    this.editAlertFrequencyUnAck = [false];
  }

  toggle(i: number) {
    this.editAlertFrequency[i] = false;
    this.editDelaytime[i] = false;
    this.editAlertFrequencyUnAck[i] = false;
    this.updated();
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
        this.commonService.setTechnicalAlertEditSubmit(false);
        this.hideTechnicalAlertEdit();
      }
    } catch (error) { }
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
      this.snackbar.openCustomSnackBar("alert_config_module.messages."+keyMapping[key], 'bottom', 'center', true, '', range);
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
