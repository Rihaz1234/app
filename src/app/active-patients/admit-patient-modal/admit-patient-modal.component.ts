import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  OnDestroy
} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";
import { Observable } from "rxjs/internal/Observable";
import {
  calculateDischargedDate,
  createNewPatientForm, epochToDate, getDateFromString, getGender,
  mapIndividiualToAdmitPatient,
  populateAdmitPatientValues,
  populateAssignPatientValues,
} from "../forms/active-patients.form";
import { ActivePatientManagerService } from "../manager/active-patient-manager.service";
import {
  DOCTORS,
  NewPatient,
  ActivePatient,
  WeightUnits,
  HeightUnits,
} from "../models/active-patients.model";
import { PatientMoreInfoDialogComponent } from "../patient-more-info-dialog/patient-more-info-dialog.component";
import { BehaviorSubject, of, Subject, Subscription } from "rxjs";
import { ManageGroupsService } from "src/app/manage-group/services/manage-groups.service";
import {  map } from "rxjs/operators";
import { ActivePatientsService } from "../services/active-patients.service";
import { LSvalidators } from "src/app/shared/lsValidators/lsvalidators";
import { SnackbarService } from "@services/snackbar.service";
import { TableState } from "src/app/life-signals/_models/ls-column.model";
import { UserPreferenceService } from "@services/user-preference.service";
import parsePhoneNumberFromString from "libphonenumber-js";
@Component({
  selector: "app-admit-patient-modal",
  templateUrl: "./admit-patient-modal.component.html",
  styleUrls: ["./admit-patient-modal.component.scss"],
})
export class AdmitPatientModalComponent implements OnInit, AfterViewInit, AfterContentInit , OnDestroy{
  public newPatientForm: FormGroup;
  public doctorsList$: Observable<DOCTORS[]>;
  private doctorsList$$: BehaviorSubject<DOCTORS[]> = new BehaviorSubject<DOCTORS[]>([]);
  private cGroup$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public groups$: Observable<any[]>;
  public locationGroups$: Observable<any[]>;
  public clinicalGroups$: Observable<any[]>;
  public thirdPartyDevice: Array<any> = new Array();
  thirdPartyDevice_entered: boolean[] = [false];
  selectGroup = [{name: 'None', groupId: null, parent: 'ROOT', type: null}];
  admissionId = '';
  admissionIdCopy = '';
  today = new Date();
  minAdmitDate = new Date();
  maxAdmitDate;
  maxDOB = new Date();
  minDOB = new Date();
  selectedTab: string = 'ACTIVE_PATIENT';
  patientIDChanged: Subject<string> = new Subject<string>();
  patientData: Array<any> = new Array();
  modalTitle: string = '';
  userPreferenceUnit = 'SI';
  weightUnit = "KG";
  heightUnit = "CM";
  autoCompleted = false;
  patientvalidated =true;
  minMaxValues = {
    weight: {
      KG: {
        min: 20,
        max: 250
      },
      POUND: {
        min: 44,
        max: 552
      }
    },
    height: {
      CM: {
        min: 80,
        max: 300
      },
      INCH: {
        min: 31.5,
        max: 119
      }
    }
  }
  submitted = false;
  doctorsList = [];
  activeDoctorsList = [];
  dischargedPatients = [];
  groups = [];
  autoFilledPatient;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AdmitPatientModalComponent>,
    public formbuilder: FormBuilder,
    private manager: ActivePatientManagerService,
    private dialog: MatDialog,
    private service: ActivePatientsService,
    private manageGroupService: ManageGroupsService,
    private snackbar: SnackbarService,
    private userPreferences: UserPreferenceService
  ) {
    this.minAdmitDate.setDate(this.minAdmitDate.getDate() - 30);
    this.maxDOB.setFullYear(this.minAdmitDate.getFullYear() - 10);
    this.minDOB.setFullYear(this.minAdmitDate.getFullYear() - 150);
    this.doctorsList$ = this.doctorsList$$.asObservable();
    this.groups$ = this.cGroup$.asObservable();
    this.locationGroups$ = this.groups$.pipe(map((groups: any[]) => {
      return this.selectGroup.concat(groups.filter(g => g.type === "PHYSICAL"))
    }));
    this.clinicalGroups$ = this.groups$.pipe(map((groups: any[]) => {
      return this.selectGroup.concat(groups.filter(g => g.type === "CLINICAL"))
    }));
    this.heightUnit = this.userPreferences.getUserHeightUnit();
    this.weightUnit = this.userPreferences.getUserWeightUnit();
    this.userPreferenceUnit = this.userPreferences.getUserUnitSystem();
  }
  ngAfterContentInit(): void {
    this.newPatientForm = createNewPatientForm(this.formbuilder, this.weightUnit, this.heightUnit, this.admissionId, this.timeZone, this.timeZoneOffset);
  }

  ngAfterViewInit(): void {
    this.addNewRow();
  }

  loadState = 'DEFAULT';
  error: any;
  patientIDChangedSub: Subscription;
  patientId: string;
  isEdit = false;
  timeZone;
  timeZoneOffset;
  ngOnInit(): void {
    if (this.data?.activePatient) {
      this.selectedTab = 'ACTIVE_PATIENT';
    } else if (this.data?.patchId) {
      this.selectedTab = 'ASSIGN_PATIENT';
    }
    if (this.data?.mode === 'EDIT') {
      this.isEdit = true;
    }
    if(!this.isEdit) {
      this.generateAdmissionId();
    }
    this.userPreferenceUnit = this.userPreferences.getUserUnitSystem();
    if(this.userPreferenceUnit === 'IS') {
      this.weightUnit = "POUND";
      this.heightUnit = "INCH";
    }
    this.updateModalTitle();
    this.timeZone = sessionStorage.getItem('timezone');
    this.timeZoneOffset = this.userPreferences.getUserTimeZone();
    this.getDoctorsList();
    this.getCGroups();
    this.maxAdmitDate = new Date(new Date().toLocaleString("en-US", { timeZone: this.timeZone }));
  }
  getMaxAdmitTime() {
    let current = new Date(new Date().toLocaleString("en-US", { timeZone: this.timeZone }));
    return current < this.maxAdmitDate ? current : this.maxAdmitDate;
  }
  getMinAdmitTime() {
    return this.minAdmitDate < this.maxAdmitDate ? this.minAdmitDate : this.maxAdmitDate;
  }
  generateAdmissionId(){
    this.service.generateAdmissionId()
        .subscribe((res: any) => {
          this.admissionId = res.data;
          this.admissionIdCopy = res.data; 
        });
  }
  updateModalTitle() {
    this.modalTitle = (this.selectedTab === 'ACTIVE_PATIENT') ? (this.isEdit) ? 'active-patients-module.table.edit_patient_title' : 'active-patients-module.table.admit_patient_title' : 'active-patients-module.table.assign_patient_title';
  }

  searchPatient(event, type) {
    let patientId;
    if(type === 'keyup') {
      patientId = event.target.value;
    } else {
      patientId = event.clipboardData.getData('text');
    }
    if (patientId.length > 3) {
      this.patientvalidated = false;
      this.service.searchPatient(patientId)
        .subscribe((res: any) => {
          this.patientData = res.data.items;
          this.patientvalidated = true;
        }, (error) => {
          this.error = error;
          this.patientvalidated = true;
        },
        );
    }else{
      this.patientData =[];
      this.patientvalidated = true;
    }
  }

  populatePatient(event) {
    if (this.patientData?.length && this.patientData[0]?.patientId.toUpperCase() === event.target.value.toUpperCase()) {
      this.patientvalidated = false;
      let event = { option: { value: this.patientData[0]?.patientId } }
      this.onOptionSelected(event);
    }
}

  getPatientDataOf(id) {
    this.patientData = [];
    let url = `patients/?sortBy=PatientID:desc&page=1&size=5&patientid=${id}`
    this.manager.getActivePatient(url);
    return this.manager.selectActivePatient();
  }

  groupsSubscription: Subscription;
  getCGroups() {
    this.groupsSubscription = this.manageGroupService.fetch().subscribe(groups => {
      console.log(groups)
      this.groups = groups['data'];
      if (groups['data'].length > 0) {
        this.cGroup$.next(groups['data']);
      }
      this.initNewPatientForm();
    })
  }

  /* Clear Select on location and Clinclical */
  clearSelect(controlName, event){
    event.stopPropagation();
    this.newPatientForm.get(controlName).setValue(null);
    }

