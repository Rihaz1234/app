import { Injectable, NgZone } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage;
                    // Client-side error.
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = {
                            errorMessage: `${error.error.message}`,
                        };
                        console.log(errorMessage);
                        // Server-side error.
                    } else {
                        console.log(error);
                        if (error.status === 404) {
                            errorMessage = {
                                errorCode: `${error.status}`,
                                errorMessage: `${error.error}`,
                            };
                        } else {
                            errorMessage = {
                                errorCode: `${error.status}`,
                                errorMessage: `${error.error.message}`,
                            };
                        }

                    }
                    return throwError(errorMessage);
                })
            )
    }
}
