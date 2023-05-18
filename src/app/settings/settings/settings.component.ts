import { Component, OnInit } from "@angular/core";
import { BackendApiService } from "../../services/backendapi.service";
import { AuthenticationService } from "@services/authentication.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  settingsSummary: any = {
    users: 0,
  };
  roles;
  manageUsers = false;

  constructor(
    private backendApiService: BackendApiService,
    private autheticationService: AuthenticationService
  ) {}
  cfId: string;
  ngOnInit() {
    this.cfId = this.autheticationService.getCfId();
    this.roles = this.autheticationService.getRoles();
    if (this.roles.indexOf("CFA") > -1 || this.roles.indexOf("SC") > -1 || this.roles.indexOf("CFAC") > -1) {
      this.manageUsers = true;
      this.getUsersCount({});
    }
  }

  // Fetch Clinical facility summary page data
  async getUsersCount(params: any) {
    let url = "clinical-facilities/" + this.cfId + "/users/count";
    const resp: any = await this.backendApiService
      .callGetApi(environment.dataApiUrl + url, params)
      .toPromise();
    if (resp.status === "OK") {
      this.settingsSummary.users = resp.data;
    }
  }
  relayViewAccess(){
   return (this.roles.indexOf("CFA") > -1 || this.roles.indexOf("SC") > -1 || this.roles.indexOf("CFAC") > -1 || this.roles.indexOf("GC") > -1)
  }
}
