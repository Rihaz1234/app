import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { BackendApiService } from "./backendapi.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Overlay } from "@angular/cdk/overlay";
import { KeycloakService } from "keycloak-angular";

describe("Backend API Service", () => {
  let backendApiService: BackendApiService;
  let httpMock: HttpTestingController;
  let matSnackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        BackendApiService,
        MatSnackBar,
        Overlay,
        KeycloakService,
      ],
    });

    backendApiService = TestBed.inject(BackendApiService);
    httpMock = TestBed.inject(HttpTestingController);
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  it(`Should Call Get Method`, inject(
    [HttpTestingController, BackendApiService],
    (httpClient: HttpTestingController, apiService: BackendApiService) => {
      const getResponse = {
        status: "OK",
        message: "",
      };
      const url = "http://localhost:8080/api/v1/resources/clinical-facilities";
      apiService.callGetApi(url).subscribe((response: any) => {
        expect(response.status).toBe("OK");
      });
      let req = httpMock.expectOne(url);
      expect(req.request.method).toBe("GET");

      req.flush(getResponse);
      httpMock.verify();
    }
  ));

  it(`Should Call Post Method`, inject(
    [HttpTestingController, BackendApiService],
    (httpClient: HttpTestingController, apiService: BackendApiService) => {
      const getResponse = {
        status: "OK",
        message: "",
      };
      const url = "http://localhost:8080/api/v1/resources/clinical-facilities";
      apiService.post(url, {}).subscribe((response: any) => {
        expect(response.status).toBe("OK");
      });
      let req = httpMock.expectOne(url);
      expect(req.request.method).toBe("POST");

      req.flush(getResponse);
      httpMock.verify();
    }
  ));
});
