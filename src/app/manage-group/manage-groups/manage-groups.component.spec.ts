import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { TranslateStore } from "@ngx-translate/core";
import { I18nModule } from "src/app/i18n/i18n.module";
import { AuthenticationService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { TranslateService } from "@ngx-translate/core";
import { ManageGroupsComponent } from "./manage-groups.component";
import { SummaryComponent } from "src/app/summary/summary/summary.component";
import { DebugElement } from "@angular/core";

describe("ManageGroupsComponent", () => {
  let component: ManageGroupsComponent;
  let fixture: ComponentFixture<ManageGroupsComponent>;
  let params: any;
  let de: DebugElement;
  let el: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageGroupsComponent],
      imports: [RouterTestingModule.withRoutes([
        {path:"summary",component:SummaryComponent}
      ]), StoreModule.forRoot([]), I18nModule],
      providers:[
        BackendApiService,
        KeycloakService,
        AuthenticationService,
        TranslateService,
        TranslateStore
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGroupsComponent);
    component = fixture.componentInstance;
    params = {
      groupItem: [
        {
          type: "PHYSICAL",
          name: "location group ready",
          parent: "ROOT",
          groupId: "GRP1238418974",
          facilityId: "CF1623560475",
          isShow: true
        },
      ],
    }
    component.selectedGroup = [{
      FacilityId: "CF910341317",
      alertDestId: "",
      alertId: "AL741547195",
      groupId: "GRP1140711122",
      name: "SEPSIS",
    }];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the toggleStatus method", () => {
    spyOn(component, "toggleStatus").and.callThrough();
    component.toggleStatus();
    expect(component.toggleStatus).toHaveBeenCalled();
  });
  it("should call the togglePgroup method", () => {
    spyOn(component, "togglePgroup").and.callThrough();
    component.togglePgroup();
    expect(component.togglePgroup).toHaveBeenCalled();
  });
  it("should call the getGroups method", () => {
    spyOn(component, "getGroups").and.callThrough();
    component.getGroups();
    expect(component.getGroups).toHaveBeenCalled();
  });
  it("should call the goBackToSummary method", () => {
    spyOn(component, "goBackToSummary").and.callThrough();
    component.goBackToSummary();
    expect(component.goBackToSummary).toHaveBeenCalled();
  });
  it("should call the savePGroup method", async() => {
    spyOn(component, "savePGroup").and.callThrough();
    component.savePGroup(component.selectedGroup=[{
      FacilityId: "CF910341317",
      alertDestId: "",
      alertId: "AL741547195",
      groupId: "GRP1140711122",
      name: "SEPSIS",
    }]);
    expect(component.savePGroup).toHaveBeenCalled();
  });
  it("should call the saveCGroup method", async() => {
    spyOn(component, "saveCGroup").and.callThrough();
    component.saveCGroup(component.selectedGroup=[{
      FacilityId: "CF910341317",
      alertDestId: "",
      alertId: "AL741547195",
      groupId: "GRP1140711122",
      name: "SEPSIS",
    }]);
    expect(component.saveCGroup).toHaveBeenCalled();
  });
  it("should call the deletePGroupItem method", async() => {
    spyOn(component, "deletePGroupItem").and.callThrough();
    component.deletePGroupItem(component.pGroup = [{
      type: "PHYSICAL",
      name: "location group ready",
      parent: "ROOT",
      groupId: "GRP1238418974",
      facilityId: "CF1623560475",
      isShow: true
    }]);
    expect(component.deletePGroupItem).toHaveBeenCalled();
  });
  it("should call the deleteGroupItem method", async() => {
    spyOn(component, "deleteGroupItem").and.callThrough();
    component.deleteGroupItem(component.cGroup = [{
      type: "CLINICAL",
      name: "location group ready",
      parent: "ROOT",
      groupId: "GRP1238418974",
      facilityId: "CF1623560475",
      isShow: true
    }]);
    expect(component.deleteGroupItem).toHaveBeenCalled();
  });
  it("should call the editGroup method", async() => {
    spyOn(component, "editGroup").and.callThrough();   
    component.editGroup({
        type: "PHYSICAL",
        name: "location group ready",
        parent: "ROOT",
        groupId: "GRP1238418974",
        facilityId: "CF1623560475",
      }); 
    expect(component.isShow).toBeFalse(); 
    expect(component.editGroup).toHaveBeenCalled();
  });
});
