import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { SettingCardComponent } from "./setting-card.component";

describe("SettingCardComponent", () => {
  let component: SettingCardComponent;
  let fixture: ComponentFixture<SettingCardComponent>;
  let params: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SettingCardComponent],
        imports: [RouterTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCardComponent);
    params = {
      navigationUrl: "", 
      event: KeyboardEvent    
    };
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the navigateUrl method", () => {
    spyOn(component, "navigateUrl").and.callThrough();
    component.navigateUrl(params.navigationUrl);
    expect(component.navigateUrl).toHaveBeenCalledWith(params.navigationUrl);
  });
  
  it("should call the changeDuration method", () => {
    spyOn(component, "changeDuration").and.callThrough();
    component.changeDuration(params.event,"");
    expect(component.changeDuration).toHaveBeenCalledWith(params.event,"");
  });

  it("should call the changeDuration method", () => {
    spyOn(component, "changeDuration").and.callThrough();
    component.changeDuration(params.event,"parameter");
    expect(component.changeDuration).toHaveBeenCalledWith(params.event,"parameter");
  });
  
  it("should call the getTimeName method", () => {
    spyOn(component, "getTimeName").and.callThrough();
    component.getTimeName("");
    expect(component.getTimeName).toHaveBeenCalledWith("");
  });
});
