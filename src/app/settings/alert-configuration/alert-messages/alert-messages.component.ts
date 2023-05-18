import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import {
  AlertConfigurationModels,
  AlertConfigurationStoreSelectors,
  AlertConfigurationStoreState
} from "../store";
import { CommonService } from "@services/common.service";
import { BackendApiService } from "@services/backendapi.service";
import { AuthenticationService } from "@services/authentication.service";
import { SnackbarService } from "@services/snackbar.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-alert-messages",
  templateUrl: "./alert-messages.component.html",
  styleUrls: ["./alert-messages.component.scss"],
})
export class AlertMessagesComponent implements OnInit {
  @Output() reloadData = new EventEmitter<any>(true);
  private subscriptions: Subscription[] = [];
  iseditDisabled: boolean;
  alertDestinationSettings: any = {};
  alertDestinationSettingsCopy: any = {};
  alertDestinationSettings$: Observable<AlertConfigurationModels.AlertDestinationConfigData>;
  cfId: string = "";

  constructor(
    private commonService: CommonService,
    private backendApiService: BackendApiService,
    private autheticationService: AuthenticationService,
    private snackbar: SnackbarService,
    private store$: Store<AlertConfigurationStoreState.AlertConfigurationState>
  ) {}

  ngOnInit() {
    this.cfId = this.autheticationService.getCfId();
    this.iseditDisabled = true;
    this.alertDestinationSettings$ = this.store$.select(
      AlertConfigurationStoreSelectors.getDestinationAlertConfigurations
    );
    this.alertDestinationSettings$.subscribe((data) => {
      this.commonService.setSettingsAlertActionButtons(false);
      this.commonService.setParameterAlertEditSubmit(false);
      this.iseditDisabled = true;
      this.alertDestinationSettings = { ...data };
      this.alertDestinationSettingsCopy = JSON.parse(
        JSON.stringify(this.alertDestinationSettings)
      );
    });

    this.subscriptions.push(
      this.commonService.notificationAlertEditHide.subscribe((isHide) => {
        if (isHide) {
          this.iseditDisabled = true;
          this.alertDestinationSettings = JSON.parse(
            JSON.stringify(this.alertDestinationSettingsCopy)
          );
        }
      })
    );

    this.subscriptions.push(
      this.commonService.notificationAlertEditSubmit.subscribe((isSubmit) => {
        if (isSubmit) {
          this.updateAlertNotification();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe());
  }

  showActionButtons(isShow: boolean) {
    this.updated();
  }

  async updateAlertNotification() {
    try {
      const url =
        "alert-settings/root/" + this.cfId + "/alert-destination-settings";
      const resp: any = await this.backendApiService
        .post(
          environment.dataApiUrl + url,
          this.alertDestinationSettings
        )
        .toPromise();
      if (resp.status === "OK") {
        this.reloadData.emit();
        this.commonService.setSettingsAlertActionButtons(false);
        this.commonService.setNotificationAlertEditSubmit(false);
        this.iseditDisabled = true;
        this.snackbar.openCustomSnackBar("Settings has been updated successfully", 'bottom', 'center')
      }
    } catch (error) {}
  }
  updated() {
    if (JSON.stringify(this.alertDestinationSettings) !== JSON.stringify(this.alertDestinationSettingsCopy)) {
      this.commonService.setSettingsAlertActionButtons(true);
    } else {
      this.commonService.setSettingsAlertActionButtons(false);
    }
  }
}
