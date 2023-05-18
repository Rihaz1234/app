import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Group } from "src/app/manage-group/models/manage-groups.model";
import { DOCTORS } from "../models/active-patients.model";
import {
  ActivePatientsStoreState,
  ActivePatientsStoreActions,
  ActivePatientsStoreSelectors,
} from "../store";
import {
  ManageGroupsStoreActions,
  ManageGroupsStoreSelectors,
  ManageGroupsStoreState,
} from "./../../manage-group/store";
@Injectable({
  providedIn: "root",
})
export class ActivePatientManagerService {
  activePatients$: Observable<ActivePatientsStoreState.State>;
  unAssignedPatients$: Observable<ActivePatientsStoreState.State>;
  selectedPatientIds$: Observable<String[]>;
  doctors$: Observable<DOCTORS[]>;
  patientIds: Array<string> = new Array();
  groups$: Observable<Group[]>;

  constructor(
    private activePatientstore$: Store<ActivePatientsStoreState.State>,
    private manageServiceStore$: Store<ManageGroupsStoreState.ManageGroupState>
  ) { }

  getActivePatient(url: string) {
    this.activePatientstore$.dispatch(
      new ActivePatientsStoreActions.LoadActivePatientsRequestAction({ url })
    );
  }

  selectActivePatient(): Observable<ActivePatientsStoreState.State> {
    this.activePatients$ = this.activePatientstore$.select(
      ActivePatientsStoreSelectors.selectActivePatientsList
    );
    return this.activePatients$;
  }

  updatePatient(patient) {
    this.activePatientstore$.dispatch(
      new ActivePatientsStoreActions.UpdatePatientRequestAction(patient)
    );
    return this.selectActivePatient();
  }

  createPatient(patient) {
    this.activePatientstore$.dispatch(
      new ActivePatientsStoreActions.CreateNewPatientRequestAction(patient)
    );
    return this.activePatientstore$.select(ActivePatientsStoreSelectors.createNewPatient);
  }

  dischargePatient(patientId) {
    this.activePatientstore$.dispatch(
      new ActivePatientsStoreActions.DischargePatientRequestAction(patientId)
    );
  }

  getDoctorsList(): Observable<DOCTORS[]> {
    this.activePatientstore$.dispatch(
      new ActivePatientsStoreActions.LoadDoctorsListRequestAction()
    );
    this.doctors$ = this.activePatientstore$.select(
      ActivePatientsStoreSelectors.doctorsList
    );
    return this.doctors$;
  }

  stopMonitoring(patientId) {
    this.activePatientstore$.dispatch(
      new ActivePatientsStoreActions.StopMonitoringRequestAction(patientId)
    );
  }

  fetchGroups() {
    this.manageServiceStore$.dispatch(
      new ManageGroupsStoreActions.LoadGroupsRequestAction()
    );
    return this.manageServiceStore$.select(
      ManageGroupsStoreSelectors.selectGroupsList
    );
  }

  assignGroup(groups) {
    // this.manageServiceStore$.dispatch(
    //   new ManageGroupsStoreActions.SaveGroupRequestAction(groups)
    // );
    this.activePatientstore$.dispatch(
      new ActivePatientsStoreActions.AssignGroupRequestAction(groups)
    )

    // return this.manageServiceStore$.select(
    //   ManageGroupsStoreSelectors.selectGroupsList
    // );
    return this.activePatientstore$.select(ActivePatientsStoreSelectors.assignGroupPatient);
  }

  // assignGroupToPatient(patient, groups) {
  //   this.assignGroup(groups).subscribe(g => {
  //     if(g?.CLINICAL_GROUPS && groups.cGroup) {
  //       const obj = {
  //         id: g?.CLINICAL_GROUPS[0]?.groupId,
  //         name: g?.CLINICAL_GROUPS[0]?.name
  //       }
  //       patient.cGroup = obj;
  //     }else{
  //       patient.cGroup = null;
  //     }
  //     if(g?.PHYSICAL_GROUPS && groups.pGroup) {
  //       const obj = {
  //         id: g?.PHYSICAL_GROUPS[0]?.groupId,
  //         name: g?.PHYSICAL_GROUPS[0]?.name
  //       }
  //       patient.pGroup = obj;
  //     }else{
  //       patient.pGroup = null;
  //     }  
  //   });
  // }

  fetchUnAssignedPatientsData(url) {
    this.activePatientstore$.dispatch(
      new ActivePatientsStoreActions.LoadUnassignedPatientsRequestAction({ url })
    );
  }

  selectUnassignedPatients() {
    this.unAssignedPatients$ = this.activePatientstore$.select(
      ActivePatientsStoreSelectors.selectUnassignedPatientsList
    );
    return this.unAssignedPatients$;
  }

  setSelectedTab(tab:string) {
    this.activePatientstore$.dispatch(new ActivePatientsStoreActions.SetSelectedTabRequestAction(tab));
  }

  getSelectedTab() {
    return this.activePatientstore$.select(ActivePatientsStoreSelectors.selectedTab);
  }
}
