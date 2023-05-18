import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ManageGroupsComponent } from "./manage-groups/manage-groups.component";
import { ManageGroupRoutingModule } from "./manage-group-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTreeModule } from "@angular/material/tree";
import { StoreModule } from "@ngrx/store";
import * as fromManageGroups from "./store/manage-groups.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ManageGroupsEffects } from "./store/manage-groups.effects";
import { I18nModule } from "../i18n/i18n.module";
import { LifeSignalsModule } from "../life-signals/life-signals.module";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SubGroupChildComponent } from './sub-group-child/sub-group-child.component';

@NgModule({
  declarations: [ManageGroupsComponent, SubGroupChildComponent],
  imports: [
    CommonModule,
    ManageGroupRoutingModule,
    FormsModule,
    SharedModule,
    MatCardModule,
    MatTreeModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    I18nModule,
    StoreModule.forFeature(
      fromManageGroups.manageGroupFeatureKey,
      fromManageGroups.GroupsReducer
    ),
    EffectsModule.forFeature([ManageGroupsEffects]),
    LifeSignalsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
})
export class ManageGroupModule {}
