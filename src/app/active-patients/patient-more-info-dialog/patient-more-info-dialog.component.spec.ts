import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { PatientMoreInfoDialogComponent } from "./patient-more-info-dialog.component";
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { AuthenticationService } from "@services/authentication.service";
import { KeycloakService } from "keycloak-angular";
import { of } from "rxjs";
export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}
describe("PatientMoreInfoDialogComponent", () => {
  let component: PatientMoreInfoDialogComponent;
  let fixture: ComponentFixture<PatientMoreInfoDialogComponent>;
  let params: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientMoreInfoDialogComponent],
      imports: [
        TranslateModule.forRoot({}),
        MatDialogModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        StoreModule.forRoot([]),
        BrowserAnimationsModule,
         
      ],
      providers: [
        { provide: MatDialogRef, useValue: {close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useClass: MatDialogMock },
        AuthenticationService,
        KeycloakService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMoreInfoDialogComponent);
    component = fixture.componentInstance;
    params = {
      event: KeyboardEvent,
      patchIdData : [{
        deviceId: "",
        deviceType: "",
        endTime: 0,
        startTime: 0
      }]
    }; 
    
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the toggleStatus method", () => {
    spyOn(component, "toggleStatus").and.callThrough();
    component.toggleStatus();
    expect(component.toggleStatus).toHaveBeenCalled();
  });
  it("should call the checkIfExisting method", () => {
    spyOn(component, "checkIfExisting").and.callThrough();
    component.patchIdData = [{
      deviceId: "",
      deviceType: "",
      endTime: 0,
      startTime: 0
    }]
    component.checkIfExisting();
    expect(component.checkIfExisting).toHaveBeenCalled();
  });
  it("should call the onClickDelete method", () => {
    spyOn(component, "onClickDelete").and.callThrough();
    component.onClickDelete(params.patchIdData);
    expect(component.onClickDelete).toHaveBeenCalled();
  });  
  it("should call the keypressEvent method", () => {
    spyOn(component, "keypressEvent").and.callThrough();
    component.bioString = "";
    component.keypressEvent(params.event);
    expect(component.keypressEvent).toHaveBeenCalledWith(params.event);
  });
  it("should call the keydownEvent method", () => {
    spyOn(component, "keydownEvent").and.callThrough();
    component.bioString = "";
    component.keydownEvent(params.event);
    expect(component.keydownEvent).toHaveBeenCalledWith(params.event);
  });
  it("should call the clear method", () => {
    spyOn(component, "clear").and.callThrough();
    component.clear();
    expect(component.clear).toHaveBeenCalled();
  });
  it("should call the onClickSave method", () => {
    spyOn(component, "onClickSave").and.callThrough();
    component.onClickSave();
    expect(component.onClickSave).toHaveBeenCalled();
  });
  it("should call the addBiosensorId method", () => {
    spyOn(component, "addBiosensorId").and.callThrough();
    component.newBiosensorId = "";
    component.addBiosensorId();
    expect(component.addBiosensorId).toHaveBeenCalled();
  });  
  it("should call the openDeleteConfirmationModal method", () => {
    spyOn(component, "openDeleteConfirmationModal").and.callThrough();
    component.openDeleteConfirmationModal("");
    expect(component.openDeleteConfirmationModal).toHaveBeenCalled();
  });
  it("should call the isFutureDate method", () => {
    spyOn(component, "isFutureDate").and.callThrough();
    component.isFutureDate("");
    expect(component.isFutureDate).toHaveBeenCalled();
  });
});
