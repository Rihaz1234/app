import { Component, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ServiceProvider } from "../../manage-service-provider/service-provider.interface";
import { DataTableManageAdminComponent } from "../../../shared/data-table-manage-admin/data-table-manage-admin.component";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { AddEditSpAdminComponent } from "../add-edit-sp-admin/add-edit-sp-admin.component";
import {
  ManageAdminStoreSelectors,
  ManageAdminStoreState,
} from "../../../shared/store/manage-admin";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { SnackbarService } from "@services/snackbar.service";
import { environment } from "src/environments/environment";
import {SuperAdminService} from "../../service/super-admin.service";

@Component({
  selector: "app-manage-admin",
  templateUrl: "./manage-admin.component.html",
  styleUrls: ["./manage-admin.component.scss"],
})
export class ManageAdminComponent implements OnInit, OnDestroy {
  loadPage: boolean;
  serviceProviderData: ServiceProvider;
  endUrl: string;
  idToShow: string;

  @ViewChild(DataTableManageAdminComponent)
  dataTableManageAdminComponent: DataTableManageAdminComponent;
  activeUser: Subscription;
  serviceProviderName;
  adminClone = [];
  adminCloneCopy = [];

  constructor(
    private dialogRef: MatDialogRef<ManageAdminComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store$: Store<ManageAdminStoreState.ManageAdminState>,
    private snackbar: SnackbarService,
    private service: SuperAdminService
  ) {}

  ngOnInit() {
    this.serviceProviderData = this.data.spData || {};
    this.serviceProviderName = this.serviceProviderData?.companyName;
    
    this.endUrl = environment.dataApiUrl + 'service-providers/' +
      this.serviceProviderData?.id + '/users/spa';
    this.getSPACUsers();
  }

  doSubscriptionFormSelector() {
    this.activeUser = this.store$
      .pipe(select(ManageAdminStoreSelectors.selectActiveAdmins))
      .subscribe((data) => {
        if (data === 1) {
          this.snackbar.openSnackBar("error_message.err_already_enabled_spa", "top", "center", true);
        } else {
          this.dialog.open(AddEditSpAdminComponent, {
            width: "802px",
            maxWidth: "95vw",
            data: { spAdmin: undefined, spId: this.serviceProviderData?.id },
            backdropClass: "backdropBackground",
            disableClose: true
          });
        }
      });
    this.activeUser.unsubscribe();
  }

  openAddAdminDialog() {
    this.doSubscriptionFormSelector();
  }
  openEditAdminDialog(data) {
    this.dialog.open(AddEditSpAdminComponent, {
      width: "802px",
      maxWidth: "95vw",
      data: { spAdmin: data, spId: this.serviceProviderData?.id },
      backdropClass: "backdropBackground",
      disableClose: true,
    });
  }

  onClose() {
    this.dialogRef.close();
  }
  getSPACUsers() {
    let url = environment.dataApiUrl + 'service-providers/' +
    this.serviceProviderData?.id + '/users/spac';
    this.service.getSPACloneUsers(url)
        .subscribe((res:any) => {
          if(res.status === 'OK') {
            this.adminClone = res.data;
            this.adminClone = this.adminClone.map(user => {
              return {
                ...user,
                adminName: `${user.firstName} ${user.lastName}`,
                email: user.email || "",
                phoneNo: user.phoneNo || ""
              };
            });
            this.adminCloneCopy = [...this.adminClone];
          }
    });

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

  ngOnDestroy() {
    if (this.activeUser) this.activeUser.unsubscribe();
  }
}
