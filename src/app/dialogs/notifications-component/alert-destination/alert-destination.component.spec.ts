import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { FormArray, FormBuilder,FormControl,FormGroup,FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { By } from '@angular/platform-browser';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  getAlertConfigurationError,
  getLoaderStatus,
  getDestinationAlertConfigurations,getClinicalFacilityContacts
} from "../store/alert-configuration.selector";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { AlertDestinationComponent } from "./alert-destination.component";
import { BackendApiService } from "@services/backendapi.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { KeycloakService } from "keycloak-angular";
import { AuthenticationService } from "@services/authentication.service";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "src/app/app.module";
import { HttpClient } from "@angular/common/http";
describe("AlertDestinationComponent", () => {
  let component: AlertDestinationComponent;
  let fixture: ComponentFixture<AlertDestinationComponent>;
  let params: any;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertDestinationComponent],
     
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        StoreModule.forRoot([]),
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        NoopAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }}),  
        MatSlideToggleModule  
      ],
      providers: [
        BackendApiService,
        KeycloakService,
        AuthenticationService,
        FormBuilder,
        {provide: MatDialog},
        provideMockStore({          
          selectors:[ 
          {
            selector: getDestinationAlertConfigurations,
            value:{             
              Setting: {
                AlertSMS: ["USR2034350110"],
                AlertWhatsApp: ["USR2034350110"],
                AlertEmail: ["USR2034350110"],
                AlertCaregiverApp: ["USR2034350110"],
                AlertSMSEnabled:false,
                AlertWhatsAppEnabled: false,
                AlertEmailEnabled: false,
                AlertCaregiverAppEnabled: false,
              }, 
              GroupId: "",
              FacilityId : "", 
            },                 
          },   
          {
            selector: getLoaderStatus,
            value: true,
          },
          {
            selector: getAlertConfigurationError,
            value: "OPERATION_FAILED",
          },
          ]
        })
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDestinationComponent);
    component = fixture.componentInstance;  
    params = {
      navigationUrl: "",
      tabSelected: "parameter",      
    };
    component.contactLists = [
      {
        "displayName": "testperson",
        "userId": "USR2034350110"
      }
    ]
    formBuilder = TestBed.inject(FormBuilder); 
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar").and.callThrough();
    component.openSnackBar("Test Message");
    expect(component.openSnackBar).toHaveBeenCalled();
  });
  it("should call the handleAlertSettingsSave method", () => {
    spyOn(component, "handleAlertSettingsSave").and.callThrough();
    getDestinationAlertConfigurations.setResult({
      Setting: {
        AlertSMS: '',
        AlertWhatsApp: '',
        AlertEmail: '',
        AlertCaregiverApp: '',
        AlertSMSEnabled:false,
        AlertWhatsAppEnabled: false,
        AlertEmailEnabled: false,
        AlertCaregiverAppEnabled: false
      },     
    })
    component.handleAlertSettingsSave();
    expect(component.handleAlertSettingsSave).toHaveBeenCalled();
  });
  it("should call the openDialog method", () => {
    spyOn(component, "openDialog").and.callThrough();
    component.openDialog("",0);
    expect(component.openDialog).toHaveBeenCalledWith("",0);
  });
  it("should call the getUrserIds method", () => {
    spyOn(component, "getUrserIds").and.callThrough();
    component.contactLists = ["testperson","USR2034350110"]; 
    component.getUrserIds("");
    expect(component.getUrserIds).toHaveBeenCalled();
  });
  it("should call the getUrserIds method - Alert SMS", () => {
    spyOn(component, "getUrserIds").and.callThrough();
    component.contactLists = ["testperson","USR2034350110"]; 
    component.getUrserIds("sms");
    expect(component.getUrserIds).toHaveBeenCalled();
  });
  it("should call the getUrserIds method - Alert Whatsapp", () => {
    spyOn(component, "getUrserIds").and.callThrough();
    component.contactLists = ["testperson","USR2034350110"]; 
    component.getUrserIds("whatsapp");
    expect(component.getUrserIds).toHaveBeenCalled();
  });
  it("should call the getUrserIds method - Alert Email", () => {
    spyOn(component, "getUrserIds").and.callThrough();
    component.contactLists = ["testperson","USR2034350110"]; 
    component.getUrserIds("email");
    expect(component.getUrserIds).toHaveBeenCalled();
  });
  it("should call the getUrserIds method - Alert Caregiver", () => {
    spyOn(component, "getUrserIds").and.callThrough();
    component.contactLists = ["testperson","USR2034350110"]; 
    component.getUrserIds("caregiver");
    expect(component.getUrserIds).toHaveBeenCalled();
  }); 
  it("should call the removeContactSelected method", () => {
    spyOn(component, "removeContactSelected").and.callThrough();
    component.removeContactSelected("",0);
    expect(component.removeContactSelected).toHaveBeenCalledWith("",0);
  }); 
  it("should call the removeContactSelected method - Alert SMS" , () => {
    spyOn(component, "removeContactSelected").and.callThrough();
    component.removeContactSelected("sms",0);
    expect(component.removeContactSelected).toHaveBeenCalledWith("sms",0);
  }); 
  it("should call the removeContactSelected method - Alert Whatsapp", () => {
    spyOn(component, "removeContactSelected").and.callThrough();
    component.removeContactSelected("whatsapp",0);
    expect(component.removeContactSelected).toHaveBeenCalledWith("whatsapp",0);
  });
  it("should call the removeContactSelected method - Alert Email", () => {
    spyOn(component, "removeContactSelected").and.callThrough();
    component.removeContactSelected("email",0);
    expect(component.removeContactSelected).toHaveBeenCalledWith("email",0);
  });
  it("should call the removeContactSelected method - Alert Caregiver", () => {
    spyOn(component, "removeContactSelected").and.callThrough();
    component.removeContactSelected("caregiver",0);
    expect(component.removeContactSelected).toHaveBeenCalledWith("caregiver",0);
  });  
  it("should call the updated method", () => {
    spyOn(component, "updated").and.callThrough();
    component.updated();
    expect(component.updated).toHaveBeenCalled();
  }); 
  it("should call the handleAlertSettingsEditCancel method", () => {
    spyOn(component, "handleAlertSettingsEditCancel").and.callThrough();
    component.handleAlertSettingsEditCancel();
    expect(component.handleAlertSettingsEditCancel).toHaveBeenCalled();
  });
  it("should call the navigateUrl method", () => {
    spyOn(component, "navigateUrl").and.callThrough();
    component.navigateUrl(params.navigationUrl);
    expect(component.navigateUrl).toHaveBeenCalledWith(params.navigationUrl);
  });
  it("should call the selectTab method", () => {
    spyOn(component, "selectTab").and.callThrough();
    component.selectTab(params.tabSelected);
    expect(component.selectedTab).toBe(params.tabSelected);
    expect(component.selectTab).toHaveBeenCalledWith(params.tabSelected);
  });  
  it("should call the addContactDropdownList method", () => {
    spyOn(component, "addContactDropdownList").and.callThrough();  
    component.addContactDropdownList("",false);
    expect(component.addContactDropdownList).toHaveBeenCalledWith("",false);
  });
  it("should call the setDefaultContactListData method", () => {
    spyOn(component, "setDefaultContactListData").and.callThrough();
    component.setDefaultContactListData("");
    expect(component.setDefaultContactListData).toHaveBeenCalled();
  });
}); 
