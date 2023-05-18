import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { KeycloakService } from "keycloak-angular";
import { ManageUsersService } from "../services/manage-users.service";

import { AddgroupComponent } from "./addgroup.component";
import { UsersMockService } from "../services/users-mock.service";
import { MockDialogRef } from "../adduser/adduser.component.spec";
describe("AddgroupComponent", () => {
  let component: AddgroupComponent;
  let fixture: ComponentFixture<AddgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddgroupComponent],
      imports: [
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        MatDialogModule,
      ],
      providers: [
        AuthenticationService,
        KeycloakService,
        { provide: ManageUsersService, useClass: UsersMockService },
        { provide: MatDialogRef, useClass: MockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.selGroups = [
      {
        FacilityId: "CF910341317",
        alertDestId: "",
        alertId: "AL741547195",
        groupId: "GRP1140711122",
        name: "SEPSIS",
      },
    ];
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the groupChange method", async () => {
    spyOn(component, "groupChange").and.callThrough();
    component.groupChange();
    expect(component.groupChange).toHaveBeenCalled();
  });
  it("should call the isBlank method and return true is string is empty or undefined", async () => {
    spyOn(component, "isBlank").and.callThrough();
    let result = component.isBlank("");
    expect(result).toBeTrue();
  });
  it("should call the groupChange method", async () => {
    spyOn(component, "groupChange").and.callThrough();
    component.groupChange();
    expect(component.groupChange).toHaveBeenCalled();
    expect(component.groupExists).toBeFalse();
  });
  it("should call the save method", async () => {
    spyOn(component, "save").and.callThrough();
    component.selectedGroup = {
      FacilityId: "CF910341317",
      alertDestId: "",
      alertId: "AL741547195",
      groupId: "GRP1140711122",
      name: "SEPSIS",
    };
    component.save();
    expect(component.save).toHaveBeenCalled();
    expect(component.groupExists).toBeTrue();
  });
  it("should call the save method", async () => {
    spyOn(component, "save").and.callThrough();
    component.selectedGroup = {
      FacilityId: "CF910341317",
      alertDestId: "",
      alertId: "AL741547195",
      groupId: "GRP1140711123",
      name: "SEPSIS",
    };
    component.save();
    expect(component.save).toHaveBeenCalled();
    expect(component.groupExists).toBeFalse();
  });
});
