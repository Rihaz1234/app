import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";

import { PageNavBarComponent } from "./page-nav-bar.component";

describe("PageNavBarComponent", () => {
  let component: PageNavBarComponent;
  let fixture: ComponentFixture<PageNavBarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PageNavBarComponent],
        providers: [],
        imports: [RouterTestingModule, TranslateModule.forRoot({})],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
