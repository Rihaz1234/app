import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {AddEventComponent} from "../add-event/add-event.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {AlertConfigurationsService} from "../services/alert-configuration.service";
import {Store} from "@ngrx/store";
import {AlertConfigurationStoreActions, AlertConfigurationStoreSelectors, AlertConfigurationStoreState} from "../store";
import {UserPreferenceService} from "@services/user-preference.service";
import {environment} from "../../../../environments/environment";
import {SnackbarService} from "@services/snackbar.service";
import {AuthenticationService} from "@services/authentication.service";
import {TableState} from "../../../life-signals/_models/ls-column.model";

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"],
})
export class EventListComponent implements OnInit, OnDestroy{
  @Input() patientData: any;
  readonly timeFmt: string = environment.customization.timeFormat;
  loader = true;
  timeZone;
  editlabel = [false];
  eventList$;
  eventListCount;
  patientId;
  loaderSubscription;
  patientEventList;
  selectedEvents = [];
  unAcknowledged = 0;
  editAccess = false;
  roles;
  lastUpdated;
  reloadInterval;
  config = {
    page: {
      pageSize: 10,
      pageIndex: 0,
      length: null
    },
    tableState: TableState.DEFAULT
  }
  constructor(
    private dialog: MatDialog, public alertService: AlertConfigurationsService,
    private store$: Store<AlertConfigurationStoreState.patientAlertConfigurationState>,
    private userPreference: UserPreferenceService,
    private snackbar: SnackbarService,
    private autheticationService: AuthenticationService
  ) { }
  ngOnInit() {
    this.timeZone = this.userPreference.getUserTimeZone();
    this.roles = this.autheticationService.getRoles() || [];
    if (this.roles?.indexOf("GC") > -1 || this.roles?.indexOf("PHY") > -1) {
      this.editAccess = true;
    }
    this.patientId = this.patientData.patientId;
    this.eventList$ = this.store$.select(
        AlertConfigurationStoreSelectors.getEventList
    );
    this.getEventList();
    // this.reloadInterval = setInterval(() => {
    //   this.getEventList();
    // }, 30000);
    this.eventList$.subscribe(res => {
      this.lastUpdated = new Date().toUTCString();
      this.unAcknowledged = 0;
      this.selectedEvents = [];
      console.log(res);
      this.patientEventList = res.map(event => {
        if(!event.ack && (event?.notes || event?.symptoms?.length || event?.activity?.length)) {
          this.unAcknowledged++;
        }
        return {
          ...event,
          checked: false,
          mandatoryNote: (!event?.notes && !event?.symptoms?.length && !event?.activity?.length) || false
        }
      });
      console.log(this.patientEventList);
    });
    this.store$.select(
        AlertConfigurationStoreSelectors.getEventListCount
    ).subscribe(count => {
      this.eventListCount = count;
      this.config.page.length = count;
    });
    this.store$.select(
        AlertConfigurationStoreSelectors.getTableState
    ).subscribe(state => {
      this.config.tableState = state;
    });
    this.store$
        .select(AlertConfigurationStoreSelectors.getEventListLoader)
        .subscribe((loaded) => {
          if (loaded) {
            this.loader = false;
          }
        });
  }
  getEventList() {
    let param: any = {
      patientId: this.patientId,
      page: this.config.page.pageIndex,
      pageSize: this.config.page.pageSize
    };
    this.store$.dispatch(new AlertConfigurationStoreActions.LoadEventListRequestAction({ params: param }))
    this.loaderSubscription = this.store$
        .select(AlertConfigurationStoreSelectors.getEventListLoader)
        .subscribe((loaded) => {
          if (loaded) {
            this.loader = false;
          }
        });
  }
  showEdit(index) {
    this.editlabel[index] = true;
  }
  addNewEvent() {
    const addEvent = this.dialog.open(AddEventComponent, {
      width: "600px",
      maxWidth: "98vw",
      height: "100%",
      maxHeight:"100vh",
      panelClass: "add-event-container",
      //maxHeight: "95vh",
      //height: "530px",
     // height: "auto",
      //minHeight: "100px",
      //maxHeight: "90vh",
      data: {patientId: this.patientId, patchStarted: this.patientData?.started},
      disableClose: true,
    });
    addEvent.afterClosed().subscribe((data) => {
      console.log(data);
      if(data) {
        this.getEventList();
      }
    });
  }
  editEvent(event) {
    const addEvent = this.dialog.open(AddEventComponent, {
      width: "600px",
      //maxWidth: "98vw",
      //maxHeight: "95vh",
      //height: "530px",
      maxWidth: "96vw",
      height: "100%",
      maxHeight:"100vh",
      panelClass: "add-event-container",
      data: {editEvent: true, event: event},
      disableClose: true,
    });
    addEvent.afterClosed().subscribe((data) => {
      if(data) {
        this.getEventList();
      }
    });
  }
  getRelativeTime(timestamp) {
    let date = new Date();
    const currentTimestamp = (date.getTime())/1000;
    const difference = currentTimestamp - timestamp;
    let output = ``;
    if ( difference > 0 && difference < 60) {
      // Less than a minute has passed:
      output = `${Math.round(difference)} secs ago`;
    } else if (difference < 3600) {
      // Less than an hour has passed:
      output = `${Math.floor(difference / 60)} mins ago`;
    } else if (difference < 86400) {
      // Less than a day has passed:
      output = `${Math.floor(difference / 3600)} hrs ago`;
    } else if (difference < 2620800) {
      // Less than a month has passed:
      let relativeTime = Math.floor(difference / 86400);
      if (relativeTime === 1) {
        output = `${Math.floor(difference / 86400)} day ago`;
      } else {
        output = `${Math.floor(difference / 86400)} days ago`;
      }
    }
    return output
  }
  openConfirmDialog() {
    const SaveChanges = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "95vw",
      maxHeight: "95vh",
      data: {
        body: {
          title: "alert_config_module.messages.acknowledge_events",
          text: "alert_config_module.add_event.confirm_acknowledge",
        },
      },
      disableClose: true,
    });
    SaveChanges.afterClosed().subscribe((data) => {
      if (data) {
        let body = {
          patientId: this.patientId,
          ids: this.selectedEvents
        };
        this.alertService.acknowledgeEvent(body)
            .subscribe(res => {
              console.log(res);
              if(res.status === 'OK') {
                this.loader = true;
                this.getEventList()
              }
            }, error => {
              if(error) {
                this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
              }
            });
      }
    });
  }
  recordedNote(event) {
    const addEvent = this.dialog.open(AddEventComponent, {
      width: "600px",
      //maxWidth: "98vw",
      //maxHeight: "95vh",
      //height: "530px",
      maxWidth: "96vw",
      height: "400px",
      //maxHeight:"100vh",
      //panelClass: "add-event-container",
      data: {recordedNote: true, event: event},
      disableClose: true,
    });
    addEvent.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }
  addNote(event) {
    const addEvent = this.dialog.open(AddEventComponent, {
      width: "600px",
      //maxWidth: "98vw",
      //maxHeight: "95vh",
      //height: "530px",
      maxWidth: "96vw",
      height: "100%",
      maxHeight:"100vh",
      panelClass: "add-event-container",
      data: {addNote: true, event: event},
      disableClose: true,
    });
    addEvent.afterClosed().subscribe((data) => {
      if(data) {
        this.getEventList();
      }
    });
  }
  acknowledge(event) {
    console.log(event);
    let body = {
      patientId: this.patientId,
      ids: [event.id]
    };
    if(event?.mandatoryNote) {
      this.addNote(event);
    } else {
      this.alertService.acknowledgeEvent(body)
          .subscribe(res => {
            console.log(res);
            if (res.status === 'OK') {
              this.loader = true;
              this.getEventList()
            }
          }, error => {
            if (error) {
              this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
            }
          });
    }
  }
  onCheckboxChange(event, id) {
    if(event.checked) {
      this.selectedEvents = [...this.selectedEvents, id];
    } else {
      let i = this.selectedEvents.indexOf(id);
      this.selectedEvents.splice(i, 1);
    }
  }
  checkAll(event) {
    this.selectedEvents = []
    this.patientEventList.forEach(eve => {
      if(event.checked) {
        if(!eve.ack && !eve.mandatoryNote) {
          eve.checked = true;
          this.selectedEvents = [...this.selectedEvents, eve.id];
        }
      } else {
        eve.checked = false;
      }
    });
    console.log(this.selectedEvents);
  }
  addEventName(index, event) {
    this.editlabel[index] = false
    event.alertType = event.alertName;
    this.alertService.addEvent(event)
        .subscribe(res => {
          if(res.status === 'OK') {
            this.loader = true;
            this.getEventList();
          }
        }, error => {
          if(error) {
            this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
          }
        });
  }
  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let key = clipboardData.getData('text');
    let charsOnlyPattern = /^[a-zA-Z0-9 ]+$/;
    if (charsOnlyPattern.test(key)) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
  }
  eventLabelValid(eventLabel) {
    let pattern = /^[a-zA-Z0-9]{1}[a-zA-Z0-9 ]*$/;
    return pattern.test(eventLabel);
  }
  cancelEdit(index) {
    this.editlabel[index] = false;
    this.getEventList();
  }
  onPage(event) {
    this.config = {
      ...this.config,
      page: {
        ...this.config.page,
        pageIndex: event.pageIndex,
        pageSize: event.pageSize
      }
    }
    this.getEventList();
  }

  downloadLog() {
    this.alertService.downloadEventLog(this.patientId).subscribe(data => {
      var blobUrl = URL.createObjectURL(data);
      var link = document.createElement("a");
      link.href = blobUrl;
      link.download = "EventLog-" + this.patientId + ".pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
  }
  ngOnDestroy() {
    clearInterval(this.reloadInterval);
  }
}
