import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import { Location } from "@angular/common";
import { DischargePatientManagerService } from "../manager/discharge-patient-manager.service";
import {
  LSColumn,
  LSTableConfig,
} from "src/app/life-signals/_models/ls-column.model";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { DischargePatientsStoreState } from "../store";
import { SelectionModel } from "@angular/cdk/collections";
import { Subscription } from "rxjs/internal/Subscription";
import { ManageGroupsService } from "src/app/manage-group/services/manage-groups.service";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";
import { MatSelect } from "@angular/material/select";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { PatientMoreInfoDialogComponent } from "src/app/active-patients/patient-more-info-dialog/patient-more-info-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { UserPreferenceService } from "@services/user-preference.service";
import { environment } from "src/environments/environment";
import { Group } from "src/app/manage-group/models/manage-groups.model";
import { BackendApiService } from "@services/backendapi.service";
import { SnackbarService } from "@services/snackbar.service";

@Component({
  selector: "app-discharge-patient",
  templateUrl: "./discharge-patient.component.html",
  styleUrls: ["./discharge-patient.component.scss"],
})
export class DischargePatientComponent implements OnInit, OnDestroy {
  selectedPatients: SelectionModel<any> = new SelectionModel<any>(true);
  private groupsData$: BehaviorSubject<Group[]> = new BehaviorSubject<any[]>([]);
  public groups$: Observable<Group[]>;
  public locationGroups$: Observable<Group[]>;
  public clinicalGroups$: Observable<Group[]>;
  dischargePatients: any[];
  selectGroup: Group[] = [{name: "Select", groupId: null, parent: 'ROOT', type: null}];
  reloadInterval;
  groupsSubscription: Subscription;
  searchObjString : string;
  config: LSTableConfig = {
    id: "discharge-patients-module.table",
    rowSelectEnabled: true,
    actions: {
      show: false,
      class: [],
      headerLabel: "",
    },
    page: {
      pageIndex: 0,
      pageSize: 20,
    },
    translateKey: "discharge-patients-module.table",
    translate: true,
    paginator: {
      hide: false,
      offline: false,
    },
    sort: {
      active: 'completedOn',
      direction: "desc"
    }
  };
  columns: LSColumn[] = [
    {
      id: "patientId",
      sortable: true,
      headerClass: ["text-start"],
      cellClass: ["bold-text", "box-text"],
    },
    {
      id: "firstName",
      sortable: true,
      headerClass: ["text-start"],
      cellClass: ["box-text"],
    },
    {
      id: "admissionId",
      headerClass: ["text-start"],
      //style: "max-width: 140px; width: 140px;",
      sortable: true,
      cellClass: ["d-flex"],
    },
    /*{
      id: "groups",
      sortable: false,
      cellClass: ["d-flex", "justify-content-center", "align-items-center"],
    },*/
    {
      id: "patches",
      headerClass: ["text-start"],
      //style: "max-width: 140px; width: 140px;",
      sortable: true,
      cellClass: ["d-flex", "justify-content-start"],
    },
    {
      id: "startedOn",
      sortable: true,
      headerClass: ["text-start"],
      cellClass: ["d-flex", "justify-content-start"],
    },
    {
      id: "completedOn",
      sortable: true,
      headerClass: ["text-start"],
     cellClass: ["d-flex", "justify-content-start"],
    },
    {
      id: "status",
      sortable: false,
      headerClass: ["text-start"],
    },
  ];

  searchObject: { keyword: string; string: string } = {
    keyword: undefined,
    string: "",
  };
  filterObject: { cGroupId: string; pGroupId: string } = {
    cGroupId: null,
    pGroupId: null,
  };
  timeZone: string;
  readonly timeFmt: string = environment.customization.timeFormat;
  @ViewChild('locationMatSelect') locationMatSelect: MatSelect;
  @ViewChild('clinicalMatSelect') clinicalMatSelect: MatSelect;

  model: string;
  modelChanged: Subject<string> = new Subject<string>();
  constructor(
    private manager: DischargePatientManagerService,
    private dialog: MatDialog,
    private location: Location,
    private userPreference: UserPreferenceService,
    private manageGroupService: ManageGroupsService,
    private backendApi: BackendApiService,
    private snackbar: SnackbarService
  ) {
    this.groups$ = this.groupsData$.asObservable();
    this.locationGroups$ = this.groups$.pipe(map((groups: Group[]) => {
      return groups.filter(g => g.type === "PHYSICAL")
    }));
    this.clinicalGroups$ = this.groups$.pipe(map((groups: Group[]) => {
      return groups.filter(g => g.type === "CLINICAL")
    }));
  }

