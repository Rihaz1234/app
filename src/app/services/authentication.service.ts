import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {

  private logoSource = new BehaviorSubject<boolean>(false);
  public latestLogo$ = this.logoSource.asObservable();

  constructor(
    private keyClockService: KeycloakService
  ) { }

  getCustomizationLogo(logoStatus: boolean) {
    this.logoSource.next(logoStatus);
  }

  getLoggedUser() {
    const userDetails = this.keyClockService.getKeycloakInstance()?.tokenParsed;
    return userDetails;
  }

  logout() {
    window.sessionStorage.clear();
    this.keyClockService.logout(window.location.origin).catch(console.log);
  }

  getRoles(): string[] {
    return (
      (this.keyClockService.getKeycloakInstance() || {})?.tokenParsed?.roles ||
      []
    );
  }
  getCfId(): string {
    return (this.keyClockService.getKeycloakInstance() || {})?.tokenParsed
      ?.cfId;
  }
  getSPId(): string {
    return (this.keyClockService.getKeycloakInstance() || {})?.tokenParsed
      ?.spId;
  }
  getUserId(): string {
    return (this.keyClockService.getKeycloakInstance() || {})?.tokenParsed?.uId;
  }
}

export class MockAuthService {
  getLoggedUser() {
    return {};
  }

  getRoles() {
    return [];
  }

  getUserId() {
    return "";
  }

  getSPId() {
    return "";
  }
  getCfId() {
    return "";
  }
  logout() {
  }
}
