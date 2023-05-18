import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { EventListComponent } from "./event-list.component";
import { AlertConfigurationsService } from "../services/alert-configuration.service";
import { AlertConfigurationMockService } from "../services/alert-configuration-mock.service";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
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
describe("EventListComponent", () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EventListComponent],
        imports:[
          MatDialogModule,
          StoreModule.forRoot([]),
          TranslateModule.forRoot({}),
        ],
        providers:[
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} },
          { provide: MatDialog, useClass: MatDialogMock },
          { provide: AlertConfigurationsService, useClass: AlertConfigurationMockService },
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    component.patientData = "PATALDRT1";
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the showEdit method", () => {
    spyOn(component, "showEdit").and.callThrough();
    component.showEdit();
    expect(component.showEdit).toHaveBeenCalled();
  });
  it("should call the hideEdit method", () => {
    spyOn(component, "hideEdit").and.callThrough();
    component.hideEdit();
    expect(component.hideEdit).toHaveBeenCalled();
  });
  it("should call the getEventList method", () => {
    spyOn(component, "getEventList").and.callThrough();
    component.getEventList();
    expect(component.getEventList).toHaveBeenCalled();
  });
  it("should call the getRelativeTime method and return relative time", () => {
    spyOn(component, "getRelativeTime").and.callThrough();
    const result = component.getRelativeTime(1650537594);
    expect(component.getRelativeTime).toHaveBeenCalledWith(1650537594);
  });
  it("should call the addNewEvent method", () => {
    spyOn(component, "addNewEvent").and.callThrough();
    component.addNewEvent();
    expect(component.addNewEvent).toHaveBeenCalled();
  });
  it("should call the openConfirmDialog method", () => {
    spyOn(component, "openConfirmDialog").and.callThrough();
    component.openConfirmDialog();
    expect(component.openConfirmDialog).toHaveBeenCalled();
  });
  it("should call the recordedNote method", () => {
    spyOn(component, "recordedNote").and.callThrough();
    component.recordedNote();
    expect(component.recordedNote).toHaveBeenCalled();
  });
});
