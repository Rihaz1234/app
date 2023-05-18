import {
  Component, OnDestroy,
  OnInit,
} from "@angular/core";
import {
  ActivePatient,
  FilterKeysForActivePatient,
  MonitoringStatus,
} from "../models/active-patients.model";
import { AdmitPatientModalComponent } from "../admit-patient-modal/admit-patient-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivePatientManagerService } from "../manager/active-patient-manager.service";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { AssignGroupModalComponent } from "../assign-group-modal/assign-group-modal.component";
import {
  LSColumn,
  LSTableConfig,
  TableState,
} from "src/app/life-signals/_models/ls-column.model";
import { SelectionModel } from "@angular/cdk/collections";
import { ActivePatientsService } from "../services/active-patients.service";
import { Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { PageEvent } from "@angular/material/paginator";
import { PatientMoreInfoDialogComponent } from "../patient-more-info-dialog/patient-more-info-dialog.component";
import { ActivePatientsStoreState } from "../store";
import { Sort } from "@angular/material/sort";
import { AuthenticationService } from "@services/authentication.service";
import { PatientDetailsViewMoreComponent } from "../patient-details-view-more/patient-details-view-more.component";
import { PatientAdmittedModalComponent } from "../patient-admitted-modal/patient-admitted-modal.component";
import { SnackbarService } from "@services/snackbar.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import {Group} from "../../manage-group/models/manage-groups.model";
import {ManageGroupsService} from "../../manage-group/services/manage-groups.service";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Observable} from "rxjs/internal/Observable";
import { NotificationsComponent } from "src/app/dialogs/notifications-component/notifications/notifications.component";
import { AddEventComponent } from "src/app/dialogs/notifications-component/add-event/add-event.component";

@Component({
  selector: "app-active-patients",
  templateUrl: "./active-patients.component.html",
  styleUrls: ["./active-patients.component.scss"],
})
export class ActivePatientsComponent implements OnInit, OnDestroy {
  activePatients: ActivePatient[] = new Array();
  error: any;
  reloadInterval: NodeJS.Timeout;

  // Selection Variables
  selectedPatients: SelectionModel<ActivePatient> = new SelectionModel<ActivePatient>(true);
  selectedIds: Set<string> = new Set();
  isPhy = false;

  activePatient_Columns: LSColumn[] = [
    {
      id: "patientDetails",
      label: "PATIENT DETAILS",
      headerClass: ["text-start"],
      sortable: true,
      labelClass: "fw-bold",
      cellClass: [],
    },
    {
      id: "location",
      label: "Location",
      headerClass: ["text-start"],
      sortable: true,
      cellClass: [],
    },
    {
      id: "reportTime",
      label: "report time",
      sortable: true,
      headerClass: ["text-start"],
      cellClass: ["d-flex", "justify-content-start",""],
    },
    {
      id: "prescriber",
      label: "prescriber",
      sortable: true,
      headerClass: ["text-start"],
      cellClass: ["d-flex", "justify-content-start"],
    },
    
    {
      id: "interpreter",
      label: "interpreter",
      sortable: true,
      cellClass: ["d-flex", "justify-content-start"],
      headerClass: ["text-start"],
    },
    {
      id: "reportType",
      label: "report type",
      sortable: true,
      cellClass: ["d-flex", "justify-content-start"],
      headerClass: ["text-start"],
    },
    {
      id: "view",
      label: "view",
      sortable: false,
      cellClass: ["d-flex", "justify-content-start"],
      headerClass: ["text-start"],
    },
    {
      id: "print",
      label: "print",
      sortable: false,
      cellClass: ["d-flex", "justify-content-start"],
      headerClass: ["text-start"],
    },
    {
      id: "download",
      label: "download",
      sortable: false,
      cellClass: ["d-flex", "justify-content-start"],
      headerClass: ["text-start"],
    },
    
  ];

