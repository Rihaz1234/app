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
  priorityAlertItems,
  isAllowedRole,
  alertConfigMinMaxValues,
} from "@utils/helpers";
import { CommonService } from "@services/common.service";
import { BackendApiService } from "@services/backendapi.service";
import {
  AlertConfigurationModels,
  AlertConfigurationStoreSelectors,
  AlertConfigurationStoreState,
} from "../store";
import { Store } from "@ngrx/store";
import { Subscription, Observable } from "rxjs";
import { AuthenticationService } from "@services/authentication.service";
import { LSColumn, LSTableConfig } from "../../../life-signals/_models/ls-column.model";
import { AlertConfigurationsService } from "../services/alert-configuration.service";
import { SnackbarService } from "@services/snackbar.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-priority",
  templateUrl: "./priority.component.html",
  styleUrls: ["./priority.component.scss"],
})
export class PriorityComponent implements OnInit, OnDestroy {
  @Output() reloadData = new EventEmitter<any>(true);
  private subscriptions: Subscription[] = [];
  priorityHexCode: any = priorityColorCode;
  alertPriority: any = alertPriorityOptions;

  priorityAlert = priorityAlertItems;
  masterData: any = {};
  priorityAlertSettings: any = [];
  priorityAlertSettingsCopy: any = [];
  alertSettings$: Observable<AlertConfigurationModels.AlertConfigurationData>;

  roles: string[];
  priorityAlertAccess: any = uiAccessRoles.ALERT_CONFIGURATIONS.ALERT_PRIORITY;
  isEditAccess: boolean = false;

  alertGroupId: any = null;
  alertGroupId$: Observable<string>;
  priorityAlertMinMax = alertConfigMinMaxValues.priorityAlert;
  config: LSTableConfig = {
    id: "alert_config_module",
    rowSelectEnabled: false,
    translate: true,
    translateKey: "alert_config_module",
    showExtraHeader: true
  };
  columns: LSColumn[] = [
    {
      id: "alerts",
      sortable: false,
      headerClass: ["align-left"],
      cellClass: ["fw-700"],
      style: "min-width: 150px",
    },
    {
      id: "alert_freq",
      sortable: false,
      headerClass: ["align-center"],
      cellClass: ["text-center"],
      extraHeaderClass: ["text-end"],
      style: "width: 460px;",
    },
    {
      id: "alert_breakthrough",
      sortable: false,
      headerClass: ["align-center"],
      cellClass: ["text-center"],
      extraHeaderClass: ["text-end"],
      style: "width: 460px;",
    },
    {
      id: "spacer",
      sortable: false,
      headerClass: ["align-left"],
      style: "min-width: 50px"
    },
  ];
  constructor(
    private commonService: CommonService,
    private backendApiService: BackendApiService,
    private snackbar: SnackbarService,
    private autheticationService: AuthenticationService,
    private store$: Store<AlertConfigurationStoreState.AlertConfigurationState>,
    public alertService : AlertConfigurationsService
  ) {}

  editPriority = [false];
  editPrio = [false];

  editBreakThrough = [false];
  editBreaksThrough = [false];

  ngOnInit() {
    this.roles = this.autheticationService.getRoles();
    this.alertSettings$ = this.store$.select(
      AlertConfigurationStoreSelectors.getAlertConfigurations
    );

    this.alertGroupId$ = this.store$.select(
      AlertConfigurationStoreSelectors.getAlertGroupId
    );

    this.alertSettings$.subscribe((data) => {
      this.commonService.setSettingsAlertActionButtons(false);
      this.commonService.setParameterAlertEditSubmit(false);
      this.hidePriorityAlertEdit();
      this.masterData = { ...data };
      const alerts = [];
      this.priorityAlert.forEach(
        (element: {
          key: string | number;
          alerts: any;
          unit: any;
          percentage: any;
        }, i) => {
          const settings = (data?.Setting?.Param?.PhyParam || {})[element.key];
          alerts.push({
            ...settings,
            ...((this.masterData?.Setting?.Common?.PhyCommon || {})[
              element.key
            ] || {}),
            alert: element.alerts,
            unit: element.unit,
            key: element.key,
            percentage: element.percentage,
            index: i
          });
        }
      );
      this.priorityAlertSettings = alerts;
      this.priorityAlertSettingsCopy = JSON.parse(JSON.stringify(alerts));
    });

    if (isAllowedRole(this.priorityAlertAccess["EDIT"], this.roles)) {
      this.isEditAccess = true;
    }
    this.subscriptions.push(
      this.commonService.priorityAlertEditHide.subscribe((isHide) => {
        if (isHide) {
          this.priorityAlertSettings = JSON.parse(
            JSON.stringify(this.priorityAlertSettingsCopy)
          );
          this.hidePriorityAlertEdit();
        }
      })
    );

    this.subscriptions.push(
      this.commonService.priorityAlertEditSubmit.subscribe((isSubmit) => {
        if (isSubmit) {
          this.updatePrioritySettings();
        }
      })
    );

    this.alertGroupId$.subscribe((data) => {
      this.alertGroupId = data;
      console.log('groupId', this.alertGroupId);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
  }

  // Show and Hide Table Edit fields
  showHideEdit(index: number, type: string) {
    switch (type) {
      case "priorityACK":
        this.editPriority[index] = !this.editPriority[index];
        break;
      case "priorityNACK":
        this.editPrio[index] = !this.editPrio[index];
        break;
      case "breakThroughACK":
        this.editBreakThrough[index] = !this.editBreakThrough[index];
        break;
      case "breakThroughNACK":
        this.editBreaksThrough[index] = !this.editBreaksThrough[index];
        break;
      default:
        break;
    }
  }

  // Hide all active edit buttons
  hidePriorityAlertEdit() {
    this.editPriority = [false];
    this.editPrio = [false];
    this.editBreakThrough = [false];
    this.editBreaksThrough = [false];
  }

  // To update priority alert settings
  async updatePrioritySettings() {
    const parameterAlert: any = {};
    this.priorityAlertSettings.forEach((element) => {
      parameterAlert[element.key] = {
        Frequency_UnAck: parseInt(element.Frequency_UnAck),
        Frequency_Ack: parseInt(element.Frequency_Ack),
        Percentage_UnAck: parseInt(element.Percentage_UnAck),
        Percentage_Ack: parseInt(element.Percentage_Ack),
      };
    });
    const payload: any = { ...this.masterData } || {};
    payload.Setting = payload?.Setting || {};
    payload.Setting.Common = payload?.Setting?.Common || {};
    payload.Setting.Common.PhyCommon = parameterAlert;
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
        this.snackbar.openCustomSnackBar("Settings has been updated successfully", 'bottom', 'center', true);
        this.commonService.setSettingsAlertActionButtons(false);
        this.commonService.setPriorityAlertEditSubmit(false);
        this.hidePriorityAlertEdit();
      }
    } catch (error) { }
  }

