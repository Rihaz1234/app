import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { ManageGroupsComponent } from "./manage-groups/manage-groups.component";
import { UserRoles } from "../enum/roles.enum";
import { RootComponent } from "../shared/root/root.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: RootComponent,
    children: [
      {
        path: "",
        component: ManageGroupsComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            UserRoles.CLINICAL_FACILITY_ADMIN,
            UserRoles.CLINICAL_FACILITY_ADMIN_CLONE,
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
export class ManageGroupRoutingModule {}
