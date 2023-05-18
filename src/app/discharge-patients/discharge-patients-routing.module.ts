import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { UserRoles } from "../enum/roles.enum";
import { DischargePatientComponent } from "./discharge-patient/discharge-patient.component";
import { RootComponent } from "../shared/root/root.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: RootComponent,
    children: [
      {
        path: "patients",
        component: DischargePatientComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            UserRoles.SUPERVISORY_CLINICIAN
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
export class DischargePatientsRoutingModule {}
