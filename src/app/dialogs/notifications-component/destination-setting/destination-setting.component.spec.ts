import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationSettingComponent } from './destination-setting.component';

describe('DestinationSettingComponent', () => {
  let component: DestinationSettingComponent;
  let fixture: ComponentFixture<DestinationSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
