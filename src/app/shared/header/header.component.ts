import { Component, OnInit, DoCheck, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { BackendApiService } from "../../services/backendapi.service";
import { AuthenticationService } from "@services/authentication.service";
import { HospitalComponent } from "../dialogs/hospital/hospital.component";
import { AboutComponent } from "../dialogs/about/about.component";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss", "../../../assets/css/style.scss"],
})
export class HeaderComponent implements OnInit, DoCheck,OnDestroy {
  logoutResponse: any;
  role: number;
  user: string = '';
  userRoles = {
    GC: false,
    SC: false,
    PHY: false,
    CFA: false,
    CFAC: false,
    SPA: false,
    SPAC: false,
    SA: false
  };
  logo: string;
  defaultLogo:string;
  LogoSubscription: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public backendApiService: BackendApiService,
    private authService: AuthenticationService
  ) {
    this.defaultLogo = 'assets/images/' + (environment.customization.logo || 'logo.svg');
  }
  ngOnDestroy(): void {
    this.LogoSubscription.unsubscribe();
  }

  ngOnInit() {
    this.mapUserRoles();
    this.LogoSubscription= this.authService.latestLogo$.subscribe((data)=>{
      this.logo = ((sessionStorage.getItem('facility-logo') == null ||sessionStorage.getItem('facility-logo') == '') ? this.defaultLogo: sessionStorage.getItem('facility-logo'));
    });
  }
 
  ngDoCheck(): void {
    this.user = ((sessionStorage.getItem('first_name') !== null) ? sessionStorage.getItem('first_name'): this.authService.getLoggedUser()?.given_name);
  }

  navigateUrl(url: string) {
    this.router.navigate([url]).then();
  }

  logout() {
    sessionStorage.removeItem("token_id");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("user_level");
    sessionStorage.removeItem("patchesInDashboard");
    sessionStorage.removeItem("gridView");
    this.authService.logout();
  }

  mapUserRoles() {
    const roles = this.authService.getRoles();
    for (let role in this.userRoles) {
      this.userRoles[role] = roles.includes(role);
    }
  }

  // /**This function is used to open dialog */
  openHospialModel(): void {
    this.dialog.open(HospitalComponent, {
      maxWidth: "90vw",
      width: "500px",
      backdropClass: "backdropBackground",
      disableClose: true,
    })
  }

  // /**This About is used to open dialog */
  openAboutModel(): void {
    this.dialog.open(AboutComponent, {
      maxWidth: "90vw",
      width: "890px",
      backdropClass: "backdropBackground",
      disableClose: true,
    })
  }
}