  priorityParamInputChanged(index: number, key: string, minMax: any) {
    const keyMapping = {
      Frequency_Ack: "invalid_alertfreq_ack",
      Frequency_UnAck: "invalid_alertfreq_unack",
      Percentage_Ack: "invalid_alertbreak_ack",
      Percentage_UnAck: "invalid_alertbreak_unack",
    };
    this.updated();

    if (
      this.priorityAlertSettings[index][key] < minMax["MIN"][key] ||
      this.priorityAlertSettings[index][key] > minMax["MAX"][key]
    ) {
      this.priorityAlertSettings[index][key] =
        this.priorityAlertSettingsCopy[index][key];
      let range = `${minMax["MIN"][key]} & ${minMax["MAX"][key]}`;
      this.snackbar.openCustomSnackBar("alert_config_module.messages." + keyMapping[key], 'bottom', 'center', true, '', range);
      this.commonService.setSettingsAlertActionButtons(false);
    }

    if (key === "Frequency_Ack") {
      if (
        this.priorityAlertSettings[index][key] <=
        this.priorityAlertSettings[index]["Frequency_UnAck"]
      ) {
        this.priorityAlertSettings[index][key] =
          this.priorityAlertSettingsCopy[index][key];
        this.snackbar.openCustomSnackBar("alert_config_module.messages.incorrect_alertfreq_ack", 'bottom', 'center', true);
        this.commonService.setSettingsAlertActionButtons(false);
      }
    }
    if (key === "Frequency_UnAck") {
      if (
        this.priorityAlertSettings[index][key] >=
        this.priorityAlertSettings[index]["Frequency_Ack"]
      ) {
        this.priorityAlertSettings[index][key] =
          this.priorityAlertSettingsCopy[index][key];
        this.snackbar.openCustomSnackBar("alert_config_module.messages.incorrect_alertfreq_unack", 'bottom', 'center', true);
        this.commonService.setSettingsAlertActionButtons(false);
      }
    }
    if (key === "Percentage_Ack") {
      if (
        this.priorityAlertSettings[index][key] <=
        this.priorityAlertSettings[index]["Percentage_UnAck"]
      ) {
        this.priorityAlertSettings[index][key] =
          this.priorityAlertSettingsCopy[index][key];
        this.snackbar.openCustomSnackBar("alert_config_module.messages.incorrect_alertbreak_ack", 'bottom', 'center', true);
        this.commonService.setSettingsAlertActionButtons(false);
      }
    }
    if (key === "Percentage_UnAck") {
      if (
        this.priorityAlertSettings[index][key] >=
        this.priorityAlertSettings[index]["Percentage_Ack"]
      ) {
        this.priorityAlertSettings[index][key] =
          this.priorityAlertSettingsCopy[index][key];
        this.snackbar.openCustomSnackBar("alert_config_module.messages.incorrect_alertbreak_unack", 'bottom', 'center', true);
        this.commonService.setSettingsAlertActionButtons(false);
      }
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
  updated() {
    if (JSON.stringify(this.priorityAlertSettings) !== JSON.stringify(this.priorityAlertSettingsCopy)) {
      this.commonService.setSettingsAlertActionButtons(true);
    } else {
      this.commonService.setSettingsAlertActionButtons(false);
    }
  }
}
