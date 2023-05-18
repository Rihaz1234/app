import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";
import { AuthenticationService } from "@services/authentication.service";
import { UserRoles } from "../enum/roles.enum";

@Injectable({
  providedIn: "root",
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private authService: AuthenticationService
  ) {
    super(router, keycloak);
  }

  isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise<boolean | UrlTree>(async (resolve, reject) => {
      if (!this.authenticated) {
        this.keycloak
          .login({
            redirectUri: window.location.origin + state.url,
          })
          .then();
        resolve(false);
        return;
      }

      const requiredRoles = route.data.roles;
      let granted = false;
      if (!requiredRoles || requiredRoles.length === 0) {
        granted = true;
      } else {
        console.log(requiredRoles);
        for (const requiredRole of requiredRoles) {
          if (this.authService.getRoles().indexOf(requiredRole) > -1) {
            granted = true;
            break;
          }
        }
      }

      //if required roles are not met, based on current role route to their landing page
      if (granted === false) {

        if (this.authService.getRoles().indexOf(UserRoles.SUPER_ADMIN) > -1) {
          this.router.navigate(["/super-admin"]).then();
        } else if (
            (this.authService.getRoles().indexOf(UserRoles.SERVICE_PROVIDER_ADMIN) > -1)
            || (this.authService.getRoles().indexOf(UserRoles.SERVICE_PROVIDER_ADMIN_CLONE) > -1)
        ) {
          this.router
            .navigate(["/service-provider-admin/clinical-facility-management"])
            .then();
        } else if (
          this.authService.getRoles().indexOf(UserRoles.CLINICAL_FACILITY_ADMIN) >
            -1 ||
            this.authService.getRoles().indexOf(UserRoles.CLINICAL_FACILITY_ADMIN_CLONE) >
            -1 ||
          this.authService.getRoles().indexOf(UserRoles.SUPERVISORY_CLINICIAN) >
            -1 ||
          this.authService.getRoles().indexOf(UserRoles.GENERAL_CLINICIAN) > -1 ||
          this.authService.getRoles().indexOf(UserRoles.PHYSICIAN) > -1
        ) {
          this.router.navigate(["/summary"]).then();
        }
      }

      resolve(granted);
    });
    // if (!this.authenticated) {
    //     await this.keycloak.login({
    //         redirectUri: window.location.origin + state.url,
    //     });
    // }
    //
    // return this.authenticated;
  }
}
