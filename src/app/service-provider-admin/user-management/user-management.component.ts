import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { AddEditUserManagementComponent } from "src/app/service-provider-admin/dialog/add-edit-user-management/add-edit-user-management.component";
import {
  UserManagementStoreActions,
  UserManagementStoreSelectors,
  UserManagementStoreState,
} from "../store/user-management";
import { Store } from "@ngrx/store";
import { User } from "../../interfaces/user.interface";
import { BackendApiService } from "@services/backendapi.service";
import { EnableDisableComponent } from "../dialog/enable-disable/enable-disable.component";
import {
  LSColumn,
  LSColumnType,
  LSTableConfig,
  TableState,
} from "../../life-signals/_models/ls-column.model";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { SnackbarService } from "@services/snackbar.service";
import { environment } from "src/environments/environment";
import {UserManagementState} from "../store/user-management/user-management.reducer";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit, OnDestroy {
  users$: Observable<UserManagementState>;
  userData: User[];
  columns: LSColumn[] = [
    {
      id: "isActive",
      label: "enable",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      labelClass: "fw-bold",
      cellClass: [],
    },
    {
      id: "id",
      label: "id",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      cellClass: [],
    },
    {
      id: "userName",
      label: "userName",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      cellClass: ["fw-bold", "bold-name"],
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
    {
      id: "roles",
      label: "roles",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      labelClass: "fw-bold",
      cellClass: [],
    },
  ];
  config: LSTableConfig = {
    id: "user-management-table",
    rowSelectEnabled: false,
    actions: {
      header: {
        class: ["d-flex", "align-items-center", "justify-content-end"],
      },
      show: true,
      headerLabel: "",
      class: ["d-flex", "align-items-center", "justify-content-end"],
    },
    translateKey: "user-management-table",
    translate: true,
    isActive: (row) => {
      return row.isActive;
    },
    tableState: TableState.DEFAULT
  };
  usersSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private store$: Store<UserManagementStoreState.UserManagementState>,
    private backendApiService: BackendApiService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.store$.dispatch(
      new UserManagementStoreActions.LoadUserManagementRequestAction()
    );
    this.listUsers();
  }

  listUsers() {
    this.users$ = this.store$.select(
      UserManagementStoreSelectors.selectUserManagementList
    );
    this.usersSub = this.users$.subscribe((response) => {
      this.config.tableState = <TableState>response?.tableState;
        this.userData = response.USER_MANAGEMENT_DATA.map((x) => {
          return {
            ...x,
            userName: `${x.firstName} ${x.lastName}`,
          };
        });
    });
  }

  openAddUserManagementDialog() {
    const dialogRef = this.dialog.open(AddEditUserManagementComponent, {
      width: "800px",
      maxWidth: "95vw",
      data: { userData: undefined },
      
      backdropClass: "backdropBackground",
      disableClose: true,
    });
  }
  openEditUserManagement(data) {
    this.dialog.open(AddEditUserManagementComponent, {
      width: "800px",
      maxWidth: "95vw",
      data: { userData: data },
      
      backdropClass: "backdropBackground",
      disableClose: true,
    });
  }

  resetPassword(data) {
    this.backendApiService
      .postMapping(
        environment.dataApiUrl + 'users/' + data.id + '/reset-password',
        {}
      )
      .then((response) => {
        if (response.status === "OK") {
          this.snackbar.openCustomSnackBar("manage_admin.reset_success", 'bottom', 'center', true);
        }
      });
  }

  toggleSwitch(data, event: MatSlideToggleChange) {
    if (data.isActive) {
      event.source.checked = true;
      const dialogRef = this.dialog.open(EnableDisableComponent, {
        width: "auto",
        data: { userData: data, mode: "DISABLE" },

        backdropClass: "backdropBackground",
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(event.source.checked);
        event.source.checked = result;
      });
    } else {
      event.source.checked = false;
      const dialogRef = this.dialog.open(EnableDisableComponent, {
        width: "auto",
        data: { userData: data, mode: "ENABLE" },
        backdropClass: "backdropBackground",
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        event.source.checked = result;
      });
    }
    // if (event.source.checked === false) {
    //   event.source.checked = !event.source.checked;
    //   const dialogRef = this.dialog.open(EnableDisableComponent, {
    //     width: "auto",
    //     data: { userData: data, mode: "DISABLE" },
    //     backdropClass: "backdropBackground",
    //     disableClose: true,
    //   });
    //
    //   dialogRef.afterClosed().subscribe((result) => {
    //     event.source.checked = result;
    //   });
    // } else {
    //   event.source.checked = !event.source.checked;
    //   const dialogRef = this.dialog.open(EnableDisableComponent, {
    //     width: "auto",
    //     data: { userData: data, mode: "ENABLE" },
    //
    //     backdropClass: "backdropBackground",
    //     disableClose: true,
    //   });
    //
    //   dialogRef.afterClosed().subscribe((result) => {
    //     event.source.checked = result;
    //   });
    // }
  }

  confirmResetPassword(rowData) {
    const confirm = this.dialog.open(ConfirmDialogComponent, {
      width: "500px",
      //height: "250px",
      maxWidth: "95vw",
      data: {
        body: {
          title: "manage_admin.reset_password",
          text: "manage_admin.reset_password_confirm_message",
        },
      },
      
      disableClose: true,
    });
    confirm.afterClosed().subscribe((data) => {
      if (data) {
        this.resetPassword(rowData);
      }
    });
  }

  ngOnDestroy() {
    if (this.usersSub) this.usersSub.unsubscribe();
  }
}
