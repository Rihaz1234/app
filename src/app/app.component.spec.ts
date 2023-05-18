import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { AppComponent } from "./app.component";
import { ManageUsersService } from "src/app/settings/manage-users/services/manage-users.service";
import { StoreModule } from "@ngrx/store";
describe("AppComponent", () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          MatSnackBarModule,
          StoreModule.forRoot([]),
        ],
        declarations: [AppComponent],
        providers: [
          BackendApiService,
          KeycloakService,
          AuthenticationService,
          ManageUsersService
        ],
      }).compileComponents();
    })
  );

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'life-line'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("life-line");
  });
});
