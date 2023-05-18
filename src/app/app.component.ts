import { Component, Injectable, NgModule, OnInit } from "@angular/core";
import { AuthenticationService } from "@services/authentication.service";
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions,
} from "@angular/material/core";
import {ManageUsersService} from "./settings/manage-users/services/manage-users.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private _appRippleOptions: AppGlobalRippleOptions,
    private userService: ManageUsersService
  ) {
    this._appRippleOptions.disabled = true;
  }

  ngOnInit() {
    console.log("SAA : " + this.authService.getRoles());
    let userId = this.authService.getUserId();
    let preference;
    this.userService.getUser(userId)
        .subscribe((response: any) => {
          if(response.status === 'OK') {
            preference = {
              units: response?.data?.units || 'SI',
              timeZone: this.userService.getTimeZoneOffset(response?.data?.timezone),
            };
            sessionStorage.setItem('userPreference', JSON.stringify(preference));
            sessionStorage.setItem('timezone', response?.data?.timezone);
            sessionStorage.setItem('facility-logo', response.data.logoUrl);
            sessionStorage.setItem('first_name',response.data.firstName);
            sessionStorage.setItem('facilityName',response.data?.facilityName);
            sessionStorage.setItem('emr',response.data?.emr);
            this.authService.getCustomizationLogo(true);
          } else {
            preference = {
              units: '',
              timeZone: '',
            };
            sessionStorage.setItem('userPreference', JSON.stringify(preference));
          }
        }, error => {
          preference = {
            units: '',
            timeZone: '',
          };
          sessionStorage.setItem('userPreference', JSON.stringify(preference));
        })

  }
}

@Injectable({ providedIn: "root" })
export class AppGlobalRippleOptions implements RippleGlobalOptions {
  /** Whether ripples should be disabled globally. */
  disabled: boolean = false;
}

@NgModule({
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useExisting: AppGlobalRippleOptions },
  ],
})
export class RippleModule {}
