import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { DataTableManageAdminComponent } from "../../../shared/data-table-manage-admin/data-table-manage-admin.component";
import { ClinicalFacility } from "../../clinical-facility-management/clinical-facility.interface";
import { AddEditCfaComponent } from "../add-edit-cfa/add-edit-cfa.component";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { environment } from "src/environments/environment";
import {ClinicalFacilityService} from "../../service/clinical-facility.service";
import {Store} from "@ngrx/store";
import {
  ClinicalFacilityStoreActions,
  ClinicalFacilityStoreSelectors,
  ClinicalFacilityStoreState
} from "../../store/clinical-facility-management";

@Component({
  selector: "app-manage-cf-admin",
  templateUrl: "./manage-cf-admin.component.html",
  styleUrls: ["./manage-cf-admin.component.scss"],
})
export class ManageCfAdminComponent implements OnInit {
  loadPage: boolean;
  clinicalFacilityData: ClinicalFacility;
  endUrl: string;
  clinicalFacilityName;
  adminClone = [];
  adminCloneCopy = [];

  @ViewChild(DataTableManageAdminComponent, { static: false })
  dataTableManageAdminComponent: DataTableManageAdminComponent;

  constructor(
    public dialogRef: MatDialogRef<ManageCfAdminComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store$: Store<ClinicalFacilityStoreState.ClinicalFacilityState>
  ) {}

  ngOnInit() {
    this.clinicalFacilityData = this.data.clinicalFacilityData || {};
    this.clinicalFacilityName = this.clinicalFacilityData?.name || "";
    this.endUrl = environment.dataApiUrl + 'clinical-facilities/'+ 
      this.clinicalFacilityData?.id +'/users/cfa'
    this.getAdminCloneUsers();
    this.store$.select(
        ClinicalFacilityStoreSelectors.getClinicalFacilityAdminClone
    ).subscribe(users => {
      this.adminClone = users.map(x => {
        return {
          ...x,
          adminName: `${x.firstName} ${x.lastName}`,
        };
      });
      this.adminCloneCopy = [...this.adminClone];

    });
  }

  openAddAdminDialog() {
    this.dialog.open(AddEditCfaComponent, {
      width: "802px",
      maxWidth: "95vw",
      data: { cfAdmin: undefined, cfId: this.clinicalFacilityData?.id },
      
      backdropClass: "backdropBackground",
      disableClose: true,
    });
  }

  openEditAdminDialog(data) {
    this.dialog.open(AddEditCfaComponent, {
      width: "802px",
      maxWidth: "95vw",
      data: { cfAdmin: data, cfId: this.clinicalFacilityData?.id },
      
      backdropClass: "backdropBackground",
      disableClose: true,
    });
  }
  getAdminCloneUsers() {
  this.store$.dispatch(
      new ClinicalFacilityStoreActions.LoadFacilityAdminCloneRequestAction({cfId: this.clinicalFacilityData?.id})
  );

  }
  onClose() {
    this.dialogRef.close();
  }
  onSortChange(sortObject) {
    let sort = JSON.parse(sortObject);
    if (sort.direction === 'desc') {
      this.adminClone = this.adminClone.sort((a, b) => {
        if (a[sort.active] > b[sort.active]) return -1;
        else if (a[sort.active] < b[sort.active]) return 1;
        else return 0;
      });
    } else if (sort.direction === 'asc') {
      this.adminClone = this.adminClone.sort((a, b) => {
        if (a[sort.active] > b[sort.active]) return 1;
        else if (a[sort.active] < b[sort.active]) return -1;
        else return 0;
      });
    } else {
      this.adminClone = [...this.adminCloneCopy];
    }
  }
}
