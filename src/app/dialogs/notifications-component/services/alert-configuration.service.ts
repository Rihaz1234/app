import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { delay, catchError } from "rxjs/operators";
import {
    AlertConfiguration,
    AlertDestinationConfiguration,
    MiscellaneousData,
    MiscSettings,
    ClinicalFacilityContactList,
    AlertHistory,
    ArrhythmiaAlertConfiguration,
} from "../store/alert-configuration.models";
import { BackendApiService } from "@services/backendapi.service";
import { environment } from "src/environments/environment";

@Injectable()
export class AlertConfigurationsService {

    constructor(
        private http: HttpClient,
        private backendApiService: BackendApiService
    ) { }
    getAlertSettings(url: string) {
        const authHeaders = new HttpHeaders({
            'X-Skip-Interceptor': '',
            'Access-Control-Allow-Origin': '*',
        });
        return this.http.get<AlertConfiguration>(environment.dataApiUrl + url, { headers: authHeaders });
    }
    getArrhythmiaAlertSettings(url: string) {
        const authHeaders = new HttpHeaders({
            'X-Skip-Interceptor': '',
            'Access-Control-Allow-Origin': '*',
        });
        return this.http.get<ArrhythmiaAlertConfiguration>(environment.dataApiUrl + url, { headers: authHeaders });
    }
    getSettings(url) {
        const authHeaders = new HttpHeaders({
          "X-Skip-Interceptor": "",
          "Access-Control-Allow-Origin": "*",
        });
        return this.http.get<MiscSettings>(environment.dataApiUrl + url, {
          headers: authHeaders,
        });
      }
      getGroups(cfId) {
        const authHeaders = new HttpHeaders({
          "X-Skip-Interceptor": "",
          "Access-Control-Allow-Origin": "*",
        });
        const url = "clinical-facilities/" + cfId + "/groups";
        return this.http
          .get<any>(environment.dataApiUrl + url, { headers: authHeaders })
          .pipe(delay(100), catchError(this.handleError));
      }
      updateSettings(body: MiscellaneousData) {
        const url = "patients/misc-settings";
        console.log("update", body);
        return this.http
          .post<any>(environment.dataApiUrl + url, body)
          .pipe(delay(100), catchError(this.handleError));
      }

      downloadAlertLog(patientId){
        const url = environment.dataApiUrl + "patients/" + patientId + "/alert-log"
        return this.backendApiService
        .downloadBlob(url);
      }

      downloadEventLog(patientId){
        const url = environment.dataApiUrl + "patients/" + patientId + "/event-log"
        return this.backendApiService.downloadBlob(url);
      }

      resetSettings(url) {
        console.log(url);
        return this.http
          .post<any>(environment.dataApiUrl + url, "")
          .pipe(delay(100), catchError(this.handleError));
      }
      
     // Root destination alert fetch api
      getAlertDestinationSettings(url: string) {
        const authHeaders = new HttpHeaders({
            'X-Skip-Interceptor': '',
            'Access-Control-Allow-Origin': '*',
        });
        return this.http.get<AlertDestinationConfiguration>(environment.dataApiUrl + url, { headers: authHeaders });
    }

