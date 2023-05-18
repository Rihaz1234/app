import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService,MockAuthService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let params: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent],
        imports: [
          RouterTestingModule.withRoutes([
            {path:"authentication/user-login",component: HeaderComponent}
          ]),
          HttpClientTestingModule,
          MatSnackBarModule,
          MatMenuModule
        ],
        providers: [
          KeycloakService,
          BackendApiService,
          { provide: AuthenticationService, useClass: MockAuthService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    params = {
      navigationUrl: "",     
    };
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
  it("should call the logout method", () => {
    spyOn(component, "logout").and.callThrough();
    component.logout();
    expect(component.logout).toHaveBeenCalled();
  });
});
