import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { fromEvent, merge } from "rxjs";
import { mapTo } from "rxjs/operators";

import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class BackendApiService {
  dataSource = new BehaviorSubject<any>({});
  data = this.dataSource.asObservable();
  online$: Observable<any>;

  constructor(
    public httpClient: HttpClient,
    private _snackBar: MatSnackBar,
  ) {
    this.online$ = merge(
      fromEvent(window, "online").pipe(mapTo(true)),
      fromEvent(window, "offline").pipe(mapTo(false))
    );
    this.online$.subscribe((data) => {
      if (!data) {
        this._snackBar.open(
          "No Internet Connection, check your network",
          null,
          {
            verticalPosition: "top", // 'top' | 'bottom'
            horizontalPosition: "center",
          }
        );
      } else {
        this._snackBar.dismiss();
        this._snackBar.open("Internet Connection is restored", null, {
          duration: 2000,
          verticalPosition: "top", // 'top' | 'bottom'
          horizontalPosition: "center",
        });
      }
    });
  }

  downloadBlob(url) {
    return this.httpClient
      .get(url, {
        responseType: 'blob'
      });
  }

  postMapping(url, requestBody) {
    return this.httpClient
      .post<any>(url, requestBody)
      .toPromise()
      .then(
        (data) => {
          return data;
        },
        (error) => {
          // console.log('API error : ' + JSON.stringify(error));
          return error;
        }
      );
  }

  getMapping(url, param = {}) {
    return this.httpClient
      .get<any>(url, { params: param })
      .toPromise()
      .then(
        (data) => {
          return data;
        },
        (error) => {
          // console.log('API error : ' + JSON.stringify(error));
          return error;
        }
      );
  }

  put(url, requestBody) {
    return this.httpClient
      .put<any>(url, requestBody)
      .toPromise()
      .then(
        (data) => {
          return data;
        },
        (error) => {
          // console.log('API error : ' + JSON.stringify(error));
          return error;
        }
      );
  }

  callGetApi(url, param = {}) {
    return this.httpClient.get<any>(url, { params: param });
  }


  deleteApi(url) {
    return this.httpClient.delete<any>(url).toPromise();
  }

  getUserRole() {
    return sessionStorage.getItem("user_level");
  }

  post(url, requestBody) {
    return this.httpClient.post<any>(url, requestBody);
  }
}
