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

import { AdmitPatientsComponent } from "./admit-patients.component";

describe("AdmitPatientsComponent", () => {
  let component: AdmitPatientsComponent;
  let fixture: ComponentFixture<AdmitPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdmitPatientsComponent],
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
    fixture = TestBed.createComponent(AdmitPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
