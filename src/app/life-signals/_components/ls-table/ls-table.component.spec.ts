import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { LsTableComponent } from "./ls-table.component";

describe("LsTableComponent", () => {
  let component: LsTableComponent;
  let fixture: ComponentFixture<LsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LsTableComponent],
      imports: [
        MatSnackBarModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
