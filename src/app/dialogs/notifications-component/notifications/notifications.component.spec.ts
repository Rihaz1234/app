import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialogModule, MatDialogRef,MAT_DIALOG_DATA  } from "@angular/material/dialog";

import { NotificationsComponent } from "./notifications.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
describe("NotificationsComponent", () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let params: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NotificationsComponent],
        imports: [MatDialogModule, TranslateModule.forRoot({}),],
        providers: [{ provide: MatDialogRef, useValue: {} }, 
          { provide: MAT_DIALOG_DATA, useValue: {} },
          TranslateService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    params = {
      tabSelected: "parameter",
    }
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the selectTab method", () => {
    spyOn(component, "selectTab").and.callThrough();
    component.selectTab(params.tabSelected);
    expect(component.selectedTab).toBe(params.tabSelected);
    expect(component.selectTab).toHaveBeenCalledWith(params.tabSelected);
  });
});
