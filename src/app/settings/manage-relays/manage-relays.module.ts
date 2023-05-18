import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import * as fromManageRelays from "./store/manage-relays.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ManageRelaysEffects } from "./store/manage-relays.effects";
import { SinglePatientRelaysComponent } from "./single-patient-relays/single-patient-relays.component";
import { MultiPatientRelaysComponent } from "./multi-patient-relays/multi-patient-relays.component";
import { RelayConfigurationComponent } from "./relay-configuration/relay-configuration.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { I18nModule } from "../../i18n/i18n.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { SharedModule } from "../../shared/shared.module";
import { ManageRelaysService } from "./services/manage-relays.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AddRelayComponent } from "./add-relay/add-relay.component";
import { MatDialogModule } from "@angular/material/dialog";
import { PaginatePipe } from "ngx-pagination";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { LifeSignalsModule } from "src/app/life-signals/life-signals.module";
import { CareGiverAppComponent } from './care-giver-app/care-giver-app.component';

@NgModule({
  declarations: [
    SinglePatientRelaysComponent,
    MultiPatientRelaysComponent,
    RelayConfigurationComponent,
    AddRelayComponent,
    CareGiverAppComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromManageRelays.manageRelaysFeatureKey,
      fromManageRelays.ManageRelaysReducer
    ),
    EffectsModule.forFeature([ManageRelaysEffects]),
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    I18nModule,
    MatPaginatorModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,

    MatTableModule,

    LifeSignalsModule,
  ],
    exports: [
        SinglePatientRelaysComponent,
        MultiPatientRelaysComponent,
        RelayConfigurationComponent,
        CareGiverAppComponent,
    ],
  providers: [
    {
      provide: ManageRelaysService,
      useClass: ManageRelaysService,
    },
  ],
})
export class ManageRelaysModule {}
