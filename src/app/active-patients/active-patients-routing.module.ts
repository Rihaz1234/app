import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { ActivePatientsComponent } from "./active-patients/active-patients.component";
import { UserRoles } from "../enum/roles.enum";
import { RootComponent } from "../shared/root/root.component";
import { AdmitPatientsComponent } from "./admit-patients/admit-patients.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: RootComponent,
    children: [
      {
        path: "active-patients",
        component: ActivePatientsComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            UserRoles.GENERAL_CLINICIAN,
            UserRoles.SUPERVISORY_CLINICIAN,
            UserRoles.PHYSICIAN,
          ],
        },
      },
      {
        path: "admit-patients",
        component: AdmitPatientsComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            UserRoles.GENERAL_CLINICIAN,
            UserRoles.SUPERVISORY_CLINICIAN,
            UserRoles.PHYSICIAN,
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivePatientsRoutingModule {}
