import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBiosensorComponent } from './remove-biosensor.component';

describe('RemoveBiosensorComponent', () => {
  let component: RemoveBiosensorComponent;
  let fixture: ComponentFixture<RemoveBiosensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveBiosensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveBiosensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
