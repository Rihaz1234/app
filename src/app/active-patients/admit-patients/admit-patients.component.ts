import {
  Component, OnDestroy,
  OnInit,
} from "@angular/core";
import {
  ActivePatient,
  FilterKeysForActivePatient,
  FilterKeysForAssignPatient,
  NewPatient,
  ActivePatientsTabs,
  UnassignedPatient,
  MonitoringStatus,
} from "../models/active-patients.model";
import { AdmitPatientModalComponent } from "../admit-patient-modal/admit-patient-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ActivePatientManagerService } from "../manager/active-patient-manager.service";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
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
import { convertToMinutes, epoch } from "../forms/active-patients.form";
import { Sort } from "@angular/material/sort";
import { AuthenticationService } from "@services/authentication.service";
import {PatientAdmittedModalComponent} from "../patient-admitted-modal/patient-admitted-modal.component";
import {SnackbarService} from "@services/snackbar.service";

@Component({
  selector: "app-admit-patients",
  templateUrl: "./admit-patients.component.html",
  styleUrls: ["./admit-patients.component.scss"],
})
export class AdmitPatientsComponent implements OnInit, OnDestroy {
  selectedPatients: SelectionModel<UnassignedPatient> = new SelectionModel<UnassignedPatient>(true);
  allPatients: ActivePatient[] = new Array();
  unassignedPatients: UnassignedPatient[] = new Array();
  patientsData: Array<any> = new Array();
  sortedData: ActivePatient[];
  is_selected: boolean[] = [false];
  filteredString: string;
  patientIdsToPass: string[] = new Array();
  error: any;
  reloadInterval;

  assignPatient_Columns: LSColumn[] = [
    {
      id: "patchId",
      label: "Biosensor ID",
      headerClass: ["text-start"],
      style: "max-width: 240px; width: 240px;",
      sortable: true,
      cellClass: ["d-flex", "justify-content-start","bold-text"],
    },
    {
      id: "status",
      label: "Monitoring",
      sortable: true,
      headerClass: ["text-start"],
      cellClass: ["d-flex", "justify-content-start"],
    },
  ];
  config: LSTableConfig = {
    id: "admit-patients-table",
    rowSelectEnabled: true,
    actions: {
      show: true,
      headerLabel: "",
      class: ["d-flex", "align-items-center", "justify-content-end", "me-3"],
      header: {
        style: "max-width: 50%; width: 50%;",
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
      active: "",
      direction: ""
    },
    tableState: TableState.DEFAULT
  };
  searchObject: { keyword: string; string: string } = {
    keyword: "",
    string: "",
  };
  filterStrings: Array<any> = new Array();
  tabletabs: Array<string> = new Array();
  selectedTab: ActivePatientsTabs;
  selectedIds: string[] = [];
  monitoringStatus = MonitoringStatus;
  isSCorGC = false;

  constructor(
    private router: Router,
    private manager: ActivePatientManagerService,
    private dialog: MatDialog,
    private service: ActivePatientsService,
    private authService: AuthenticationService,
    private snackbar: SnackbarService,
  ) { }

  model: string;
  modelChanged: Subject<string> = new Subject<string>();
  unassignedPatientsSub: Subscription;
  panelId;
  ngOnInit() {
    // this.route.queryParamMap.subscribe((params: ParamMap) => {
    //   this.selectedIds = (params.get("ids") || "").split(",");
    //   this.patientIdsToPass = this.selectedIds;
    // });
    this.modelChanged.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() =>
        this.serviceToCallWith()))
      .subscribe();
    this.initVariables();
    this.fetchTableData();
    this.reloadInterval = setInterval(() => {
      this.fetchTableData();
    }, 30000);

