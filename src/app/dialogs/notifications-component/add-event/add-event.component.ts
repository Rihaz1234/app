import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {_validatePhoneNumberInput} from "../../../validators/phone-no.validator";
import {atLeastOne} from "../../../validators/custom-validator-at-least-once.validator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertConfigurationsService} from "../services/alert-configuration.service";
import {UserPreferenceService} from "@services/user-preference.service";
import {SnackbarService} from "@services/snackbar.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  addEventForm: FormGroup;
  submitted = false;
  selectedTab = "event";
  recordedNote = false;
  notes="";
  recordedTime;
  currentTime;
  patientId;
  timeZone;
  timeZoneOffset;
  patchStarted = null;
  editEvent = false;
  addNote = false;
  note='';
  Events = ['Lightheadedness / Dizziness', 'Passed out', 'Chest Pain / Tightness', 'Palpitation / High Heart Rate', 'Fluttering in chest',
  'No Symptom', 'Other'];
  symptoms = [
    "Heart Racing",
    "Anxious",
    "Chest Discomfort / Pain",
    "Heart Fluttering",
    "Palpitation",
    "Feeling Weak/Faint",
    "Dizziness",
    "Short of Breath",
    "Tired / Fatigued",
    "None / Accidental Push",
    "Other"]
  activity = [
    "Normal routine",
    "Walking",
    "Sitting",
    "Lying down",
    "Exercising",
    "Jogging or running",
    "Sleeping",
    "Smoking",
    "Stair Climbing",
    "Eating",
    "Fast Walking",
    "Other"
  ];
  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<MatDialogRef<any>>,
    @Inject(MAT_DIALOG_DATA) public data: any, public service: AlertConfigurationsService,
    private userPreference: UserPreferenceService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.recordedNote = this.data?.recordedNote;
    this.addNote = this.data?.addNote;
    this.editEvent = this.data?.editEvent;
    this.patientId = this.data?.patientId;
    this.patchStarted = this.data?.patchStarted;
    this.timeZoneOffset = this.userPreference.getUserTimeZone();
    this.timeZone = sessionStorage.getItem('timezone');
    this.currentTime = new Date(new Date().toLocaleString("en-US", { timeZone: this.timeZone }));
    if(this.recordedNote) {
      this.selectedTab = "recordedNote";
      this.notes = this.data?.event?.notes;
      this.recordedTime = new Date(new Date(this.data?.event.alertTime*1000).toLocaleString("en-US", {timeZone: this.timeZone}));
    }
    if(this.addNote) {
      this.selectedTab = 'note';
    }
    this.addEventForm = this.formBuilder.group(
        {
          symptoms: this.formBuilder.array([]),
          activity: this.formBuilder.array([]),
          time: [
            "",
            [Validators.required],
          ],
          note: [
            "",
            [Validators.pattern("^[a-zA-Z0-9]{1}[°%&.()/a-zA-Z0-9 ',-:\n]*$")],
          ],
          manualSymptom: ["", [Validators.pattern("^[a-zA-Z0-9]{1}[°%&.()/a-zA-Z0-9 ,-:]*$")]],
          manualActivity: ["", [Validators.pattern("^[a-zA-Z0-9]{1}[°%&.()/a-zA-Z0-9 ,-:]*$")]],
        },
        { validator: atLeastOne(Validators.required, ["symptoms", "note"]) });
    if(this.data?.event) {
      this.currentTime = new Date(new Date(this.data?.event.alertTime*1000).toLocaleString("en-US", {timeZone: this.timeZone}));
      this.note = this.data?.event?.notes
    }
  }
  onSymptomChange(e) {
    const symptomsArray: FormArray = this.addEventForm.get('symptoms') as FormArray;
    if (e?.checked) {
      symptomsArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      symptomsArray.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          symptomsArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onActivityChange(e) {
    const activityArray: FormArray = this.addEventForm.get('activity') as FormArray;
    if (e?.checked) {
      activityArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      activityArray.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          activityArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  charsOnly(event: KeyboardEvent) {
    let charsOnlyPattern = /^[a-zA-Z]$/;
    let key = event.key;
    if (charsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  get f() {
      return this.addEventForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.addEventForm?.value?.symptoms?.indexOf('Other') !== -1) {
      this.addEventForm.controls['manualSymptom'].setValidators([Validators.required, Validators.pattern("^[a-zA-Z0-9]{1}[°%&.()/a-zA-Z0-9 ,-:]*$")]);
    } else {
      this.addEventForm.controls['manualSymptom'].clearValidators();
    }
    if (this.addEventForm?.value?.activity?.indexOf('Other') !== -1) {
      this.addEventForm.controls['manualActivity'].setValidators([Validators.required, Validators.pattern("^[a-zA-Z0-9]{1}[°%&.()/a-zA-Z0-9 ,-:]*$")]);
    } else {
      this.addEventForm.controls['manualActivity'].clearValidators();
    }
    this.addEventForm.controls['manualActivity'].updateValueAndValidity();
    this.addEventForm.controls['manualSymptom'].updateValueAndValidity();
      if (this.addEventForm.invalid || (!this.addEventForm?.get('activity')?.value?.length && this.addEventForm?.get('symptoms')?.value?.length)) {
        this.addEventForm.markAllAsTouched();
        return;
      } else {
        let formData = this.addEventForm.value;
        let date = formData.time.toDateString()  + ' ' + formData.time.getHours() + ':'
            + formData.time.getMinutes() + ':'
            + formData.time.getSeconds()  + " " + this.timeZoneOffset;
        let event;
        let  manualSymptomIndex = formData.symptoms.indexOf('Other');
        if(manualSymptomIndex > -1) {
          formData.symptoms[manualSymptomIndex] = formData.manualSymptom;
        }
        let  manualActivityIndex = formData.activity.indexOf('Other');
        if(manualActivityIndex > -1) {
          formData.activity[manualActivityIndex] = formData.manualActivity;
        }
        if (this.editEvent) {
          event = {
            ...this.data?.event,
            symptoms: formData.symptoms,
            activity: formData.activity,
            notes: formData?.note || this.data?.event?.notes,
          };
          console.log(event);
        } else if (this.addNote) {
          event = {
            ...this.data?.event,
            notes: formData.note
          }
        }else {
          event = {
            symptoms: formData.symptoms,
            activity: formData.activity,
            notes: formData.note,
            alertTime: Date.parse(date) / 1000,
            patientId: this.patientId
          };
        }
        this.service.addEvent(event).subscribe(res => {
          console.log('res', res);
          if (res.status === 'OK') {
            //this.snackbar.openSnackBar("alert_config_module.messages.add_event_success", 'bottom', 'center', true);
            this.dialogRef.close(true);
          }
        }, error => {
          console.log(error);
          if (error) {
            this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
          }
        })
      }
  }
  getCurrentDate() {
    return new Date(new Date().toLocaleString("en-US", {timeZone: this.timeZone}));
  }
  patchStartedTime() {
    return new Date(new Date(this.patchStarted).toLocaleString("en-US", {timeZone: this.timeZone}));
  }
  selectTab(tab) {
    this.submitted = false;
    this.selectedTab = tab;
  }

}
