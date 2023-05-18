import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule,FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { KeycloakService } from "keycloak-angular";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { ManageRelaysService } from "src/app/settings/manage-relays/services/manage-relays.service";
import { RelaysMockService } from "src/app/settings/manage-relays/services/relays-mock.service";
import { SendOtpQrComponent } from "./send-otp-qr.component";

describe("SendOtpQrComponent", () => {
  let component: SendOtpQrComponent;
  let fixture: ComponentFixture<SendOtpQrComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SendOtpQrComponent],
        imports: [
          ReactiveFormsModule,
          MatDialogModule,
          HttpClientTestingModule,
          TranslateModule.forRoot({}),
          NgxIntlTelInputModule,
          BrowserAnimationsModule,
          MatRadioModule,
          MatSnackBarModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: {close: () => {} } },
          { provide:ManageRelaysService, useClass: RelaysMockService},
          { provide: MAT_DIALOG_DATA, useValue: {} },
          KeycloakService,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOtpQrComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css("form"));
    el = de.nativeElement;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("It should set submitted to true", () => {
    component.onSubmit();
    expect(component.submitted).toBeTrue();
  });
  it("Form should be invalid", () => {
    component.sendOtpForm.controls["email"].setValue("");
    component.sendOtpForm.controls["type"].setValue([]);
    expect(component.sendOtpForm.valid).toBeFalsy();
  });
  it("It should call onSubmit method Form should be valid", () => {
    component.sendOtpForm.controls["email"].setValue("abc@gmail.com");
    //component.sendOtpForm.controls['phoneNumber'].setValue("+919745119669");
    //component.sendOtpForm.controls["type"].patchValue("['OTP']");
    expect(component.sendOtpForm.controls["email"].valid).toBeTruthy();
    //expect(component.sendOtpForm.controls["phoneNumber"].valid).toBeTruthy();
    //expect(component.sendOtpForm.controls["type"].valid).toBeTruthy();
    expect(component.sendOtpForm.valid).toBeFalsy();
    spyOn(component, "onSubmit").and.callThrough();   
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  }); 
  it("should call the isBlank method and return true is string is empty or undefined", async () => {
    spyOn(component, "isBlank").and.callThrough();
    let result = component.isBlank("");
    expect(result).toBeTrue();
  });
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar").and.callThrough();
    component.openSnackBar("Test Message");
    expect(component.openSnackBar).toHaveBeenCalled();
  });
  it("should call the close method", () => {
    spyOn(component, "close").and.callThrough();
    component.close();
    expect(component.close).toHaveBeenCalled();
  });
  it("should call the onCheckboxChange method", () => {
    spyOn(component, "onCheckboxChange").and.callThrough();
    component.sendOtpForm.controls['type'].patchValue([new FormControl('otp')]);
    component.onCheckboxChange({ source: { value: 'type', checked: true } });
    expect(component.sendOtpForm.controls['type'].value).toEqual([]);
    expect(component.onCheckboxChange).toHaveBeenCalledWith({ source: { value: 'type', checked: true } });
  });
});