    this.unassignedPatientsSub = this.manager.selectUnassignedPatients()
      .pipe(map(response => {
        this.error = response?.error;
        this.config = {
          ...this.config,
          page: {
            ...this.config.page,
            length: response?.unassignedPatients_total || 0
          },
          rowSelectEnabled:false,
          tableState: <TableState>response?.tableState
        }
        this.unassignedPatients = response?.UNASSIGNED_PATIENTS_DATA || [];
      }))
      .subscribe();
  }

  serviceToCallWith() {
    let ref;
    this.manager.fetchUnAssignedPatientsData(this.service.unassignedPatientsUrl(this.config, this.searchObject));
    ref = this.manager.selectUnassignedPatients();
    return ref;
  }

  search() {
    this.searchObject.keyword = 'patchId';
    if(this.searchObject?.string) {
      this.config.page.pageIndex = 0;
    }
    this.modelChanged.next(JSON.stringify(this.searchObject));
    this.selectedPatients.clear();
  }

  labelPatches(row: ActivePatient) {
    if (row.patchIds?.length) {
      return row.patchIds.map(p => p.deviceId.toUpperCase()).join(", ");
    } else {
      return "-";
    }
  }

  clear() {
    this.searchObject.string = '';
    this.search();
  }
  initVariables() {
    for (let i in FilterKeysForAssignPatient) {
      this.filterStrings.push({ text: FilterKeysForActivePatient[i], value: i });
    }
    this.tabletabs.push(ActivePatientsTabs.ASSIGN_PATIENT);
  }

  fetchTableData() {
    this.getUnassignedPatientData();
  }
  isSelected(row: UnassignedPatient, selection: SelectionModel<any>) {
    return selection.selected.map(s => s.patchId).includes(row.patchId);
  }

  isClinicianCheck() {
    let role = this.authService.getRoles();
    if(role.indexOf("GC") > -1 || role.indexOf("SC") > -1) {
      this.isSCorGC = true;
    }
    return role.indexOf("GC") > -1;
  }

  resetTable() {
    this.searchObject = {
      keyword: null,
      string: null
    };
    this.config = {
      ...this.config,
      page: {
        ...this.config.page || {},
        pageIndex: 0,
        length: undefined
      }
    };
  }

  getUnassignedPatientData() {
    if (!this.config.sort.active || !this.config.sort.direction) {
      this.config.sort.active = "";
      this.config.sort.direction = "";
    }
    let url = `patches/unassigned?page=${this.config.page.pageIndex + 1}&size=${this.config.page.pageSize}`;
    if (this.config.sort.active && this.config.sort.direction) {
      url = `${url}&sortBy=${this.config.sort?.active}:${this.config.sort?.direction}`;
    }
    if (this.searchObject && this.searchObject?.keyword && this.searchObject?.string) {
      url = `${url}&${this.searchObject?.keyword?.toLowerCase()}=${this.searchObject?.string}`;
    }
    this.manager.fetchUnAssignedPatientsData(url);
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
    //this.selectedPatients.clear();
    this.fetchTableData();
  }

  onPatientsSelected(e: SelectionModel<UnassignedPatient>) {
    this.selectedPatients = e;
   /* this.patientIdsToPass = new Array();
    let biosensorPatientData = (e.selected || []).filter(s => s?.activePatch !== undefined && s?.activePatch !== "" && s?.activePatch !== null);
    biosensorPatientData.forEach(e => {
      if (!this.patientIdsToPass.includes(e?.patientId))
        this.patientIdsToPass.push(e?.patientId);
    });*/
  }

  getActivePatches(selected: ActivePatient[]) {
    return (selected || []).filter(s => s?.activePatch !== undefined && s?.activePatch !== "" && s?.activePatch !== null);
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
    //this.config.sort.active = event.active;
    //this.config.sort.direction = event.direction;
    this.selectedPatients.clear();
    this.fetchTableData();
  }

  goBackToSummary() {
    this.router.navigate(["summary"]);
  }

  openAdmitPatientModalWith(data?) {
    switch (data.key) {
      case ActivePatientsTabs.ACTIVE_PATIENT:
        this.admitPatientModal().subscribe(resp => {
          if (resp) {
            this.getUnassignedPatientData();
            this.dialog.open(PatientAdmittedModalComponent,{
              maxWidth: "90vw",
              //minWidth: "320px",
              width: "520px",
              backdropClass: "backdropBackground",
              disableClose: true,
              autoFocus : false,
              data: {title: 'active-patients-module.dialog.patient_admitted'}
            });
          }
        });
        break;
      case ActivePatientsTabs.ASSIGN_PATIENT:
        this.admitPatientModal({ patchId: this.selectedPatients.selected[0] })
          .subscribe(resp => {
            if (resp) {
              this.getUnassignedPatientData();
              this.dialog.open(PatientAdmittedModalComponent,{
                maxWidth: "90vw",
                //minWidth: "320px",
                width: "520px",
                backdropClass: "backdropBackground",
                disableClose: true,
                autoFocus : false,
                data: {title: 'active-patients-module.dialog.patient_assigned'}
              });
            }
          });
        break;

      case 'edit-assign-patient':
        if (this.validateBiosensor(data?.value?.patchId)) {
          this.admitPatientModal({patchId: data.value})
              .subscribe(resp => {
                if (resp) {
                  this.getUnassignedPatientData();
                  this.dialog.open(PatientAdmittedModalComponent, {
                    maxWidth: "90vw",
                    //minWidth: "320px",
                    width: "520px",
                    backdropClass: "backdropBackground",
                    disableClose: true,
                    autoFocus: false,
                    data: {title: 'active-patients-module.dialog.patient_assigned'}
                  });
                }
              });
        } else {
          this.snackbar.openSnackBar('errors.invalid_patchId', 'bottom', 'center', true);
        }
        break;
    }
  }

  admitPatientModal(data?) {
    const dailogRef = this.dialog.open(AdmitPatientModalComponent, {
      maxWidth: "90vw",
      minWidth: "320px",
      width: "900px",
      backdropClass: "backdropBackground",
      disableClose: true,
      data: { ...data },
    });
    return dailogRef.afterClosed();
  }

  //  /**This function is used to open Discahrge Patient dialog */
  public openDischargeGroupDialog(patientId, patientIds = [], patient): void {
    if (patient?.activePatch) {
      const dischargeDialog = this.dialog.open(ConfirmationDialogComponent, {
        maxWidth: "90vw",
        //minWidth: "500px",
        width: "500px",
        backdropClass: "backdropBackground",
        disableClose: true,
        data: {
          heading: "admit-patients-module.dialog.discharge_patient",
          message: "admit-patients-module.dialog.discharge_and_stop_monitoring"
        },
      });
      dischargeDialog.afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this.manager.dischargePatient(patient.patientId);
        }
      });
    } else {
      const dischargeDialog = this.dialog.open(ConfirmationDialogComponent, {
        maxWidth: "90vw",
        //minWidth: "500px",
        width: "500px",
        backdropClass: "backdropBackground",
        disableClose: true,
        data: {
          heading: "admit-patients-module.dialog.discharge_patient",
          message: "admit-patients-module.dialog.discharge_patient_message"
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

  openStopMonitoringDialog(patchId) {
    const stopMonitoringDialog = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "90vw",
      // minWidth: "500px",
      width: "500px",
      backdropClass: "backdropBackground",
      disableClose: true,
      data: {
        heading: "admit-patients-module.dialog.stop_monitoring",
        message: "admit-patients-module.dialog.stop_monitoring_message"
      },
    });

    stopMonitoringDialog.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.stopMonitoringUnassigned(patchId);
      }
    });
  }

  userRole() {
    if (this.authService.getRoles()[0] === 'GC') {
      return false;
    } else {
      return true;
    }
  }

  openBiosensorInfoModal(row) {
    this.dialog.open(PatientMoreInfoDialogComponent, {
      width: "700px",
      //minWidth: "700px",
      maxWidth: "95vw",
      backdropClass: "backdropBackground",
      disableClose: true,
      data: [...row.patchIds || []]
    }).afterClosed()
      .subscribe(response => {
        if (response) {
          let patient: NewPatient = {
            patientId: row.patientId,
            admissionId: row.admissionId,
            dob: row.dob ? row.dob : "",
            //age: parseInt(row.age),
            phoneNo: row.phoneNo,
            email: row.email,
            gender: row.gender,
            weight: parseInt(row.weight),
            height: parseInt(row.height),
            weightUnit: row.weightUnit,
            heightUnit: row.heightUnit,
            firstName: row.firstName,
            lastName: row.lastName,
            doctorId: row.doctorId,
            cGroup: row.cGroup,
            pGroup: row.pGroup,
            patchIds: response,
            deviceIds: row.deviceIds,
            createdDateTime: row.createdDateTime,
            startedOn: epoch(row.createdDateTime),
            procedureDuration: convertToMinutes(row.procedureDuration),
            estimatedDischarge: epoch(row.estimatedDischarge)
          };
          this.manager.updatePatient(patient);
        }
      });
  }
  validateBiosensor(biosensorId) {
    let patternToMatch = /^[a-zA-Z]{1}[a-zA-Z0-9]*$/;
    return patternToMatch.test(biosensorId);

  }
  deletePatch(patchId) {
    this.service.deletePatch(patchId)
        .subscribe(res => {
          this.fetchTableData();
        }, (error) => {
          if(error) {
            this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
          }
        });
  }
  deleteBiosensor(biosensor) {
    console.log(biosensor);
      const stopMonitoringDialog = this.dialog.open(ConfirmationDialogComponent, {
        maxWidth: "90vw",
        // minWidth: "500px",
        width: "500px",
        backdropClass: "backdropBackground",
        disableClose: true,
        data: {
          heading: "admit-patients-module.dialog.delete_biosensor",
          message: biosensor.status === this.monitoringStatus.STREAMING ? "admit-patients-module.dialog.stop_monitoring_and_delete": "admit-patients-module.dialog.delete_biosensor_message"
        },
      });

      stopMonitoringDialog.afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          if(biosensor.status === this.monitoringStatus.STREAMING) {
            this.service.stopMonitoringUnassigned([biosensor.patchId])
                .subscribe((res: any) => {
                  if(res.status === 'OK') {
                    this.deletePatch(biosensor.patchId);
                  } else {
                    this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
                  }
                }, (error) => {
                  if(error) {
                    this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
                  }
                });
          } else {
            this.deletePatch(biosensor.patchId);
          }
        }
      });
  }
  stopMonitoringUnassigned(patchId) {
    this.service.stopMonitoringUnassigned([patchId])
        .subscribe((res: any) => {
          if(res.status === 'OK') {
            this.fetchTableData();
          }
          else {
            this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
          }
        }, (error) => {
          if(error) {
            this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
          }
        });
  }
  alphaNumericsOnly(event: KeyboardEvent) {
    let charsOnlyPattern = /^[a-zA-Z0-9]+$/;
    let key = event.key;
    if (charsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  ngOnDestroy() {
    clearInterval(this.reloadInterval);
    if (this.unassignedPatientsSub) {
      this.unassignedPatientsSub.unsubscribe();
    }

  }
}
