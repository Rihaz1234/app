import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuperAdminRoutingModule } from "./super-admin-routing.module";
import { ManageServiceProviderComponent } from "./manage-service-provider/manage-service-provider.component";
import { SortModule } from "../core/directives/sort.module";
import { AddEditServiceProviderComponent } from "./dialog/add-edit-service-provider/add-edit-service-provider.component";

import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { DialogsModule } from "../dialogs/dialogs.module";
import { AddEditSpAdminComponent } from "./dialog/add-edit-sp-admin/add-edit-sp-admin.component";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { I18nModule } from "../i18n/i18n.module";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { StoreModule } from "@ngrx/store";
import * as fromManageServiceProvideReducer from "./store/manage-service-provider/manage-service-provider.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ManageServiceProviderEffects } from "./store/manage-service-provider/manage-service-provider.effects";
import { SuperAdminService } from "./service/super-admin.service";
import { ManageAdminComponent } from "./dialog/manage-admin/manage-admin.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { KeycloakBearerInterceptor } from "keycloak-angular";
import { MatPaginatorModule } from "@angular/material/paginator";
import { LifeSignalsModule } from "../life-signals/life-signals.module";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {ErrorInterceptor} from "../interceptors/error.interceptor";

@NgModule({
  declarations: [
    ManageServiceProviderComponent,
    AddEditServiceProviderComponent,
    AddEditSpAdminComponent,
    ManageAdminComponent,
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SortModule,
    MatIconModule,
    MatDialogModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxIntlTelInputModule,
    MatCheckboxModule,
    DialogsModule,
    I18nModule,
    MatTableModule,
    MatSortModule,
    StoreModule.forFeature(
      fromManageServiceProvideReducer.serviceProviderFeatureKey,
      fromManageServiceProvideReducer.serviceProviderReducer
    ),
    EffectsModule.forFeature([ManageServiceProviderEffects]),
    MatPaginatorModule,
    LifeSignalsModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    SuperAdminService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
})
export class SuperAdminModule {}
