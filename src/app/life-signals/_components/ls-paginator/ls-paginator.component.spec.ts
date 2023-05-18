import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsPaginatorComponent } from './ls-paginator.component';

describe('LsPaginatorComponent', () => {
  let component: LsPaginatorComponent;
  let fixture: ComponentFixture<LsPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
