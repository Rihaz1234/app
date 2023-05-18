import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivePatientsComponent } from "./active-patients/active-patients.component";
import { ActivePatientsRoutingModule } from "./active-patients-routing.module";
import { SharedModule } from "../shared/shared.module";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ActivePatientsService } from "./services/active-patients.service";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import * as fromActivePatients from "./store/active-patients.reducer";
import { ActivePatientsEffects } from "./store/active-patients.effects";
import { AdmitPatientModalComponent } from "./admit-patient-modal/admit-patient-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AssignGroupModalComponent } from "./assign-group-modal/assign-group-modal.component";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTabsModule } from "@angular/material/tabs";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { KeycloakBearerInterceptor } from "keycloak-angular";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { PatientMoreInfoDialogComponent } from "./patient-more-info-dialog/patient-more-info-dialog.component";
import { ManageGroupModule } from "../manage-group/manage-group.module";
import { I18nModule } from "../i18n/i18n.module";
import { LifeSignalsModule } from "../life-signals/life-signals.module";
import { EpochToHumanDatePipe } from "../pipe/epochToHumanDate/epoch-to-human-date.pipe";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {MatMenuModule} from '@angular/material/menu';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AdmitPatientsComponent } from "./admit-patients/admit-patients.component";
import { PatientAdmittedModalComponent } from './patient-admitted-modal/patient-admitted-modal.component';
import { RemoveBiosensorComponent } from './remove-biosensor/remove-biosensor.component';
import {OwlDateTimeModule} from "ng-pick-datetime";


@NgModule({
  declarations: [
    ActivePatientsComponent,
    AdmitPatientsComponent,
    AdmitPatientModalComponent,
    AssignGroupModalComponent,
    ConfirmationDialogComponent,
    PatientMoreInfoDialogComponent, 
    EpochToHumanDatePipe, PatientAdmittedModalComponent, RemoveBiosensorComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        ActivePatientsRoutingModule,
        I18nModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatSortModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatDialogModule,
        MatTooltipModule,
        MatTabsModule,
        MatPaginatorModule,
        ManageGroupModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        StoreModule.forFeature(
            fromActivePatients.patientsFeatureKey,
            fromActivePatients.ActivePatientsReducer
        ),
        EffectsModule.forFeature([ActivePatientsEffects]),
        LifeSignalsModule,
        FormsModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        OwlDateTimeModule
    ],
  providers: [
    {
      provide: ActivePatientsService,
      useClass: ActivePatientsService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill', floatLabel: 'never' } },
  ],
})
export class ActivePatientsModule {}
