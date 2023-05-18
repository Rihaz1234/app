import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {Store} from "@ngrx/store";
import {ManageRelaysSelectors, ManageRelaysStoreActions, ManageRelaysStoreState} from "../store";
import {Observable} from "rxjs";
import {SinglePatientRelay} from "../../../interfaces/manage-relays.interface";
import {LSColumn, LSTableConfig} from "../../../life-signals/_models/ls-column.model";
import {map} from "rxjs/operators";
import {Sort} from "@angular/material/sort";
import {QueryParams} from "../../../interfaces/manage-users.interface";
import {PageEvent} from "@angular/material/paginator";
import {SelectionModel} from "@angular/cdk/collections";
import { UserPreferenceService } from '@services/user-preference.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-care-giver-app',
  templateUrl: './care-giver-app.component.html',
  styleUrls: ['./care-giver-app.component.scss']
})
export class CareGiverAppComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private store$: Store<ManageRelaysStoreState.ManageRelaysState>,
    private userPreference: UserPreferenceService
  ) { }
  @Input() searchString: string;
  relayList$: Observable<SinglePatientRelay[]>;
  relayCount$: Observable<number>;
  CGRelayList: SinglePatientRelay[];
  cfId: string;
  careGiverRelayList: SinglePatientRelay[];
  loader = true;
  loaderSubscription: any;
  relayIds = [];
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
      id: "cgId",
      sortable: true,
      headerClass: ["text-start"],
      cellClass: ["align-left"],
    },
    {
      id: "firstName",
      sortable: true,
      headerClass: ["align-left"],
      cellClass: ["align-left"],
    },
    {
      id: "email",
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
    this.timeZone = this.userPreference.getUserTimeZone();
    this.relayIds = [];
    this.relayList$ = this.store$
        .select(ManageRelaysSelectors.getCGRelayList)
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
    this.relayCount$ = this.store$.select(
        ManageRelaysSelectors.getCGRelayCount
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
    //this.getCGRelayList();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loader = true;
    if(this.config) this.config.page.pageIndex = 0;
    this.getCGRelayList();
  }
  onSortChange(sort: Sort) {
    // this.loader = true;
    // this.config.page.pageIndex = 0;
    this.config.sort = {
      ...sort,
    };
    this.getCGRelayList();
  }
  isSelected(row, selection: SelectionModel<any>) {
    return selection.selected.map(s => s.relayId).includes(row.relayId);
  }
  getCGRelayList() {
    let url = "";
    let param: QueryParams = {
      url: url,
      page: this.config.page.pageIndex + 1,
      size: this.config.page.pageSize,
      sortBy: this.config?.sort?.direction? `${this.config?.sort?.active || ""}:${
          this.config?.sort?.direction || ""
      }`: "",
      searchText: this.searchString,
    };
    this.store$.dispatch(
        new ManageRelaysStoreActions.LoadCGRelaysRequestAction({ params: param })
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
    this.getCGRelayList();
  }
  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
  }
}
