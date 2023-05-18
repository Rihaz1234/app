import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TelInputComponent } from "./tel-input.component";
import { LacMatTelInputModule } from "lac-mat-tel-input";
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { forwardRef } from "@angular/core";

describe("TelInputComponent", () => {
  let component: TelInputComponent;
  let fixture: ComponentFixture<TelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelInputComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        LacMatTelInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => TelInputComponent),
          multi: true,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the writeValue method", () => {
    spyOn(component, "writeValue").and.callThrough();
    component.writeValue("");
    expect(component.writeValue).toHaveBeenCalledWith("");
  }); 
  it("should call the registerOnChange method", () => {
    spyOn(component, "registerOnChange").and.callThrough();
    component.registerOnChange("");
    expect(component.registerOnChange).toHaveBeenCalledWith("");
  }); 
  it("should call the registerOnTouched method", () => {
    spyOn(component, "registerOnTouched").and.callThrough();
    component.registerOnTouched("");
    expect(component.registerOnTouched).toHaveBeenCalledWith("");
  }); 
  it("should call the setDisabledState method", () => {
    spyOn(component, "setDisabledState").and.callThrough();
    component.setDisabledState(true);
    expect(component.setDisabledState).toHaveBeenCalledWith(true);
  }); 
  it("should call the change method", () => {
    spyOn(component, "change").and.callThrough();
    component.change();
    expect(component.change).toHaveBeenCalled();
  }); 
});
