import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { FormBuilder } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { TranslateStore } from "@ngx-translate/core";
import { I18nModule } from "src/app/i18n/i18n.module";
import { AuthenticationService } from "@services/authentication.service";
import { AssignGroupModalComponent } from "./assign-group-modal.component";
import { KeycloakService } from "keycloak-angular";
describe("AssignGroupModalComponent", () => {
  let component: AssignGroupModalComponent;
  let fixture: ComponentFixture<AssignGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignGroupModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        TranslateStore,
        FormBuilder,
        AuthenticationService,
        KeycloakService,
      ],
      imports: [MatDialogModule, StoreModule.forRoot([]), I18nModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
