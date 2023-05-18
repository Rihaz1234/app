import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserManagementComponent } from "./user-management/user-management.component";
import { ClinicalFacilityManagementComponent } from "./clinical-facility-management/clinical-facility-management.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AuthGuard } from "../guards/auth.guard";
import { RootComponent } from "../shared/root/root.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: RootComponent,
    children: [
      {
        path: "user-management",
        component: UserManagementComponent,
        canActivate: [AuthGuard],
        data: { roles: ["SPA", "SPAC"] },
      },
      {
        path: "clinical-facility-management",
        component: ClinicalFacilityManagementComponent,
        canActivate: [AuthGuard],
        data: { roles: ["SPA", "SPAC"] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), MatToolbarModule],
  exports: [RouterModule],
})
export class ServiceProviderAdminRoutingModule {}
