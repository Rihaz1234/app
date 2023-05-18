import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PatientDetailsComponent } from "./patient-details.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
describe("PatientDetailsComponent", () => {
  let component: PatientDetailsComponent;
  let fixture: ComponentFixture<PatientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientDetailsComponent],
      imports:[
        TranslateModule.forRoot({})
      ],
      providers:[
        TranslateService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
