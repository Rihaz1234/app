import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatselectWithsearchComponent } from './matselect-withsearch.component';

describe('MatselectWithsearchComponent', () => {
  let component: MatselectWithsearchComponent;
  let fixture: ComponentFixture<MatselectWithsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatselectWithsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatselectWithsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
