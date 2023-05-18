import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Observable } from "rxjs";
import {
  MultiPatientRelay,
  UpdateRelay,
} from "../../../interfaces/manage-relays.interface";
import {
  ManageRelaysSelectors,
  ManageRelaysStoreActions,
  ManageRelaysStoreState,
} from "../store";
import { Store } from "@ngrx/store";
import { ManageRelaysService } from "../services/manage-relays.service";
import { MatDialog } from "@angular/material/dialog";
import { QueryParams } from "../../../interfaces/manage-users.interface";
import { ConfirmDialogComponent } from "../../../shared/confirm-dialog/confirm-dialog.component";
import { AddRelayComponent } from "../add-relay/add-relay.component";
import {
  LSColumn,
  LSTableConfig
} from "src/app/life-signals/_models/ls-column.model";
import { Sort } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UserPreferenceService } from "@services/user-preference.service";
import { environment } from "src/environments/environment";
import { SnackbarService } from "@services/snackbar.service";

@Component({
  selector: "app-multi-patient-relays",
  templateUrl: "./multi-patient-relays.component.html",
  styleUrls: ["./multi-patient-relays.component.scss"],
})
export class MultiPatientRelaysComponent
  implements OnInit, OnDestroy, OnChanges
{
  columns: LSColumn[] = [
    {
      id: "relayId",
      sortable: true,
      headerClass: ["text-start", "px-3"],
      cellClass: ["align-left","fw-bold", "bold-text", "px-2"],
    },
    {
      id: "location",
      sortable: true,
      headerClass: ["align-right"],
      cellClass: ["d-flex", "justify-content-end", "align-items-center"],
    },
    {
      id: "createdBy",
      sortable: true,
      headerClass: ["align-left"],
      cellClass: ["text-start"],
    },
    {
      id: "createdDateTime",
      sortable: true,
      headerClass: ["align-left"],
      cellClass: ["text-start"],
    },
    {
      id: "status",
      sortable: true,
      headerClass: ["align-left"],
      cellClass: ["text-start"],
    }
  ];
  constructor(
    private store$: Store<ManageRelaysStoreState.ManageRelaysState>,
    public relayService: ManageRelaysService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private userPreference: UserPreferenceService
  ) { }
  @Input() searchString: string;
  @Output() selected = new EventEmitter<boolean>();
  @Input() public editAccess = false;
  config: LSTableConfig;
  relayList$: Observable<MultiPatientRelay[]>;
  relayCount$: Observable<number>;
  MPRelayList: MultiPatientRelay[];
  cfId: string;
  role: string;
  roles: string[];
  selection: SelectionModel<any> = new SelectionModel<any[]>();
  loader = true;
  loaderSubscription: any;
  editLocation = {};
  valueUpdated = {};
  timeZone: string;
  readonly timeFmt: string = environment.customization.timeFormat;
  ngOnInit(): void {
    this.timeZone = this.userPreference.getUserTimeZone();
    console.log(this.timeZone);
    this.config = {
      id: "manage_relays_module",
      rowSelectEnabled: this.editAccess,
      // actions: {
      //   show: this.editAccess,
      //   headerLabel: "Actions",
      //   style: "text-align:center!important;"
      // },
      sort: {
        active: null,
        direction: null,
      },
      page: {
        pageIndex: 0,
        pageSize: 10,
      },
      paginator: {
        hide: false,
        offline: false,
      },
      
      translate: true,
      translateKey: "manage_relays_module",
    };
    console.log(this.editAccess);
    if(this.editAccess) {
    this.columns.push({
        id: "actions_col",
        sortable: false,
        headerClass: ["align-center"],
        cellClass: ["text-center"],
      });
      this.columns.splice(2, 0, {
        id: "editLocation",
        sortable: false,
        headerClass: ["align-center"],
        cellClass: ["text-center"],
        style: "min-width:40px"
      })
    } else {
      this.columns[1] = {
        id: "location",
        sortable: true,
        headerClass: ["align-left","gc-left"],
        cellClass: ["text-start","gc-left"],
      };
    }
    this.selected.emit(false);
    this.relayList$ = this.store$
      .select(ManageRelaysSelectors.getMPRelayList)
      .pipe(
        map((list: any[]) => {
          return [
            ...(list || []).map((l, i) => {
              return {
                ...l,
                index: i,
                lastActive: l.lastActive * 1000
              };
            }),
          ];
        })
      );
    this.relayList$.subscribe(res => {
      this.selection.clear();
    });
    this.relayCount$ = this.store$.select(
      ManageRelaysSelectors.getMPRelayCount
    );
    this.relayCount$.subscribe((num) => {
      this.config.page.length = num;
    });
    this.loaderSubscription = this.store$
      .select(ManageRelaysSelectors.getLoaderStatus)
      .subscribe((loader) => {
        if (loader) {
          this.loader = false;
        }
      });
    //this.getMPRelayList();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loader = true;
    if(this.config) this.config.page.pageIndex = 0;
    this.getMPRelayList();
  }
  relaysSelected(event: SelectionModel<any[]>) {
    console.log(event);
    this.selection = event;
    if (this.selection.selected.length > 0) {
      this.selected.emit(true);
    } else {
      this.selected.emit(false);
    }
  }
  onSortChange(sort: Sort) {
    // this.loader = true;
    this.config.sort = {
      ...sort,
    };
    this.getMPRelayList();
  }
  showEdit(index) {
    this.editLocation[index] = true;
  }
  hideEdit(index) {
    this.editLocation[index] = false;
  }
  locationValid(location) {
    let regex = /^[a-zA-Z0-9]{1}[a-zA-Z0-9-_ ]*$/;
    let valid = regex.test(location);
    let loc = location.replace(/\s/g, "");
    return loc.length > 0 && valid;
  }
  getDate(timestamp) {
    // const DateString = new Date(timestamp * 1000);
    const DateString = new Date(timestamp);
    const date = DateString.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const time = DateString.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return date + " / " + "<b>" + time + "</b>";
  }
  isSelected(row, selection: SelectionModel<any>) {
    return selection.selected.map(s => s.relayId).includes(row.relayId);
  }
  getMPRelayList() {
    let mpUrl = "";
    let param: QueryParams = {
      url: mpUrl,
      page: this.config?.page?.pageIndex + 1,
      size: this.config?.page?.pageSize,
      sortBy: (this.config?.sort?.direction)? `${this.config?.sort?.active || ""}:${
        this.config?.sort?.direction || ""
      }` : "",
      searchText: this.searchString,
    };
    this.store$.dispatch(
      new ManageRelaysStoreActions.LoadMPRelaysRequestAction({ params: param })
    );
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
  onPage(event: PageEvent) {
    console.log(event);
    this.config.page = {
      ...event,
    };
    this.getMPRelayList();
  }
  onSelectChange(event, relay) {}
  deleteRelays() {
    let body = {
      relayId: this.selection.selected.map((s) => s.relayId),
    };
    this.relayService.deleteRelays(body).subscribe((res: any) => {
      console.log(res);
      if (res.status === "OK") {
        this.loader = true;
        this.selection.clear();
        this.config.page.pageIndex = 0;
        this.getMPRelayList();
        this.snackbar.openCustomSnackBar("manage_relays_module."+res.message, 'bottom', 'center', true);
      } else {
        this.snackbar.openCustomSnackBar("manage_relays_module.operation_failed", 'bottom', 'center', true);
      }
    });
  }
  deleteSingleRelay(relayId) {
    let body = {
      relayId: [relayId],
    };
    this.relayService.deleteRelays(body).subscribe((res: any) => {
      if (res.status === "OK") {
        this.loader = true;
        this.config.page.pageIndex = 0;
        this.getMPRelayList();
        this.snackbar.openCustomSnackBar("manage_relays_module."+res.message, 'bottom', 'center', true);
      } else {
        this.snackbar.openCustomSnackBar("manage_relays_module.operation_failed", 'bottom', 'center', true);
      }
    });
  }
  confirmDelete() {
    const confirm = this.dialog.open(ConfirmDialogComponent, {
      width: "600px",
      maxWidth: "90vw",
      height: "auto",
      minHeight: "100px",
      maxHeight: "90vh",
      data: {
        body: {
          title: "manage_relays_module.delete_relays",
          text: "manage_relays_module.delete_relays_confirm_message",
        },
      },
      disableClose: true,
    });
    confirm.afterClosed().subscribe((data) => {
      if (data) {
        this.deleteRelays();
      }
    });
  }
  confirmSingleRelayDelete(relayId) {
    const confirm = this.dialog.open(ConfirmDialogComponent, {
      width: "600px",
      maxWidth: "90vw",
      height: "auto",
      minHeight: "100px",
      maxHeight: "90vh",
      data: {
        body: {
          title: "manage_relays_module.delete_relays",
          text: "manage_relays_module.delete_relay_confirm_message",
        },
      },
      disableClose: true,
    });
    confirm.afterClosed().subscribe((data) => {
      if (data) {
        this.deleteSingleRelay(relayId);
      }
    });
  }
  save(relay) {
    this.editLocation[relay?.index] = false;
    if (this.valueUpdated[relay?.index]) {
      this.relayService
        .updateRelay(relay)
        .subscribe((response: UpdateRelay) => {
          this.valueUpdated[relay?.index] = false;
          if (response.status === "OK") {
            this.snackbar.openCustomSnackBar("manage_relays_module.relay_updated", 'bottom', 'center', true);
          }
        });
    }
  }
  addRelay() {
    const addRelay = this.dialog.open(AddRelayComponent, {
      width: "600px",
      maxWidth: "90vw",
      height: "auto",
      minHeight: "100px",
      maxHeight: "90vh",
      data: {},
      disableClose: true,
    });
    addRelay.afterClosed().subscribe((data) => {
      console.log(data.data);
      if (!this.isBlank(data.data)) {
        this.loader = true;
        let location = { location: data.data };
        this.relayService.addRelay(location).subscribe((response) => {
          console.log(response);
          if (response.status === "OK") {
            this.getMPRelayList();
          } else {
            this.loader = false;
            this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
          }
        }, error => {
          this.loader = false;
          this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
        });
      }
    });
  }
  locationEdit(index) {
    this.valueUpdated[index] = true;
  }
  getStatus(lastActive) {
    return lastActive > 0 ? "Active" : "Inactive";
  }
  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let key = clipboardData.getData('text');
    let charsOnlyPattern = /^[a-zA-Z0-9-_ ]+$/;
    if (charsOnlyPattern.test(key)) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
  }
  resendOtp(relay) {
    if(relay?.location) {
      let body = {
        location: relay?.location,
        relayId: relay?.relayId
      }
      this.relayService.addRelay(body).subscribe(res => {
        if(res.status === 'OK') {
          this.snackbar.openCustomSnackBar("manage_relays_module.otp_sent", 'bottom', 'center', true);
        } else {
          this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
        }
      }, (error) => {
        if(error.error.message === 'RELAY_ALREADY_ACTIVE') {
          this.snackbar.openCustomSnackBar("manage_relays_module.relay_already_active", 'bottom', 'center', true);
        } else {
          this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
        }
      })
    } else {
      this.snackbar.openSnackBar("manage_relays_module.location_invalid", 'bottom', 'center', true);
    }
  }
  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
  }
  
}
