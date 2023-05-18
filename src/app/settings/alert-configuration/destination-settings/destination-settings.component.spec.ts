import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationSettingsComponent } from './destination-settings.component';

describe('DestinationSettingsComponent', () => {
  let component: DestinationSettingsComponent;
  let fixture: ComponentFixture<DestinationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
