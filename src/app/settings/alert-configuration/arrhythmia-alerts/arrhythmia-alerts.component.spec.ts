import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrhythmiaAlertsComponent } from './arrhythmia-alerts.component';

describe('ArrhythmiaAlertsComponent', () => {
  let component: ArrhythmiaAlertsComponent;
  let fixture: ComponentFixture<ArrhythmiaAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrhythmiaAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrhythmiaAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
