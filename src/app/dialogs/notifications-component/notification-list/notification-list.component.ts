import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AlertConfigurationsService } from "../services/alert-configuration.service";
import { Store } from "@ngrx/store";
import { AlertConfigurationStoreActions, AlertConfigurationStoreSelectors, AlertConfigurationStoreState } from "../store";
import {
  AlertHistoryItems, priorityColorCode, postures
} from "@utils/helpers";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "../../../shared/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { UserPreferenceService } from "@services/user-preference.service";
import { environment } from "src/environments/environment";
import { SnackbarService } from "@services/snackbar.service";

@Component({
  selector: "app-notification-list",
  templateUrl: "./notification-list.component.html",
  styleUrls: ["./notification-list.component.scss"],
})
export class NotificationListComponent implements OnInit, OnDestroy{
  @Input() patientData: any;
  priorityHexCode: any = priorityColorCode;
  patientId;
  tab = 'alerts';
  alertHistory$;
  alerts;
  alertHistory = [];
  timeZone: string;
  readonly timeFmt: string = environment.customization.timeFormat;
  loader = true;
  loaderSubscription;
  current = 0;
  unAcknowledged = 0;
  count;
  allActiveAlerts = [];
  totalAlerts = 0;
  sortBy = 'alertTime';
  sortDirection = 'desc';
  userPreferenceUnit = "SI";
  reloadInterval;
  autorefresh = false;
  lastUpdated;
  postures;
  constructor(
    private alertService: AlertConfigurationsService,
    private store$: Store<AlertConfigurationStoreState.patientAlertConfigurationState>,
    private userPreference: UserPreferenceService,
    private translate: TranslateService,
    private snackbar: SnackbarService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.postures = postures;
    this.patientId = this.patientData.patientId;
    this.timeZone = this.userPreference.getUserTimeZone();
    this.userPreferenceUnit = this.userPreference.getUserUnitSystem();
    this.alerts = AlertHistoryItems;
    this.getAlerts();
    this.reloadInterval = setInterval(() => {
      this.getAlerts();
    }, 30000);
    this.alertHistory$ = this.store$.select(
        AlertConfigurationStoreSelectors.getAlertHistory
    );
    this.alertHistory$.subscribe(res => {
      console.log(res);
      this.lastUpdated = new Date().toUTCString();
      this.current = 0;
      this.totalAlerts = 0;
      this.unAcknowledged = 0;
      this.allActiveAlerts = [];
      this.alertHistory = [];
      let alertHistory = res.topAlerts;
      this.alerts.forEach((element:any) => {
        this.alertHistory.push({
          key: element.key,
          alert: element.alerts,
          items: res?.topAlerts ? alertHistory?.find(alertType =>  alertType.alertKey === element.key)?.topN || [] : [],
          selected: [],
          activeSelected: false,
          unAck: 0
        } );
      });
      this.alertHistory.forEach(alert => {
        alert.items = this.alertService.sortAlerts(alert.items);
        alert?.items?.forEach(ele => {
          this.totalAlerts++;
          ele = {...ele, checked: false};
          if(ele.active) {
            this.current++;
          }
          if(!ele.ack) {
            this.unAcknowledged++;
            alert.unAck++;
          }
          if(!ele.ack) {
            this.allActiveAlerts.push(ele);
          }

        })
      });
      this.count = {
        current: this.current,
        unAcknowledged: this.unAcknowledged
      }
    });
  }
  getAlerts() {
    let param: any = {
      patientId: this.patientId
    };
    this.store$.dispatch(new AlertConfigurationStoreActions.LoadAlertHistoryRequestAction({ params: param }))
    this.loaderSubscription = this.store$
        .select(AlertConfigurationStoreSelectors.getAlertHistoryLoader)
        .subscribe((loaded) => {
          if (loaded) {
            this.loader = false;
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
  onCheckboxChange(key, event, alertRow) {
    this.alertHistory.forEach(alert => {
      if(alert.key === key) {
        if(event.checked) {
          if(alertRow.active) {
            alert.activeSelected = true;
          }
          alert.selected = [...alert.selected, alertRow];
        } else {
          if(alertRow.active) {
            alert.activeSelected = false;
          }
          let i = alert.selected.indexOf(alertRow);
          alert.selected.splice(i, 1);
        }
      }
    });
  }
  checkAll(key, event) {
    this.alertHistory.forEach(alert => {
      if(alert.key === key) {
        alert.selected = [];
        alert.items.forEach(item => {
          if(!item.ack) {
            item.checked = event.checked;
            if(event.checked) {
              if(item.active) {
                alert.activeSelected = true;
              }
              alert.selected = [...alert.selected, item];
            } else {
              alert.selected = [];
              alert.activeSelected = false;
            }
          }
        })
      }
    });
  }
  acknowledgeAll(key) {
    this.alertHistory.forEach(alert => {
      if (alert.key === key) {
        let body = {
          "alertAckInfo": alert.selected,
          "forActive": alert.activeSelected
        };
        this.alertService.acknowledgeAlert(body)
          .subscribe((res: any) => {
            if (res.status === 'OK') {
              this.loader = true;
              this.getAlerts();
              this.snackbar.openCustomSnackBar("alert_config_module.messages." + res.message, 'bottom', 'center', true);
            }
          });
      }
    })
  }
  acknwoledge(alert) {
    let body = {
      "alertAckInfo": [alert],
      "forActive": alert.active
    }
    this.alertService.acknowledgeAlert(body)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === 'OK') {
          this.loader = true;
          this.getAlerts();
          this.snackbar.openCustomSnackBar("alert_config_module.messages." + res.message, 'bottom', 'center', true);
        }
      });
  }
  getAlertType(alertKey, type, highThr, lowThr) {
    let alertType = '';
    let alertValue = '';
    if(alertKey === 'SKINTEMP' || alertKey === 'BODYTEMP') {
      highThr = (highThr/100)/10;
      lowThr = (lowThr/100)/10;
      if(this.userPreferenceUnit === 'IS') {
        highThr = this.userPreference.convertCtoF(highThr);
        lowThr = this.userPreference.convertCtoF(lowThr);
      }
    }
    if(/low/i.test(type)) {
      alertType = "below";
      alertValue = lowThr;
    } else if (/high/i.test(type)) {
      alertType = "above";
      alertValue = highThr;
    }
    this.translate.get('alert_config_module.'+alertType).subscribe((tran) => {
      alertType = tran + " " + alertValue;
    });
    return alertType;
  }
  acknowledgeAllType() {
    let body = {
      "alertAckInfo": this.allActiveAlerts,
      "forActive": true
    }
    this.alertService.acknowledgeAlert(body)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === 'OK') {
          this.loader = true;
          this.getAlerts();
          this.snackbar.openCustomSnackBar("alert_config_module.messages." + res.message, 'bottom', 'center', true);
        }
      });
  }

  downloadLog() {
    this.alertService.downloadAlertLog(this.patientId).subscribe(data => {
      var blobUrl = URL.createObjectURL(data);
      var link = document.createElement("a"); // Or maybe get it from the current document
      link.href = blobUrl;
      // link.innerHTML = "Download Log";
      link.download = "AlertLog-" +this.patientId+ ".pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
  }

  anyActive() {
    return this.allActiveAlerts.length > 0;
  }
  sort(active, dir) {
    this.sortBy = active;
    this.sortDirection = dir;
    this.getAlerts();
  }
  openConfirmDialog() {
    const SaveChanges = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "95vw",
      maxHeight: "95vh",
      data: {
        body: {
          title: "alert_config_module.messages.acknowledge_alerts",
          text: "alert_config_module.messages.confirm_acknowledge",
        },
      },
      disableClose: true,
    });
    SaveChanges.afterClosed().subscribe((data) => {
      if (data) {
        this.acknowledgeAllType();
      }
    });
  }
  ngOnDestroy() {
    clearInterval(this.reloadInterval);
  }
}

