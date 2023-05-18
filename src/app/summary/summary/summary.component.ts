import { Component, OnInit } from "@angular/core";
import { BackendApiService } from "../../services/backendapi.service";
import { CFSummary } from "../../interfaces/query-params.interface";
import { AuthenticationService } from "@services/authentication.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.scss"],
})
export class SummaryComponent implements OnInit {
  dashboardSummary: any = {
    activePatients: 0,
    parameterAlerts: 0,
    arrhythmiaAlerts: 0,
    techAlerts: 0,
    dischargedPatients: 0,
    unassignedPatches : 0
  };
  roles;
  activePatients = true;
  parameterAlertsFrom;
  arrhythmiaAlertsFrom;

  constructor(
    private backendApiService: BackendApiService,
    private autheticationService: AuthenticationService
  ) {}
  loggedUser: any;
  ngOnInit() {    
    this.roles = this.autheticationService.getRoles();
    this.loggedUser = this.autheticationService.getLoggedUser();
    this.parameterAlertsFrom = window.sessionStorage.getItem("parameter-duration");
    if(this.parameterAlertsFrom === undefined) {
      this.parameterAlertsFrom = 360;
    }
    this.arrhythmiaAlertsFrom = window.sessionStorage.getItem("arrhythmia-duration");
    if(this.arrhythmiaAlertsFrom === undefined) {
      this.arrhythmiaAlertsFrom = 360;
    }
    this.getSummary();
    this.getAlertsSummary({
      parameterAlertsFrom: this.parameterAlertsFrom,
      arrhythmiaAlertsFrom: this.arrhythmiaAlertsFrom
    });
    if (this.roles.indexOf("CFA") > -1) {
      this.activePatients = false;      
    }
  }

  isCFA(){
    return this.roles.indexOf("CFA") > -1 || this.roles.indexOf("CFAC") > -1;
  }
  isSCGCPHY() {
    return this.roles.indexOf("SC") > -1 || this.roles.indexOf("GC") > -1 || this.roles.indexOf("PHY") > -1;
  }
  isSC() {
    return this.roles.indexOf("SC") > -1;
  }

  loading = false;
  alertLoading = false;
  // Fetch Clinical facility summary page data
  getSummary() {
    let url = "summary/";
    this.loading = true;
    this.backendApiService
      .callGetApi(environment.dataApiUrl + url)
      .subscribe((response) => {
        this.loading = false;
        if (response.status === "OK") {
          let summary = response.data;
          this.dashboardSummary.activePatients = summary.activePatients;
          this.dashboardSummary.unassignedPatches = summary.unassignedPatches;
          this.dashboardSummary.dischargedPatients = summary.dischargedPatients;
        }
      }, () => {
        this.loading = false;
      });
  }
  getAlertsSummary(params: CFSummary) {
    let url = "summary/alerts";
    this.alertLoading = true;
    this.backendApiService
        .callGetApi(environment.dataApiUrl + url, params)
        .subscribe((response) => {
          this.alertLoading = false;
          if (response.status === "OK") {
            let alerts = response.data;
            this.dashboardSummary.parameterAlerts = alerts.parameterAlerts;
            this.dashboardSummary.arrhythmiaAlerts = alerts.arrhythmiaAlerts;
            this.dashboardSummary.techAlerts = alerts.techAlerts;
          }
        }, () => {
          this.loading = false;
        });
  }
}
