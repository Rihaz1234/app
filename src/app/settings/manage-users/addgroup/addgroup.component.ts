import { Component, Inject, OnInit } from "@angular/core";
import { AuthenticationService } from "@services/authentication.service";
import { ManageUsersService } from "../services/manage-users.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Group } from "src/app/manage-group/models/manage-groups.model";

interface Location {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-addgroup",
  templateUrl: "./addgroup.component.html",
  styleUrls: ["./addgroup.component.scss"],
})
export class AddgroupComponent implements OnInit {
  constructor(
    private autheticationService: AuthenticationService,
    private manageUserService: ManageUsersService,
    private dialogRef: MatDialogRef<MatDialogRef<any>>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  cfId: string;
  groups: Group[];
  clinicalGroups: Group[];
  locationGroups: Group[];
  selectedClinicalGroup;
  selectedLocationGroup;
  submitted = false;
  selGroups: Group[] = [];
  clinicalGroupExists = false;
  locationGroupExists = false;
  ngOnInit() {
    this.selGroups = this.data.data?.selectedGroups;
    console.log(this.selGroups);
    this.cfId = this.autheticationService.getCfId();
    this.manageUserService.getGroups(this.cfId).subscribe((response) => {
      console.log(response);
      if (response.status === "OK") {
        this.groups = response.data;
        this.selGroups.forEach(group => {
          this.groups = this.groups.filter(grp => group.groupId !== grp.groupId);
          this.groups = this.groups.filter(grp =>  grp?.Ancestors?.indexOf(group.groupId) == -1 );
        })
        this.clinicalGroups = this.groups.filter(group => group.type === 'CLINICAL');
        this.locationGroups = this.groups.filter(group => group.type === 'PHYSICAL');
      }
    });
  }
  groupChange(groupId, type) {
    if (type === 'LOCATION') {
      this.selectedLocationGroup = groupId;
    } else if (type === 'CLINICAL') {
      this.selectedClinicalGroup = groupId;
    }
    this.clinicalGroupExists = false;
    this.locationGroupExists = false;
    this.selGroups.forEach((group) => {
      if (group.groupId === this.selectedClinicalGroup) {
        this.clinicalGroupExists = true;
      }
      if (group.groupId === this.selectedLocationGroup) {
        this.locationGroupExists = true;
      }
    });
  }
  save() {
    this.clinicalGroupExists = false;
    this.locationGroupExists = false;
    this.submitted = true;
    if (this.isBlank(this.selectedClinicalGroup) && this.isBlank(this.selectedLocationGroup)) {
      return;
    }
    let selectedgroups = [];
    if (this.selectedLocationGroup) {
      selectedgroups.push(this.selectedLocationGroup);
    }
    if (this.selectedClinicalGroup) {
      selectedgroups.push(this.selectedClinicalGroup);
    }
    this.dialogRef.close({ data: selectedgroups });
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
}
