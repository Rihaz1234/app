import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StoreModule } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import {
  TranslateModule,
  TranslateStore,
} from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { KeycloakService } from "keycloak-angular";
import { ManageRelaysService } from "../services/manage-relays.service";
import { getRelayConfiguration } from "../store/manage-relays.selector";

import { RelayConfigurationComponent } from "./relay-configuration.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
describe("RelayConfigurationComponent", () => {
  let component: RelayConfigurationComponent;
  let fixture: ComponentFixture<RelayConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelayConfigurationComponent],
      imports: [
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [
        ManageRelaysService,
        KeycloakService,
        AuthenticationService,
        TranslateStore,
        provideMockStore({
          selectors:[
            {
              selector: getRelayConfiguration,
              value:{
                sprDeletionDate: {
                  isActive: "",
                  value: true
                }
              }
            }
          ]
        })        
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelayConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar").and.callThrough();
    component.openSnackBar("Test Message");
    expect(component.openSnackBar).toHaveBeenCalled();
  });
  it("should call the updateRelayConfiguration method", () => {
    spyOn(component, "updateRelayConfiguration").and.callThrough();
    component.updateRelayConfiguration("");
    expect(component.updateRelayConfiguration).toHaveBeenCalled();
  });
  it("should call the updateSettings method", () => {
    spyOn(component, "updateSettings").and.callThrough();
    component.updateSettings();
    expect(component.updateSettings).toHaveBeenCalled();
  });
});
