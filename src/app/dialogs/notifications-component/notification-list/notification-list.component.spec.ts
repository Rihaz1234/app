import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AlertConfigurationsService } from "../services/alert-configuration.service";
import { NotificationListComponent } from "./notification-list.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { KeycloakService } from "keycloak-angular";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
  StoreModule,
} from "@ngrx/store";
import { TimeagoIntl } from "ngx-timeago";
import { CommonService } from "@services/common.service";
import { AlertHistoryItems } from "@utils/helpers";
import { of } from "rxjs";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import {
  getAlertHistory
} from "../store/alert-configuration.selector"
import {AlertConfigurationMockService} from "../services/alert-configuration-mock.service";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}
describe("NotificationListComponent", () => {
  let component: NotificationListComponent;
  let fixture: ComponentFixture<NotificationListComponent>;
  let commonService: CommonService;
  let store: MockStore;
  let alertHistory: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NotificationListComponent],
        imports:[
          HttpClientTestingModule,
          StoreModule.forRoot([]),
          TranslateModule.forRoot({}),
          MatSnackBarModule,
          MatDialogModule,
          MatProgressSpinnerModule,
          NoopAnimationsModule
        ],
        providers:[
          KeycloakService,
          TranslateService,
          CommonService,
          { provide: TimeagoIntl, useValue: {} },
          { provide: MatDialog, useClass: MatDialogMock },
          { provide: AlertConfigurationsService, useClass: AlertConfigurationMockService },
          provideMockStore({
            selectors: [
              {
                selector: getAlertHistory,
                value: {                  
                  patientId: "",
                  topAlerts: []
                },                
              }
            ]
          })
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationListComponent);
    component = fixture.componentInstance;
    component.patientData = "PATALDRT1";
    alertHistory = [{
      key: 'HR',
      alert: 'Heart Rate',
      items: [{
        patientId: "",
        firstName: "",
        lastName: "",
        activePatch: "ABCD",
        alertTime: 1650537594000000,
        alertTimeFrom: 1650537594000000,
        alertKey: 'HR',
        alertValue: 200,
        ewsScore: 0,
        ack: false,
        active: true,
        setting: []
      }],
      selected: [],
      activeSelected: false,
    }];
    fixture.detectChanges();
    commonService = TestBed.inject(CommonService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize patientid on Init", () => {
    component.patientData = {
      patientId: "PATIENT_ID"
    }
    component.alertHistory = alertHistory;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.patientId).toEqual("PATIENT_ID");
  });

  it("should set alerts on Init", () => {
    component.ngOnInit();
    component.totalAlerts = 0
    fixture.detectChanges();
    expect(component.alerts).toEqual(AlertHistoryItems);
  });

  it("should get alerts on Init", () => {
    const spy = spyOn(component, "getAlerts");
    component.alertHistory = alertHistory;
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
  it("should call the getRelativeTime method and return relative time", () => {
    spyOn(component, "getRelativeTime").and.callThrough();
    const result = component.getRelativeTime(1650537594);
    //expect(result).toBe('15 days ago');
    expect(component.getRelativeTime).toHaveBeenCalledWith(1650537594);
  });
  it("should call the onCheckboxChange method", () => {
    spyOn(component, "onCheckboxChange").and.callThrough();
    component.onCheckboxChange('HR', {checked: true}, {active: true,
      ack: false,});
    expect(component.onCheckboxChange).toHaveBeenCalledWith('HR', {checked: true}, {active: true,
      ack: false,});
  });
  it("should call the checkAll method", () => {
    component.alertHistory = alertHistory;
    spyOn(component, "checkAll").and.callThrough();
    component.checkAll('HR', {checked: true});
    expect(component.alertHistory[0].activeSelected).toBe(true);
    expect(component.checkAll).toHaveBeenCalledWith('HR', {checked: true});
  });
  it("should call the acknowledgeAll method", () => {
    component.alertHistory = alertHistory;
    spyOn(component, "acknowledgeAll").and.callThrough();
    component.acknowledgeAll('HR');
    expect(component.acknowledgeAll).toHaveBeenCalledWith('HR');
  });
  it("should call the acknwoledge method", () => {
    spyOn(component, "acknwoledge").and.callThrough();
    component.acknwoledge(alertHistory[0].items[0]);
    expect(component.acknwoledge).toHaveBeenCalledWith(alertHistory[0].items[0]);
  });
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar");
    component.openSnackBar('snackbar Opened');
    expect(component.openSnackBar).toHaveBeenCalledWith('snackbar Opened');
  });
  it("should call the getAlertType method", () => {
    spyOn(component, "getAlertType").and.callThrough();
    const type = component.getAlertType('SKINTEMP', 'low', 120000, 40000);
    expect(component.getAlertType).toHaveBeenCalledWith('SKINTEMP', 'low', 120000, 40000);
    expect(type).toBe('alert_config_module.below 40');
  });
  it("should call the acknowledgeAllType method", () => {
    spyOn(component, "acknowledgeAllType").and.callThrough();
    component.acknowledgeAllType();
    expect(component.acknowledgeAllType).toHaveBeenCalled();
  });
  it("should call the anyActive method", () => {
    spyOn(component, "anyActive").and.callThrough();
    component.allActiveAlerts = [alertHistory[0].items[0]];
    const active = component.anyActive();
    expect(active).toBe(true);
  });
  it("should call the sort method", () => {
    spyOn(component, "sort").and.callThrough();
    component.sort('alerts', 'asc');
    expect(component.sortDirection).toBe('asc');
    expect(component.sortBy).toBe('alerts');
  });
  it("should call the openConfirmDialog method", () => {
    spyOn(component, "openConfirmDialog").and.callThrough();
    component.openConfirmDialog();
    expect(component.openConfirmDialog).toHaveBeenCalled();
  });
});
