import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserPreferenceService } from "@services/user-preference.service";
import * as moment from "moment";
import { ActivePatientsService } from "../services/active-patients.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-patient-details-view-more",
  templateUrl: "./patient-details-view-more.component.html",
  styleUrls: ["./patient-details-view-more.component.scss"],
})
export class PatientDetailsViewMoreComponent implements OnInit {
  doctorName: string = "";
  timeZone: string;
  tz: string;
  age: number;
  readonly timeFmt: string = environment.customization.timeFormat;
  biosensorInfo = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ActivePatientsService,
    private userPreference: UserPreferenceService,
    protected dialogRef: MatDialogRef<PatientDetailsViewMoreComponent>
  ) { }

  ngOnInit(): void {
    this.timeZone = this.userPreference.getUserTimeZone();
    this.biosensorInfo = this.data?.biosensorInfo;
    this.tz = sessionStorage.getItem('timezone');
    let m_time = this.data?.hasOwnProperty('monitoringTime') ? this.data?.monitoringTime : "";
    let patchId = this.data?.hasOwnProperty('patchId') ? this.data?.patchId : "";
    this.service.getPatientBy(this.data?.patientId).subscribe(res => {
      this.data = res.data;
      this.data = {
        ...this.data,
        monitoringTime: m_time,
        patchId: patchId,
        age: this.data?.dob ? this.getAge(this.data?.dob) : null,
        estimatedDischarge: (this.data?.procedureDuration && this.data?.startedOn) ? this.getEstimatedDateForDischarge() : null
      }
      if (this.data?.doctorId) {
        this.service.getDoctorBy(this.data.doctorId).subscribe(resp => {
          if (resp.data.length) {
            this.doctorName = resp && resp['data'][0]['firstName'] + ' ' + resp['data'][0]['lastName'];
          }
        });
      }
      if (this.data.heightUnit.toUpperCase() !== this.userPreference.getUserHeightUnit().toUpperCase() && this.data?.height) {
        this.data.heightUnit = this.userPreference.getUserHeightUnit();
        if (this.userPreference.getUserHeightUnit().toUpperCase() === "CM") {
          this.data.height = this.userPreference.convertInchToCm(this.data.height);
        } else {
          this.data.height = this.userPreference.convertCmToInch(this.data.height);
        }
      }
      if (this.data.weightUnit.toUpperCase() !== this.userPreference.getUserWeightUnit().toUpperCase() && this.data?.weight) {
        this.data.weightUnit = this.userPreference.getUserWeightUnit();
        if (this.userPreference.getUserWeightUnit().toUpperCase() === "KG") {
          this.data.weight = this.userPreference.convertPoundToKg(this.data.weight);
        } else {
          this.data.weight = this.userPreference.convertKgToPound(this.data.weight);
        }
      }
    });
  }

  getEstimatedDateForDischarge() {
    return new Date(new Date((this.data?.startedOn * 1000) + (this.data?.procedureDuration*60*1000)).toLocaleString("en-US", { timeZone: this.tz }));
  }


  getAge(dob) {
    if (dob) {
      var a = moment(dob);
      var b = moment(new Date());
      var diffDays = b.diff(a, "days");
      return Math.floor(diffDays / 365);
    } else {
      return 0;
    }

  }



  closeGrid() {
    this.dialogRef.close();
  }
}
