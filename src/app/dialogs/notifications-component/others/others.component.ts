import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AuthenticationService} from "@services/authentication.service";
import { MiscellaneousData } from '../store/alert-configuration.models';
import { AlertConfigurationModels,AlertConfigurationStoreActions,
  AlertConfigurationStoreSelectors, AlertConfigurationStoreState } from '../store';
import { MatDialog } from '@angular/material/dialog';
import { AlertConfigurationsService } from '../services/alert-configuration.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from '@services/snackbar.service';
@Component({
  selector: "app-others",
  templateUrl: "./others.component.html",
  styleUrls: ["./others.component.scss"],
})
export class OthersComponent implements OnInit {
  @Input() patientData: any;
  selectedTab = "parameter";
  headerColumnsSpo2 = [
    "additional_devices.settings",
    "additional_devices.default_devices",
    "additional_devices.on_time",
    "",
    "additional_devices.off_time",
    "additional_devices.duty_cycle",
  ];
  miscellaneousSettings: MiscellaneousData;
  miscellaneousCopy: MiscellaneousData;
  editOnTime = [false];
  editOffTime = [false];
  regex = /[^*/ ]/gi;
  error: string;
  role: string;
  cfId: string;
  patientId: string = 'PATALDRT1';
  editAccessCFA = false;
  editAccessGC = false;
  roles: string[];
  signedUrl = "";
  loader = true;
  invalidon = [false];
  invalidoff = [false];
  settingSubscription: any;
  errorSubscription: any;
  loaderSubscription: any;
  submitted = false;
  valuesUpdated = false;
  miscellaneousSettings$: Observable<AlertConfigurationModels.MiscellaneousData>;
  miscellaneousSettingsStatus$: Observable<string>;
  miscellaneousSettingsMessage$: Observable<string>;
  lastUpdated;
  minOnOFF = 1;
  maxOnOff = 7200;
  editAccess = false;
  constructor(
    private store$: Store<AlertConfigurationStoreState.patientAlertConfigurationState>,
    private snackbar: SnackbarService,
    private alertService: AlertConfigurationsService,
    private autheticationService: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  
    
    this.roles = this.autheticationService.getRoles() || [];
    this.patientId = this.patientData.patientId;
    if(this.roles.indexOf("GC") > -1|| this.roles.indexOf("PHY") > -1) {
      this.editAccess = true;
    }
    this.getMiscSettings();
    this.miscellaneousSettings$ = this.store$.select(
      AlertConfigurationStoreSelectors.getMiscellaneousSettings
    );
    this.miscellaneousSettingsMessage$ = this.store$.select(
      AlertConfigurationStoreSelectors.getMiscellaneousMessage
    );
    
    
    this.settingSubscription = this.miscellaneousSettings$.subscribe((data) => {
      //this.loader = false;
      console.log(data);
      this.lastUpdated = data?.modifiedDateTime;
      this.miscellaneousSettings = { ...data };
      if(this.miscellaneousSettings?.groupId) {
        this.miscellaneousSettings.miscSettingsId = "";
      }
      this.miscellaneousSettings.groupId = "";
      this.miscellaneousSettings.alertId = "";
      this.miscellaneousSettings.patientId = this.patientId;
      this.miscellaneousSettings.facilityId = this.cfId;
      this.miscellaneousCopy = JSON.parse(
        JSON.stringify(this.miscellaneousSettings)
      );
    });
    
    this.errorSubscription = this.store$
      .select(AlertConfigurationStoreSelectors.getMiscellaneousError)
      .subscribe((data) => {
        this.error = data;
        if (!this.isBlank(this.error)) {
          this.snackbar.openCustomSnackBar("additional_devices.messages.OPERATION_FAILED", 'bottom', 'center', true);
        }
      });
    this.loaderSubscription = this.store$
      .select(AlertConfigurationStoreSelectors.getLoaderStatus)
      .subscribe((loaded) => {
        if (loaded) {
          this.loader = false;
        }
      });
  }
  showEditOnTime(index) {
    this.editOnTime[index] = true;
  }
  hideEditOnTime(index) {
    this.editOnTime[index] = false;
  }
  showEditOffTime(index) {
    this.editOffTime[index] = true;
  }
  hideEditOffTime(index) {
    this.editOffTime[index] = false;
  }

