import { KeycloakService } from "keycloak-angular";
import { environment } from "../../environments/environment";

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keyClockUrl + "/auth",
        realm: environment.keyClockRealm,
        clientId: environment.keyClockClientId
      },
      initOptions: {
        onLoad: "login-required",
        checkLoginIframe: false
      },
      enableBearerInterceptor: true,
      bearerPrefix: "",
      bearerExcludedUrls: ["https://webui-s3.s3.ap-south-1.amazonaws.com/"]
    });
}
