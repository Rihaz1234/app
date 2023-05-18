import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LsWidgetComponent } from "./ls-widget.component";

describe("LsWidgetComponent", () => {
  let component: LsWidgetComponent;
  let fixture: ComponentFixture<LsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LsWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
