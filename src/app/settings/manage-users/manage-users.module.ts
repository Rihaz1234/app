import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { I18nModule } from "../../i18n/i18n.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { SharedModule } from "../../shared/shared.module";
import * as fromManageUsers from "./store/manage-users.reducer";
import { ManageUsersEffects } from "./store/manage-users.effects";
import { ManageUsersCFAComponent } from "./manage-users-cfa/manage-users-cfa.component";
import { AdduserComponent } from "./adduser/adduser.component";
import { EdituserComponent } from "./edituser/edituser.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddgroupComponent } from "./addgroup/addgroup.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ManageUsersService } from "./services/manage-users.service";
import { MatRadioModule } from "@angular/material/radio";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { LifeSignalsModule } from "src/app/life-signals/life-signals.module";
import { MatCardModule } from "@angular/material/card";
import {MatMenuModule} from '@angular/material/menu';
import { RenameRolesComponent } from './rename-roles/rename-roles.component';

@NgModule({
  declarations: [
    ManageUsersCFAComponent,
    AdduserComponent,
    EdituserComponent,
    AddgroupComponent,
    RenameRolesComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromManageUsers.manageUsersFeatureKey,
      fromManageUsers.ManageUsersReducer
    ),
    EffectsModule.forFeature([ManageUsersEffects]),
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    I18nModule,
    MatPaginatorModule,
    SharedModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
    NgxIntlTelInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    LifeSignalsModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: ManageUsersService,
      useClass: ManageUsersService,
    },
  ],
  exports: [],
})
export class ManageUsersModule {}
