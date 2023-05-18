import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AlertDestinationComponent } from "./alert-destination.component";
import { BackendApiService } from "@services/backendapi.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { KeycloakService } from "keycloak-angular";
import { AuthenticationService } from "@services/authentication.service";
import { StoreModule } from "@ngrx/store";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  getAlertConfigurationError,
  getLoaderStatus,
  getDestinationAlertConfigurations
} from "../store/alert-configuration.selector";
import { provideMockStore } from "@ngrx/store/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatDialogModule,
  MatDialog,
} from "@angular/material/dialog";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "src/app/app.module";
import { HttpClient } from "@angular/common/http";
describe("AlertDestinationComponent", () => {
  let component: AlertDestinationComponent;
  let fixture: ComponentFixture<AlertDestinationComponent>;
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
              AlertDestId:"",              
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
    component.contactLists = [
      {
        "displayName": "testperson",
        "userId": "USR2034350110"
      }
    ]
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
  it("should call the updateDestinationAlerts method", () => {
    spyOn(component, "updateDestinationAlerts").and.callThrough();  
    component.updateDestinationAlerts();
    expect(component.updateDestinationAlerts).toHaveBeenCalled();
  });
  it("should call the openDialog method", () => {
    spyOn(component, "openDialog").and.callThrough();
    component.openDialog("",0);
    expect(component.openDialog).toHaveBeenCalledWith("",0);
  });
  it("should call the getUrserIds method", () => {
    spyOn(component, "getUrserIds").and.callThrough();
    component.getUrserIds("");
    expect(component.getUrserIds).toHaveBeenCalled();
  });
  it("should call the getUrserIds method - Alert SMS", () => {
    spyOn(component, "getUrserIds").and.callThrough();
    component.getUrserIds("sms");
    expect(component.getUrserIds).toHaveBeenCalled();
  });
  it("should call the getUrserIds method - Alert Whatsapp", () => {
    spyOn(component, "getUrserIds").and.callThrough();
    component.getUrserIds("whatsapp");
    expect(component.getUrserIds).toHaveBeenCalled();
  });
  it("should call the getUrserIds method - Alert Email", () => {
    spyOn(component, "getUrserIds").and.callThrough();
    component.getUrserIds("email");
    expect(component.getUrserIds).toHaveBeenCalled();
  });
  it("should call the getUrserIds method - Alert Caregiver", () => {
    spyOn(component, "getUrserIds").and.callThrough();
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
