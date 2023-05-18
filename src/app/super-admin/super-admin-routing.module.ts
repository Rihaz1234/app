import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { RootComponent } from "../shared/root/root.component";
import { ManageServiceProviderComponent } from "./manage-service-provider/manage-service-provider.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: RootComponent,
    children: [
      {
        path: "",
        component: ManageServiceProviderComponent,
        canActivate: [AuthGuard],
        data: { roles: ["SA"] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
