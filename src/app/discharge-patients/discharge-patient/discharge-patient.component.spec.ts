import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DischargePatientComponent } from "./discharge-patient.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthenticationService, MockAuthService } from "@services/authentication.service";

describe("DischargePatientComponent", () => {
  let component: DischargePatientComponent;
  let fixture: ComponentFixture<DischargePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DischargePatientComponent],
      imports: [StoreModule.forRoot([]), TranslateModule.forRoot({}), MatMenuModule, MatDialogModule, HttpClientTestingModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: AuthenticationService, useClass: MockAuthService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
