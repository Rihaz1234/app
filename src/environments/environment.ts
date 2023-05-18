// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  environmentName: "alpha",
  dataApiUrl: "https://alpha.api.lifesignals.com/api/v1/resources/",
  keyClockUrl: "https://alpha.auth.lifesignals.com",
  // keyClockUrl: "https://uat2a.auth.lifesignals.com",
  keyClockRealm: "lsdev",
  keyClockClientId: "InfinityEP4WebUI",
  version: "1.2.1",
  customization: {
    logo: "logo.svg",
    snackBarDuration: 3000,
    enableTrends: false,
    enablePlethRR: true,
    timeFormat: 'H:mm'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
