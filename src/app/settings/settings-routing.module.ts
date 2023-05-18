import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SettingsComponent} from "./settings/settings.component";
import {MiscellaneousComponent} from "./miscellaneous/miscellaneous.component";
import {ManageRelaysComponent} from "./manage-relays/manage-relays/manage-relays.component";
import {AlertConfigurationComponent} from "./alert-configuration/alert-configuration.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AuthGuard} from "../guards/auth.guard";
import {ManageUsersCFAComponent} from "./manage-users/manage-users-cfa/manage-users-cfa.component";
import {UserRoles} from "../enum/roles.enum";
import {RootComponent} from "../shared/root/root.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: RootComponent,
    children: [
      {
        path: "",
        component: SettingsComponent,
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
      {
        path: "additional-devices",
        component: MiscellaneousComponent,
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
      {
        path: "manage-users",
        component: ManageUsersCFAComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            UserRoles.CLINICAL_FACILITY_ADMIN,
            UserRoles.CLINICAL_FACILITY_ADMIN_CLONE,
            UserRoles.SUPERVISORY_CLINICIAN,
          ],
        },
      },
      {
        path: "manage-relays",
        component: ManageRelaysComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            UserRoles.CLINICAL_FACILITY_ADMIN,
            UserRoles.CLINICAL_FACILITY_ADMIN_CLONE,
            UserRoles.GENERAL_CLINICIAN,
            UserRoles.SUPERVISORY_CLINICIAN,
          ],
        },
      },
      {
        path: "alert-configurations",
        component: AlertConfigurationComponent,
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
  imports: [RouterModule.forChild(routes), MatToolbarModule],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
