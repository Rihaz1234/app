import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Sort } from "@angular/material/sort";
import { StoreModule } from "@ngrx/store";
import { TranslateLoader, TranslateModule, TranslateStore } from "@ngx-translate/core";
import { KeycloakService } from "keycloak-angular";
import { ManageRelaysService } from "../services/manage-relays.service";
import { PageEvent } from '@angular/material/paginator';
import { MultiPatientRelaysComponent } from "./multi-patient-relays.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpLoaderFactory } from "src/app/app.module";
import { HttpClient } from "@angular/common/http";
import { provideMockStore } from "@ngrx/store/testing";
import { getLoaderStatus, getMPRelayList } from "../store/manage-relays.selector";
import { RelaysMockService } from "../services/relays-mock.service";
import {AddRelayComponent} from "src/app/settings/manage-relays/add-relay/add-relay.component"
import { of } from "rxjs";
export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}
describe("MultiPatientRelaysComponent", () => {
  let component: MultiPatientRelaysComponent;
  let fixture: ComponentFixture<MultiPatientRelaysComponent>;
  let params: any;
  let promise;
  let resolve;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiPatientRelaysComponent,AddRelayComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        StoreModule.forRoot({}),
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide:ManageRelaysService, useClass: RelaysMockService},
        { provide: MatDialog, useClass: MatDialogMock },
        KeycloakService,
        TranslateStore,
        provideMockStore({
          selectors:[
            {
              selector: getMPRelayList,              
              value:{
                status: "",
                message: "",
                data: {
                items: [{
                  relayId: "R594418589",
                  location: "Ward1234",
                  createdBy: "USR247522464",
                  createdDateTime: "2022-03-21 04:54:26",
                  status: "Active",
                  lastActive: 1647838466000,
                }],
                total: "",
              }                           
              }
            },
            {
              selector: getLoaderStatus,
              value: true,
            }, 
          ]
        })        
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiPatientRelaysComponent);
    component = fixture.componentInstance;
    params = {
      event: PageEvent,
      items: [{
        relayId: "R594418589",
        location: "Ward1234",
        createdBy: "USR247522464",
        createdDateTime: "2022-03-21 04:54:26",
        status: "Active",
        lastActive: 1647838466000,
      }],
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
  it("should call the showEdit method", () => {
    spyOn(component, "showEdit").and.callThrough();
    component.showEdit(0);
    expect(component.showEdit).toHaveBeenCalled();
  });
  it("should call the hideEdit method", () => {
    spyOn(component, "hideEdit").and.callThrough();
    component.hideEdit(0);
    expect(component.hideEdit).toHaveBeenCalled();
  });
  it("should call the getDate method", () => {
    spyOn(component, "getDate").and.callThrough();
    component.getDate("");
    expect(component.getDate).toHaveBeenCalled();
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
  it('should check if getMPRelayList was called in ngOnChanges lifecycle hook', () => {
    const getMPRelayList = spyOn(component, 'getMPRelayList');
    promise = new Promise((r) => (resolve = r));
    component.ngOnChanges({
      promise: new SimpleChange(null, promise, null),
    });
    fixture.detectChanges();
    expect(getMPRelayList ).toHaveBeenCalledTimes(1);
  });
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar").and.callThrough();
    component.openSnackBar("Test Message");
    expect(component.openSnackBar).toHaveBeenCalled();
  });
  it("should call the locationValid method", () => {
    spyOn(component, "locationValid").and.callThrough();
    component.locationValid("Ward1234");
    expect(component.locationValid).toHaveBeenCalledWith("Ward1234");
  });
  it("should call the locationEdit method", () => {
    spyOn(component, "locationEdit").and.callThrough();
    component.locationEdit(0);
    expect(component.locationEdit).toHaveBeenCalled();
  });
  it("should call the getStatus method", () => {
    spyOn(component, "getStatus").and.callThrough();
    component.getStatus("Active");
    expect(component.getStatus).toHaveBeenCalledWith("Active");
  });
  it("should call the confirmDelete method", () => {
    spyOn(component, "confirmDelete").and.callThrough();
    component.confirmDelete();
    expect(component.confirmDelete).toHaveBeenCalled();
  }); 
  it("should call the confirmSingleRelayDelete method", () => {
    spyOn(component, "confirmSingleRelayDelete").and.callThrough();
    component.confirmSingleRelayDelete("R594418589");
    expect(component.confirmSingleRelayDelete).toHaveBeenCalledWith("R594418589");
  }); 
  it("should call the onSelectChange method", () => {
    spyOn(component, "onSelectChange").and.callThrough();
    component.onSelectChange({},"");
    expect(component.onSelectChange).toHaveBeenCalledWith({},"");
  }); 
  it("should call the deleteSingleRelay method", () => {
    spyOn(component, "deleteSingleRelay").and.callThrough();
    component.deleteSingleRelay("R594418589");
    expect(component.deleteSingleRelay).toHaveBeenCalledWith("R594418589");
  });
  it("should call the addRelay method", () => {
    spyOn(component, "addRelay").and.callThrough();
    component.addRelay();
    expect(component.addRelay).toHaveBeenCalled();
  }); 
});