  config: LSTableConfig = {
    id: "active-patients-table",
    rowSelectEnabled: true,
    actions: {
      show: true,
      headerLabel: "",
      class: ["d-flex", "align-items-center", "justify-content-end"],
      header: {
        style: "max-width: 180px; width: 180px;",
      },
    },
    page: {
      pageSize: 20,
      pageIndex: 0,
      length: null
    },
    paginator: {
      offline: false,
      hide: false
    },
    sort: {
      active: "patientid",
      direction: "desc"
    },
    tableState: TableState.DEFAULT
  };
  searchObject: { keyword: string; string: string } = {
    keyword: "",
    string: "",
  };
  filterObject: { cGroupId: string; pGroupId: string } = {
    cGroupId: null,
    pGroupId: null,
  };
  filterStrings: Array<any> = new Array();
  monitoringStatus = MonitoringStatus;
  private groupsData$: BehaviorSubject<Group[]> = new BehaviorSubject<any[]>([]);
  public groups$: Observable<Group[]>;
  public locationGroups$: Observable<Group[]>;
  public clinicalGroups$: Observable<Group[]>;
 
  constructor(
    private manager: ActivePatientManagerService,
    private dialog: MatDialog,
    private service: ActivePatientsService,
    private authService: AuthenticationService,
    private snackbar: SnackbarService,
    private route: ActivatedRoute,
    private manageGroupService: ManageGroupsService
  ) {
    this.groups$ = this.groupsData$.asObservable();
    this.locationGroups$ = this.groups$.pipe(map((groups: Group[]) => {
      return groups.filter(g => g.type === "PHYSICAL")
    }));
    this.clinicalGroups$ = this.groups$.pipe(map((groups: Group[]) => {
      return groups.filter(g => g.type === "CLINICAL")
    }));
  }

  modelChanged: Subject<string> = new Subject<string>();
  activePatientsSub: Subscription;

