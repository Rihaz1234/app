import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { AddEventComponent } from './add-event.component';

describe('AddEventComponent', () => {
  let component: AddEventComponent;
  let fixture: ComponentFixture<AddEventComponent>;
  let params: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventComponent ],
      imports:[
        TranslateModule.forRoot({}),
      ],
      providers:[
        FormBuilder,
        { provide: MatDialogRef, useValue: {close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventComponent);
    component = fixture.componentInstance;
    params = {
      selectedTab: "recordedNote",      
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should call the charsOnly method", () => {
    spyOn(component, "charsOnly").and.callThrough();
    const event = new KeyboardEvent("keypress",{
      "key": "Enter"
    });
    component.charsOnly(event);
    expect(component.charsOnly).toHaveBeenCalled();
  });
  it("It should set submitted to true", () => {
    component.onSubmit();
    expect(component.submitted).toBeTrue();
  });
  it("Form should be invalid", () => {
    component.addEventForm.controls["symptoms"].setValue("");
    component.addEventForm.controls["time"].setValue("");
    expect(component.addEventForm.valid).toBeFalsy();
  });
  it("It should call onSubmit method Form should be valid", () => {
    component.addEventForm.controls["symptoms"].setValue("Fever");
    component.addEventForm.controls["time"].setValue("12:30");
    expect(component.addEventForm.controls["symptoms"].valid).toBeTruthy();
    expect(component.addEventForm.controls["time"].valid).toBeTruthy();
    expect(component.addEventForm.valid).toBeTruthy();
    component.selectedTab = params.selectedTab;
    spyOn(component, "onSubmit").and.callThrough();
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });
  it("should call the selectTab method", () => {
    spyOn(component, "selectTab").and.callThrough();
    component.selectTab("");
    expect(component.selectTab).toHaveBeenCalled();
  });
});