/* Clear Select on location and Clinclical */


  setDeviceIds(ids) {
    for (let i = 0; i < ids.length - 1; i++) {
      this.addNewRow();
    }
  }

  addClass(event: KeyboardEvent, i: number): void {
    this.thirdPartyDevice_entered[i] = true;
  }

  initNewPatientForm() {
    if (this.data?.activePatient) {
      this.data.activePatient = this.updateHeightWeight(this.data?.activePatient);
      this.patchIds = this.data?.activePatient?.patchIds;
      if(!this.groups.find(group => group.groupId === this.data?.activePatient?.cgroupId) && this.data?.activePatient?.cgroupId) {
        let patientGroup = {groupId: this.data?.activePatient?.cGroup.id, name: this.data?.activePatient?.cGroup.name, type: 'CLINICAL'}
        this.groups = [patientGroup, ...this.groups];
        console.log('gps', this.groups);
        this.cGroup$.next(this.groups);
      }
      if(!this.groups.find(group => group.groupId === this.data?.activePatient?.pgroupId) && this.data?.activePatient?.pgroupId) {
        let patientGroup = {groupId: this.data?.activePatient?.pGroup.id, name: this.data?.activePatient?.pGroup.name, type: 'PHYSICAL'}
        this.groups = [patientGroup, ...this.groups];
        this.cGroup$.next(this.groups);
      }
      if(this.patchIds.length && this.patchIds[0]?.startTime) {
        this.maxAdmitDate = new Date(new Date(this.patchIds[0]?.startTime*1000).toLocaleString("en-US", { timeZone: this.timeZone }));
        // if(this.patchIds[0]?.startTime < this.data?.activePatient?.startedOn) {
        //   this.data.activePatient.startedOn = this.patchIds[0]?.startTime;
        // }
      }
      let deviceIdsData = this.data?.activePatient?.deviceIds || [];
      this.setDeviceIds(deviceIdsData);

      populateAdmitPatientValues(
        this.data?.activePatient,
        this.newPatientForm,
        this.doctorsList$$.getValue(),
        this.cGroup$.getValue(),
          this.weightUnit,
          this.heightUnit,
          this.timeZone
      );
      this.newPatientForm.markAllAsTouched();
    } else if (this.data?.patchId) {
      let biosensor = this.data?.patchId;
      if(!this.patchIds?.length) {
        this.patchIds.push({
          deviceId: biosensor?.patchId,
          deviceType: "Biosensor Id",
          startTime: biosensor?.patchDetails[0]?.startTime,
          endTime: biosensor?.patchDetails[0]?.endTime
        });
      }
      this.maxAdmitDate = new Date(new Date(biosensor?.patchDetails[0]?.startTime*1000).toLocaleString("en-US", { timeZone: this.timeZone }));

      populateAssignPatientValues(this.data?.patchId, this.newPatientForm,
        this.doctorsList$$.getValue(), this.admissionId, this.maxAdmitDate)
    } else {
      this.newPatientForm = createNewPatientForm(this.formbuilder, this.weightUnit, this.heightUnit, this.admissionId, this.timeZone, this.timeZoneOffset);
      this.addNewRow();
      this.newPatientForm.updateValueAndValidity();
    }
  }

  patchIds: Array<any> = new Array();
  openMoreInfoDialog() {
    let patches = {
      activePatch: this.data?.activePatient?.activePatch || '',
      patchIds: this.patchIds,
      heading: "active-patients-module.dialog.biosensor_information",
      readOnly: this.selectedTab === 'ASSIGN_PATIENT'
    }
    this.dialog.open(PatientMoreInfoDialogComponent, {
      width: "700px",
      //minWidth: "700px",
      maxWidth: "95vw",
      backdropClass: "backdropBackground",
      disableClose: true,
      data: patches
    }).afterClosed()
      .subscribe(response => {
        if (response) {
          this.patchIds = response;
          this.newPatientForm.get("patchIds").setValue(response[0]?.deviceId)
        }
      });
  }

  getActivePatch() {
    if(this.data?.activePatient) {
      return this.data?.activePatient?.activePatch
    } 
  }

  getAutogeneratedPatientId() {
    this.service.getAutogeneratedPatientId().subscribe(d => {
      this.newPatientForm.get("patientId").setValue(d['data']);
    }, error => {
      if(error) {
        let key;
        if(error === 'AUTO_GENERATE_NOT_ENABLED') {
          key = "errors." + error;
        } else {
          key = "errors.err_generic_message";
        }
        this.snackbar.openSnackBar(key, 'bottom', 'center', true);
      }
    });
  }

  doctorsListSub: Subscription;
  getDoctorsList() {
    this.doctorsListSub = this.manager.getDoctorsList().subscribe((list) => {
      this.doctorsList = list.map(doctor => {
        return {
          ...doctor,
          displayName: `${doctor?.firstName} ${doctor?.lastName}`
        }
      });
      this.activeDoctorsList = this.doctorsList.filter(phy => phy.isActive === true || phy.id === this.data?.activePatient?.doctorId);
      this.doctorsList$$.next(this.activeDoctorsList);
    });
  }

  savePatientDetails(formData) {
    this.submitted = true;
    if(this.newPatientForm.invalid) {
      this.newPatientForm.markAllAsTouched();
      return;
    } else if (!this.patientvalidated || this.patientData?.length) {
      this.snackbar.openSnackBar("errors.assigned_patient_id_searching", 'bottom', 'center', true);
      if (this.patientData[0]?.patientId.toUpperCase() === this.newPatientForm?.controls['patientId']?.value.toUpperCase()) {
        this.onOptionSelected({ option: { value: this.patientData[0].patientId } });
        this.patientData = [];
        return;
      }
    } else {
      this.setControlState(this.disableFields, true);
      formData = this.newPatientForm;
      formData.value.deviceIds = formData.value.deviceIds.filter(device => device.deviceId !== '' && device.deviceId !== null);
      formData.value.firstName = formData?.value?.firstName ? formData?.value.firstName?.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) : '';
      formData.value.lastName = formData?.value?.lastName ? formData?.value.lastName?.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) : '';
      if (formData.get("phoneNo").value !==null && formData.get("phoneNo").value !=="") {
        const parsedValue = parsePhoneNumberFromString(formData.get("phoneNo").value);
        formData.value.phoneNo = parsedValue.number.toString();
      }
      let patient: NewPatient = mapIndividiualToAdmitPatient(formData, this.cGroup$.getValue(), this.patchIds, this.timeZoneOffset);
      if (this.data?.mode === 'EDIT' || this.isSelectedFromAuto) {
        this.manager.updatePatient(patient).subscribe((resp: any) => {
          if (resp.addEditState === TableState.SUCCESS) {
            this.dialogRef.close(patient);
          } else if (resp.error) {
            if(this.isSelectedFromAuto) {
              this.setControlState(this.disableFields, false);
            }
            if(this.autoFilledPatient?.isDischarged) {
              this.setControlState(['admissionId'], true);
            }
            switch (resp.error) {
              case "PREVIOUS_ADMISSION_NOT_DISCHARGED":
                this.snackbar.openSnackBar("errors.prev_admission_not_discharged", 'bottom', 'center', true);
                break;
              case "PATIENT_ALREADY_DISCHARGED":
                this.snackbar.openSnackBar("errors.patient_discharged", 'bottom', 'center', true);
                break;
              case "DEVICES_ALREADY_IN_USE":
                this.snackbar.openSnackBar("errors.devices_already_in_use", 'bottom', 'center', true);
                break;
              case "PATCHES_ALREADY_IN_USE":
                this.snackbar.openSnackBar("active-patients-module.errors.patchInUse", 'bottom', 'center', true);
                break;
              case "ADMISSION_ID_ALREADY_EXIST":
                this.snackbar.openSnackBar("errors.admission_id_exist", 'bottom', 'center', true);
                break;
              case "MORE_THAN_ONE_PATCH_STREAMING" :
                this.snackbar.openSnackBar("active-patients-module.errors.more_than_one_patch_streaming", 'bottom', 'center', true);
                break;
              case "ADMITTED_ON_TIME_IS_INVALID" :
                this.snackbar.openSnackBar("active-patients-module.errors.admittedOn_invalid", 'bottom', 'center', true);
                break;
              case "PATCH_STATE_STREAMING" :
                this.snackbar.openSnackBar("active-patients-module.errors.patch_streaming", 'bottom', 'center', true);
                break;
              default:
                this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
            }
          }
        });
      } else {
        this.manager.createPatient(patient).subscribe(resp => {
          if (resp.PATIENT && resp.addEditState === TableState.SUCCESS) {
            this.dialogRef.close(patient);
          } else if (resp.error) {
            switch (resp.error) {
              case "PATCHES_ALREADY_IN_USE":
                this.snackbar.openSnackBar("active-patients-module.errors.patchInUse", 'bottom', 'center', true);
                break;
              case "PREVIOUS_ADMISSION_NOT_DISCHARGED":
                this.snackbar.openSnackBar("errors.prev_admission_not_discharged", 'bottom', 'center', true);
                break;
              case "PATIENT_ALREADY_DISCHARGED":
                this.snackbar.openSnackBar("errors.patient_discharged", 'bottom', 'center', true);
                break;
              case "DEVICES_ALREADY_IN_USE":
                this.snackbar.openSnackBar("errors.devices_already_in_use", 'bottom', 'center', true);
                break;
              case "ADMISSION_ID_ALREADY_EXIST":
                this.snackbar.openSnackBar("errors.admission_id_exist", 'bottom', 'center', true);
                break;
              case "MORE_THAN_ONE_PATCH_STREAMING" :
                this.snackbar.openSnackBar("active-patients-module.errors.more_than_one_patch_streaming", 'bottom', 'center', true);
                break;
              case "ADMITTED_ON_TIME_IS_INVALID" :
                this.snackbar.openSnackBar("active-patients-module.errors.admittedOn_invalid", 'bottom', 'center', true);
                break;
              case "PATCH_STATE_STREAMING" :
                this.snackbar.openSnackBar("active-patients-module.errors.patch_streaming", 'bottom', 'center', true);
                break;
              default:
                this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
            }
          }
        });
      }
    }
  }


  charsOnly(control: string, event: KeyboardEvent) {
    let charsOnlyPattern = /^[a-zA-Z ]$/;
    let key = event.key;
    if (charsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
 
  onWeightUnitChange() {
    let weightControl = null;
    weightControl = this.newPatientForm.get("weight");
    if(this.weightUnit === WeightUnits.KG) {
      weightControl.setValidators([LSvalidators.maxWeightKG,LSvalidators.validValueForWeightAndHeigth]);
      weightControl.updateValueAndValidity();
    } else if(this.weightUnit === WeightUnits.POUND) {
      weightControl.setValidators([LSvalidators.maxWeightPOUND,LSvalidators.validValueForWeightAndHeigth]);
      weightControl.updateValueAndValidity();
    }
  }

  onHeightUnitChange() {
    let heightControl = null;
    heightControl = this.newPatientForm.get("height");
    if(this.heightUnit === HeightUnits.CM) {
      heightControl.setValidators([LSvalidators.maxHeightCM,LSvalidators.validValueForWeightAndHeigth]);
      heightControl.updateValueAndValidity();
    } else if(this.heightUnit === HeightUnits.INCH) {
      heightControl.setValidators([LSvalidators.maxHeightINCH,LSvalidators.validValueForWeightAndHeigth]);
      heightControl.updateValueAndValidity();
    }
  }

  numericsOnly(control: string, event: KeyboardEvent) {
    let numericsOnlyPattern = /^[0-9]$/;
    let key = event.key;
    if (numericsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  floatOnly(control: string, event) {
    let floatOnlyPattern = /^[0-9\.]*$/;
    let key
    if(control === 'keyboard') {
      key = event.key;
    } else {
      key = event.clipboardData.getData('text');
    }
    if (floatOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
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

  keydownEvent(e: KeyboardEvent) {
    if (e.code === "Backspace" && this.bioString.length > 0) {
      this.bioString = this.bioString.substring(0, this.bioString.length - 1);
    }
  }

  newDevice(): FormGroup {
    return this.formbuilder.group({
      deviceId: [{value: null, disabled: this.isDisabled}, Validators.pattern("^[a-zA-Z0-9]+$")],
      deviceType: {value: null, disabled: this.isDisabled},
    });
  }

  onClickClear(event, group: FormGroup, type) {
    event.stopPropagation();
    this.patientIDChanged.next(null);
    group.controls[type].setValue(null);
    group.controls["deviceType"].setValue(null);
    this.newPatientForm.updateValueAndValidity();
  }
  clearId(group: FormGroup, type) {
    group.controls[type].setValue(null);
  }

 disableFields = ['patientId', 'admissionId','firstName', 'lastName', 'dob', 'gender','patchIds'];
  isSelectedFromAuto: boolean = false;
  isDisabled = false;
  onOptionSelected(event) {
    this.getCGroups();
    this.loadState = 'LOADING';
    this.setControlState(this.disableFields, false);
    this.isSelectedFromAuto = true;
    this.service.getPatientBy(event.option.value)
        .subscribe(res => {
          this.loadState = 'SUCCESS';
          let patient: any = res.data;
          if(patient?.patchIds?.length && patient?.patchIds[0]?.startTime) {
            this.maxAdmitDate = new Date(new Date(patient.patchIds[0]?.startTime*1000).toLocaleString("en-US", { timeZone: this.timeZone }));
          }
          this.autoFilledPatient = res.data;
          patient = this.updateHeightWeight(patient);
          this.clearDeviceIds(this.deviceIds);
          let deviceIdsData = patient?.deviceIds || [];
          this.setDeviceIds(deviceIdsData);
          if(!this.groups.find(group => group.groupId === patient?.cgroupId) && patient?.cgroupId) {
            let patientGroup = {groupId: patient.cGroup.id, name: patient.cGroup.name, type: 'CLINICAL'};
            this.groups = [patientGroup, ...this.groups];
            this.cGroup$.next(this.groups);
          }
          if(!this.groups.find(group => group.groupId === patient?.pgroupId) && patient?.pgroupId) {
            let patientGroup = {groupId: patient.pGroup.id, name: patient.pGroup.name, type: 'PHYSICAL'};
            this.groups = [patientGroup, ...this.groups];
            this.cGroup$.next(this.groups);
          }
          const patientDetails = {
            ...patient,
            createdDateTime: patient.createdDateTime ? new Date(patient.createdDateTime) : null,
            admissionId: patient?.isDischarged ? this.admissionId: patient?.admissionId || this.admissionId,
            cGroup: patient?.cgroupId ? patient?.cgroupId : null,
            pGroup: patient?.pgroupId ? patient?.pgroupId : null,
            gender: patient?.gender ? getGender(patient?.gender) : null,
            weightUnit: patient?.weightUnit ? patient.weightUnit.toUpperCase() : this.weightUnit,
            heightUnit: patient?.heightUnit ? patient.heightUnit.toUpperCase() : this.heightUnit,
            weight: patient?.weight ? patient.weight : null,
            height: patient?.height ? patient.height : null,
            estimatedDischarge: patient?.procedureDuration && patient.startedOn ? (patient?.isDischarged ? null : calculateDischargedDate(patient.startedOn, patient.procedureDuration, this.timeZone)) : null,
            startedOn: patient?.startedOn ? (patient?.isDischarged ? this.maxAdmitDate : patient.startedOn < this.data?.patchId?.patchDetails[0]?.startTime ? epochToDate(patient.startedOn, this.timeZone) : this.maxAdmitDate) : null,
            dob: patient?.dob ? getDateFromString(patient.dob) : '',
            patchIds: patient?.isDischarged ? null : patient?.patchIds,
            deviceIds: patient?.isDischarged ? null : patient?.deviceIds
          }
          if(!patient?.admissionId || patient?.isDischarged) {
            this.setControlState(['admissionId'], true);
          }
          if(patientDetails?.patchIds) {
            this.patchIds = [...patientDetails?.patchIds, {deviceId: this.data?.patchId?.patchId, startTime: this.data?.patchId?.patchDetails[0].startTime, endTime: this.data?.patchId?.patchDetails[0].endTime}];
          } else {
            this.patchIds = [{deviceId: this.data?.patchId?.patchId, startTime: this.data?.patchId?.patchDetails[0].startTime, endTime: this.data?.patchId?.patchDetails[0].endTime}]
          }
          delete patientDetails.patchIds;
          this.newPatientForm.patchValue({
            ...this.newPatientForm.getRawValue(),
            ...patientDetails
          })
          this.newPatientForm.updateValueAndValidity({ emitEvent: true });
          this.doctorsList$$.next(this.doctorsList);
          this.patientData = [];
          this.patientvalidated = true;
        })
  }
  patientSelected(event) {
    this.service.getPatientBy(event.option.value)
        .subscribe(res => {
          const patient: ActivePatient = res.data;
          const patientDetails = {
            patientId: patient?.patientId,
            admissionId: this.admissionId,
            firstName: patient?.firstName,
            lastName: patient?.lastName,
            dob: patient?.dob,
            gender: patient?.gender,
            phoneNo: patient?.phoneNo,
            email: patient?.email
          }
          populateAdmitPatientValues(
              patientDetails,
              this.newPatientForm,
              this.doctorsList$$.getValue(),
              this.cGroup$.getValue(),
              this.weightUnit,
              this.heightUnit,
              this.timeZone
          );
          this.setControlState(['patientId'], false);
          this.isDisabled = false;
          this.autoCompleted = true;
        });
  }

  onClickClearAuto() {
    this.isSelectedFromAuto = false;
    this.maxAdmitDate = new Date(new Date(this.data?.patchId?.patchDetails[0]?.startTime*1000).toLocaleString("en-US", { timeZone: this.timeZone }));
    if(this.autoCompleted) {
      this.newPatientForm.patchValue({
        patchIds : null
      });
      this.patchIds = null;
    } else {
      let biosensor = this.data?.patchId;
      this.patchIds = [{
        deviceId: biosensor?.patchId,
        deviceType: "Biosensor Id",
        startTime: biosensor?.patchDetails[0]?.startTime,
        endTime: biosensor?.patchDetails[0]?.endTime
      }]
    }
    this.autoCompleted = false;
    this.clearDeviceIds(this.deviceIds);
    this.newPatientForm.patchValue({
      patientId: null,
      admissionId: this.admissionIdCopy,
      firstName: null,
      lastName: null,
      phoneNo: null,
      email: null,
      dob: null,
      age: null,
      gender: null,
      weight: null,
      height: null,
      weightUnit: this.weightUnit,
      heightUnit: this.heightUnit,
      cGroup: null,
      pGroup: null,
      deviceIds: [],
      startedOn: null,
      procedureDuration: null,
      estimatedDischarge: null,
      doctorId: null,
      createdDateTime: new Date()

    });
    this.setControlState(this.disableFields, true);
    this.doctorsList$$.next(this.activeDoctorsList);
  }

  setControlState(controls: string[], state: boolean) {
    controls.forEach(control => {
      if (state) {
        this.newPatientForm?.controls[control]?.enable();
      }
      else {
        this.newPatientForm?.controls[control]?.disable();
      }
    });
    //this.isDisabled = !state;
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1?.name === o2?.name && o1?._id === o2?._id;
  }

  ignoreCase(o1: any, o2: any): boolean {
    return o1.toUpperCase() === o2.toUpperCase();
  }

  thirdParties = [
    {
      name: "BP Device",
      id: "BP"
    },
    {
      name: "SPO2 Device",
      id: "SPO2"
    }
  ];
  thirdPartyDevices = () => {
    return of(this.thirdParties).pipe(map(devices => {
      const ids = this.deviceIds.getRawValue();
      const consideredIds = ids.slice(0, ids.length - 1);
      return devices.filter(d => !consideredIds.map(id => id.deviceType).includes(d.id));
    }));
  };

  addNewRow() {
    this.deviceIds.push(this.newDevice());
  }

  deviceIdsValue;
  delete(i) {
    this.deviceIds.removeAt(i);
    if (this.deviceIds.length === 0) {
      this.addNewRow();
    }
  }

  get deviceIds() {
    return this.newPatientForm.get("deviceIds") as FormArray;
  }
  clearDeviceIds(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
    this.addNewRow();
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
  getMaxDischargeDate(){
    let admittedDate = new Date(this.newPatientForm.get('startedOn').value);
    return new Date(admittedDate.setDate(admittedDate.getDate() + 30));

  }
  getMinDischargeDate(){
    let admittedDate = new Date(this.newPatientForm.get('startedOn').value);
    let minDischarge = new Date(admittedDate.setDate(admittedDate.getDate() + 1));
    let currentTime = new Date(new Date().toLocaleString("en-US", { timeZone: this.timeZone }));
    return minDischarge > currentTime ? minDischarge : currentTime

  }
  getElapsedTime() {
    let elapsedTime = (new Date().getTime() - (new Date(this.newPatientForm.get('startedOn').value).getTime()))/1000;
    let hrs = Math.floor(elapsedTime/3600); //hours
    let mins = Math.floor(elapsedTime % 3600 / 60);//mins
    //let secs = Math.floor(elapsedTime % 3600 % 60); //seconds
    let secs = '00';
    return hrs + " : " + mins + " : " + secs;
  }
  onGroupSelected(formField, value) {
    this.newPatientForm.get(formField).setValue(value)
  }
  selectDoctor(value) {
    this.newPatientForm.get('doctorId').setValue(value)
  }
  fetchPatientDetails(event, type) {
    let patientId;
    if(type === 'keyup') {
      patientId = event.target.value;
    } else {
      patientId = event.clipboardData.getData('text');
    }
    patientId = encodeURIComponent(patientId);
    if (patientId) {
      let url = `patients/?sortBy=PatientID:desc&page=1&size=5&isDischarged=true&patientid=${patientId}`
      this.service.getAll(url).subscribe((res:any) =>{
        if(res.data?.items?.length) {
          if(res.data?.items[0].patientId === event?.target?.value) {
            this.dischargedPatients = [res.data?.items[0]];
          } else {
            this.dischargedPatients = [];
          }
        }
      });
    }
  }
  updateHeightWeight(patient) {
    if (patient.heightUnit.toUpperCase() !== this.userPreferences.getUserHeightUnit().toUpperCase() && patient.height) {
      patient.heightUnit = this.userPreferences.getUserHeightUnit();
      if (this.userPreferences.getUserHeightUnit().toUpperCase() === "CM") {
        patient.height = Number(this.userPreferences.convertInchToCm(patient.height));
      } else {
        patient.height = Number(this.userPreferences.convertCmToInch(patient.height));
      }
    }
    if (patient.weightUnit.toUpperCase() !== this.userPreferences.getUserWeightUnit().toUpperCase() && patient.weight) {
      patient.weightUnit = this.userPreferences.getUserWeightUnit();
      if (this.userPreferences.getUserWeightUnit().toUpperCase() === "KG") {
        patient.weight = Number(this.userPreferences.convertPoundToKg(patient.weight));
      } else {
        patient.weight = Number(this.userPreferences.convertKgToPound(patient.weight));
      }
    }
    return patient;
  }
  ngOnDestroy() {
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }
    if (this.doctorsListSub) {
      this.doctorsListSub.unsubscribe();
    }
  }
}
