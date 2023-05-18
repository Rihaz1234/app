import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { SharedModule } from "../shared/shared.module";
import { PatientDetailsViewMoreComponent } from "../active-patients/patient-details-view-more/patient-details-view-more.component";
import { NotificationsComponent } from "./notifications-component/notifications/notifications.component";
import { CustomiseNotificationsComponent } from "./notifications-component/customise-notifications/customise-notifications.component";
import { EventListComponent } from "./notifications-component/event-list/event-list.component";
import { NotificationListComponent } from "./notifications-component/notification-list/notification-list.component";
import { AlertSettingsTwoAComponent } from "./notifications-component/alert-settings-two-a/alert-settings-two-a.component";
import {OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ConfirmationComponent } from "./shared-dialogs/confirmation/confirmation.component";
import { SendOtpQrComponent } from "./manage-relays/send-otp-qr/send-otp-qr.component";
import { I18nModule } from "../i18n/i18n.module";
import { ParameterAlertsComponent } from "./notifications-component/parameter-alerts/parameter-alerts.component";
import { TechnicalAlertsComponent } from "./notifications-component/technical-alerts/technical-alerts.component";
import { AlertDestinationComponent } from "./notifications-component/alert-destination/alert-destination.component";
import { OthersComponent } from "./notifications-component/others/others.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { DigitOnlyDirective } from "../directive/digit-only.directive";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AlertConfigurationEffects } from "./notifications-component/store/alert-configuration.effects";
import * as fromAlertConfigurations from "./notifications-component/store/alert-configuration.reducer";
import { AlertConfigurationsService } from "./notifications-component/services/alert-configuration.service";
import { PatientDetailsComponent } from "./notifications-component/patient-details/patient-details.component";
import { LifeSignalsModule } from "../life-signals/life-signals.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AddEventComponent } from './notifications-component/add-event/add-event.component';
import {MatMenuModule} from "@angular/material/menu";
import {MY_MOMENT_FORMATS} from "@utils/helpers";
import { DestinationSettingComponent } from './notifications-component/destination-setting/destination-setting.component';
import { ArrhythmiaAlertsComponent } from './notifications-component/arrhythmia-alerts/arrhythmia-alerts.component';
import { forwardAlertComponent } from "./forward-alert/forward-alert.component";
import { ForwardNoteComponent } from "./forward-note/forward-note.component";
@NgModule({
  declarations: [
    PatientDetailsViewMoreComponent,
    NotificationsComponent,
    CustomiseNotificationsComponent,
    EventListComponent,
    NotificationListComponent,
    AlertSettingsTwoAComponent,
    forwardAlertComponent,
    ForwardNoteComponent,
    SendOtpQrComponent,
    ConfirmationComponent,
    ParameterAlertsComponent,
    TechnicalAlertsComponent,
    AlertDestinationComponent,
    OthersComponent,
    PatientDetailsComponent,
    AddEventComponent,
    DestinationSettingComponent,
    ArrhythmiaAlertsComponent
  ],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        NgbModule,
        I18nModule,
        MatAutocompleteModule,
        MatOptionModule,
        NgxIntlTelInputModule,
        SharedModule,
        MatCardModule,
        MatIconModule,
        MatDatepickerModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatRadioModule,
        MatInputModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSlideToggleModule,
        StoreModule.forFeature(
            fromAlertConfigurations.patientAlertConfigurationKey,
            fromAlertConfigurations.AlertConfigurationReducer
        ),

        EffectsModule.forFeature([AlertConfigurationEffects]),
        MatDialogModule,
        LifeSignalsModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatMenuModule,
    ],
  providers: [
    DigitOnlyDirective,
    {
      provide: AlertConfigurationsService,
      useClass: AlertConfigurationsService,
    },
      { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
  ],
  exports: [SendOtpQrComponent, ConfirmationComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DialogsModule { }
