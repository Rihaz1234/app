import {
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { ManageGroupState } from "src/app/manage-group/store/manage-groups.reducer";
import { ActivePatientManagerService } from "../manager/active-patient-manager.service";
import { ActivePatient } from "../models/active-patients.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ManageGroupsService } from "src/app/manage-group/services/manage-groups.service";
import { Group } from "src/app/manage-group/models/manage-groups.model";

@Component({
  selector: "app-assign-group-modal",
  templateUrl: "./assign-group-modal.component.html",
  styleUrls: ["./assign-group-modal.component.scss"],
})
export class AssignGroupModalComponent implements OnInit {
  assignGroupForm: FormGroup;
  groups$: Observable<ManageGroupState>;
  private cGroup$: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);
  public a_groups$: Observable<Group[]>;
  public locationGroups$: Observable<Group[]>;
  public clinicalGroups$: Observable<Group[]>;
  selectedLocationGroup: Group;
  selectedClinicalGroup: Group;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ActivePatient,
    private dialogRef: MatDialogRef<AssignGroupModalComponent>,
    private manager: ActivePatientManagerService,
    private formBuilder: FormBuilder,
    private manageGroupService: ManageGroupsService
  ) {
    this.selectedLocationGroup = data?.pGroup;
    this.selectedClinicalGroup = data?.cGroup;
    this.a_groups$ = this.cGroup$.asObservable();
    this.locationGroups$ = this.a_groups$.pipe(map((groups: Group[]) => {
      return groups.filter(g => g.type === "PHYSICAL")
    }));
    this.clinicalGroups$ = this.a_groups$.pipe(map((groups: Group[]) => {
      return groups.filter(g => g.type === "CLINICAL")
    }));
  }

  ngOnInit(): void {
    this.loadGroups();
    this.assignGroupForm = this.formBuilder.group({
      pGroup: '',
      clinicalGroup: ''
    })
    if (this.data) {
      this.setSelectedValue();
      console.log(this.data?.pGroup, this.data?.cGroup);
    }
  }

  setSelectedValue() {
    const pGroupId = this.data?.pGroup?.groupId ? this.data?.pGroup?.groupId : this.data?.pGroup?.id ;
    const cGroupId = this.data?.cGroup?.groupId ? this.data?.cGroup?.groupId : this.data?.cGroup?.id;
    this.assignGroupForm.patchValue({ pGroup: pGroupId });
    this.assignGroupForm.patchValue({ clinicalGroup: cGroupId });
  }

  groupsSubscription: Subscription;
  loadGroups() {
    //this.groups$ = this.manager.fetchGroups();
    this.groupsSubscription = this.manageGroupService.fetch().subscribe(groups => {
      if (groups['data'].length > 0) {
        console.log(groups['data']);
        let grps = groups['data'];
        if(!grps.find(group => group.groupId === this.data?.cGroup?.id) && this.data?.cGroup?.id) {
          let patientGroup = {groupId: this.data?.cGroup.id, name: this.data?.cGroup.name, type: 'CLINICAL'};
          grps = [patientGroup, ...grps];
        }
        if(!grps.find(group => group.groupId === this.data?.pGroup?.id) && this.data?.pGroup?.id) {
          let patientGroup = {groupId: this.data?.pGroup?.id, name: this.data?.pGroup?.name, type: 'PHYSICAL'};
          grps = [patientGroup, ...grps];
        }
        this.cGroup$.next(grps);
      }
    })
  }

  getClinicalGroups() {
    return this.groups$.pipe(map(groups => { return groups?.CLINICAL_GROUPS || []; }));
  }

  getLocationGroups() {
    return this.groups$.pipe(map(groups => { return groups?.PHYSICAL_GROUPS || []; }));
  }
  onLocationSelected(event: string) {
    this.assignGroupForm.controls.pGroup.patchValue(event);
  }
  save(formData) {
    const groupData = this.cGroup$.getValue();
    let pGroupObj = null;
    let cGroupObj = null;

    if (formData.value.pGroup === '') {
      pGroupObj = null;
    } else {
      if (groupData?.length > 0) {
        let filteredObj = groupData.filter(x => {
          if (formData.value.pGroup === x.groupId) {
            return x;
          }
        });
        if (filteredObj[0]) {
          let obj = {
            id: filteredObj[0].groupId,
            name: filteredObj[0].name
          }
          pGroupObj = obj;
        } else {
          pGroupObj = null;
        }
      }
    }

    if (formData.value.clinicalGroup === '') {
      cGroupObj = null;
    } else {
      if (groupData?.length > 0) {
        let filteredObj = groupData.filter(x => {
          if (formData.value.clinicalGroup === x.groupId) {
            return x;
          }
        });
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
    }


    let group = {
      pGroup: pGroupObj,
      cGroup: cGroupObj,
    };

    this.dialogRef.close(group);
  }
}
