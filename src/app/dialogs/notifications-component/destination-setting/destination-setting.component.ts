import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {AlertConfigurationModels} from "../../../settings/alert-configuration/store";
import {CommonService} from "@services/common.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "@services/snackbar.service";
import {BackendApiService} from "@services/backendapi.service";
import {AuthenticationService} from "@services/authentication.service";
import {Store} from "@ngrx/store";
import {AlertConfigurationStoreActions, AlertConfigurationStoreSelectors, AlertConfigurationStoreState} from "../store";
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-destination-setting',
  templateUrl: './destination-setting.component.html',
  styleUrls: ['./destination-setting.component.scss']
})
export class DestinationSettingComponent implements OnInit {

  constructor(
      private commonService: CommonService,
      private router: Router,
      public dialog: MatDialog,
      private snackbar: SnackbarService,
      private backendApiService: BackendApiService,
      private autheticationService: AuthenticationService,
      private store$: Store<AlertConfigurationStoreState.patientAlertConfigurationState>,
  ) { }
  alertDestinationSettings$: Observable<AlertConfigurationModels.AlertDestinationConfigData>;
  alertDestinationSettings;
  alertDestinationSettingsCopy;
  cfId: string = "";
  alertGroupId: any = null;
  alertGroupId$: Observable<string>;
  private subscriptions: Subscription[] = [];
  @Output() reloadData = new EventEmitter<any>(true);
  @Input() patientData: any;
  roles: string[];
  patientId;
  alertSettings: any = {};
  alertSettingsStatus$: Observable<string>;
  alertSettingsMessage$: Observable<string>;
  loaderSubscription;
  loader = true;
  isPHYGCUser: boolean = false;
  showActionButtons: boolean = false;
  isShowResetButton: boolean = false;
  alertId;
  error;
  loading: boolean = false;
  ngOnInit(): void {
    this.cfId = this.autheticationService.getCfId();
    this.roles = this.autheticationService.getRoles();
    this.patientId = this.patientData.patientId;
    this.fetchContactList();
    this.alertDestinationSettings$ = this.store$.select(
        AlertConfigurationStoreSelectors.getDestinationAlertConfigurations
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

    this.getAlertDestinationSettings();

    if (["PHY", "GC"].some((ai) => this.roles.includes(ai))) {
      this.isPHYGCUser = true;
      // this.isShowResetButton = false;
    }
    if (["PHY", "SC"].some((ai) => this.roles.includes(ai))) {
      // this.isPHYGCUser = true;
      this.isShowResetButton = false;
    }
    this.alertDestinationSettings$ = this.store$.select(
        AlertConfigurationStoreSelectors.getDestinationAlertConfigurations
    );
    this.alertDestinationSettings$.subscribe((data) => {
      console.log(data);
      this.alertDestinationSettings = { ...data };
      this.alertDestinationSettings.UserData = this.alertDestinationSettings?.UserData?.map(user => {
        return {
          ...user,
          displayName: `${user?.firstName} ${user?.lastName}`,
          userId: user.id
        }
      });
      if(this.alertDestinationSettings.PatientId !== this.patientId) {
        this.alertDestinationSettings.AlertDestId = '';
      }
      this.alertDestinationSettings.PatientId = this.patientId;
      this.alertDestinationSettings.FacilityId = this.cfId;
      this.alertDestinationSettings.GroupId = "";
      //this.alertDestinationSettings.AlertDestId = "";
      this.alertDestinationSettingsCopy = JSON.parse(
          JSON.stringify(this.alertDestinationSettings)
      );
      this.isShowResetButton = this.alertDestinationSettings?.IsForPatient;
    });
    this.subscriptions.push(
        this.commonService.destinationAlertEditSubmit.subscribe((isSubmit) => {
          if (isSubmit) {
            this.handleAlertSettingsSave();
          }
        })
    );
    this.commonService.settingsAlertActionButtonsShow.subscribe((isShow) => {
      if (this.showActionButtons !== isShow) {
        this.showActionButtons = isShow;
      }
    });
  }

  async handleFactoryReset() {
    const patientId = encodeURIComponent(this.patientId);
    const url = `alert-settings/patient-reset/alert-destination-settings/${this.cfId}/${patientId}`;
    try {
      const resp: any = await this.backendApiService
        .post(environment.dataApiUrl + url, {})
        .toPromise();
      if (resp.status === "OK") {
        this.snackbar.openCustomSnackBar("alert_config_module.reset_success", 'bottom', 'center', true);
        this.getAlertDestinationSettings();
      }
    } 
    catch (error) {
      this.snackbar.openCustomSnackBar("alert_config_module.reset_error", 'bottom', 'center', true);
      console.log(this.error)
    }
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

  fetchContactList() {
    let url = "clinical-facilities/contacts?page=1&size=1000";
    this.store$.dispatch(
        new AlertConfigurationStoreActions.loadClinicalFacilityContactsRequestAction(
            { url }
        )
    );
    this.store$
        .select(AlertConfigurationStoreSelectors.getAlertConfigurationError)
        .subscribe((data: any) => {
          if (data?.error?.errorMessage === 'ACCESS_DENIED') {
            this.snackbar.openCustomSnackBar("alert_config_module.messages.access_denied", 'bottom', 'center', true);
          }
        });
  }
  getAlertDestinationSettings() {
    this.loading = true;
    let patientId = encodeURIComponent(this.patientId);
    const url =
        `alert-settings/patient/${this.cfId}/${patientId}/alert-destination-settings`;
    this.store$.dispatch(
        new AlertConfigurationStoreActions.loadDestinationAlertConfigurationRequestAction(
            { url }
        )
    );
    this.store$
        .select(AlertConfigurationStoreSelectors.getAlertConfigurationError)
        .subscribe((data) => {
          this.error = data;
        });
  }

  // Handle Alert Settings Edit Cancel Button
  async handleAlertSettingsSave() {
    try {
      const url = `alert-settings/patient-edit/alert-destination-settings`;
      const resp: any = await this.backendApiService
          .post(
              environment.dataApiUrl + url,
              this.alertDestinationSettings
          )
          .toPromise();
      if (resp.status === "OK") {
        this.snackbar.openCustomSnackBar("Settings has been updated successfully", 'bottom', 'center');
        this.getAlertDestinationSettings();
        this.commonService.setSettingsAlertActionButtons(false);
        this.commonService.setDestinationAlertEditSubmit(false);
      }
    } catch (error) { }
  }
  valueUpdated(event, type) {
    if(type=== 'clinical') {
      this.alertDestinationSettings.Setting = JSON.parse(event);
    } else {
      this.alertDestinationSettings.SettingTech = JSON.parse(event);
    }
    if (JSON.stringify(this.alertDestinationSettings) !== JSON.stringify(this.alertDestinationSettingsCopy)) {
      this.commonService.setSettingsAlertActionButtons(true);
    } else {
      this.commonService.setSettingsAlertActionButtons(false);
    }
  }

  // Handle Alert Settings Edit Cancel Button
  handleAlertSettingsEditCancel() {
    this.commonService.setSettingsAlertActionButtons(false);
    this.commonService.setDestinationAlertEditHide(true);
  }
  // root Alert Destination Settings
  ngOnDestroy() {
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
  }

}
