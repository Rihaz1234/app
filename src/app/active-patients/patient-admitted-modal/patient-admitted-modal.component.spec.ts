import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAdmittedModalComponent } from './patient-admitted-modal.component';

describe('PatientAdmittedModalComponent', () => {
  let component: PatientAdmittedModalComponent;
  let fixture: ComponentFixture<PatientAdmittedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAdmittedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAdmittedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
