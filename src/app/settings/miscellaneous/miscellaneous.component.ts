import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  MiscellaneousData, spo2ConfigData, spo2Data,
} from "../../interfaces/misc-settings.interface";
import { Store } from "@ngrx/store";
import {
  MiscellaneousSettingsStoreSelectors,
  MiscellaneousSettingsStoreState,
  MiscellaneousSettingsStoreActions,
} from "./store";
import { Observable } from "rxjs";
import { MiscellaneousSettingsService } from "./services/miscellaneous-settings.service";
import { AuthenticationService } from "@services/authentication.service";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SnackbarService } from "@services/snackbar.service";

@Component({
  selector: "app-miscellaneous",
  templateUrl: "./miscellaneous.component.html",
  styleUrls: ["./miscellaneous.component.scss"],
})
export class MiscellaneousComponent implements OnInit, OnDestroy {
  selectedTab = "spo2";
  headerColumnsBiosensor = [
    "",
    "additional_devices.relay_password",
    "additional_devices.hospital_ssid",
    "additional_devices.hospital_password",
  ];
  settings = [{
    option: 'Enable',
    value: true
  },
    {
      option: 'Disable',
      value: false
    }
  ];
  ecgSettings = ["244", "976"];
  miscellaneousSettings: MiscellaneousData;
  spo2Settings: spo2Data;
  miscellaneousCopy: MiscellaneousData;
  spo2SettingsCopy:spo2Data
  editOnTime = false;
  editOffTime = false;
  editInterval = false;
  editSsid1 = false;
  editSsid2 = false;
  editPass1 = false;
  editPass2 = false;
  regex = /[^*/ ]/gi;
  error: string;
  miscellaneousSettings$: Observable<MiscellaneousData>;
  spo2Settings$: Observable<spo2ConfigData>;
  miscellaneousSettingsStatus$: Observable<string>;
  miscellaneousSettingsMessage$: Observable<string>;
  role: string;
  editFacilityName = false;
  fileName = "";
  groups;
  clinicalGroups = [];
  locationGroups = [];
  groupId = "";
  clinicalGroupId;
  locationGroupId;
  cfId: string;
  signedUrl = "";
  facilityName;
  submitted = false;
  invalidon = false;
  invalidoff = false;
  invalidInterval = false;
  roles: string[];
  invalidFormat = false;
  loader = true;
  settingSubscription: any;
  spo2Subscription: any;
  errorSubscription: any;
  loaderSubscription: any;
  valuesUpdated = false;
  editAccessCFA = false;
  editAccessSC = false;
  imgUrl;
  patientBarCode;
  minOnOFF = 1;
  maxOnOff = 7200;
  minOn = 3;
  maxOn = 1440;
  minOff = 2;
  maxOff = 27;
  invalid_msg;
  pasteData;
  patientIdentification = ["MRN", "PID"];
  emrList: Array<string> = [];
  groupsView;
  facility;
  constructor(
    private store$: Store<MiscellaneousSettingsStoreState.MiscellaneousSettingsState>,
    private snackbar: SnackbarService,
    private miscellaneousService: MiscellaneousSettingsService,
    private autheticationService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.miscellaneousService.getEmrList().subscribe((response: any) => {
      if (response.data.length > 0) {
        this.emrList = response.data;
      }
    });
    this.cfId = this.autheticationService.getCfId();
    this.roles = this.autheticationService.getRoles() || [];
    if (this.roles.indexOf("CFA") > -1 || this.roles.indexOf("CFAC") > -1) {
      this.role = "CFA";
      this.editAccessCFA = true;
    } else if (this.roles.indexOf("SC") > -1) {
      this.role = "SC";
      this.editAccessSC = true;
    } else {
      this.role = this.roles[0];
    }
    this.facility = sessionStorage.getItem("facilityName") || '';
    if(["SC", "GC", "PHY"].some((ai) => this.roles.includes(ai))) {
      this.groupsView = true;
    } if (this.groupsView) {
      this.miscellaneousService.getGroups(this.cfId).subscribe((response) => {
        if (response.status === "OK") {
          this.groups = response.data;
          this.clinicalGroups = this.groups.filter(g => g.type === "CLINICAL");
          this.locationGroups = this.groups.filter(g => g.type === "PHYSICAL");
          if (this.roles.indexOf('CFAC') > -1) {
            this.clinicalGroups.unshift({groupId: null, name: 'None'});
            this.locationGroups.unshift({groupId: null, name: 'None'});
          } else {
            if (this.locationGroups.length > 0) {
              let parentGroups = this.locationGroups.filter(grp => grp.parent === 'ROOT');
              this.locationGroups.forEach(group => {
                if (group.parent !== 'ROOT' && !(this.locationGroups.find(grp => grp.groupId === group.parent))) {
                  parentGroups.push(group);
                }
              });
              this.groupId = parentGroups[0].groupId;
              this.locationGroupId = parentGroups[0].groupId;
            } else if (this.clinicalGroups.length > 0) {
              let parentGroups = this.clinicalGroups.filter(grp => grp.parent === 'ROOT');
              this.locationGroups.forEach(group => {
                if (group.parent !== 'ROOT' && !(this.clinicalGroups.find(grp => grp.groupId === group.parent))) {
                  parentGroups.push(group);
                }
              });
              this.groupId = parentGroups[0].groupId;
              this.clinicalGroupId = parentGroups[0].groupId;
            } else {
              // this.openSnackBar("no_groups");
              this.loader = false;
            }
          }
          if(this.groupId) {
            this.getMiscSettings();
            this.getSpo2Settings();
          }
        }
      });
    }
    if (this.role === "CFA") {
      this.getMiscSettings();
      this.getSpo2Settings();
    }
    this.miscellaneousSettings$ = this.store$.select(
      MiscellaneousSettingsStoreSelectors.getMiscellaneousSettings
    );
    this.spo2Settings$ = this.store$.select(
      MiscellaneousSettingsStoreSelectors.getSpo2Settings
    );
    this.miscellaneousSettingsMessage$ = this.store$.select(
      MiscellaneousSettingsStoreSelectors.getMiscellaneousMessage
    );
    this.spo2Subscription = this.spo2Settings$.subscribe((data) => {
      this.spo2Settings = { ...data.data };
      this.spo2SettingsCopy = JSON.parse(
        JSON.stringify(this.spo2Settings)
      );

    });
    this.settingSubscription = this.miscellaneousSettings$.subscribe((data) => {
      this.miscellaneousSettings = { ...data };
      this.miscellaneousCopy = JSON.parse(
        JSON.stringify(this.miscellaneousSettings)
      );


      let signedUrl = this.miscellaneousSettings?.otherSettings?.facilityLogo;
      //let facilityName = this.miscellaneousSettings?.otherSettings?.facilityName;
      sessionStorage.setItem("facility-logo", signedUrl);
      //sessionStorage.setItem("facilityName", facilityName);
      this.autheticationService.getCustomizationLogo(true);
      this.imgUrl = signedUrl;
      this.facilityName =
        this.miscellaneousSettings?.otherSettings?.facilityName;
      this.closeEdit();
      if (!this.loader) {
        this.miscellaneousSettingsMessage$.subscribe((message) => {
          if (!this.isBlank(message)) {
            this.snackbar.openCustomSnackBar("additional_devices.messages."+ message, 'bottom', 'center', true);
          }
        });
      }
      this.submitted = false;
      this.closeEdit();
    });
    this.errorSubscription = this.store$
      .select(MiscellaneousSettingsStoreSelectors.getMiscellaneousError)
      .subscribe((data) => {
        this.error = data;
        if (!this.isBlank(this.error)) {
          this.snackbar.openCustomSnackBar("additional_devices.messages.OPERATION_FAILED", 'bottom', 'center', true);
        }
      });
    this.loaderSubscription = this.store$
      .select(MiscellaneousSettingsStoreSelectors.getLoaderStatus)
      .subscribe((loaded) => {
        if (loaded) {
          this.loader = false;
        }
      });
  }
  getMiscSettings() {
    let url = "";
    if (!this.groupId) {
      url = "clinical-facilities/" + this.cfId + "/misc-settings";
    } else {
      url =
        "clinical-facilities/" +
        this.cfId +
        "/groups/" +
        this.groupId +
        "/misc-settings";
    }
    console.log(url);
    this.store$.dispatch(
      new MiscellaneousSettingsStoreActions.loadMiscellaneousSettingsRequestAction(
        { url }
      )
    );
  }
  getSpo2Settings() {
    let url = "";
    if (!this.groupId) {
      url = "spo2-config/root/" + this.cfId ;
    } else {
      url =
        "spo2-config/group/" +
        this.cfId +
        "/" +
        this.groupId ;
    }
    this.store$.dispatch(
      new MiscellaneousSettingsStoreActions.loadSpo2SettingsRequestAction(
        { url }
      )
    );
  }
  getMiscSettingsGrp(event, type) {
    this.groupId = event;
    if(this.groupId) {
      this.editAccessCFA = false;
      this.editAccessSC = ["SC"].some((ai) => this.roles.includes(ai));
      if (type === 'CLINICAL') {
        this.locationGroupId = null;
        this.clinicalGroupId = event;
      } else {
        this.clinicalGroupId = null;
        this.locationGroupId = event;
      }
      this.closeEdit();
      this.loader = true;
      let url =
          "clinical-facilities/" +
          this.cfId +
          "/groups/" +
          this.groupId +
          "/misc-settings";
      console.log(url);
      this.store$.dispatch(
          new MiscellaneousSettingsStoreActions.loadMiscellaneousSettingsRequestAction(
              {url}
          )
      );
    } else {
      this.editAccessCFA = true;
      this.loader = true;
      this.getMiscSettings()
    }
    this.getSpo2Settings();
  }
  selectTab(value) {
    this.selectedTab = value;
  }
  async updateSettings() {
    this.invalidFormat = false;
    this.fileName = "";
    if (this.miscellaneousSettings?.bioSensorConfigSettings) {
      this.submitted = true;
      if (!(this.miscellaneousSettings?.bioSensorConfigSettings[0]?.relayPassword.trim() &&
        this.miscellaneousSettings?.bioSensorConfigSettings[0]?.hospitalSSID.trim() &&
        this.miscellaneousSettings?.bioSensorConfigSettings[0]?.hospitalPassword.trim())) {
        return false;
      }
    }
    this.loader = true;
    this.miscellaneousSettings.otherSettings.facilityName = this.facilityName;
    // this.store$.dispatch(
    //   new MiscellaneousSettingsStoreActions.updateMiscellaneousSettingsRequestAction(
    //     { data: this.miscellaneousSettings }
    //   )
    // );
    // this.miscellaneousSettings.thirdPartyDeviceSettings.map(setting => {
    //   if(setting.type === 'SPO2') {
    //     setting.dutyCycle = Math.round((setting.onTime/(setting.onTime + setting.offTime))*100)
    //   }
    // });
    this.miscellaneousService.updateSettings(this.miscellaneousSettings)
      .subscribe(res => {
        if (res.status === "OK") {
          this.snackbar.openCustomSnackBar("additional_devices.messages." + res.message, 'bottom', 'center', true);
          this.getMiscSettings();
        }
      });
    if (JSON.stringify(this.spo2Settings) !== JSON.stringify(this.spo2SettingsCopy)) {
      let url = !this.groupId ? "spo2-config/root-edit" : "spo2-config/group-edit"
      if(this.groupId) {
        this.spo2Settings.GroupId = this.groupId;
      }
      this.miscellaneousService.updateSpo2Settings(this.spo2Settings, url)
        .subscribe(res => {
          if (res.message === "ALERT_SETTINGS_UPDATED") {
            this.snackbar.openCustomSnackBar("additional_devices.messages.spo2Config_settings_updated", 'bottom', 'center', true);
            this.getSpo2Settings();
          }
        });
    }
  }
  factoryReset() {
    let url = "";
    let spo2Url =""
    this.fileName = "";
    this.submitted = false;
    this.invalidFormat = false;
    this.invalidon = false;
    this.invalidoff = false;
    this.invalidInterval = false;
    if (!this.groupId) {
      url = "clinical-facilities/" + this.cfId + "/misc-settings/factory-reset";
      spo2Url = "spo2-config/factory-reset/" + this.cfId + "/"+this.spo2Settings?.Spo2ConfigId;
    } else {
      url =
        "clinical-facilities/" +
        this.cfId +
        "/groups/" +
        this.groupId +
        "/misc-settings/factory-reset";
        spo2Url = "spo2-config/group-reset/" + this.cfId + "/"+this.spo2Settings?.GroupId;
    }
    this.loader = true;
    this.store$.dispatch(
      new MiscellaneousSettingsStoreActions.resetMiscellaneousSettingsRequestAction(
        { url }
      )
    );

    this.miscellaneousService.resetSpo2Settings(spo2Url)
        .subscribe(res => {
          if(res.status === "OK") {
            this.getSpo2Settings();
          }
        })
  }
  showEditOnTime() {
    this.editOnTime= true;
  }
  hideEditOnTime() {
    this.editOnTime = false;
  }
  showEditOffTime() {
    this.editOffTime = true;
  }
  hideEditOffTime() {
    this.editOffTime = false;
  }
  toggleInterval() {
    this.editInterval = !this.editInterval;
  }
  cancel() {
    this.fileName = "";
    this.submitted = false;
    this.closeEdit();
    this.invalidFormat = false;
    this.invalidon = false;
    this.invalidoff = false;
    this.miscellaneousSettings = JSON.parse(
      JSON.stringify(this.miscellaneousCopy)
    );
    this.spo2Settings = JSON.parse(
      JSON.stringify(this.spo2SettingsCopy)
    );
    this.imgUrl = this.miscellaneousSettings?.otherSettings?.facilityLogo;
    this.facilityName = this.miscellaneousSettings?.otherSettings?.facilityName;
    this.snackbar.openCustomSnackBar("additional_devices.messages.updated_cancelled", 'bottom', 'center', true);
  }
  reload(event) {
    event.target.value = null;
  }
  closeEdit() {
    this.editOnTime = false;
    this.editOffTime = false;
    this.editInterval = false;
    this.editSsid1 = false;
    this.editSsid2 = false;
    this.editPass1 = false;
    this.editPass2 = false;
    this.valuesUpdated = false;
    this.editFacilityName = false;
    this.invalidFormat = false;
  }
  async upload(fileInput) {
    this.invalidFormat = false;
    let reader = new FileReader();
    if (fileInput?.target?.files && fileInput?.target?.files[0]) {
      let file = fileInput.target.files[0];
      reader.readAsDataURL(file);
      const pattern = /image-*/;
      if (!file.type.match(pattern)) {
        this.fileName = file.name;
        this.invalidFormat = true;
        this.invalid_msg = "invalid_format";
        this.valuesUpdated = true;
        return;
      }
      if (file.size > 2097152) {
        this.invalidFormat = true;
        this.invalid_msg = "invalid_size";
        return;
      }
      let img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        if (img.width < 48 || img.height < 48) {
          this.invalidFormat = true;
          this.invalid_msg = "invalid_minsize";
          return;
        }
        if (img.height > img.width) {
          this.invalidFormat = true;
          this.invalid_msg = "invalid_orientation";
          return;
        }
        if (img.width > 800 || img.height > 512) {
          this.invalidFormat = true;
          this.invalid_msg = "invalid_maxsize";
          return;
        }
        this.valuesUpdated = true;
        this.fileName = file.name;
        reader.onload = () => {
          this.imgUrl = reader.result;
        };
        reader.readAsDataURL(file);
        let body = {
          filename: this.cfId + "/" + this.fileName,
        };
        await this.miscellaneousService
          .getSignedUrl(body)
          .subscribe((response) => {
            console.log("signedUrl", response);
            this.signedUrl = response.data;
            this.miscellaneousService
              .uploadImage(this.signedUrl, file)
              .subscribe((res) => {
                console.log(res);
                let url = new URL(this.signedUrl);
                const url_new = url.origin + url.pathname;
                console.log(url_new);
                this.miscellaneousSettings.otherSettings.facilityLogo = url_new;
              });
          });
      }
    } else {
      this.fileName = "Select File";
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
  onTimeValid(value: any) {
    this.invalidon = value < this.minOn || value > this.maxOn;
    return (value >= this.minOn && value <= this.maxOn);
  }
  offTimeValid(value: any) {
    this.maxOff = 9 * this.spo2Settings.Setting.OnTime ;
    this.invalidoff = value < this.minOff || value > this.maxOff;
    return (value >= this.minOff && value <= this.maxOff);
  }
  invalidInt(value) {
    this.invalidInterval = value < this.minOnOFF || value > this.maxOnOff;
    return (value >= this.minOnOFF && value <= this.maxOnOff);
  }
  invalidonoff() {
    return (
        ((!this.onTimeValid(this.spo2Settings?.Setting?.OnTime) || !this.offTimeValid(this.spo2Settings?.Setting?.OffTime)) && this.spo2Settings.Setting.Mode=='Periodic')
        || !this.invalidInt(this.miscellaneousSettings?.thirdPartyDeviceSettings[1].interval) || this.invalidFacilityName());
  }
  invalidFacilityName() {
    let regex = /^[a-zA-Z]{1}[a-zA-Z ]*$/;
    return !regex.test(this.facilityName) && this.facilityName?.toString();
  }
  ngOnDestroy() {
    this.settingSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.loaderSubscription.unsubscribe();
  }
  disableEdit(event, tab, type) {
    console.log(event);
    this.valuesUpdated = JSON.stringify(this.miscellaneousSettings) !== JSON.stringify(this.miscellaneousCopy) || JSON.stringify(this.spo2Settings) !== JSON.stringify(this.spo2SettingsCopy);
    if(!event.checked) {
      if(tab === 'spo2') {
        if(type === 'SPO2') {
          this.editOnTime = false;
          this.editOffTime = false;
        } else {
          this.editInterval = false;
        }
      } else if (tab === "biosensor") {
        this.editSsid1 = false;
        this.editSsid2 = false;
        this.editPass1 = false;
        this.editPass2 = false;
      }
    }
  }
  updated(spo2ValueChange?: boolean) {
    if(spo2ValueChange) {
      if( this.spo2Settings.Setting.Mode =="Continuous"){
        this.spo2Settings.Setting.DutyCycle =100;
        this.spo2Settings.Setting.OnTime = this.minOn;
        this.spo2Settings.Setting.OffTime =0;
        this.editOnTime = false;
        this.editOffTime = false;
       }else{
        this.spo2Settings.Setting.OnTime = this.minOn;
        this.spo2Settings.Setting.OffTime = this.minOff;
       }
    }
    if(this.spo2Settings.Setting.Mode =="Periodic") {
      this.spo2Settings.Setting.DutyCycle =Math.round(( this.spo2Settings.Setting.OnTime/( this.spo2Settings.Setting.OnTime +  this.spo2Settings.Setting.OffTime))*100);
    }
    this.valuesUpdated = JSON.stringify(this.miscellaneousSettings) !== JSON.stringify(this.miscellaneousCopy) || JSON.stringify(this.spo2Settings) !== JSON.stringify(this.spo2SettingsCopy);
    if(this.facilityName !== this.miscellaneousCopy.otherSettings.facilityName) {
      this.valuesUpdated = true;
    }
  }
  confirmReset() {
    const SaveChanges = this.dialog.open(ConfirmDialogComponent, {
      width: "500px",
      //height: "250px",
      data: {
        body: {
          title: "shared.confirm_text",
          text: "additional_devices.confirm_reset",
        },
      },
      
      disableClose: true,
    });
    SaveChanges.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        this.factoryReset();
      }
    });
  }
  delete() {
    const SaveChanges = this.dialog.open(ConfirmDialogComponent, {
      width: "500px",
      //height: "250px",
      data: {
        body: {
          title: "shared.confirm_text",
          text: "additional_devices.confirm_delete_logo",
        },
      },

      disableClose: true,
    });
    SaveChanges.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        this.imgUrl = "";
        this.miscellaneousSettings.otherSettings.facilityLogo = "";
        this.invalidFormat = false;
        this.updated();
        this.fileName = null;
      }
    });
  }
  charsOnly(event: KeyboardEvent) {
    let charsOnlyPattern = /^[a-zA-Z ]$/;
    let key = event.key;
    if (charsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let key = clipboardData.getData('text');
    let charsOnlyPattern = /^[a-zA-Z_ ]+$/;
    if (charsOnlyPattern.test(key)) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
  }

  numericsOnly(event: KeyboardEvent) {
    let numericsOnlyPattern = /^[0-9]$/;
    let key = event.key;
    if (numericsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  checkForSpecialCharacters(event: ClipboardEvent){
    let clipboardData = event.clipboardData;
    let key = clipboardData.getData('text');
    let charsOnlyPattern = /^[0-9]+$/;
    if (charsOnlyPattern.test(key)) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
  }

}