    getClinicalFacilityContacts(url: string) {
        const authHeaders = new HttpHeaders({
            'X-Skip-Interceptor': '',
            'Access-Control-Allow-Origin': '*',
        });
        return this.http.get<ClinicalFacilityContactList>(environment.dataApiUrl + url, { headers: authHeaders }).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error: any) {
        let errorMessage = '';
        // Client-side error.
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
            // Server-side error.
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }
    getParameterMinMax() {
        let userPreferenceUnit = JSON.parse(sessionStorage.getItem('userPreference'))?.units;
        return {
            HR: {
                MIN: {
                    HighThr: 60,
                    CondDelay: 5,
                    LowThr: 30,
                },
                MAX: {
                    HighThr: 250,
                    CondDelay: 300,
                    LowThr: 160,
                },
            },
            RR: {
                MIN: {
                    HighThr: 10,
                    CondDelay: 30,
                    LowThr: 6,
                },
                MAX: {
                    HighThr: 60,
                    CondDelay: 300,
                    LowThr: 55,
                },
            },
            SPO2: {
                MIN: {
                    HighThr: 95,
                    CondDelay: 60,
                    LowThr: 70,
                },
                MAX: {
                    HighThr: 100,
                    CondDelay: 300,
                    LowThr: 95,
                },
            },
            BODYTEMP: {
                MIN: {
                    HighThr: userPreferenceUnit === 'SI'? 37 : 98.6,
                    CondDelay: 20,
                    LowThr: userPreferenceUnit === 'SI'? 32: 89.6,
                },
                MAX: {
                    HighThr: userPreferenceUnit === 'SI'? 43 : 109.4,
                    CondDelay: 300,
                    LowThr: userPreferenceUnit === 'SI'? 36 : 96.8,
                },
            },
            BPSYS: {
                MIN: {
                    HighThr: 75,
                    CondDelay: 1,
                    LowThr: 35,
                },
                MAX: {
                    HighThr: 240,
                    LowThr: 150,
                    CondDelay: 300,
                },
            },
            BPDIA: {
                MIN: {
                    HighThr: 50,
                    LowThr: 15,
                    CondDelay: 1,
                },
                MAX: {
                    HighThr: 180,
                    LowThr: 50,
                    CondDelay: 300,
                },
            },
            BP: {
                MIN: {
                    HighThr: 70,
                    LowThr: 25,
                    CondDelay: 1,
                },
                MAX: {
                    HighThr: 200,
                    LowThr: 125,
                    CondDelay: 300,
                },
            },
            PR: {
                MIN: {
                    HighThr: 60,
                    CondDelay: 20,
                    LowThr: 30,
                },
                MAX: {
                    HighThr: 250,
                    CondDelay: 300,
                    LowThr: 120,
                },
            },
            SKINTEMP: {
                MIN: {
                    HighThr: userPreferenceUnit === 'SI'? 20: 68,
                    CondDelay: 20,
                    LowThr: userPreferenceUnit === 'SI'? 15: 59,
                },
                MAX: {
                    HighThr: userPreferenceUnit=== 'SI'? 45: 113,
                    CondDelay: 300,
                    LowThr: userPreferenceUnit === 'SI'? 34.4: 94,
                },
            },
            POSTURE_ALERT: {
                MIN: {
                    HighThr: '',
                    CondDelay: 2,
                    LowThr: '',
                },
                MAX: {
                    HighThr: '',
                    CondDelay: 168,
                    LowThr: '',
                },
            },
            //------------------------
            SINUS_BRADYCARDIA: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: 30,
                },
                MAX: {
                  HighThr: 50,
                  CondDelay: 168,
                  LowThr: 60,
                },
              },
              SINUS_TACHYCARDIA: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: 100,
                },
                MAX: {
                  HighThr: 100,
                  CondDelay: 168,
                  LowThr: 250,
                },
              },
              VENTRICULAR_FLUTTER: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              VENTRICULAR_TACHYCARDIA: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              IDIOVENTRICULAR_RYTHM: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              SUPRAVENTRICULAR_TACHYCARDIA: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              AFIB_FLUTTER: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              JUNCTIONAL_TACHYCARDIA: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              FIRST_DEGREE_AV_BLOCK: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              SECOND_DEGREE_AV_BLOCK_TYPE_I: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              SECOND_DEGREE_AV_BLOCK_TYPE_II: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              PAUSE: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              V_COUPLET: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              V_TRIGEMINY: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              V_BIGEMINY: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              PVC_RATE: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: 1,
                },
                MAX: {
                  HighThr: 10,
                  CondDelay: 168,
                  LowThr: 99,
                },
              },
              PAC_RATE: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: 1,
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: 99,
                },
              },
              PVC: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr: 20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
              PAC: {
                MIN: {
                  HighThr: 0,
                  CondDelay: 2,
                  LowThr: '',
                },
                MAX: {
                  HighThr:20,
                  CondDelay: 168,
                  LowThr: '',
                },
              },
        }
    }
    alertHistory(param) {
        let params = new HttpParams();

        // Begin assigning parameters
        let patientId = encodeURIComponent(param.patientId);
        const url = `alerts/param/${patientId}`;
        return this.http
            .get<AlertHistory>(environment.dataApiUrl + url, { params })
            .pipe(delay(100), catchError(this.handleError));

    }
    acknowledgeAlert(body) {
        const url = "alerts/acknowledge";
        return this.backendApiService
            .post(environment.dataApiUrl + url, body)
            .pipe(delay(100), catchError(this.handleError));

    }
    eventList(param) {
        let params = new HttpParams();
        let patientId = encodeURIComponent(param.patientId);
        let page = param.page + 1;
        let pageSize = param.pageSize;
        const url = `patients/${patientId}/events?page=${page}&size=${pageSize}`;
        return this.http
            .get(environment.dataApiUrl + url, { params })
            .pipe(delay(100), catchError(this.handleError));

    }
    addEvent(event) {
        const url = "patients/patient-events";
        return this.backendApiService
            .post(environment.dataApiUrl + url, event)
            .pipe(delay(100), catchError(this.handleError));
    }
    acknowledgeEvent(id){
        const url = "patients/ack-event";
        return this.backendApiService
            .post(environment.dataApiUrl + url, id)
            .pipe(delay(100), catchError(this.handleError));
    }
    alphaNumericsOnly(event: KeyboardEvent) {
        let charsOnlyPattern = /^[a-zA-Z0-9_ ]+$/;
        let key = event.key;
        if (charsOnlyPattern.test(key)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }
    
    alphaNumericsOnlySpecialCases(event: KeyboardEvent) {
        let charsOnlyPattern = /^[a-zA-Z0-9 ]+$/;
        let key = event.key;
        if (charsOnlyPattern.test(key)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }



    checkForSpecialCharacters(event: ClipboardEvent){
        let clipboardData = event.clipboardData;
        let key = clipboardData.getData('text');
        let charsOnlyPattern = /^[0-9]+$/;
        if (charsOnlyPattern.test(key)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }
    sortAlerts(alerts) {
         return alerts.sort((a,b) =>
         {
             if(a['alertTimeFrom'] > b['alertTimeFrom']) return -1;
             else if (a['alertTimeFrom'] < b['alertTimeFrom']) return 1;
             else return 0;
         });
    }
    forwardAlert(payload) {
        const url = "alerts/forward";
        return this.backendApiService
            .post(environment.dataApiUrl + url, payload)
            .pipe(delay(100), catchError(this.handleError));
    }
  }

