import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FilterPipe } from "../pipe/filter.pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { DataTableManageAdminComponent } from "./data-table-manage-admin/data-table-manage-admin.component";
import { DataTableClonedViewComponent } from "./data-table-cloned-view/data-table-cloned-view.component";
import { SortModule } from "../core/directives/sort.module";
import { RouterModule } from "@angular/router";
import { PageNavBarComponent } from "./page-nav-bar/page-nav-bar.component";
import { SettingCardComponent } from "./setting-card/setting-card.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { I18nModule } from "../i18n/i18n.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ManageAdminEffects } from "./store/manage-admin/manage-admin.effects";
import * as fromManageAdminReducer from "./store/manage-admin/manage-admin.reducer";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { KeycloakBearerInterceptor } from "keycloak-angular";
import { MatCardModule } from "@angular/material/card";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { InactiveActiveComponent } from "./dialogs/inactive-active/inactive-active.component";
import { HospitalComponent } from "./dialogs/hospital/hospital.component";
import { AboutComponent } from "./dialogs/about/about.component";
import { TelInputComponent } from "./tel-input/tel-input.component";
import { LacMatTelInputModule } from "lac-mat-tel-input";
import { TranslateModule, TranslatePipe } from "@ngx-translate/core";
import { MatMenuModule } from "@angular/material/menu";
import { LifeSignalsModule } from "../life-signals/life-signals.module";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { NavigationComponent } from './navigation/navigation.component';
import { RootComponent } from './root/root.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NestedDropdownComponent } from './nested-dropdown/nested-dropdown.component'
import { MatInputModule } from "@angular/material/input";
import { MenuComponent } from './nested-dropdown/menu/menu.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatselectWithsearchComponent } from './matselect-withsearch/matselect-withsearch.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FilterPipe,
    DataTableManageAdminComponent,
    DataTableClonedViewComponent,
    PageNavBarComponent,
    SettingCardComponent,
    TelInputComponent,
    ConfirmDialogComponent,
    InactiveActiveComponent,
    HospitalComponent,
    AboutComponent,
    NavigationComponent,
    RootComponent,
    NestedDropdownComponent,
    MenuComponent,
    MatselectWithsearchComponent
  ],
    exports: [
        HeaderComponent,
        FilterPipe,
        DataTableManageAdminComponent,
        DataTableClonedViewComponent,
        SettingCardComponent,
        PageNavBarComponent,
        TelInputComponent,
        I18nModule,
        MatSlideToggleModule,
        NestedDropdownComponent,
        MenuComponent,
        MatMenuModule,
        MatselectWithsearchComponent
    ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatDialogModule,
    SortModule,
    MatToolbarModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    I18nModule,
    StoreModule.forFeature(
      fromManageAdminReducer.manageAdminFeatureKey,
      fromManageAdminReducer.manageAdminReducer
    ),
    EffectsModule.forFeature([ManageAdminEffects]),
    MatTableModule,
    MatSortModule,
    LacMatTelInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    LifeSignalsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    TranslatePipe,
  ],
})
export class SharedModule { }
