import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { StoreModule } from "@ngrx/store";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { KeycloakService } from "keycloak-angular";

import { SinglePatientRelaysComponent } from "./single-patient-relays.component";
import { ManageRelaysService } from "../services/manage-relays.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Sort } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpLoaderFactory } from "src/app/app.module";
import { RelaysMockService } from "../services/relays-mock.service";
import { provideMockStore } from "@ngrx/store/testing";
import { getSPRelayList } from "../store/manage-relays.selector";
import { of } from "rxjs";
import { SimpleChange } from "@angular/core";

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}
describe("SinglePatientRelaysComponent", () => {
  let component: SinglePatientRelaysComponent;
  let fixture: ComponentFixture<SinglePatientRelaysComponent>;
  let params: any;
  let promise;
  let resolve;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinglePatientRelaysComponent],
      imports: [
        MatDialogModule,
        StoreModule.forRoot([]),
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [
        AuthenticationService,
        KeycloakService,
        { provide:ManageRelaysService, useClass: RelaysMockService},
        { provide: MatDialog, useClass: MatDialogMock },
        provideMockStore({
          selectors:[
            {
              selector: getSPRelayList,              
              value:{
                status: "",
                message: "",
                data: {
                items: [{
                  relayId: "R594418589",
                  BiosensorID: "",
                  createdBy: "",
                  email: "",
                  phoneNo: "",
                  createdDateTime: "",
                  lastActive: "",
                  relayType: "",
                  expiryDate: ""
                }],
                total: "",
              }                
              }
            }
          ]
        })        
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePatientRelaysComponent);
    component = fixture.componentInstance;
    params = {
      event: PageEvent,
    } 
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the onSortChange method", () => {
    spyOn(component, "onSortChange").and.callThrough();
    const sortEvent: Sort  = {active: 'fakeActive', direction: 'asc'};
    component.onSortChange(sortEvent);
    expect(component.onSortChange).toHaveBeenCalled();
  });
  it('should check if getMPRelayList was called in ngOnChanges lifecycle hook', () => {
    const getMPRelayList = spyOn(component, 'getSPRelayList');
    promise = new Promise((r) => (resolve = r));
    component.ngOnChanges({
      promise: new SimpleChange(null, promise, null),
    });
    fixture.detectChanges();
    expect(getMPRelayList ).toHaveBeenCalledTimes(1);
  });
  it("should call the getDate method", () => {
    spyOn(component, "getDate").and.callThrough();
    component.getDate("");
    expect(component.getDate).toHaveBeenCalledWith("");
  });
  it("should call the onPage method", () => {
    spyOn(component, "onPage").and.callThrough();
    component.onPage(params.PageEvent);
    expect(component.onPage).toHaveBeenCalled();
  });
  it("should call the isBlank method and return true if value is blank/undefined", () => {
    spyOn(component, "isBlank").and.callThrough();
    const result = component.isBlank("");
    expect(result).toBe(true);
    expect(component.isBlank).toHaveBeenCalledWith("");
  });
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar").and.callThrough();
    component.openSnackBar("Test Message");
    expect(component.openSnackBar).toHaveBeenCalled();
  });
  it("should call the confirmDelete method", () => {
    spyOn(component, "confirmDelete").and.callThrough();
    component.confirmDelete();
    expect(component.confirmDelete).toHaveBeenCalled();
  }); 
  it("should call the ifChecked method", () => {
    spyOn(component, "ifChecked").and.callThrough();
    component.ifChecked("R594418589");
    expect(component.ifChecked).toHaveBeenCalledWith("R594418589");
  });  
  it("should call the onCheckboxChange method", () => {
    spyOn(component, "onCheckboxChange").and.callThrough();
    component.onCheckboxChange({checked:true},"R594418589");
    expect(component.onCheckboxChange).toHaveBeenCalledWith({checked:true},"R594418589");
  });
  it("should call the relaysSelected method", () => {
    spyOn(component, "relaysSelected").and.callThrough();
    component.relaysSelected({selected:true});
    expect(component.relaysSelected).toHaveBeenCalledWith({selected:true});
  });
});
