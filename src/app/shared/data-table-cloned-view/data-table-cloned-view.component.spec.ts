import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { DataTableClonedViewComponent } from "./data-table-cloned-view.component";

describe("DataTableClonedViewComponent", () => {
  let component: DataTableClonedViewComponent;
  let fixture: ComponentFixture<DataTableClonedViewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DataTableClonedViewComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableClonedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
