import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from "moment";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { Patch } from "../models/active-patients.model";
import { UserPreferenceService } from "@services/user-preference.service";
import { environment } from "src/environments/environment";

export interface PatchesData {
  heading? : string,
  readOnly?: boolean,
  activePatch: string,
  patchIds: Patch[]
}

@Component({
  selector: "app-patient-more-info",
  templateUrl: "./patient-more-info-dialog.component.html",
  styleUrls: ["./patient-more-info-dialog.component.scss"],
})
export class PatientMoreInfoDialogComponent implements OnInit {
  isShow : boolean = false;
  readOnly : boolean = false;
  heading : string ="";
  patchIdData : Patch[] = new Array();
  newBiosensorId: string;
  timeZone: string;
  readonly timeFmt: string = environment.customization.timeFormat;
  currentPatches;
  constructor(@Inject(MAT_DIALOG_DATA) public data: PatchesData,
  private dialog: MatDialog,
  private userPreference: UserPreferenceService,
  private ref: MatDialogRef<PatientMoreInfoDialogComponent>) {
    this.timeZone = this.userPreference.getUserTimeZone();
    this.patchIdData = [...data.patchIds || []];
    this.currentPatches = [...this.patchIdData];
    this.readOnly = data.readOnly;
    this.heading = data.heading;
  }

  ngOnInit(): void {
    this.getPatchIdData();
  }

  toggleStatus(){
    this.isShow = !this.isShow;
  }
  addNew() {
    this.newBiosensorId = "";
    this.bioString = "";
    this.isShow = !this.isShow;
  }

  checkIfExisting(){
    return this.patchIdData.filter(p => p.deviceId?.toUpperCase() === this.newBiosensorId?.toUpperCase()).length;
  }

  onClickDelete(patch: Patch){
    this.patchIdData = [
      ...this.patchIdData.filter(d => patch.deviceId !== d.deviceId)
    ]
    this.clear();
  }
  bioString: string = "";

  keypressEvent(e: KeyboardEvent) {
    if (this.bioString.length < 5) {
      this.bioString = this.bioString + e.key;
      let blockSpecialRegex = /[~`!@#$%^&()_={}[\]:;,.<>+\/?-]/;
      let key = e.key;
      let n = Boolean(this.bioString.charAt(0).match(/[a-zA-Z]/));
      if (!n && this.bioString.length > 0) {
        this.bioString = this.bioString.substring(0, this.bioString.length - 1);
        e.preventDefault();
        return false;
      }

      if (blockSpecialRegex.test(key)) {
        e.preventDefault();
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  clear(){
    this.newBiosensorId = '';
    this.bioString = '';
  }

  onClickSave(){
    this.ref.close(this.patchIdData);
  }

  keydownEvent(e: KeyboardEvent) {
    if (e.code === "Backspace" && this.bioString.length > 0) {
      this.bioString = this.bioString.substring(0, this.bioString.length - 1);
    }
  }

  addBiosensorId() {
    let obj = {
      deviceId: this.newBiosensorId.toUpperCase(), 
      deviceType: "Biosensor Id",
      startTime: 0,
      endTime: 0, 
    };
    this.patchIdData.push(obj);
    this.toggleStatus();
  }

  getPatchIdData(){
    this.data.patchIds = [...this.patchIdData || []];
  }

  displayDeleteIcon(patchId) {
    var date = moment(patchId.endTime*1000);
    if(patchId.deviceId === this.data.activePatch) {
      return false;
    } else if (patchId.startTime && date.isAfter(new Date())) {
      return false;
    } else if (patchId.startTime && date.isBefore(new Date())) {
      return false;
    } else if (!patchId.startTime) {
      return true;
    }
  }

  isFutureDate(endDate) {
    return !moment(endDate*1000).isAfter(new Date());
  }

  openDeleteConfirmationModal(patch) {
    const deletePatch = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "90vw",
      width: "500px",
      backdropClass: "backdropBackground",
      disableClose: true,
      data: {
        heading: "active-patients-module.dialog.delete_patch",
        message: "active-patients-module.dialog.delete_patch_message",
        stop_biosensor : false
      },
    });
    deletePatch.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.onClickDelete(patch);
      }
    });
  }

  validateBiosensor() {
    let patternToMatch = /^[a-zA-Z]{1}[a-zA-Z0-9]{4}$/;
    return (patternToMatch.test(this.newBiosensorId) || this.newBiosensorId === '');
  }
  alphaNumericsOnly(event: KeyboardEvent) {
    let charsOnlyPattern = /^[a-zA-Z0-9]+$/;
    let key = event.key;
    if (charsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  patchesUpdated() {
    return (JSON.stringify(this.currentPatches) !== JSON.stringify(this.patchIdData))
  }
}
