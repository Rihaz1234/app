import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServiceProviderAdminRoutingModule } from "./service-provider-admin-routing.module";
import { UserManagementComponent } from "./user-management/user-management.component";
import { SortModule } from "../core/directives/sort.module";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { ClinicalFacilityManagementComponent } from "./clinical-facility-management/clinical-facility-management.component";
import { AddEditFacilityComponent } from "./dialog/add-edit-facility/add-edit-facility.component";
import { ManageCfAdminComponent } from "./dialog/manage-cf-admin/manage-cf-admin.component";
import { InactiveActiveComponent } from "../shared/dialogs/inactive-active/inactive-active.component";
import { DialogsModule } from "../dialogs/dialogs.module";
import { AddEditCfaComponent } from "./dialog/add-edit-cfa/add-edit-cfa.component";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AddEditUserManagementComponent } from "./dialog/add-edit-user-management/add-edit-user-management.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { StoreModule } from "@ngrx/store";
import * as fromClinicalFacilityReducer from "./store/clinical-facility-management/clinical-facility-management.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ClinicalFacilityEffects } from "./store/clinical-facility-management/clinical-facility-management.effects";
import * as fromUserManagementReducer from "./store/user-management/user-management.reducer";
import { UserManagementEffects } from "./store/user-management/user-management.effects";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { KeycloakBearerInterceptor } from "keycloak-angular";
import { EnableDisableComponent } from "./dialog/enable-disable/enable-disable.component";
import { I18nModule } from "../i18n/i18n.module";
import { MatSelectModule } from "@angular/material/select";
import { LifeSignalsModule } from "../life-signals/life-signals.module";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CautionBoxComponent } from './dialog/caution-box/caution-box.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    ClinicalFacilityManagementComponent,
    AddEditFacilityComponent,
    ManageCfAdminComponent,
    AddEditUserManagementComponent,
    AddEditCfaComponent,
    EnableDisableComponent,
    CautionBoxComponent,
  ],
  imports: [
    CommonModule,
    ServiceProviderAdminRoutingModule,
    SortModule,
    MatIconModule,
    MatDialogModule,
    SharedModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxIntlTelInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    DialogsModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    StoreModule.forFeature(
      fromClinicalFacilityReducer.clinicalFacilityFeatureKey,
      fromClinicalFacilityReducer.clinicalFacilityReducer
    ),
    StoreModule.forFeature(
      fromUserManagementReducer.userManagementFeatureKey,
      fromUserManagementReducer.userManagementReducer
    ),
    EffectsModule.forFeature([ClinicalFacilityEffects, UserManagementEffects]),
    MatSelectModule,
    I18nModule,
    LifeSignalsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSlideToggleModule,
  ],
  entryComponents: [
    AddEditUserManagementComponent,
    AddEditFacilityComponent,
    ManageCfAdminComponent,
    InactiveActiveComponent,
    AddEditCfaComponent,
    EnableDisableComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
  ],
})
export class ServiceProviderAdminModule {}
