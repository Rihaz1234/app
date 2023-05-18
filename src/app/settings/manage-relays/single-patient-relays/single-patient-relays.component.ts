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
import { Store } from "@ngrx/store";
import {
  ManageRelaysSelectors,
  ManageRelaysStoreState,
  ManageRelaysStoreActions,
} from "../store";
import { Observable } from "rxjs";
import { SinglePatientRelay } from "../../../interfaces/manage-relays.interface";
import { QueryParams } from "../../../interfaces/manage-users.interface";
import { ManageRelaysService } from "../services/manage-relays.service";
import { ConfirmDialogComponent } from "../../../shared/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {
  LSColumn,
  LSTableConfig,
} from "src/app/life-signals/_models/ls-column.model";
import { Sort } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UserPreferenceService } from "@services/user-preference.service";
import { environment } from "src/environments/environment";
import { SnackbarService } from "@services/snackbar.service";

@Component({
  selector: "app-single-patient-relays",
  templateUrl: "./single-patient-relays.component.html",
  styleUrls: ["./single-patient-relays.component.scss"],
})
export class SinglePatientRelaysComponent
  implements OnInit, OnChanges, OnDestroy
{
  constructor(
    private store$: Store<ManageRelaysStoreState.ManageRelaysState>,
    private relayService: ManageRelaysService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private userPreference: UserPreferenceService
  ) {}
  @Input() searchString: string;
  @Input() private delete!: EventEmitter<boolean>;
  @Input() public editAccess = false;
  @Output() selected = new EventEmitter<boolean>();
  relayList$: Observable<SinglePatientRelay[]>;
  relayCount$: Observable<number>;
  SPRelayList: SinglePatientRelay[];
  cfId: string;
  role: string;
  roles: string[];
  singlePatientRelayList: SinglePatientRelay[];
  loader = true;
  loaderSubscription: any;
  relayIds = [];
  selection: SelectionModel<any>= new SelectionModel<any[]>();
  config: LSTableConfig = {
    id: "manage_relays_module",
    rowSelectEnabled: false,
    actions: {
      show: false,
    },
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
  }

  columns: LSColumn[] = [
    {
      id: "relayId",
      sortable: true,
      headerClass: ["text-start", "px-3"],
      cellClass: ["align-left","bold-text", "px-2"],
    },
    {
      id: "biosensorID",
      headerClass: ["text-start", "px-4"],
      sortable: true,
      cellClass: ["d-flex", "justify-content-left", "px-3"],
    },
    {
      id: "firstName",
      sortable: true,
      headerClass: ["align-left"],
      cellClass: ["align-left"],
    },
    {
      id: "email",
      label:"email",
      sortable: true,
      headerClass: ["align-left"],
      cellClass: ["align-left"],
    },
    {
      id: "createdDateTime",
      sortable: true,
      headerClass: ["align-left"],
      cellClass: ["align-left"],
    },
    {
      id: "lastActive",
      sortable: true,
      headerClass: ["align-left"],
      cellClass: ["align-left"],
    },
  ];
  timeZone: string;
  readonly timeFmt: string = environment.customization.timeFormat;
  ngOnInit(): void {
    this.config.rowSelectEnabled = this.editAccess;
    this.timeZone = this.userPreference.getUserTimeZone();
    this.relayIds = [];
    this.selected.emit(false);
    this.relayList$ = this.store$
      .select(ManageRelaysSelectors.getSPRelayList)
      .pipe(
        map((res: any) => {
          return res?.map(r => {
            return {
              ...r,
              lastActive: r.lastActive * 1000
            }
          });
        })
      );
    this.relayList$.subscribe(res => {
      this.selection.clear();
    });
    this.relayCount$ = this.store$.select(
      ManageRelaysSelectors.getSPRelayCount
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
    //this.getSPRelayList();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loader = true;
    if(this.config) this.config.page.pageIndex = 0;
    this.getSPRelayList();
  }
  relaysSelected(event) {
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
    // this.config.page.pageIndex = 0;
    this.config.sort = {
      ...sort,
    };
    this.getSPRelayList();
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
    });
    return `${date} / ${time}`;
  }
  isSelected(row, selection: SelectionModel<any>) {
    return selection.selected.map(s => s.relayId).includes(row.relayId);
  }
  getSPRelayList() {
    let url = "relays/sprlist";
    let param: QueryParams = {
      url: url,
      page: this.config.page.pageIndex + 1,
      size: this.config.page.pageSize,
      sortBy: (this.config?.sort?.direction)? `${this.config?.sort?.active || ""}:${
        this.config?.sort?.direction || ""
      }`: "",
      searchText: this.searchString,
    };
    this.store$.dispatch(
      new ManageRelaysStoreActions.LoadSPRelaysRequestAction({ params: param })
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
    this.config.page = {
      ...event,
    };
    this.getSPRelayList();
  }
  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
  }
  onCheckboxChange(event, relayId) {
    if (event.checked) {
      this.relayIds.push(relayId);
    } else {
      this.relayIds = this.relayIds.filter((relayid) => relayid !== relayId);
    }
  }
  deleteRelays() {
    let body = {
      relayId: this.selection.selected.map((s) => s.relayId),
    };
    this.relayService.deleteRelays(body).subscribe((res: any) => {
      console.log(res);
      if (res.status === "OK") {
        this.loader = true;
        this.relayIds = [];
        this.config.page.pageIndex = 0;
        this.getSPRelayList();
        this.snackbar.openCustomSnackBar("manage_relays_module." + res.message, 'bottom', 'center', true);

      } else {
        this.snackbar.openCustomSnackBar("manage_relays_module.operation_failed", 'bottom', 'center', true);
      }
    });
  }
  ifChecked(relayId) {
    return this.relayIds.indexOf(relayId) > -1;
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
}
