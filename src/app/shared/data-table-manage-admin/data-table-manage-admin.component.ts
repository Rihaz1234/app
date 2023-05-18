import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { BackendApiService } from "../../services/backendapi.service";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";
import { User } from "../../interfaces/user.interface";
import { SortDirective } from "../../core/directives/sort.directive";
import { InactiveActiveComponent } from "../dialogs/inactive-active/inactive-active.component";
import { select, Store } from "@ngrx/store";
import {
  ManageAdminStoreActions,
  ManageAdminStoreSelectors,
  ManageAdminStoreState
} from "../store/manage-admin";
import {
  LSColumn,
  LSColumnType,
  LSTableConfig,
  TableState
} from "../../life-signals/_models/ls-column.model";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { SnackbarService } from "@services/snackbar.service";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { AuthenticationService } from "@services/authentication.service";
import { environment } from "src/environments/environment";
import {ManageAdminState} from "../store/manage-admin/manage-admin.reducer";

@Component({
  selector: "app-data-table-manage-admin",
  templateUrl: "./data-table-manage-admin.component.html",
  styleUrls: ["./data-table-manage-admin.component.scss"],
})
export class DataTableManageAdminComponent implements OnInit, OnDestroy {
  @ViewChild(SortDirective) sorter: SortDirective;
  @Input() endUrl: string;
  @Output() editCallBack = new EventEmitter<any>();
  @Output() addAdminCallBack = new EventEmitter<any>();
  @Output() resetPasswordCallBack = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<any>();
  adminUser$: Observable<ManageAdminState>;
  adminUserData: User[];
  columns: LSColumn[] = [
    {
      id: "active",
      label: "active",
      headerClass: ["text-start"],
      sortable: false,
      type: LSColumnType.TEXT,
      labelClass: "fw-bold",
      cellClass: [],
      style: "max-width: 163px; width: 163px;",
    },
    {
      id: "adminName",
      label: "adminName",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      cellClass: ["fw-bold", "font-size-16"],
      style: "max-width: 240px; width: 240px;",
    },
    {
      id: "phoneNo",
      label: "phoneNo",
      headerClass: ["text-start"],
      sortable: true,
      type: LSColumnType.TEXT,
      labelClass: "fw-bold",
      cellClass: [],
      style: "max-width: 240px; width: 240px;",
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
  ];
  config: LSTableConfig = {
    id: "manage-admin-table",
    rowSelectEnabled: false,
    actions: {
      header: {
        class: ["d-flex", "align-items-center", "justify-content-end"],
      },
      show: true,
      headerLabel: "",
      class: ["d-flex", "align-items-center", "justify-content-end"],
    },
    translateKey: "manage-admin-table",
    translate: true,
    isActive: (row) => {
      return row.isActive;
    },
    tableState: TableState.DEFAULT
  };
  @Input() source;
  activeUser: Subscription;
  adminUsersSub: Subscription;
  role = "";

  constructor(
    private backendApiService: BackendApiService,
    private dialog: MatDialog,
    private store$: Store<ManageAdminStoreState.ManageAdminState>,
    private snackbar: SnackbarService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.store$.dispatch(
      new ManageAdminStoreActions.LoadManageAdminRequestAction(this.endUrl)
    );

    this.listAdmin();
    this.role = this.authService.getRoles()[0];
  }

  listAdmin() {
    this.adminUser$ = this.store$.select(
      ManageAdminStoreSelectors.selectManageAdminList
    );
    this.adminUsersSub = this.adminUser$.subscribe((response) => {
      this.config.tableState = <TableState>response?.tableState;
        this.adminUserData = response.ADMIN_DATA.map((x) => {
          return {
            ...x,
            adminName: `${x.firstName} ${x.lastName}`,
          };
        });
    });
  }

  toggleSwitch(data, event: MatSlideToggleChange) {
    if (data.isActive) {
      event.source.checked = true;
      this.openActiveInActiveDialogs(event, "INACTIVE", data);
    } else {
      event.source.checked = false;
      if (this.source === "SPA") this.doSubscriptionFormSelector(event, data);
      else this.openActiveInActiveDialogs(event, "ACTIVE", data);
    }
  }

  openAddAdminDialog() {
    this.addAdminCallBack.emit();
  }

  openEditAdminDialog(data) {
    this.editCallBack.emit(data);
  }

  resetPassword(data) {
    this.backendApiService
      .postMapping(
        environment.dataApiUrl + 'users/' + data.id + '/reset-password',
        {}
      )
      .then((response) => {
        if (response.status === "OK") {
          this.openSnackBar("reset_success");
        }
      });
  }

  confirmResetPassword(rowData) {
    const confirm = this.dialog.open(ConfirmDialogComponent, {
      width: "500px",
      maxWidth: "96vw",
      //height: "250px",
      data: {
        body: {
          title: "manage_admin.reset_password",
          text: "manage_admin.reset_password_confirm_message",
        },
      },
      
      disableClose: true,
    });
    confirm.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        this.resetPassword(rowData);
      }
    });
  }

  openSnackBar(message: string) {
    this.snackbar.openSnackBar("manage_admin." + message, "top", "center", true);
  }

  doSubscriptionFormSelector(event, userData) {
    this.activeUser = this.store$
      .pipe(select(ManageAdminStoreSelectors.selectActiveAdmins))
      .subscribe((data) => {
        if (data >= 1) {
          this.snackbar.openSnackBar("error_message.err_already_enabled_spa", "top", "center", true);
        } else {
          this.openActiveInActiveDialogs(event, "ACTIVE", userData);
        }
      });
    this.activeUser.unsubscribe();
  }

  openActiveInActiveDialogs(event, mode, data) {
    const dialogRef = this.dialog.open(InactiveActiveComponent, {
      width: "auto",
      maxWidth: "96vw",
      data: { userData: data, mode: mode },
      
      backdropClass: "backdropBackground",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      event.checked = result;
    });
  }

  ngOnDestroy() {
    if (this.activeUser) {
      this.activeUser.unsubscribe();
    }
    if (this.adminUsersSub) this.adminUsersSub.unsubscribe();
  }
  onSortChange(event) {
    let sort = {
      active: event.active,
      direction: event.direction
    }
    this.sortChange.emit(JSON.stringify(sort));
  }
}
