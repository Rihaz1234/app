import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { TranslateStore } from "@ngx-translate/core";
import { I18nModule } from "src/app/i18n/i18n.module";

import { AddRelayComponent } from "./add-relay.component";

describe("AddRelayComponent", () => {
  let component: AddRelayComponent;
  let fixture: ComponentFixture<AddRelayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRelayComponent],
      imports: [MatDialogModule, I18nModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        TranslateStore,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the isBlank method and return true if value is blank/undefined", () => {
    spyOn(component, "isBlank").and.callThrough();
    const result = component.isBlank("");
    expect(result).toBe(true);
    expect(component.isBlank).toHaveBeenCalledWith("");
  });
  it("should call the save method", () => {
    spyOn(component, "save").and.callThrough();
    component.location = "";
    component.save();
    expect(component.save).toHaveBeenCalled();
  });
});
