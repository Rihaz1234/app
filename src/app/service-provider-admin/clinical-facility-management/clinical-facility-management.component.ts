import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { AddEditFacilityComponent } from "../dialog/add-edit-facility/add-edit-facility.component";
import { ManageCfAdminComponent } from "src/app/service-provider-admin/dialog/manage-cf-admin/manage-cf-admin.component";
import {
  ClinicalFacility,
} from "src/app/service-provider-admin/clinical-facility-management/clinical-facility.interface";
import { Store } from "@ngrx/store";
import {
  ClinicalFacilityStoreActions,
  ClinicalFacilityStoreSelectors,
  ClinicalFacilityStoreState,
} from "../store/clinical-facility-management";
import {
  LSColumn,
  LSColumnType,
  LSTableConfig,
  TableState,
} from "../../life-signals/_models/ls-column.model";
import {ClinicalFacilityState} from "../store/clinical-facility-management/clinical-facility-management.reducer";

@Component({
  selector: "app-clinical-facility-management",
  templateUrl: "./clinical-facility-management.component.html",
  styleUrls: ["./clinical-facility-management.component.scss"],
})
export class ClinicalFacilityManagementComponent implements OnInit, OnDestroy {
  clinicalFacility$: Observable<ClinicalFacilityState>;
  clinicalFacilityData: ClinicalFacility[];
  columns: LSColumn[] = [
    {
      id: "id",
      label: "id",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      //labelClass: "fw-bold",
      cellClass: [],
    },
    {
      id: "facilityName",
      label: "facilityName",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      cellClass: ["fw-bold", "font-size-16"],
      style: "max-width: 250px; width: 250px;",
    },
    {
      id: "location",
      label: "location",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      cellClass: ["fw-bold"],
    },
    {
      id: "contactName",
      label: "contactName",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      cellClass: ["fw-bold", "bold-name"],
      style: "max-width: 220px; width: 220px;",
    },
    {
      id: "contactDetails",
      label: "contactDetails",
      headerClass: ["text-start"],
      sortable: false,
      type: LSColumnType.TEXT,
      //cellClass: ["fw-bold"],
    },
    {
      id: "dataStorageMode",
      label: "dataStorage",
     headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      labelClass: "fw-bold",
      cellClass: ["d-flex", "align-items-center", "justify-content-start"],
    },
  ];
  config: LSTableConfig = {
    id: "cf-table",
    rowSelectEnabled: false,
    actions: {
      header: {
        class: ["d-flex", "align-items-center", "justify-content-end"],
      },
      show: true,
      headerLabel: "",
      class: ["d-flex", "align-items-center", "justify-content-end"],
    },
    translateKey: "cf-table",
    translate: true,
    tableState: TableState.DEFAULT
  };
  clinicalFacilitySub: Subscription;

  constructor(
    private dialog: MatDialog,
    private store$: Store<ClinicalFacilityStoreState.ClinicalFacilityState>
  ) { }

  ngOnInit() {
    this.store$.dispatch(
      new ClinicalFacilityStoreActions.LoadClinicalFacilityRequestAction()
    );
    this.listFacility();
  }

  listFacility() {
    this.clinicalFacility$ = this.store$.select(
      ClinicalFacilityStoreSelectors.selectClinicalFacilityList
    );

    this.clinicalFacilitySub = this.clinicalFacility$.subscribe((response) => {
      this.config.tableState = <TableState>response?.tableState;
        this.clinicalFacilityData = response.CLINICAL_FACILITY_DATA.map((x) => {
          return {
            ...x,
            facilityName: `${x.name}`,
            location: `${x.city}`,
            contactName: `${x?.firstName || ''} ${x?.lastName || ''}`,
          };
        });
    });
  }

  openAddFacilityDialog() {
    this.dialog.open(AddEditFacilityComponent, {
      width: "800px",
      maxWidth: "95vw",
      // height: '900px',
      data: { clinicalFacilityData: undefined },

      backdropClass: "backdropBackground",
      disableClose: true,
    });
  }
  openEditFacility(data) {
    this.dialog.open(AddEditFacilityComponent, {
      width: "800px",
      maxWidth: "95vw",
      // height: '550px',
      data: { clinicalFacilityData: data },

      backdropClass: "backdropBackground",
      disableClose: true,
    });
  }
  openManageAdmin(data) {
    this.dialog.open(ManageCfAdminComponent, {
      maxWidth: "100vw",
      //  maxHeight: '100vh',
      // height: '100%',
      width: "95vw",
      //  height: '50vw',
      data: { clinicalFacilityData: data },

      backdropClass: "backdropBackground",
      disableClose: true,
    });
  }

  ngOnDestroy() {
    if (this.clinicalFacilitySub) this.clinicalFacilitySub.unsubscribe();
  }
}
