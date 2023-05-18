import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { SharedModule } from "src/app/shared/shared.module";
import { BackendApiService } from "./services/backendapi.service";
import { AuthenticationService } from "./services/authentication.service";
import { AuthGuard } from "./guards/auth.guard";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { reducers, metaReducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { I18nModule } from "./i18n/i18n.module";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { initializeKeycloak } from "./init/keycloak-init.factory";
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { DischargePatientsModule } from "./discharge-patients/discharge-patients.module";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ManageUsersService } from "./settings/manage-users/services/manage-users.service";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {MY_MOMENT_FORMATS} from "@utils/helpers";

/**
 * The http loader factory : Loads the files from define path.
 * @param {HttpClient} http
 * @returns {TranslateHttpLoader}
 * @constructor
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "../assets/i18n/", ".json?v="+environment.version);
}
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        SharedModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        DischargePatientsModule,
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot(),
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreDevtoolsModule.instrument({
            name: "Lifesignals",
            logOnly: environment.production
        }),
        KeycloakAngularModule,
        HttpClientModule,
        I18nModule.forRoot({locale_id: "en-US"}), // iniating with default language: en-US
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        }),
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService]
        },
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill', floatLabel: 'never'}},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
        AuthGuard,
        AuthenticationService,
        BackendApiService,
        ManageUsersService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
