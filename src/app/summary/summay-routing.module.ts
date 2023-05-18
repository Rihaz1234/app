import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { SummaryComponent } from "./summary/summary.component";
import { AuthGuard } from "../guards/auth.guard";
import { UserRoles } from "../enum/roles.enum";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: SummaryComponent,
    data: {
      roles: [
        UserRoles.CLINICAL_FACILITY_ADMIN,
        UserRoles.CLINICAL_FACILITY_ADMIN_CLONE,
        UserRoles.GENERAL_CLINICIAN,
        UserRoles.SUPERVISORY_CLINICIAN,
        UserRoles.PHYSICIAN,
      ],
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummayRoutingModule {}
