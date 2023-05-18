import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SummaryComponent } from "src/app/summary/summary/summary.component";

import { LsPageHeaderComponent } from "./ls-page-header.component";

describe("LsPageHeaderComponent", () => {
  let component: LsPageHeaderComponent;
  let fixture: ComponentFixture<LsPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LsPageHeaderComponent],
      imports: [RouterTestingModule.withRoutes([
        {path:"summary",component:SummaryComponent}
      ])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the goBack method", () => {
    spyOn(component, "goBack").and.callThrough();
    component.goBack();
    expect(component.goBack).toHaveBeenCalled();
  });
  it("should call the goBackToSummary method", () => {
    spyOn(component, "goBackToSummary").and.callThrough();
    component.goBackToSummary();
    expect(component.goBackToSummary).toHaveBeenCalled();
  });
});
