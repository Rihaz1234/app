import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { KeycloakService } from "keycloak-angular";
import { SinglePatientRelaysComponent } from "../single-patient-relays/single-patient-relays.component";
import { MultiPatientRelaysComponent } from "../multi-patient-relays/multi-patient-relays.component";
import { ManageRelaysComponent } from "./manage-relays.component";
import {
  StoreModule,
} from "@ngrx/store";
import { ManageRelaysService } from "src/app/settings/manage-relays/services/manage-relays.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpLoaderFactory } from "src/app/app.module";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
import { SendOtpQrComponent } from "src/app/dialogs/manage-relays/send-otp-qr/send-otp-qr.component";
describe("ManageRelaysComponent", () => {
  let component: ManageRelaysComponent;
  let fixture: ComponentFixture<ManageRelaysComponent>;
  let params: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ManageRelaysComponent,
          SinglePatientRelaysComponent,
          SendOtpQrComponent,
          MultiPatientRelaysComponent],
        imports: [
          RouterTestingModule,
          StoreModule.forRoot([]),
          MatDialogModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
          }),
          HttpClientTestingModule,
          MatSnackBarModule,
          NoopAnimationsModule,          
        ],
        providers: [AuthenticationService, KeycloakService,
          ManageRelaysService,
          FormBuilder,
          { provide: MAT_DIALOG_DATA, useValue: {} },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRelaysComponent);
    component = fixture.componentInstance;
    params = {
      navigationUrl: "",
      tabSelected: "sprelay",
    };
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
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
  it("should call the openQrDialog method", () => {
    spyOn(component, "openQrDialog").and.callThrough();
    component.openQrDialog();
    expect(component.openQrDialog).toHaveBeenCalled();
  });
  it("should call the search method", async () => {
    spyOn(component, "search").and.callThrough();
    component.search();
    expect(component.search).toHaveBeenCalled();
  });
  it("should call the relaysSelected method", () => {
    spyOn(component, "relaysSelected").and.callThrough();
    component.relaysSelected({});
    expect(component.relaysSelected).toHaveBeenCalled();
  });
  it("should call the deleteRelays method", () => {
    spyOn(component, "deleteRelays").and.callThrough();
    component.deleteRelays();
    expect(component.deleteRelays).toHaveBeenCalled();
  });
  it("should call the getDate method", () => {
    spyOn(component, "getDate").and.callThrough();
    component.getDate("");
    expect(component.getDate).toHaveBeenCalled();
  });
});

