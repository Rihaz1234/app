import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ActivePatientManagerService } from "../manager/active-patient-manager.service";

import { ActivePatientsComponent } from "./active-patients.component";

describe("ActivePatientsComponent", () => {
  let component: ActivePatientsComponent;
  let fixture: ComponentFixture<ActivePatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivePatientsComponent],
      imports: [
        MatDialogModule,
        RouterTestingModule,
        StoreModule.forRoot([]),
        TranslateModule.forRoot({}),
        MatFormFieldModule,
        FormsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        ActivePatientManagerService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
