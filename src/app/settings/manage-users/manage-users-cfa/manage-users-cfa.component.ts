import { Component, OnDestroy, OnInit } from "@angular/core";
import { EdituserComponent } from "src/app/settings/manage-users/edituser/edituser.component";
import { AdduserComponent } from "src/app/settings/manage-users/adduser/adduser.component";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  CFUser,
  QueryParams,
} from "../../../interfaces/manage-users.interface";
import {
  ManageUsersSelectors,
  ManageUsersStoreState,
  ManageUsersStoreActions,
} from "../store";
import { AuthenticationService } from "@services/authentication.service";
import { ManageUsersService } from "../services/manage-users.service";
import { ConfirmDialogComponent } from "../../../shared/confirm-dialog/confirm-dialog.component";
import {
  LSColumn,
  LSTableConfig,
} from "src/app/life-signals/_models/ls-column.model";
import { Sort } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";
import { RenameRolesComponent } from "../rename-roles/rename-roles.component";
import { SnackbarService } from "@services/snackbar.service";

@Component({
  selector: "app-manage-users-cfa",
  templateUrl: "./manage-users-cfa.component.html",
  styleUrls: ["./manage-users-cfa.component.scss"],
})
export class ManageUsersCFAComponent implements OnInit, OnDestroy {
  userEditAccess = false;
  config: LSTableConfig = {
    id: "manage_users_module.table",
    rowSelectEnabled: false,
    // actions: {
    //   show: true,
    //   class: ["d-flex", "align-items-center", "justify-content-start"],
    //   headerLabel: "Actions",
    //   header: {
    //     style: "width: 250px",
    //   },
    // },
    page: {
      pageIndex: 0,
      pageSize: 10,
    },
    paginator: {
      hide: false,
      offline: false,
    },
    sort: {
      active: null,
      direction: null,
    },
    translate: true,
    translateKey: "manage_users_module.table",
    isActive: (user) => {
      return user.isActive;
    },
  };
  columns: LSColumn[] = [
    {
      id: "enabled",
      label: "",
      sortable: false,
    },
    {
      id: "userId",
      sortable: true,
      headerClass: ["align-left"]
    },
    {
      id: "firstName",
      sortable: true,
      headerClass: ["align-left"],
      cellClass: ["font-size-16"],
      style: "max-width: 300px; width: 300px;",
    },
    {
      id: "email",
      sortable: true,
      headerClass: ["align-left"],
      cellClass: ["text-left","text-truncate"],
      style: "max-width: 220px; width: 220px;",
    },
    {
      id: "phoneNo",
      sortable: true,
      headerClass: ["align-left"],
      cellClass: ["text-left"]
    },
    {
      id: "roles",
      sortable: true,
      headerClass: ["align-left"],
      cellClass: ["text-left"],
      style: "min-width: 150px",
    },
    {
      id: "actions_col",
      sortable: false,
      headerClass: ["align-left"],
      cellClass: ["text-start"],
      style: "width: 250px",
    }
  ];
  constructor(
    private dialog: MatDialog,
    private store$: Store<ManageUsersStoreState.ManageUsersState>,
    private autheticationService: AuthenticationService,
    private usersService: ManageUsersService,
    private snackbar: SnackbarService
  ) { }

  usersList$: Observable<CFUser[]>;
  cfId: string;
  role: string;
  roles: string[];
  loader = true;
  searchText = "";
  adminUsersList: CFUser[];
  usersCount$;
  loaderSubscription;
  ngOnInit() {
    this.cfId = this.autheticationService.getCfId();
    this.roles = this.autheticationService.getRoles() || [];
    if (this.roles?.indexOf("CFA") > -1 || this.roles?.indexOf("CFAC") > -1) {
      this.role = "CFA";
      this.userEditAccess = true;
    } else if (this.roles?.indexOf("SC") > -1) {
      this.role = "SC";
    } else {
      this.role = this.roles[0];
    }
    this.usersList$ = this.store$.select(ManageUsersSelectors.getUsersList);
    this.getUsersList();
    this.store$.select(ManageUsersSelectors.getTableStatus)
      .subscribe(tableState => {
        this.config = {
          ...this.config,
          tableState
        }
      });
    this.usersCount$ = this.store$.select(ManageUsersSelectors.getUsersCount);
    this.usersCount$.subscribe((num) => {
      this.config.page.length = num;
    });
  }
  addUser() {
    const Adduser = this.dialog.open(AdduserComponent, {
      autoFocus: false,
      maxWidth: "90vw",
      width: "700px",
      height: "auto",
      maxHeight: "95vh",
      data: { dialogueData: {} },
      disableClose: true,
    });
    Adduser.afterClosed().subscribe((data) => {
      if (data) {
        this.loader = true;
        this.config.page.pageIndex = 0;
        this.getUsersList();
      }
    });
  }

