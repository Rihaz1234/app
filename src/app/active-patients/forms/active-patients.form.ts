import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from "@angular/forms";
import { LSvalidators } from "src/app/shared/lsValidators/lsvalidators";

import {
  DOCTORS,
  NewPatient,
  UnassignedPatient,
} from "../models/active-patients.model";
import {_validatePhoneNumberInput} from "../../validators/phone-no.validator";

export function getUtcDate(date:Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

export function createNewPatientForm(formBuilder: FormBuilder, weightUnit, heightUnit, admissionId, timezone, offset): FormGroup {
  const formGroup = formBuilder.group({
    patientId: [null, [Validators.required, LSvalidators.validatePatientId]],
    admissionId: [admissionId, [Validators.required, LSvalidators.validatePatientId]],
    dob: [null, Validators.required],
    //age: [null, [LSvalidators.numericsOnly]],
    phoneNo: [null, [_validatePhoneNumberInput?.bind(this), Validators.required]],
    email: [null, Validators.email],
    gender: [null, Validators.required],
    weight: [null, [LSvalidators.validValueForWeightAndHeigth]],
    height: [null, [LSvalidators.validValueForWeightAndHeigth]],
    weightUnit: [weightUnit],
    heightUnit: [heightUnit],
    firstName: [null, [Validators.required, LSvalidators.validatePatientName, LSvalidators.validatePatientNameMinMaxLength]],
    lastName: [null, [Validators.required, LSvalidators.validatePatientName, LSvalidators.validatePatientNameMinMaxLength]],
    doctorId: [null],
    cGroup: [{}],
    pGroup: [{}],
    patchIds: [[], [Validators.required, LSvalidators.biosensorPattern]],
    deviceIds: formBuilder.array([]),
    createdDateTime: [null],
    startedOn: [defaultAdmitDate(timezone, offset), Validators.required],
    procedureDuration: [null],
    estimatedDischarge: [null]
  });
  return formGroup;
}

export function mapIndividiualToAdmitPatient(formData: FormGroup, cGroup, patchIdData, timezone): NewPatient {
  let individual = formData.value;
  let patchIds: Array<{ deviceId: "" }> = new Array();
  let patientId = individual.patientId.trim();
  let admissionId = individual.admissionId;
  let cGroupObj = null;
  let pGroupObj = null;
  if (cGroup?.length > 0) {
    let filteredObj = cGroup.filter(x => x.groupId === formData.value.cGroup);
    if (filteredObj[0]) {
      let obj = {
        id: filteredObj[0].groupId,
        name: filteredObj[0].name
      }
      cGroupObj = obj;
    } else {
      cGroupObj = null;
    }
  }
  if (cGroup?.length > 0) {
    let filteredObjNew = cGroup.filter(x => x.groupId === formData.value.pGroup);
    if (filteredObjNew[0]) {
      let objNew = {
        id: filteredObjNew[0].groupId,
        name: filteredObjNew[0].name
      }
      pGroupObj = objNew;
    } else {
      pGroupObj = null;
    }
  }

  if (typeof individual.patchIds === "string"  && patchIdData?.length === 0) {
    patchIds.push({ deviceId: individual.patchIds.toUpperCase() });
  } else {
    patchIds = [...patchIdData]
  }

  let patient: NewPatient = {
    patientId: patientId,
    admissionId: admissionId,
    dob: individual.dob ? getUtcDate(individual.dob).toISOString() : null,
    //age: parseInt(individual.age),
    phoneNo: individual?.phoneNo,
    email: individual?.email,
    gender: individual.gender,
    weight: individual.weight,
    height: individual.height,
    weightUnit: individual.weightUnit,
    heightUnit: individual.heightUnit,
    firstName: individual.firstName,
    lastName: individual.lastName,
    doctorId: individual.doctorId,
    cGroup: cGroupObj,
    pGroup: pGroupObj,
    patchIds: patchIds,
    deviceIds: individual.deviceIds,
    createdDateTime: individual.createdDateTime || new Date(),
    startedOn: individual?.startedOn ? convertAdmitDate(individual.startedOn, timezone) : null,
    procedureDuration: individual?.estimatedDischarge ? monitoringDays(individual.startedOn, individual.estimatedDischarge, timezone) : null,
    estimatedDischarge: individual?.estimatedDischarge ? convertDischargeDate(individual.startedOn, individual.estimatedDischarge, timezone) : null
  };
  return patient;
}

export function convertToMinutes(days) {
  return days * 24 * 60;
}

export function epoch(date) {
  let epoch = Date.parse(date);
  return epoch / 1000;
}

export function convertAdmitDate(date, timezone){
   let t_date = date.toDateString()  + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()  + " " + timezone;
	let epoch = Date.parse(t_date);
	return epoch / 1000;
}
export function convertDischargeDate(startedOn, date, timezone){
  let t_date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  let time = startedOn.getHours() + ':' + startedOn.getMinutes() + ':' + startedOn.getSeconds()  + " " + timezone
  date = t_date+" "+time;
  let epoch = Date.parse(date);
  return epoch / 1000;
}
export function calculateDischargedDate(admittedDate, monitoringDays, timezone) {
  return new Date(new Date((admittedDate * 1000) + (monitoringDays*60*1000)).toLocaleString("en-US", { timeZone: timezone }));
}



export function populateAssignPatientValues(individual: UnassignedPatient,
  patientsForm: FormGroup,
  doctors: DOCTORS[], admissionId, patchStartTime): FormGroup {
  if (!patientsForm) {
    return;
  }
  patientsForm.get("patchIds").setValue(individual.patchId);
  patientsForm.get("admissionId").setValue(admissionId);
  patientsForm.get("startedOn").setValue(patchStartTime)
  return patientsForm;
}

export function populateAdmitPatientValues(
  individual,
  patientsForm: FormGroup,
  doctors: DOCTORS[],
  cGroup: any[],
  weightUnit,
  heightUnit,
  timezone
): FormGroup {
  if (!patientsForm) {
    return;
  }
  if(!individual?.weightUnit) {
    individual.weightUnit = weightUnit
  }
  if(!individual?.heightUnit) {
    individual.heightUnit = heightUnit
  }
  // patientsForm.patchValue(individual);
  let disableControls = ['firstName', 'lastName', 'dob', 'gender'];
  disableControls.forEach((formContolName) => {
    patientsForm.get(formContolName).disable();
  });
  patientsForm.get("patientId").setValue(individual.patientId);
  patientsForm.get("admissionId").setValue(individual?.admissionId ? individual.admissionId : '');
  patientsForm.get("dob").setValue(individual.dob ? getDateFromString(individual.dob) : '');
  //patientsForm.get("age").setValue(individual.dob ? individual.age : null);
  patientsForm.get("phoneNo").setValue(individual.phoneNo ? individual.phoneNo : null);
  patientsForm.get("email").setValue(individual.email ? individual.email : null);
  patientsForm.get("gender").setValue(getGender(individual.gender));
  if(individual?.weight) {
    patientsForm.get("weight").setValue(individual?.weight);
  }
  if(individual?.height) {
    patientsForm.get("height").setValue(individual?.height);
  }
  patientsForm.get("weightUnit").setValue(getWeightUnit(individual.weightUnit));
  patientsForm.get("heightUnit").setValue(getHeightUnit(individual.heightUnit));
  patientsForm.get("firstName").setValue(individual.firstName);
  patientsForm.get("lastName").setValue(individual.lastName);
  //patientsForm.get('doctorId').setValue(getDoctorsName(doctors || [], individual.doctorId));
  patientsForm.get('doctorId').setValue(individual.doctorId);
  // patientsForm.get('cGroup').setValue(getClinicalGroupName(cGroup, individual?.cGroup?.groupId));
  // patientsForm.get('pGroup').setValue(individual.pgroupId);

  patientsForm.get('cGroup').setValue(individual.cgroupId);
  patientsForm.get('pGroup').setValue(individual.pgroupId);
  patientsForm.get('createdDateTime').setValue(individual.createdDateTime || new Date());
  individual.patchIds = individual.patchIds || [];
  let deviceData: any = [];
  deviceData = individual.deviceIds || [];
  let items = patientsForm.get('deviceIds') as FormArray;
  if (deviceData?.length) {
    for (let i = 0; i < deviceData?.length; i++) {
      (items.at(i) as FormGroup).get('deviceId').patchValue(deviceData[i]?.deviceId);
      (items.at(i) as FormGroup).get('deviceType').patchValue(deviceData[i]?.deviceType);
    }
  }

  if (individual?.patchIds?.length) {
    let len = individual?.patchIds?.length;
    patientsForm.get("patchIds").setValue(individual?.activePatch || individual.patchIds[len-1]?.deviceId);
  }
  if(individual?.startedOn) {
    patientsForm
        .get("startedOn")
        .setValue(epochToDate(individual.startedOn, timezone));
  }
  if(individual?.procedureDuration && individual.startedOn) {
    patientsForm
        .get("estimatedDischarge")
        .setValue(calculateDischargedDate(individual.startedOn, individual.procedureDuration, timezone));
  }
  return patientsForm;
}

export function getGender(gender) {
  switch(gender){
    case 'M': return 'MALE';
    case 'F': return 'FEMALE';
    case 'O': return 'OTHER';
    default:  return gender;
  }
}

function getWeightUnit(unit) {
  return unit.toUpperCase() === 'KG' ? 'KG' : 'POUND';
}

function getHeightUnit(unit) {
  return unit.toUpperCase() === 'CM' ? 'CM' : 'INCH';
}

function getClinicalGroupName(list, id) {
  let cGroup = list?.filter((x) => {
    if (x.groupId === id) {
      return x;
    } else {
      return false;
    }
  }) || [];

  if (cGroup.length > 0 && cGroup[0]?.groupId) {
    return cGroup[0]?.groupId;
  } else {
    return "";
  }
}

function getDoctorsName(list, id) {
  let doctors =
    list?.filter((x) => {
      if (x.id === id) {
        return x;
      }
    }) || [];

  if (doctors.length > 0 && doctors[0]?.id) {
    return doctors[0]?.id;
  } else {
    return "";
  }
}

export function getDateFromString(dateStr) {
  return new Date(dateStr)
}

export function epochToDate(epoch, timezone) {
  return new Date(new Date(epoch * 1000).toLocaleString("en-US", { timeZone: timezone }));
}
export function defaultAdmitDate(timezone, offset) {
  console.log('default time');
  let date = new Date();
  let t_date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate() + " " + 10 + ":" + 0 + ":" + 0 + " " + offset;
  return new Date(new Date(t_date).toLocaleString("en-US", { timeZone: timezone }));
}

export function convertToDays(minutes) {
  return minutes / (24 * 60);
}
export function monitoringDays(admitDate, dischargeDate, timezone) {
  return Math.round((convertDischargeDate(admitDate, dischargeDate, timezone) - convertAdmitDate(admitDate, timezone))/60);
}
