import {Component, OnDestroy, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {AddEditServiceProviderComponent} from "src/app/super-admin/dialog/add-edit-service-provider/add-edit-service-provider.component";
import {ManageAdminComponent} from "src/app/super-admin/dialog/manage-admin/manage-admin.component";
import {Store} from "@ngrx/store";
import {
  ManageServiceProvideStoreActions,
  ManageServiceProvideStoreSelectors,
  ManageServiceProvideStoreState,
} from "../store/manage-service-provider";
import {ServiceProvider} from "./service-provider.interface";
import {Observable, Subscription} from "rxjs";
import {LSColumn, LSColumnType, LSTableConfig, TableState,} from "../../life-signals/_models/ls-column.model";
import {ServiceProviderState} from "../store/manage-service-provider/manage-service-provider.reducer";

@Component({
  selector: "app-manage-service-provider",
  templateUrl: "./manage-service-provider.component.html",
  styleUrls: ["./manage-service-provider.component.scss"],
})
export class ManageServiceProviderComponent implements OnInit, OnDestroy {
  companySortEnabled = true;
  contactPersonSortEnabled = false;
  dataLength;
  serviceProvider$: Observable<ServiceProviderState>;
  serviceProviderData: ServiceProvider[];

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
      id: "companyName",
      label: "companyName",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      cellClass: ["fw-bold" ,"font-size-16"],
      style: "max-width: 450px; width: 450px;",
     
    },
    {
      id: "contactPerson",
      label: "contactPerson",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      labelClass: "fw-bold",
      cellClass: ["bold-name"],
      style: "max-width: 300px; width: 300px;",
    },
    {
      id: "email",
      label: "email",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      labelClass: "fw-bold",
      cellClass: [],
    },
    {
      id: "phoneNo",
      label: "phoneNo",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      labelClass: "fw-bold",
      cellClass: [],
    },
  ];
  config: LSTableConfig = {
    id: "manage-service-provider-table",
    rowSelectEnabled: false,
    actions: {
      header: {
        class: ["d-flex", "align-items-center", "justify-content-end"],
      },
      show: true,
      headerLabel: "",
      class: ["d-flex", "align-items-center", "justify-content-end"],
    },
    page: {
      pageSize: 10,
      pageIndex: 0,
    },
    paginator: {
      hide: false,
      offline: true,
    },
    translateKey: "manage-service-provider-table",
    translate: true,
    tableState: TableState.DEFAULT
  };
  serviceProviderSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private store$: Store<ManageServiceProvideStoreState.ServiceProviderState>
  ) {}

  ngOnInit() {
    this.getServiceProviders();
    this.listServiceProviders();
  }

  getServiceProviders() {
    this.store$.dispatch(
        new ManageServiceProvideStoreActions.LoadServiceProviderRequestAction()
    );
  }

  listServiceProviders() {
    this.serviceProvider$ = this.store$.select(
      ManageServiceProvideStoreSelectors.selectManageServiceProviderList
    );
    this.serviceProviderSub = this.serviceProvider$.subscribe((response) => {
      this.config.tableState = <TableState>response?.tableState;
        this.config.page.length = response?.SERVICE_PROVIDER_DATA?.length;
        this.serviceProviderData = response?.SERVICE_PROVIDER_DATA?.map((x) => {
          return {
            ...x,
            contactPerson: `${x.firstName} ${x.lastName}`,
          };
        });
    });
  }

  trackBy(_: number, serviceProvider: ServiceProvider) {
    return serviceProvider.companyName;
  }

  openAddServiceProviderDialog() {
    this.dialog.open(AddEditServiceProviderComponent, {
      width: "800px",
      maxWidth: "95vw",
      //  height: '650px',
      data: { spData: undefined },
      
      backdropClass: "backdropBackground",
      disableClose: true,
    });
  }
  openEditServiceProvider(data) {
    this.dialog.open(AddEditServiceProviderComponent, {
      width: "800px",
      maxWidth: "95vw",
      // height: '550px',
      data: { spData: data },
      
      backdropClass: "backdropBackground",
      disableClose: true,
    }).afterClosed().subscribe((data) => {
      setTimeout(() => this.getServiceProviders(), 2000);
    })
  }
  openManageAdmin(data) {
    this.dialog.open(ManageAdminComponent, {
      maxWidth: "100vw",
      //  maxHeight: '100vh',
      // height: '100%',
      width: "95vw",
      //  height: '50vw',
      data: { spData: data },
      
      backdropClass: "backdropBackground",
      disableClose: true,
    });
  }

  ngOnDestroy() {
    if (this.serviceProviderSub) this.serviceProviderSub.unsubscribe();
  }
}
