import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatSortModule } from "@angular/material/sort";
import { SortDirective } from "../sort.directive";
import { SortModule } from "../sort.module";

import { SortHeaderComponent } from "./sort-header.component";

describe("SortHeaderComponent", () => {
  let component: SortHeaderComponent;
  let fixture: ComponentFixture<SortHeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SortHeaderComponent],
        imports: [MatSortModule, SortModule],
        providers: [SortDirective],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SortHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the sort method", () => {
    spyOn(component, "sort").and.callThrough();
    component.sort();
    expect(component.sort).toHaveBeenCalled();
  }); 
});
