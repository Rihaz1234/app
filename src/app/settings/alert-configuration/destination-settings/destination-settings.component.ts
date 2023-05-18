import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {
  AlertConfigurationModels,
  AlertConfigurationStoreActions,
  AlertConfigurationStoreSelectors,
  AlertConfigurationStoreState
} from "../store";
import {Observable, Subscription} from "rxjs";
import {CommonService} from "@services/common.service";
import {BackendApiService} from "@services/backendapi.service";
import {AuthenticationService} from "@services/authentication.service";
import {SnackbarService} from "@services/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-destination-settings',
  templateUrl: './destination-settings.component.html',
  styleUrls: ['./destination-settings.component.scss']
})
export class DestinationSettingsComponent implements OnInit {

  constructor(private commonService: CommonService,
              private backendApiService: BackendApiService,
              private autheticationService: AuthenticationService,
              private snackbar: SnackbarService,
              public dialog: MatDialog,
              private store$: Store<AlertConfigurationStoreState.AlertConfigurationState>,) { }
  alertDestinationSettings$: Observable<AlertConfigurationModels.AlertDestinationConfigData>;
  alertDestinationSettings;
  alertDestinationSettingsCopy;
  cfId: string = "";
  alertGroupId: any = null;
  alertGroupId$: Observable<string>;
  private subscriptions: Subscription[] = [];
  @Output() reloadData = new EventEmitter<any>(true);
  ngOnInit(): void {
    this.cfId = this.autheticationService.getCfId();
    this.fetchContactList();
    this.alertGroupId$ = this.store$.select(
        AlertConfigurationStoreSelectors.getAlertGroupId
    );
    this.alertDestinationSettings$ = this.store$.select(
        AlertConfigurationStoreSelectors.getDestinationAlertConfigurations
    );
    this.alertDestinationSettings$.subscribe((data) => {
      this.alertDestinationSettings = { ...data };
      this.alertDestinationSettings.UserData = this.alertDestinationSettings?.UserData?.map(user => {
        return {
          ...user,
          displayName: `${user?.firstName} ${user?.lastName}`,
          userId: user.id
        }
      });
      this.alertDestinationSettingsCopy = JSON.parse(
          JSON.stringify(this.alertDestinationSettings)
      );
    });
    this.subscriptions.push(
        this.commonService.destinationAlertEditSubmit.subscribe((isSubmit) => {
          if (isSubmit) {
            this.updateDestinationAlerts();
          }
        })
    );
    this.alertGroupId$.subscribe((data) => {
      this.alertGroupId = data;
    });
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
  async updateDestinationAlerts() {
    try {
      let resp;
      if(this.alertGroupId) {
        if(this.alertDestinationSettings.GroupId === 'ROOT') {
          this.alertDestinationSettings.AlertDestId = '';
        }
        this.alertDestinationSettings = {
          ...this.alertDestinationSettings,
          GroupId: this.alertGroupId,
          FacilityId: this.cfId
        };
        const url = "alert-settings/group-edit/alert-destination-settings";
         resp = await this.backendApiService
            .post(
                environment.dataApiUrl + url,
                this.alertDestinationSettings
            )
            .toPromise();
      } else {
        const url =
            "alert-settings/root/" + this.cfId + "/alert-destination-settings";
         resp = await this.backendApiService
            .post(
                environment.dataApiUrl + url,
                this.alertDestinationSettings
            )
            .toPromise();
      }
      if (resp.status === "OK") {
        this.reloadData.emit();
        this.snackbar.openCustomSnackBar("Settings has been updated successfully", 'bottom', 'center')
        this.commonService.setSettingsAlertActionButtons(false);
        this.commonService.setDestinationAlertEditSubmit(false);
      }
    } catch (error) {}
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
        .subscribe((data) => {});
  }
  ngOnDestroy() {
    this.reloadData.emit();
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
  }

}
