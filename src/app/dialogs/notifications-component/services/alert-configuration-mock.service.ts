import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AlertConfigurationMockService {
    constructor() {
    }
    acknowledgeAlert(body) {
        let dummyResponse = new BehaviorSubject({
            status: 'OK',
            message: "SUCCESS",
            data: null
        });
        return dummyResponse.asObservable();
    }
}
