import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGiverAppComponent } from './care-giver-app.component';
import {
  StoreModule,
} from "@ngrx/store";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthenticationService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { ManageRelaysService } from "src/app/settings/manage-relays/services/manage-relays.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MatDialogModule, MAT_DIALOG_DATA  } from "@angular/material/dialog";
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
describe('CareGiverAppComponent', () => {
  let component: CareGiverAppComponent;
  let fixture: ComponentFixture<CareGiverAppComponent>;
  let params: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareGiverAppComponent ],
      imports:[
        StoreModule.forRoot([]),
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        MatSnackBarModule,
        MatDialogModule
      ],
      providers:[
        AuthenticationService,
        BackendApiService,
        KeycloakService,
        ManageRelaysService,
        TranslateService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareGiverAppComponent);
    component = fixture.componentInstance;
    params = {
      event: PageEvent,
    }   
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should call the isBlank method and return true if value is blank/undefined", () => {
    spyOn(component, "isBlank").and.callThrough();
    const result = component.isBlank("");
    expect(result).toBe(true);
    expect(component.isBlank).toHaveBeenCalledWith("");
  });
  it("should call the onPage method", () => {
    spyOn(component, "onPage").and.callThrough();
    component.onPage(params.PageEvent);
    expect(component.onPage).toHaveBeenCalled();
  });
  it("should call the onSortChange method", () => {
    spyOn(component, "onSortChange").and.callThrough();
    const sortEvent: Sort  = {active: 'fakeActive', direction: 'asc'};
    component.onSortChange(sortEvent);
    expect(component.onSortChange).toHaveBeenCalled();
  });
});
