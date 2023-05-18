import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { RootComponent } from "./shared/root/root.component";

const routes: Routes = [
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then(
        (module) => module.SettingsModule
      ),
  },
  {
    path: "summary",
    component: RootComponent,
    loadChildren: () =>
      import("./summary/summary.module").then((module) => module.SummaryModule)
  },
  {
    path: "super-admin",
    loadChildren: () =>
      import("./super-admin/super-admin.module").then(
        (module) => module.SuperAdminModule
      ),
  },
  {
    path: "service-provider-admin",
    loadChildren: () =>
      import("./service-provider-admin/service-provider-admin.module").then(
        (module) => module.ServiceProviderAdminModule
      ),
  },
  {
    path: "patients",
    loadChildren: () =>
      import("./active-patients/active-patients.module").then(
        (module) => module.ActivePatientsModule
      ),
  },
  {
    path: "discharge",
    loadChildren: () =>
      import("./discharge-patients/discharge-patients.module").then(
        (module) => module.DischargePatientsModule
      ),
  },
  {
    path: "manage-group",
    loadChildren: () =>
      import("./manage-group/manage-group.module").then(
        (module) => module.ManageGroupModule
      ),
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    //default route after login from SSO, auth guard logic will handle whether to stay in summary page or not
    path: "",
    redirectTo: "/summary",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
