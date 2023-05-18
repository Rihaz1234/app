import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

import { AlertSettingsTwoAComponent } from "./alert-settings-two-a.component";

describe("AlertSettingsTwoAComponent", () => {
  let component: AlertSettingsTwoAComponent;
  let fixture: ComponentFixture<AlertSettingsTwoAComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AlertSettingsTwoAComponent],
        imports: [MatDialogModule],
        providers: [{ provide: MatDialogRef, useValue: {} }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSettingsTwoAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
