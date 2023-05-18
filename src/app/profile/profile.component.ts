import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { BackendApiService } from "../services/backendapi.service";
import { AuthenticationService } from "@services/authentication.service";
import { ManageUsersService } from "../settings/manage-users/services/manage-users.service";
import { CFUser } from "../interfaces/manage-users.interface";
import { ConfirmDialogComponent } from "../shared/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "src/environments/environment";
import { SnackbarService } from "@services/snackbar.service";
import csc from "country-state-city";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  version = environment.version;
  searchTxt;
  constructor(
    private location: Location,
    public backendApiService: BackendApiService,
    private authService: AuthenticationService,
    private userService: ManageUsersService,
    private snackBar: SnackbarService,
    private dialog: MatDialog,
  ) { }
  units = [
    { name: "Metric Units", value: "SI" },
    { name: "Imperial Units", value: "IS" },
  ];
  timeZones;
  logoutResponse: any;
  role: number;
  user: CFUser;
  private userCopy: CFUser;
  userId;
  loader = true;
  selectedUnit;
  valuesUpdated = false;
  duration = 3000;
  showPreference = true;
  roles;
  browserOffset;
  ngOnInit() {
    // this.user = sessionStorage.getItem("user");
    this.roles = this.authService.getRoles() || [];
    if (this.roles.indexOf('SPA') > -1 || this.roles.indexOf('SA') > -1) {
      this.showPreference = false;
    }
    this.userId = this.authService.getUserId();
    this.getTimeZones();
    this.getUser();
  }
  getUser() {
    this.userService.getUser(this.userId).subscribe(
      (response: any) => {
        this.user = response.data;
        this.user.timezone = this?.user?.timezone || this.userService.getTimeZoneOffset('');
        this.userCopy = JSON.parse(JSON.stringify(this.user));
        this.loader = false;
      }, console.log);
  }
  getTimeZones() {
    let countries = csc.getAllCountries() || [];
    this.timeZones = countries.flatMap(country => {
      return country.timezones.map(timeZone => ({
        name: timeZone.zoneName,
        offset: timeZone.gmtOffsetName
      }));
    });
  }
  back() {
    this.location.back();
  }
  logout() {
    this.authService.logout();
  }
  cancel() {
    this.valuesUpdated = false;
    this.user = JSON.parse(JSON.stringify(this.userCopy));
  }
  save() {
    let userPreference = {
      units: this.user.units,
      timeZone: this.user.timezone,
    };
    this.loader = true;
    this.userService.savePreferences(this.userId, userPreference).subscribe(
      (response: any) => {
        if (response.status === "OK") {
          this.snackBar.openSnackBar("shared." + response.message, 'bottom', 'center', true);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          this.loader = false;
          this.snackBar.openSnackBar("shared.OPERATION_FAILED", 'bottom', 'center', true);
        }
      },
      (error) => {
        this.loader = false;
        console.log(error);
        this.snackBar.openSnackBar("shared.OPERATION_FAILED", 'bottom', 'center', true);
      }
    );
  }
  confirmResetPassword() {
    const confirm = this.dialog.open(ConfirmDialogComponent, {
      width: "500px",
      //height: "270px",
      maxWidth: "95vw",
      
      data: {
        body: {
          title: "manage_users_module.reset_password",
          text: "manage_users_module.reset_password_confirm",
        },
      },

      disableClose: true,
    });
    confirm.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        this.resetPassword();
      }
    });
  }
  resetPassword() {
    this.loader = true;
    this.snackBar.openSnackBar("shared.Reset_success", 'bottom', 'center', true);
    this.userService.resetPassword(this.userId).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === "OK") {
          // this.duration = 10000;
          this.logout();
        }
      },
      (error) => {
        this.loader = false;
        this.snackBar.openSnackBar("shared.OPERATION_FAILED", 'bottom', 'center', true);
      }
    );
  }
  selectZone(value) {
    this.user.timezone = value;
    this.valuesUpdated = true;
  }
  updated() {
    this.valuesUpdated = true;
  }
}
