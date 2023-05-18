import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { KeycloakService } from "keycloak-angular";
import { ManageUsersService } from "../services/manage-users.service";
import { TelInputComponent } from "../../../shared/tel-input/tel-input.component";
import { AdduserComponent } from "./adduser.component";
import { of } from "rxjs";
import { UsersMockService } from "../services/users-mock.service";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { getUsersError, getUsersStatus } from "../store/manage-users.selector";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { forwardRef } from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "@angular/forms";
import { LacMatTelInputModule } from "lac-mat-tel-input";
export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () =>
        of({
          data: {
            FacilityId: "CF910341317",
            alertDestId: "",
            alertId: "AL741547195",
            groupId: "GRP1140711122",
            name: "SEPSIS",
          },
        }),
    };
  }
}
export class MockDialogRef {
  close(value) {
    return true;
  }
}

describe("AdduserComponent", () => {
  let component: AdduserComponent;
  let fixture: ComponentFixture<AdduserComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let params: any;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdduserComponent,TelInputComponent],
      imports: [
        MatDialogModule,
        TranslateModule.forRoot({}),
        ReactiveFormsModule,
        HttpClientTestingModule,
        StoreModule.forRoot([]),
        BrowserAnimationsModule,
        MatRadioModule,
        MatSelectModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        LacMatTelInputModule
      ],
      providers: [
        { provide: MatDialogRef, useClass: MockDialogRef },
        AuthenticationService,
        KeycloakService,
        { provide: ManageUsersService, useClass: UsersMockService },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => TelInputComponent),
          multi: true},
        { provide: TelInputComponent, useValue: "test" },
        provideMockStore({
          selectors: [
            {
              selector: getUsersError,
              value: "Error",
            },
            {
              selector: getUsersStatus,
              value: "OK",
            },
          ],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserComponent);
    component = fixture.componentInstance;
    fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css("form"));
    el = de.nativeElement;
    
    params = {
      groups: [
        {
          FacilityId: "CF910341317",
          alertDestId: "",
          alertId: "AL741547195",
          groupId: "GRP1140711122",
          name: "SEPSIS",
        },
      ],
    };
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("It should set submitted to true", () => {
    component.onSubmit();
    expect(component.submitted).toBeTrue();
  });
  it("Form should be invalid", () => {
    component.addUserForm.controls["email"].setValue("");
    component.addUserForm.controls["firstName"].setValue("");
    component.addUserForm.controls["lastName"].setValue("");
    expect(component.addUserForm.valid).toBeFalsy();
  });
  it("It should call onSubmit method Form should be valid", () => {
    component.addUserForm.controls["email"].setValue("abc@gmail.com");
    component.addUserForm.controls["firstName"].setValue("Test");
    component.addUserForm.controls["lastName"].setValue("user");
    component.addUserForm.controls["roles"].setValue("['CFA']");
    component.addUserForm.controls['phoneNo'].setValue("+919745119669");
    expect(component.addUserForm.controls["email"].valid).toBeTruthy();
    expect(component.addUserForm.controls["firstName"].valid).toBeTruthy();
    expect(component.addUserForm.controls["lastName"].valid).toBeTruthy();
    expect(component.addUserForm.controls["roles"].valid).toBeTruthy();
    expect(component.addUserForm.controls["phoneNo"].valid).toBeTruthy();
    expect(component.addUserForm.valid).toBeTruthy();
    component.groups = params?.groups;
    spyOn(component, "onSubmit").and.callThrough();
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });
  it("should call the isBlank method and return true is string is empty or undefined", async () => {
    spyOn(component, "isBlank").and.callThrough();
    let result = component.isBlank("");
    expect(result).toBeTrue();
  });
  it("should call the addGroup method", async () => {
    spyOn(component, "addGroup").and.callThrough();
    component.addGroup();
    expect(component.addGroup).toHaveBeenCalled();
  });
  it("should call the remove method", async () => {
    component.ngOnInit();
    
    fixture.detectChanges();
    spyOn(component, "remove").and.callThrough();
    component.groups = params?.groups;
    component.remove("GRP1140711122");
    expect(
      component.groups.filter((group) => group.groupId === "GRP1140711122")
        .length
    ).toBe(0);
    expect(component.remove).toHaveBeenCalledWith("GRP1140711122");
  });
  it("should call the saveChanges method", async () => {
    spyOn(component, "saveChanges").and.callThrough();
    component.groups = params?.groups;
    component.saveChanges("GRP1140711122");
    expect(component.saveChanges).toHaveBeenCalledWith("GRP1140711122");
  });  
  it("should call the close method", () => {
    spyOn(component, "close").and.callThrough();
    component.close();
    expect(component.close).toHaveBeenCalled();
  });
  it("should call the charsOnly method", () => {
    spyOn(component, "charsOnly").and.callThrough();
    const event = new KeyboardEvent("keypress",{
      "key": "Enter"
    });
    component.charsOnly("",event);
    expect(component.charsOnly).toHaveBeenCalled();
  });
  it("should call the numericsOnly method", () => {
    spyOn(component, "numericsOnly").and.callThrough();
    const event = new KeyboardEvent("keypress",{
      "key": "Enter"
    });
    component.numericsOnly("",event);
    expect(component.numericsOnly).toHaveBeenCalled();
  });
});
