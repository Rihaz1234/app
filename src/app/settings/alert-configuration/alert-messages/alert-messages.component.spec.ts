import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StoreModule } from "@ngrx/store";
import { TranslateModule, TranslateStore } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";

import { AlertMessagesComponent } from "./alert-messages.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MockStore } from "@ngrx/store/testing";

describe("AlertMessagesComponent", () => {
  let component: AlertMessagesComponent;
  let fixture: ComponentFixture<AlertMessagesComponent>;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AlertMessagesComponent],
        imports: [
          TranslateModule.forRoot({}),
          HttpClientTestingModule,
          MatSnackBarModule,
          StoreModule.forRoot({}),
          NoopAnimationsModule
        ],
        providers: [
          BackendApiService,
          KeycloakService,
          TranslateStore,
          AuthenticationService,
        ],        
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the showActionButtons method", () => {
    spyOn(component, "showActionButtons").and.callThrough();
    component.showActionButtons(true);
    expect(component.showActionButtons).toHaveBeenCalled();
  });
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar").and.callThrough();
    component.openSnackBar("Test Message");
    expect(component.openSnackBar).toHaveBeenCalled();
  });
  it("should call the updateAlertNotification method", () => {
    spyOn(component, "updateAlertNotification").and.callThrough();
    component.updateAlertNotification();
    expect(component.updateAlertNotification).toHaveBeenCalled();
  });
});
