import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupChildComponent } from './sub-group-child.component';

describe('SubGroupChildComponent', () => {
  let component: SubGroupChildComponent;
  let fixture: ComponentFixture<SubGroupChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubGroupChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
