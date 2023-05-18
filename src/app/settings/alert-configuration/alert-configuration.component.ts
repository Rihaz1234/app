import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { BackendApiService } from "@services/backendapi.service";
import {
  parameterAlertItems,
  technicalAlertItems,
  priorityAlertItems,
  uiAccessRoles,
} from "@utils/helpers";
import { CommonService } from "@services/common.service";
import {
  AlertConfigurationModels,
  AlertConfigurationStoreActions,
  AlertConfigurationStoreSelectors,
  AlertConfigurationStoreState,
} from "./store";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AuthenticationService } from "@services/authentication.service";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { Group } from "src/app/manage-group/models/manage-groups.model";
import { SnackbarService } from "@services/snackbar.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-alert-configuration",
  templateUrl: "./alert-configuration.component.html",
  styleUrls: ["./alert-configuration.component.scss"],
})
export class AlertConfigurationComponent implements OnInit {
  selectedTab = "parameter";
  error: string;
  alertSettings: any = {};
  alertDestinationSettings: any = {};
  alertArrhythmiaSettings: any = {};
  alertSettings$: Observable<AlertConfigurationModels.AlertConfigurationData>;
  alertDestinationSettings$: Observable<AlertConfigurationModels.AlertDestinationConfigData>;
  alertArrhythmiaSettings$: Observable<AlertConfigurationModels.ArrhythmiaAlertConfigurationData>;
  alertSettingsStatus$: Observable<string>;
  alertSettingsMessage$: Observable<string>;
  parameterAlert = parameterAlertItems;
  technicalAlert = technicalAlertItems;
  priorityAlert = priorityAlertItems;
  showActionButtons: boolean = false;
  isShowResetButton: boolean = false;
  isPHYGCUser: boolean = false;
  cfId: string = "";
  alertId: any = null;
  roles: string[];
  accessRoles: any = uiAccessRoles;
  clinicalGroups: Group[] = [];
  locationGroups: Group[] = [];
  clinicalFacilityGroupId: any = null;
  clinicalGroupId;
  locationGroupId;
  alertDestId: string = null;
  alertArrId: string = null;
  loader = true;
  loaderSubscription: any;
  isCfa = false;
  facilityName;
  editAccess;
  groupsView = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackbar: SnackbarService,
    private backendApiService: BackendApiService,
    private commonService: CommonService,
    private autheticationService: AuthenticationService,
    private store$: Store<AlertConfigurationStoreState.AlertConfigurationState>
  ) {}

  ngOnInit() {
    this.cfId = this.autheticationService.getCfId();
    this.roles = this.autheticationService.getRoles();
    this.facilityName = sessionStorage.getItem("facilityName") || '';
    if (["CFA", "CFAC"].some((ai) => this.roles.includes(ai))) {
      this.isCfa = true;
      this.getSettings();
    }
    if(["SC", "GC", "PHY"].some((ai) => this.roles.includes(ai))) {
      this.groupsView = true;
      this.getClinicalFacilityGroups();
    }
    if (["CFA", "CFAC", "SC"].some((ai) => this.roles.includes(ai))) {
      this.editAccess = true;
    }
    this.alertSettings$ = this.store$.select(
      AlertConfigurationStoreSelectors.getAlertConfigurations
    );

    this.alertDestinationSettings$ = this.store$.select(
      AlertConfigurationStoreSelectors.getDestinationAlertConfigurations
    );
    this.alertArrhythmiaSettings$ = this.store$.select(
      AlertConfigurationStoreSelectors.getArrhythmiaAlertConfigurations
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
        if (loaded) {
          this.loader = false;
        }
      });

    // if (["PHY", "GC"].some((ai) => this.roles.includes(ai))) {
    //   this.isPHYGCUser = true;
    //   this.isShowResetButton = false;
    // }
    if(this.editAccess) {
      this.isShowResetButton = true;
    }

    this.commonService.settingsAlertActionButtonsShow.subscribe((isShow) => {
      if (this.showActionButtons !== isShow) {
        this.showActionButtons = isShow;
      }
    });

    this.alertSettings$.subscribe((data) => {
      //this.loader = false;
      this.alertSettings = { ...data };
      this.alertId = this.alertSettings.AlertId;
      if (
        this.alertSettings.modifiedDateTime &&
        this.selectedTab !== "destination"
      ) {
        this.editAccess
          ? (this.isShowResetButton = true)
          : (this.isShowResetButton = false);
      }
    });

    this.alertDestinationSettings$.subscribe((data) => {
      this.alertDestinationSettings = { ...data };
      if (this.alertDestinationSettings.modifiedDateTime){
        this.isPHYGCUser
          ? (this.isShowResetButton = false)
          : (this.isShowResetButton = true);
      }
      this.alertDestId = this.alertDestinationSettings.AlertDestId;
    });

    this.alertArrhythmiaSettings$.subscribe((data) => {
      this.alertArrhythmiaSettings = { ...data };
      if (this.alertArrhythmiaSettings.modifiedDateTime){
        this.isPHYGCUser
          ? (this.isShowResetButton = false)
          : (this.isShowResetButton = true);
      }
      this.alertArrId = this.alertArrhythmiaSettings.ArrhythmiaId;
      console.log(this.alertArrhythmiaSettings.ArrhythmiaId);
    });
  }

  navigateUrl(url: string) {
    this.router.navigate([url]).then();
  }

  selectTab(value: string) {
    if (this.selectedTab !== value) {
      this.commonService.setSettingsAlertActionButtons(false);
    }
    this.isShowResetButton = this.editAccess;
    this.selectedTab = value;
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
    this.store$.dispatch(
        new AlertConfigurationStoreActions.setGroupAlertId(
            this.clinicalFacilityGroupId
        )
    );
    if (this.clinicalFacilityGroupId) {
      this.getGroupAlertSettings();
    } else {
      let url = "alert-settings/root/" + this.cfId;
      this.store$.dispatch(
        new AlertConfigurationStoreActions.loadAlertConfigurationRequestAction({
          url,
        })
      );
      this.store$
        .select(AlertConfigurationStoreSelectors.getAlertConfigurationError)
        .subscribe((data) => {
          if (data) {
            this.error = data;
            this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
          }
        });
      this.getAlertDestinationSettings();
      this.getArrhythmiaSettings();
    }
  };

  // Clinical Facility Groups list
  getClinicalFacilityGroups = async () => {
    let url = "clinical-facilities/" + this.cfId + "/groups?sortBy=name:asc";
    try {
      const resp: any = await this.backendApiService
        .callGetApi(environment.dataApiUrl + url)
        .toPromise();
      if (resp.status === "OK") {
        let groups = resp.data;
        this.clinicalGroups = groups.filter(g => g.type === "CLINICAL");
        this.locationGroups = groups.filter(g => g.type === "PHYSICAL");
        if (this.roles.indexOf('CFAC') > -1) {
          this.clinicalGroups.unshift({ groupId: null, name: 'None' });
          this.locationGroups.unshift({ groupId: null, name: 'None' });
        } else {
          if (this.locationGroups.length > 0) {
            let parentGroups = this.locationGroups.filter(grp => grp.parent === 'ROOT');
            this.locationGroups?.forEach(group => {
              if (group.parent !== 'ROOT' && !(this.locationGroups.find(grp => grp.groupId === group.parent))) {
                parentGroups.push(group);
              }
            });
            this.clinicalFacilityGroupId = parentGroups[0].groupId;
            this.locationGroupId = parentGroups[0].groupId;
            this.getGroupAlertSettings();
          } else if (this.clinicalGroups.length > 0) {
            let parentGroups = this.clinicalGroups.filter(grp => grp.parent === 'ROOT');
            this.locationGroups?.forEach(group => {
              if (group.parent !== 'ROOT' && !(this.clinicalGroups.find(grp => grp.groupId === group.parent))) {
                parentGroups.push(group);
              }
            });
            this.clinicalFacilityGroupId = parentGroups[0].groupId;
            this.clinicalGroupId = parentGroups[0].groupId;
            this.getGroupAlertSettings();
          } else {
            this.loader = false;
          }
        }
      }
    } catch (error) {}
  };

  // Handle Alert Settings Edit Cancel Button
  handleAlertSettingsEditCancel() {
    this.commonService.setSettingsAlertActionButtons(false);
    switch (this.selectedTab) {
      case "parameter":
        this.commonService.setParameterAlertEditHide(true);
        break;
      case "arrhythmia":
        this.commonService.setArrhythmiaParameterAlertEditHide(true);
        break;
      case "technical":
        this.commonService.setTechnicalAlertEditHide(true);
        break;
      case "priority":
        this.commonService.setPriorityAlertEditHide(true);
        break;
      case "destination":
        this.commonService.setDestinationAlertEditHide(true);
        break;
      case "message": {
        this.loader = true;
        this.commonService.setNotificationAlertEditHide(true);
        setTimeout(() => {
          this.loader = false;
        }, 300)
        break;
      }
      default:
        break;
    }
  }

  // Handle alert setting factory reset action
  async handleFactoryReset() {
    let responseMessage = "";
    let url = "";
    switch (this.selectedTab) {
      case "arrhythmia":
        if (this.clinicalFacilityGroupId) {
          url =
            "arrhythmia-alert-settings/group-reset/" +
            this.cfId +
            "/" +
            this.clinicalFacilityGroupId;
        } else {
          url =
            "arrhythmia-alert-settings/factory-reset/" +
            this.cfId + "/" + this.alertArrId;
        }
        responseMessage = "Arrhythmia Alerts Settings Factory Reset Done";
        break;
      case "parameter":
        if (this.clinicalFacilityGroupId) {
          url =
            "alert-settings/group-reset/" +
            this.cfId +
            "/" +
            this.clinicalFacilityGroupId;
        } else {
          url =
            "alert-settings/factory-reset/" +
            this.cfId +
            "/" +
            this.alertId +
            "/param-alert-settings";
        }
        responseMessage = "Clinical Alerts Settings Factory Reset Done";
        break;
      case "technical":
        if (this.clinicalFacilityGroupId) {
          url =
            "alert-settings/group-reset/" +
            this.cfId +
            "/" +
            this.clinicalFacilityGroupId;
        } else {
          url =
            "alert-settings/factory-reset/" +
            this.cfId +
            "/" +
            this.alertId +
            "/tech-alert-settings";
        }
        responseMessage = "Technical Alerts Settings Factory Reset Done";
        break;
      case "priority":
        if (this.clinicalFacilityGroupId) {
          url =
            "alert-settings/group-reset/" +
            this.cfId +
            "/" +
            this.clinicalFacilityGroupId;
        } else {
          url =
            "alert-settings/factory-reset/" +
            this.cfId +
            "/" +
            this.alertId +
            "/priority-alert-settings";
        }
        responseMessage = "Priority Alerts Settings Factory Reset Done";
        break;
      case "destination":
        if (this.clinicalFacilityGroupId) {
          url =
            "alert-settings/group-reset/alert-destination-settings/" +
            this.cfId +
            "/" +
            this.clinicalFacilityGroupId;
        } else {
          url =
            "alert-settings/root/" +
            this.cfId +
            "/" +
            this.alertDestId +
            "/alert-destination-settings/factory-reset";
        }
        responseMessage = "Destination Alerts Settings Factory Reset Done";
        break;
      case "message":
        this.loader = true;
        url =
          "alert-settings/root/" +
          this.cfId +
          "/" +
          this.alertDestId +
          "/alert-destination-settings/factory-reset";
        responseMessage = "Alert Notifications Factory Reset Done";
        break;
      default:
        break;
    }
    try {
      const resp: any = await this.backendApiService
        .post(environment.dataApiUrl + url, {})
        .toPromise();
      if (resp.status === "OK") {
        this.snackbar.openCustomSnackBar(responseMessage, 'bottom', 'center');
        if (this.selectedTab === "message") {
          this.getAlertDestinationSettings();
        } else {
          if (this.clinicalFacilityGroupId) {
            this.getGroupAlertSettings();
          } else {
            this.getSettings();
          }
        }
      }
    } catch (error) {
      this.loader = false;
      if (error) {
        this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
      }
    }
  }

  // Handle Alert Settings Edit Cancel Button
  handleAlertSettingsSave() {
    switch (this.selectedTab) {
      case "parameter":
        this.commonService.setParameterAlertEditSubmit(true);
        break;
      case "technical":
        this.commonService.setTechnicalAlertEditSubmit(true);
        break;
      case "priority":
        this.commonService.setPriorityAlertEditSubmit(true);
        break;
      case "message":
        this.commonService.setNotificationAlertEditSubmit(true);
        break;
      case "destination":
        this.commonService.setDestinationAlertEditSubmit(true);
        break;
      case "arrhythmia":
        this.commonService.setArrhythmiaParameterAlertEditSubmit(true);
        break;
      default:
        break;
    }
  }

  // Group Alert Settings
  getGroupAlertSettings() {
    this.loader = true;
    this.getGroupAlertDestinationSettings();
    this.getArrhythmiaAlertGoupSettings();
    this.getAlertGoupSettings();
    this.store$.dispatch(
      new AlertConfigurationStoreActions.setGroupAlertId(
        this.clinicalFacilityGroupId
      )
    );
  }

  // Group Alert Settings
  getAlertGoupSettings = () => {
    let url =
      "alert-settings/group/" + this.cfId + "/" + this.clinicalFacilityGroupId;
    this.store$.dispatch(
      new AlertConfigurationStoreActions.loadGroupAlertConfigurationRequestAction(
        { url }
      )
    );
    this.store$
      .select(AlertConfigurationStoreSelectors.getAlertConfigurationError)
      .subscribe((data) => {
        this.error = data;
      });
  };

  //Arrhythmia alert setting
  getArrhythmiaAlertGoupSettings = () => {
    let url = "arrhythmia-alert-settings/group/" + this.cfId + "/" + this.clinicalFacilityGroupId;
    this.store$.dispatch(
      new AlertConfigurationStoreActions.loadArrhythmiaAlertConfigurationRequestAction(
        { url }
      )
    );
    this.store$
      .select(AlertConfigurationStoreSelectors.getAlertConfigurationError)
      .subscribe((data) => {
        this.error = data;
      });
  };

  // root Alert Destination Settings
  getAlertDestinationSettings() {
    let url = "alert-settings/root/" + this.cfId + "/alert-destination-settings";
    this.store$.dispatch(
      new AlertConfigurationStoreActions.loadDestinationAlertConfigurationRequestAction({
        url,
      })
    );
    this.store$
      .select(AlertConfigurationStoreSelectors.getAlertConfigurationError)
      .subscribe((data) => {
        if (data) {
          this.error = data;
          this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
        }
      });
  }

  // root  Arrhythmia Alert Settings
  getArrhythmiaSettings() {
    let url = "arrhythmia-alert-settings/root/" + this.cfId;
    this.store$.dispatch(
      new AlertConfigurationStoreActions.loadArrhythmiaAlertConfigurationRequestAction({
        url,
      })
    );
    this.store$
      .select(AlertConfigurationStoreSelectors.getAlertConfigurationError)
      .subscribe((data) => {
        if (data) {
          this.error = data;
          this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
        }
      });
  }

  // group Alert Destination Settings
  getGroupAlertDestinationSettings() {
    const url =
      "alert-settings/group/" +
      this.cfId +
      "/" +
      this.clinicalFacilityGroupId +
      "/alert-destination-settings";
    this.store$.dispatch(
      new AlertConfigurationStoreActions.loadGroupDestinationAlertConfigurationRequestAction(
        { url }
      )
    );
    this.store$
      .select(AlertConfigurationStoreSelectors.getAlertConfigurationError)
      .subscribe((data) => {
        this.error = data;
      });
  }

  checkRole(allowedRoles: any, userRoles: any) {
    if (allowedRoles.some((ai: any) => userRoles.includes(ai))) {
      return true;
    } else {
      return false;
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
  onLocationSelected(event, type) {
    this.clinicalFacilityGroupId = event;
    if(this.clinicalFacilityGroupId) {
      this.editAccess = ["SC"].some((ai) => this.roles.includes(ai));
      if (type === 'CLINICAL') {
        this.locationGroupId = null;
        this.clinicalGroupId = event;
      } else {
        this.clinicalGroupId = null;
        this.locationGroupId = event;
      }
      this.getGroupAlertSettings();
    } else {
      if (["CFA", "CFAC"].some((ai) => this.roles.includes(ai))) {
        this.editAccess = true;
      }
      this.loader = true;
      this.getSettings();
    }
  }
}