  ngOnInit() {
    let roles = this.authService.getRoles() || [];;
    if(roles?.indexOf("PHY") > -1) this.isPhy =true;
    this.getGroupDetails();
    this.modelChanged.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() =>
        this.serviceToCallWith()))
      .subscribe();
    this.initVariables();
    this.fetchTableData();
    const panelId = sessionStorage.getItem("panelId");
    if (panelId?.length) {
      this.service.getPanelDetails(panelId)
        .then((patients) => {
          for (const patient of patients) {
            if (patient.patchId) {
              this.selectedIds.add(patient.patientId);
            }
          }
          if (this.activePatients.length && this.selectedIds.size) {
            this.selectedPatients.select(...this.activePatients.filter(pat => {
              return this.selectedIds.has(pat.patientId);
            }));
          }
        });
    }

    this.reloadInterval = setInterval(() => {
      this.fetchTableData();
    }, 30000);

    this.activePatientsSub = this.manager.selectActivePatient()
      .pipe(map((response: ActivePatientsStoreState.State) => {
        if(response?.tableState) {
          this.config = {
            ...this.config,
            tableState: <TableState>response?.tableState,
            rowSelectEnabled: true,
            page: {
              ...this.config.page,
              length: response?.total
            }
          };
        }
        this.error = response?.error;
        if (response?.ACTIVE_PATIENTS_DATA) {
          this.activePatients = response?.ACTIVE_PATIENTS_DATA.map((x) => {
            const patient: ActivePatient = {
              ...x,
              name: `${x.firstName} ${x.lastName}`,
              weightUnit: x.weightUnit.toUpperCase(),
              heightUnit: x.heightUnit.toUpperCase()
            };
            return patient;
          });
          if (this.activePatients.length && this.selectedIds.size) {
            this.selectedPatients.select(...this.activePatients.filter(pat => {
              return this.selectedIds.has(pat.patientId);
            }));
          }
        }
      }))
      .subscribe();
  }

  serviceToCallWith() {
    let ref;
    this.manager.getActivePatient(this.service.actvePatientsUrl(this.config, this.searchObject, this.filterObject));
    ref = this.manager.selectActivePatient();
    return ref;
  }
  resetAndSearch() {
    this.searchObject.string = '';
    this.search();
  }

  search() {
    this.searchObject.keyword = 'searchText';
    if (this.searchObject?.string) {
      this.config.page.pageIndex = 0;
    }
    //this.selectedPatients.clear();
    this.modelChanged.next(JSON.stringify(this.searchObject));
  }
  searchByGroup(key, groupId) {
    if(key === 'CLINICAL') {
      this.filterObject.cGroupId = groupId;
    } else {
      this.filterObject.pGroupId = groupId
    }
      this.config.page.pageIndex = 0;
      this.activePatients = undefined;
      this.modelChanged.next(JSON.stringify(this.filterObject));
  }

  clear() {
    this.searchObject.string = '';
    this.search();
  }

  checkCharacters(event : KeyboardEvent){
    if(this.searchObject.keyword === "PATCHID" || this.searchObject.keyword === "PATIENTID"){
      let pattern = /^[a-zA-z0-9]$/;
      let key = event.key;
      if (pattern.test(key)) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    }else{
      return true;
    }
  }

  initVariables() {
    for (let i in FilterKeysForActivePatient) {
      this.filterStrings.push({ text: FilterKeysForActivePatient[i], value: i });
    }
  }

  fetchTableData() {
    this.getActivePatientData();
  }
  isSelected(row: ActivePatient, selection: SelectionModel<any>) {
    return selection.selected.map(s => s.patientId).includes(row.patientId);
  }

  isClinicianCheck() {
    let role = this.authService.getRoles();
    return role.indexOf("GC") > -1;
  }

  isGcorScCheck () {
    let role = this.authService.getRoles();
    return role.indexOf("GC") > -1 || role.indexOf("SC") > -1;
  }

  getActivePatientData() {
    if (!this.config.sort.active || !this.config.sort.direction) {
      this.config.sort.active = "patientid";
      this.config.sort.direction = "desc";
    }
    this.manager.getActivePatient(this.service.actvePatientsUrl(this.config, this.searchObject, this.filterObject));
  }

  onPageChange(event: PageEvent) {
    this.config = {
      ...this.config,
      page: {
        ...this.config.page,
        pageIndex: event.pageIndex,
        pageSize: event.pageSize
      }
    }
    this.fetchTableData();
  }

  onPatientsSelected(e: SelectionModel<ActivePatient>) {
    this.selectedPatients = e;
    const selected = new Set(e.selected.map((pat) => pat.patientId));
    for (const { patientId } of this.activePatients) {
      if (selected.has(patientId)) {
        this.selectedIds.add(patientId);
      } else if (this.selectedIds.has(patientId)) {
        this.selectedIds.delete(patientId);
      }
    }
  }

  onSortChange(event: Sort) {
    let activeKey = event.active === 'deviceIds' ? 'thirdPartyDevices' : event.active;
    this.config = {
      ...this.config,
      sort: {
        active: activeKey,
        direction: event.direction
      }
    }
    this.selectedPatients.clear();
    this.fetchTableData();
  }

  openBiosensorModal(patientId: string, data) {
    this.service.getPatientBy(patientId).subscribe(patient => {
      let patches = {
        activePatch: patient.data.activePatch,
        patchIds: patient.data.patchIds,
        heading: "active-patients-module.dialog.more_info",
        readOnly: !this.isClinicianCheck(),  
      }
      this.dialog.open(PatientMoreInfoDialogComponent, {
        width: "700px",
        //minWidth: "700px",
        maxWidth: "95vw",
        backdropClass: "backdropBackground",
        disableClose: true,
        data: patches
      }).afterClosed()
        .subscribe(response => {
          if (response) {
            data['patchIds'] = response;
            this.manager.updatePatient(data).subscribe((res:any) => {
              if(res?.error) {
                if (res.error === "PATCHES_ALREADY_IN_USE") {
                  this.snackbar.openSnackBar("active-patients-module.errors.patchInUse", 'bottom', 'center', true);
                } else if (res.error === "MORE_THAN_ONE_PATCH_STREAMING") {
                  this.snackbar.openSnackBar("active-patients-module.errors.more_than_one_patch_streaming", 'bottom', 'center', true);
                } else if (res.error === "PATCH_STATE_STREAMING") {
                  this.snackbar.openSnackBar("active-patients-module.errors.patch_streaming", 'bottom', 'center', true);
                } else if (res.error === "PATIENT_ALREADY_DISCHARGED") {
                  this.snackbar.openSnackBar("errors.patient_discharged", 'bottom', 'center', true);
                } else if (res.error === "ADMITTED_ON_TIME_IS_INVALID") {
                  this.snackbar.openSnackBar("active-patients-module.errors.admittedOn_invalid", 'bottom', 'center', true);
                } else {
                  this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
                }
              }
            });
          }
        });
    });
  }

  openAdmitPatientModalWith(data?) {
    switch (data.key) {
      case 'add-new-patient':
        this.admitPatientModal().subscribe(resp => {
          if (resp) {
            this.getActivePatientData();
            this.dialog.open(PatientAdmittedModalComponent, {
              maxWidth: "96vw",
              //minWidth: "320px",
              width: "520px",
              backdropClass: "backdropBackground",
              disableClose: true,
              autoFocus: false,
              data: { title: 'active-patients-module.dialog.patient_admitted' }
            });
          }
        });
        break;

      case 'edit-active-patient':
        this.service.getPatientBy(data?.value).subscribe(patient => {
          this.admitPatientModal({ activePatient: patient?.data, mode: 'EDIT' })
            .subscribe(resp => {
              if (resp) {
                this.getActivePatientData();
                this.dialog.open(PatientAdmittedModalComponent, {
                  maxWidth: "96vw",
                  //minWidth: "320px",
                  width: "520px",
                  backdropClass: "backdropBackground",
                  disableClose: true,
                  autoFocus: false,
                  data: { title: 'active-patients-module.dialog.patient_edited' }
                });
              }
            });
        });
        break;
    }
  }

  //This function is used to open add event dialog 
  addNewEvent(patient:any) {
    console.log(patient?.patientId)
    console.log(patient?.patchIds[0]?.startTime)
    const addEvent = this.dialog.open(AddEventComponent, {
      width: "600px",
      maxWidth: "96vw",
      height: "100%",
      maxHeight:"100vh",
      panelClass: "add-event-container",
      //maxHeight: "95vh",
      //height: "530px",
       data: {patientId: patient?.patientId, patchStarted:patient?.patchIds[0]?.startTime },
      disableClose: true,
    });
  }

  admitPatientModal(data?) {
    const dailogRef = this.dialog.open(AdmitPatientModalComponent, {
      maxWidth: "96vw",
      minWidth: "320px",
      width: "900px",
      backdropClass: "backdropBackground",
      disableClose: true,
      data: { ...data },
    });
    return dailogRef.afterClosed();
  }

  alertSettings(selectedPatient:ActivePatient) {
    const dailogRef = this.dialog.open(NotificationsComponent, {
      //adding same width as history popup
      width: "1300px",
      maxWidth: "98%",
      height: "100%",
      maxHeight:"100vh",
      panelClass:["alertcontainer-modal", "alertcontainer" ],
      //height: "530px",
      //panelClass: "alertcontainer",
      data: { patientData: { ...selectedPatient, addEvent: false }, selectedTab: 'parameterAlerts' },
      disableClose: true,
    });
  }

  //  /**This function is used to open Discharge Patient dialog */
  public openDischargeGroupDialog(patientId, patientIds = [], patient): void {
    if (patient?.activePatch) {
      const dischargeDialog = this.dialog.open(ConfirmationDialogComponent, {
        maxWidth: "96vw",
        //minWidth: "500px",
        width: "500px",
        backdropClass: "backdropBackground",
        disableClose: true,
        data: {
          heading: "active-patients-module.dialog.discharge_patient",
          message: "active-patients-module.dialog.discharge_and_stop_monitoring",
          stop_biosensor: false
        },
      });
      dischargeDialog.afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this.manager.dischargePatient(patient.patientId);
          this.dialog.open(PatientAdmittedModalComponent, {
            maxWidth: "96vw",
            //minWidth: "320px",
            width: "520px",
            backdropClass: "backdropBackground",
            disableClose: true,
            autoFocus: false,
            data: { title: 'active-patients-module.dialog.patient_discharged' }
          });
          this.fetchTableData();
        }
      });
    } else {
      const dischargeDialog = this.dialog.open(ConfirmationDialogComponent, {
        maxWidth: "96vw",
        //minWidth: "500px",
        width: "500px",
        backdropClass: "backdropBackground",
        disableClose: true,
        data: {
          heading: "active-patients-module.dialog.discharge_patient",
          message: "active-patients-module.dialog.discharge_patient_message",
          stop_biosensor: false
        },
      });
      dischargeDialog.afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          if (patientIds.length > 0) {
            patientIds.forEach(patient => {
              this.manager.dischargePatient(patient.patientId);
              this.selectedPatients.clear();
            })
          } else if (patientId) {
            this.manager.dischargePatient(patientId);
          }
          this.dialog.open(PatientAdmittedModalComponent, {
            maxWidth: "96vw",
            //minWidth: "320px",
            width: "520px",
            backdropClass: "backdropBackground",
            disableClose: true,
            autoFocus: false,
            data: { title: 'active-patients-module.dialog.patient_discharged' }
          });
        }
      });
    }
  }

  getThirdPartyDevices(list) {
    if (list?.length > 0) {
      let deviceIds = "";
      list.forEach((element) => {
        if (element?.deviceId) {
          deviceIds = deviceIds
            ? deviceIds + ", " + element.deviceId
            : element.deviceId;
        }
      });
      if (deviceIds !== "") {
        return deviceIds;
      } else {
        return "-";
      }
    } else {
      return "-";
    }
  }

  openStopMonitoringDialog(patientId) {
    const stopMonitoringDialog = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "96vw",
      // minWidth: "500px",
      width: "500px",
      backdropClass: "backdropBackground",
      disableClose: true,
      data: {
        heading: "active-patients-module.dialog.stop_monitoring",
        message: "active-patients-module.dialog.stop_monitoring_message",
        stop_biosensor: true
      },
    });

    stopMonitoringDialog.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.manager.stopMonitoring(patientId);
      }
    });
  }

  // /**This function is used to open dialog */
  openAssignGroupModal(patient): void {
    if (!this.isGcorScCheck()) {
      return;
    }
    this.dialog.open(AssignGroupModalComponent, {
      maxWidth: "96vw",
      //minWidth: "500px",
      width: "700px",
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "assign-group-modal",
      data: { ...patient },
    }).afterClosed()
      .subscribe((group) => {
        if (group) {
          let assignGroupObj = {
            patientId: patient.patientId,
            cGroup: group.cGroup,
            pGroup: group.pGroup,
            admissionId: patient.admissionId
          };
          this.manager.assignGroup(assignGroupObj);
          setTimeout(() => {
            this.getActivePatientData();
          }, 500);
        }
      });
    //this.getActivePatientData();
  }

  patientViewMore(row) {
    this.dialog.open(PatientDetailsViewMoreComponent, {
      width: "900px",
      maxWidth: "96vw",
      //height:"500px",
      backdropClass: "backdropBackground",
      disableClose: true,
      data: row,
    })
  }
  getGroupDetails() {
    this.manageGroupService.fetch().subscribe(groups => {
      if (groups['data'].length > 0) {
        this.groupsData$.next(groups['data']);

      }
    })
  }
  transferRelay(activePatch, type) {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "96vw",
      width: "500px",
      backdropClass: "backdropBackground",
      disableClose: true,
      data: {
        heading: type === 'MPR' ? "active-patients-module.button.transfer_mpr": "active-patients-module.button.transfer_spr",
        message: type === 'MPR' ? "active-patients-module.dialog.transfer_mpr_confirm": "active-patients-module.dialog.transfer_spr_confirm",
      },
    });
    confirmDialog.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.service.transferRelay(activePatch)
            .subscribe((res:any) => {
              if(res.message === 'TRANSFER_REQUEST_INITIATED') {
                this.snackbar.openSnackBar("active-patients-module.errors.transfer_initiated", 'bottom', 'center', true);
              } else {
                this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
              }
            });
      }
    });
  }
  isScOrGc() {
    let role = this.authService.getRoles();
    return (role.indexOf("GC") > -1 || role.indexOf("SC") > -1)
  }
  ngOnDestroy() {
    clearInterval(this.reloadInterval);
    this.activePatientsSub?.unsubscribe();
  }
}