  editUser(userId) {
    let Edituser;
    this.usersService.getUser(userId).subscribe((res: any) => {
      if (res.data.isActive || this.userEditAccess) {
        Edituser = this.dialog.open(EdituserComponent, {
          maxWidth: "90vw",
          width: "700px",
          height: "auto",
          maxHeight: "95vh",
          data: { userData: userId, editAccess: this.userEditAccess },
          disableClose: true,
        });
        Edituser.afterClosed().subscribe((data) => {
          if (data) {
            this.getUsersList();
          }
        });
      } else {
        this.snackbar.openCustomSnackBar("manage_users_module.user_disabled", 'bottom', 'center', true);
      }
    });
  }
  getUsersList() {
    console.log(this.config);
    let url = "clinical-facilities/" + this.cfId + "/users";
    let param: QueryParams = {
      url: url,
      page: this.config?.page?.pageIndex + 1,
      size: this.config?.page?.pageSize,
      sortBy: (this.config?.sort?.direction) ? `${this.config?.sort?.active || ""}:${this.config?.sort?.direction || ""
        }` : "",
      searchText: this.searchText,
    };
    console.log(param);
    this.store$.dispatch(
      new ManageUsersStoreActions.LoadAdminUsersRequestAction({ params: param })
    );
  }
  sort(event: Sort) {
    this.config.sort = {
      ...event,
    };
    this.getUsersList();
  }
  search() {
    this.loader = true;
    this.config.page.pageIndex = 0;
    this.getUsersList();
  }
  clear() {
    this.searchText = '';
    this.search();
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
  changeUserStatus(user, event) {
    if (event.checked) {
      this.usersService.enableUser(user.id).subscribe(
        (res: any) => {
          user.isActive = true;
          this.snackbar.openCustomSnackBar("manage_users_module."+res.message, 'bottom', 'center', true);
        },
        (err) => {
          this.snackbar.openCustomSnackBar("manage_users_module.update_failed", 'bottom', 'center', true);
          user.isActive = false;
        }
      );
    } else {
      this.usersService.disableUser(user.id).subscribe(
        (res: any) => {
          user.isActive = false;
          this.snackbar.openCustomSnackBar("manage_users_module."+res.message, 'bottom', 'center', true);
        },
        (err) => {
          this.snackbar.openCustomSnackBar("manage_users_module.update_failed", 'bottom', 'center', true);
          user.isActive = true;
        }
      );
    }
  }
  resetPassword(userId) {
    this.usersService.resetPassword(userId).subscribe((response: any) => {
      if (response.status === "OK") {
        this.snackbar.openCustomSnackBar("manage_users_module.Reset_success", 'bottom', 'center', true);
      }
    });
  }
  confirmResetPassword(userId) {
    const confirm = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "85vw",
      height: "auto",
      maxHeight: "90vh",
      data: {
        body: {
          title: "manage_users_module.reset_password",
          text: "manage_users_module.reset_password_confirm_message",
        },
      },
      disableClose: true,
    });
    confirm.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        this.resetPassword(userId);
      }
    });
  }
  confirmEnableDisable(user, event) {
    const confirm = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "85vw",
      height: "auto",
      maxHeight: "90vh",
      data: {
        body: {
          title: "manage_users_module.change_status",
          text: "manage_users_module.change_status_confirm_message",
        },
      },
      disableClose: true,
    });
    confirm.afterClosed().subscribe((data) => {
      if (data) {
        this.changeUserStatus(user, event);
      } else {
        user.isActive = !event.checked;
      }
    });
  }
  onPage(event: PageEvent) {
    // this.loader = true;
    this.config.page = {
      ...event,
    };
    this.getUsersList();
  }
  ngOnDestroy() {
    if (this.loaderSubscription)
      this.loaderSubscription.unsubscribe();
  }
  renameRoles() {
    const renameRoles = this.dialog.open(RenameRolesComponent, {
      maxWidth: "96vw",
      width: "900px",
      height: "auto",
      maxHeight: "95vh",
      disableClose: true,
    });
    renameRoles.afterClosed().subscribe((data) => {
      if (data) {
        this.loader = true;
        this.getUsersList();
      }
    });
  }
}
