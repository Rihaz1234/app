import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";

import { CustomiseNotificationsComponent } from "./customise-notifications.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
describe("CustomiseNotificationsComponent", () => {
  let component: CustomiseNotificationsComponent;
  let fixture: ComponentFixture<CustomiseNotificationsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CustomiseNotificationsComponent],
        imports: [MatDialogModule, NoopAnimationsModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomiseNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the openAlertSettings method", () => {
    spyOn(component, "openAlertSettings").and.callThrough();
    component.openAlertSettings();
    expect(component.openAlertSettings).toHaveBeenCalled();
  });
});