  getMiscSettings() {
  
    this.loader = true;
    let url = `patients/${this.patientId}/misc-settings`;
    this.store$.dispatch(new AlertConfigurationStoreActions.loadMiscellaneousSettingsRequestAction({ url }));
    this.store$.select(AlertConfigurationStoreSelectors.getMiscellaneousError).subscribe(data => {
      this.error = data;
      console.log(url);
    });
  } 
  cancel() {
    
    this.submitted = false;
    this.closeEdit();
    this.invalidon = [false];
    this.invalidoff = [false];
    
    this.miscellaneousSettings = JSON.parse(
      JSON.stringify(this.miscellaneousCopy)
    );
    this.snackbar.openCustomSnackBar("additional_devices.messages.updated_cancelled", 'bottom', 'center', true);
    this.valuesUpdated = false;
  }
  reload(event) {
    event.target.value = null;
  }
  selectTab(value) {
    this.selectedTab = value;
  }
  updated() {
    this.valuesUpdated = JSON.stringify(this.miscellaneousSettings) !== JSON.stringify(this.miscellaneousCopy);
  }
  factoryReset() {
    let url = "";
    this.submitted = false;
    this.invalidon = [false];
    this.invalidoff = [false];
    
    url = `patients/${this.patientId}/misc-settings/factory-reset`;
    this.alertService.resetSettings(url)
      .subscribe((response: any) => {
        console.log(response);
        if (response.status === 'OK') {
          this.miscellaneousSettings = response.data;
          this.miscellaneousCopy = JSON.parse(
            JSON.stringify(this.miscellaneousSettings)
          );
          this.snackbar.openCustomSnackBar("additional_devices.messages.MISC_SETTINGS_RESET_SUCCESS", 'bottom', 'center', true);
          this.getMiscSettings;
        }
      })

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
  onTimeValid(value: any, index) {
    this.invalidon[index] = value < this.minOnOFF || value > this.maxOnOff;
    return (value >= this.minOnOFF && value <= this.maxOnOff);
  }
  offTimeValid(value: any, index) {
    this.invalidoff[index] = value < this.minOnOFF || value > this.maxOnOff;
    return (value >= this.minOnOFF && value <= this.maxOnOff);
  }
  invalidonoff() {
    return (
      this.invalidon.indexOf(true) > -1 || this.invalidoff.indexOf(true) > -1
    );
  }
  ngOnDestroy() {
    this.settingSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.loaderSubscription.unsubscribe();
  }
  closeEdit() {
    this.editOnTime = [false];
    this.editOffTime = [false];
  }

  async updateSettings() {
    this.submitted = true;
    this.closeEdit();
    this.miscellaneousSettings.groupId = "";
    this.miscellaneousSettings.alertId = "";
    this.miscellaneousSettings.patientId = this.patientId;
    this.miscellaneousSettings.facilityId = this.cfId;
    this.alertService.updateSettings(this.miscellaneousSettings)
      .subscribe((response: any) => {
        if (response.status === 'OK') {
          this.miscellaneousSettings = response.data;
          this.miscellaneousCopy = JSON.parse(
            JSON.stringify(this.miscellaneousSettings)
          );
          this.snackbar.openCustomSnackBar("additional_devices.messages.MISC_SETTINGS_UPDATED", 'bottom', 'center', true);
          this.valuesUpdated = false;
          this.getMiscSettings();
        }
      });
  }
  confirmReset() {
    const SaveChanges = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "95vw",
      maxHeight: "95vh",
      data: {
        body: {
          title: "shared.confirm_text",
          text: "additional_devices.confirm_reset",
        },
      },
      panelClass: "custom-modalbox",
      disableClose: true,
    });
    SaveChanges.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        this.factoryReset();
      }
    });
  }
  disableEdit(event, index) {
    console.log(event);
    this.valuesUpdated = JSON.stringify(this.miscellaneousSettings) !== JSON.stringify(this.miscellaneousCopy);
    if(!event.checked) {
        this.editOnTime[index] = false;
        this.editOffTime[index] = false;
    }
  }
}