  goBackToPage(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getGroupDetails();
    this.timeZone = this.userPreference.getUserTimeZone();
    this.modelChanged.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() =>
        this.serviceToCallWith()))
      .subscribe();
    this.getDischargedPatients();
    this.reloadInterval = setInterval(() => {
      this.getDischargedPatients();
    }, 30000);
    this.manager.selectDischargePatient()
      .subscribe((response: DischargePatientsStoreState.State) => {
        this.config = {
          ...this.config,
          page: {
            ...this.config.page,
            length: response?.total
          },
          tableState: response?.tableState
        }
        if (response?.DISCHARGE_PATIENTS?.length) {
          this.dischargePatients = response.DISCHARGE_PATIENTS.map((x) => {
            return {
              ...x,
              name: `${x.firstName} ${x.lastName}`,
            };
          });
        } else {
          this.dischargePatients = []; 
        }
      });
  }

  formSubURL(config: LSTableConfig, searchObject?: any) {
    const page = config?.page;
    const sort = config?.sort;
    if(this.config.sort.active === "" || this.config.sort.direction === ""){
      this.config={
      ...this.config,
      sort:{
        active: "completedOn",
        direction: "desc"
      }
      };
    }
    let url = `patients/admissions?page=${page?.pageIndex + 1}&size=${
      page?.pageSize
    }&sortBy=${this.config.sort?.active}:${this.config.sort?.direction}&isDischarged=true`;
    if (searchObject?.keyword && searchObject?.string) {
      let searchString = encodeURIComponent(searchObject.string)
      url = `${url}&${searchObject?.keyword}=${searchString}`;
    }
    if (this.filterObject?.cGroupId) {
      url = `${url}&cGroupId=${this.filterObject?.cGroupId}`;
    }
    if (this.filterObject?.pGroupId) {
      url = `${url}&pGroupId=${this.filterObject?.pGroupId}`;
    }
    return url;
  }

  onSortChange(event: Sort){
    this.config = {
      ...this.config,
      sort:{
        active : event.active,
        direction : event.direction
      }
    }
    //this.config.sort.active = event.active;
    //this.config.sort.direction = event.direction;
    this.selectedPatients.clear();
    this.getDischargedPatients();
  }

  isSelected(row, selection: SelectionModel<any>) {
    return selection.selected.map(s => s.patientId).includes(row.patientId);
  }

  onPageChange(event: PageEvent) {
    this.dischargePatients = undefined;
    this.config.page = {
      ...event,
    };
    //this.selectedPatients.clear();
    this.getDischargedPatients();
  }

  onPatientsSelected(e: SelectionModel<any>) {
    this.selectedPatients = e;
  }

  openBiosensorModal(patient) {
      let patches = {
        activePatch: patient.activePatch,
        patchIds: patient.patchIds,
        readOnly: true,
        heading: "active-patients-module.dialog.biosensor_information"
      }
      this.dialog.open(PatientMoreInfoDialogComponent, {
        width: "700px",
        //minWidth: "700px",
        maxWidth: "95vw",
        backdropClass: "backdropBackground",
        disableClose: true,
        data: patches,
      });
  }

  getDischargedPatients(){
    this.dischargePatients = undefined;
    let url = this.formSubURL(this.config, this.searchObject);
    this.manager.fetch(url)
    /*.subscribe((response: any) => {
      this.config.page.length = response?.total;
      this.dischargePatients = response?.items?.map((item) => {
        return {
          ...item,
          name: `${item.firstName} ${item.lastName}`,
          startedOn: item.startedOn ? new Date(item.startedOn) : null,
          completedOn: item.completedOn ? new Date(item.completedOn) : null,
          biosensorId: item.activePatch,
        };
      });
    });*/
  }
  searchByGroup(key, groupId) {
    if(key === 'CLINICAL') {
      this.filterObject.cGroupId = groupId;
    } else {
      this.filterObject.pGroupId = groupId;
    }
    this.config.page.pageIndex = 0;
    this.selectedPatients.clear();
    this.dischargePatients = undefined;
    let url = this.formSubURL(this.config, this.searchObject);
    this.manager.fetch(url)
  }

  search() {
    this.searchObject.keyword = 'searchText';
    if (this.searchObject.keyword) {
      this.searchObject = {
        keyword: this.searchObject.keyword,
        string: this.searchObjString || "",
      };
      this.config.page.pageIndex = 0;
      this.modelChanged.next(JSON.stringify(this.searchObject));
      this.selectedPatients.clear();
      //this.getDischargedPatients();
    }/* else {
      this.searchObject = {
        keyword: '',
        string: ''
      }
      this.modelChanged.next(JSON.stringify(this.searchObject));
    }*/
  }

  serviceToCallWith() {
    let ref;
    this.manager.fetch(this.formSubURL(this.config,this.searchObject));
    ref = this.manager.selectDischargePatient();
    return ref;
  }


  clear() {
    this.searchObjString = '';
    this.search();
  }
  
  getGroupDetails() {
    this.groupsSubscription = this.manageGroupService.fetch().subscribe(groups => {
      if (groups['data'].length > 0) {
        this.groupsData$.next(groups['data']);
        
      }
    })
  }

  getPdfReport() {
    const patient = this.selectedPatients.selected[0];
    const admissions = this.selectedPatients.selected[0].admissions;
    let lastAdmission = admissions[0];
    for (let i = 1; i < admissions.length; i++) {
      if (admissions[i].completedOn > lastAdmission.completedOn) {
        lastAdmission = admissions[i];
      }
    }
    const url = "patients/reports";
    this.backendApi
      .postMapping(environment.dataApiUrl + url, {
        patientId: patient.patientId,
        admissionId: lastAdmission.admissionId,
        from: lastAdmission.startedOn,
        to: lastAdmission.completedOn,
        Type: 'MONITORING_REPORT',
        destination: []
      })
      .then((resp) => {
        if (resp?.status === "OK") {
          this.snackbar.openSnackBar(
            "active-patients-module.dialog.pdf_report_request",
            "bottom",
            "center",
            true
          );
        } else {
          this.snackbar.openSnackBar(
            "errors.err_generic_message",
            "bottom",
            "center",
            true
          );
        }
      });
  }

  ngOnDestroy() {
    clearInterval(this.reloadInterval);
  }
}
