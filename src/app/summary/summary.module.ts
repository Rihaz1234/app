import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SummaryComponent } from "./summary/summary.component";
import { SummayRoutingModule } from "./summay-routing.module";
import { SettingsModule } from "../settings/settings.module";
import { SharedModule } from "../shared/shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatDividerModule} from '@angular/material/divider';
import { KeycloakBearerInterceptor } from "keycloak-angular";

@NgModule({
  declarations: [SummaryComponent],
  imports: [CommonModule, SummayRoutingModule, SettingsModule, SharedModule, MatDividerModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
  ],
})
export class SummaryModule {}
