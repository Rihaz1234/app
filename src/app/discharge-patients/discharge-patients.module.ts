import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { DischargePatientComponent } from "./discharge-patient/discharge-patient.component";
import { DischargePatientsRoutingModule } from "./discharge-patients-routing.module";
import { StoreModule } from "@ngrx/store";
import { DischargePatientsEffects } from "./store/discharge-patients.effects";
import { EffectsModule } from "@ngrx/effects";
import * as fromDischargePatients from "./store/discharge-patients.reducer";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { I18nModule } from "../i18n/i18n.module";
import { LifeSignalsModule } from "../life-signals/life-signals.module";
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [DischargePatientComponent],
  imports: [
    CommonModule,
    DischargePatientsRoutingModule,
    StoreModule.forFeature(
      fromDischargePatients.dischargePatientsFeatureKey,
      fromDischargePatients.DischargePatientsReducer
    ),
    EffectsModule.forFeature([DischargePatientsEffects]),
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatListModule,
    MatPaginatorModule,
    I18nModule,
    LifeSignalsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DischargePatientsModule {}
