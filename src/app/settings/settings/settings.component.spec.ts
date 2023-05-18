import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TranslateModule } from "@ngx-translate/core";
import { SettingsComponent } from "./settings.component";
import { BackendApiService } from "@services/backendapi.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Overlay } from "@angular/cdk/overlay";
import { KeycloakService } from "keycloak-angular";
import { AuthenticationService } from "@services/authentication.service";
import { provideMockStore } from "@ngrx/store/testing";
import { getUsersCount } from "../manage-users/store/manage-users.selector";

describe("SettingsComponent", () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let params: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SettingsComponent],
        imports: [HttpClientTestingModule, MatSnackBarModule,TranslateModule.forRoot({})],
        providers: [
          BackendApiService,
          KeycloakService,
          AuthenticationService,
          MatSnackBar,
          Overlay,
          provideMockStore({
            selectors: [
              {
                selector: getUsersCount,
                value: 1,
              },
            ]
            })
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the getUsersCount method", async () => {
    spyOn(component, "getUsersCount").and.callThrough();
    component.getUsersCount(1);
    expect(component.getUsersCount).toHaveBeenCalledWith(1);
  });
});
