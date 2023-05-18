import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { SettingsRoutingModule } from "./settings-routing.module";
import { AppDateAdapter, APP_DATE_FORMATS } from "../services/date.adapter";
import { SettingsComponent } from "./settings/settings.component";
import { MiscellaneousComponent } from "./miscellaneous/miscellaneous.component";
import { ProfileComponent } from "../profile/profile.component";
import { ManageRelaysComponent } from "./manage-relays/manage-relays/manage-relays.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogsModule } from "../dialogs/dialogs.module";
import { AlertConfigurationComponent } from "./alert-configuration/alert-configuration.component";
import { ParameterAlertsComponent } from "./alert-configuration/parameter-alerts/parameter-alerts.component";
import { TechnicalAlertsComponent } from "./alert-configuration/technical-alerts/technical-alerts.component";
import { PriorityComponent } from "./alert-configuration/priority/priority.component";
import { AlertMessagesComponent } from "./alert-configuration/alert-messages/alert-messages.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { I18nModule } from "../i18n/i18n.module";
import { StoreModule } from "@ngrx/store";
import * as fromMiscellaneousSettings from "./miscellaneous/store/miscellaneous-settings.reducer";
import { EffectsModule } from "@ngrx/effects";
import { MiscellaneousSettingsEffects } from "./miscellaneous/store/miscellaneous-settings.effects";
import { MiscellaneousSettingsService } from "./miscellaneous/services/miscellaneous-settings.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { KeycloakBearerInterceptor } from "keycloak-angular";
import { AlertConfigurationsService } from "./alert-configuration/services/alert-configuration.service";
import { AlertDestinationComponent } from "./alert-configuration/alert-destination/alert-destination.component";
import { DigitOnlyDirective } from "../directive/digit-only.directive";
import * as fromAlertConfigurations from "./alert-configuration/store/alert-configuration.reducer";
import { AlertConfigurationEffects } from "./alert-configuration/store/alert-configuration.effects";
import { ManageRelaysModule } from "./manage-relays/manage-relays.module";
import { ManageUsersModule } from "./manage-users/manage-users.module";
import { AdduserComponent } from "./manage-users/adduser/adduser.component";
import { EdituserComponent } from "./manage-users/edituser/edituser.component";
import { AddgroupComponent } from "./manage-users/addgroup/addgroup.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatDividerModule} from '@angular/material/divider';
import {LifeSignalsModule} from "../life-signals/life-signals.module";
import { DestinationSettingsComponent } from './alert-configuration/destination-settings/destination-settings.component';
import { ArrhythmiaAlertsComponent } from './alert-configuration/arrhythmia-alerts/arrhythmia-alerts.component';

@NgModule({
  declarations: [
    SettingsComponent,
    MiscellaneousComponent,
    ProfileComponent,
    ManageRelaysComponent,
    AlertConfigurationComponent,
    ParameterAlertsComponent,
    TechnicalAlertsComponent,
    PriorityComponent,
    AlertMessagesComponent,
    AlertDestinationComponent,
    DigitOnlyDirective,
    DestinationSettingsComponent,
    ArrhythmiaAlertsComponent,
  ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        SharedModule,
        MatDividerModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        DialogsModule,
        I18nModule,
        StoreModule.forFeature(
            fromMiscellaneousSettings.miscellaneousSettingsFeatureKey,
            fromMiscellaneousSettings.MiscellaneousSettingsReducer
        ),
        StoreModule.forFeature(
            fromAlertConfigurations.alertConfigurationKey,
            fromAlertConfigurations.AlertConfigurationReducer
        ),

        EffectsModule.forFeature([
            MiscellaneousSettingsEffects,
            AlertConfigurationEffects,
        ]),
        MatDialogModule,
        ManageRelaysModule,
        ManageUsersModule,
        MatProgressSpinnerModule,
        MatTableModule,
        LifeSignalsModule,
    ],
  entryComponents: [AdduserComponent, EdituserComponent, AddgroupComponent],
  exports: [],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS,
    },
    {
      provide: MiscellaneousSettingsService,
      useClass: MiscellaneousSettingsService,
    },
    {
      provide: AlertConfigurationsService,
      useClass: AlertConfigurationsService,
    },
    {
      provide: MatDialogRef,
      useValue: { hasBackdrop: false },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
  ],
})
export class SettingsModule {}
