import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User, UserErrors } from "../../../interfaces/user.interface";
import { atLeastOne } from "../../../validators/custom-validator-at-least-once.validator";
import { SearchCountryField, CountryISO } from "ngx-intl-tel-input";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { SpinnerService } from "src/app/shared/_services/spinner.service";
import {
  ManageAdminStoreActions,
  ManageAdminStoreSelectors,
  ManageAdminStoreState,
} from "../../../shared/store/manage-admin";
import { Store } from "@ngrx/store";
import { AuthenticationService } from "@services/authentication.service";
import { Subscription } from "rxjs";
import { SnackbarService } from "@services/snackbar.service";
import {_validatePhoneNumberInput} from "../../../validators/phone-no.validator";
import parsePhoneNumberFromString from "libphonenumber-js";
import { CautionBoxComponent } from "../caution-box/caution-box.component";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-add-edit-cfa",
  templateUrl: "./add-edit-cfa.component.html",
  styleUrls: ["./add-edit-cfa.component.scss"],
})
export class AddEditCfaComponent implements OnInit, OnDestroy {
  addAddEditForm: FormGroup;
  submitted: boolean;
  cfAdminData: User;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.India,
    CountryISO.UnitedStates,
    CountryISO.SouthAfrica,
  ];
  validCountry = true;
  cfAdmin: User;
  cfId: string;
  spId: string;
  addManageAdminSuccessSubs: Subscription;
  addManageAdminFailureSubs: Subscription;
  updateManageAdminSuccessSubs: Subscription;
  updateManageAdminFailureSubs: Subscription;

  constructor(
    private dialogRef: MatDialogRef<AddEditCfaComponent>,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store$: Store<ManageAdminStoreState.ManageAdminState>,
    private authService: AuthenticationService,
    private snackbar: SnackbarService,
    private dialog : MatDialog
  ) {}

  ngOnInit() {
    this.spId = this.authService.getLoggedUser()?.spId;
    this.cfAdminData = this.data.cfAdmin;
    console.log(this.cfAdminData);
    this.cfId = this.data.cfId;
    this.createAddEditForm();
    this.doSubscriptionAddEditCFA();
  }

  doSubscriptionAddEditCFA() {
    if (this.cfAdminData === undefined) {
      this.addManageAdminSuccessSubs = this.store$
        .select(ManageAdminStoreSelectors.addManageAdminSuccess)
        .subscribe((data) => {
          if (data) {
            this.dialogRef.close();
          }
        });

      this.addManageAdminFailureSubs = this.store$
        .select(ManageAdminStoreSelectors.addManageAdminFailure)
        .subscribe((data) => {
          if (data) {
            if (data.errorMessage === UserErrors.EMAIL_OR_PHONE_ALREADY_EXIST) {
              this.snackbar.openSnackBar("error_message.err_email_phone_exist", "top", "center", true);
            } else if (data.errorMessage === 'CFA_ALREADY_EXIST') {
              this.snackbar.openSnackBar("error_message.cfa_already_exists", "top", "center", true);
            } else {
              this.snackbar.openSnackBar("errors.err_generic_message", "top", "center", true);
            }
          }
        });
    } else {
      this.updateManageAdminSuccessSubs = this.store$
        .select(ManageAdminStoreSelectors.updateManageAdminSuccess)
        .subscribe((data) => {
          if (data) {
            this.dialogRef.close();
          }
        });

      this.updateManageAdminFailureSubs = this.store$
        .select(ManageAdminStoreSelectors.updateManageAdminFailure)
        .subscribe((data) => {
          if (data) {
            if (data.errorMessage === UserErrors.EMAIL_OR_PHONE_ALREADY_EXIST) {
              this.snackbar.openSnackBar("error_message.err_email_phone_exist", "top", "center", true);
            } else {
              this.snackbar.openSnackBar("errors.err_generic_message", "top", "center", true);
            }
          }
        });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  resetNumber() {
    this.addAddEditForm.patchValue({
      phoneNo: {
        number: undefined,
        countryCode: CountryISO.India,
      },
    });
  }

  createAddEditForm() {
    this.addAddEditForm = this.formBuilder.group(
      {
        firstName: [
          this.cfAdminData !== undefined ? this.cfAdminData.firstName : "",
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z]{1}[a-zA-Z ]*$"),
            Validators.maxLength(25)
          ],
        ],
        lastName: [
          this.cfAdminData !== undefined ? this.cfAdminData.lastName : "",
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z]{1}[a-zA-Z ]*$"),
            Validators.maxLength(25)
          ],
        ],
        phoneNo: [
          this.cfAdminData !== undefined ? this.cfAdminData.phoneNo : "",
          [_validatePhoneNumberInput.bind(this)]
        ],
        email: [
          this.cfAdminData !== undefined ? this.cfAdminData.email : "",
        [Validators.email]
        ],
      },
      { validator: atLeastOne(Validators.required, ["email", "phoneNo"]) }
    );
  }

  charsOnly(control: string, event: KeyboardEvent) {
    let charsOnlyPattern = /^[a-zA-Z ]$/;
    let key = event.key;
    if (charsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  get f() {
    return this.addAddEditForm.controls;
  }

  saveServiceProviderAdmin() {
    this.submitted = true;
    if (this.addAddEditForm.invalid) {
      this.addAddEditForm.markAllAsTouched();
      return;
    }

    this.spinnerService.show();
    this.cfAdmin = this.addAddEditForm.value;
    this.cfAdmin.serviceProviderId = this.spId;
    this.cfAdmin.facilityId = this.cfId;

    if (
      this.addAddEditForm.get("phoneNo").value !== null &&
      this.addAddEditForm.get("phoneNo").value !== ""
    ) {
      const parsedValue = parsePhoneNumberFromString(this.addAddEditForm
          .get("phoneNo")
          .value);
      this.cfAdmin.phoneNo = parsedValue.number.toString();
    }

    if (this.cfAdminData === undefined) {
      this.cfAdmin.isActive = true;
      this.cfAdmin.createdBy = sessionStorage.getItem("user");
      this.cfAdmin.createdById = sessionStorage.getItem("user_id");
      this.cfAdmin.roles = ["CFA"];
      const cDialog = this.dialog.open(CautionBoxComponent,{
        maxWidth: "90vw",
        width: "500px",
        backdropClass: "backdropBackground",
        disableClose: true,
        data: {
          message_1 : "clinical_facility.caution.add_user_caution",
          message_2 : "clinical_facility.caution.add_user_caution_1"
        }
      });
      cDialog.afterClosed().subscribe((boolean)=>{
        let confirmValue =  boolean;
        if(confirmValue){
          this.store$.dispatch(
            new ManageAdminStoreActions.SaveManageAdminAction(
              this.cfAdmin,
              environment.dataApiUrl+'clinical-facilities/users/cfa'
            )
          );
        }
      });
     
    } else {
      this.cfAdmin.modifiedBy = sessionStorage.getItem("user");
      this.cfAdmin.modifiedById = sessionStorage.getItem("user_id");
      this.cfAdmin.id = this.cfAdminData.id;
      this.cfAdmin.isActive = this.cfAdminData.isActive;
      this.store$.dispatch(
        new ManageAdminStoreActions.UpdateManageAdminAction(
          this.cfAdmin,
          environment.dataApiUrl+'clinical-facilities/users/cfa'
        )
      );
    }
  }

  ngOnDestroy() {
    this.doUnsubscribeAddEditCFA();
  }

  doUnsubscribeAddEditCFA() {
    if (this.cfAdminData === undefined) {
      if (this.addManageAdminSuccessSubs)
        this.addManageAdminSuccessSubs.unsubscribe();
      if (this.addManageAdminFailureSubs)
        this.addManageAdminFailureSubs.unsubscribe();
      this.store$.dispatch(
        new ManageAdminStoreActions.AfterSaveManageAdminSuccessAction()
      );
      this.store$.dispatch(
        new ManageAdminStoreActions.AfterSaveManageAdminFailureAction()
      );
    } else {
      if (this.updateManageAdminSuccessSubs)
        this.updateManageAdminSuccessSubs.unsubscribe();
      if (this.updateManageAdminFailureSubs)
        this.updateManageAdminFailureSubs.unsubscribe();
      this.store$.dispatch(
        new ManageAdminStoreActions.AfterUpdateManageAdminSuccessAction()
      );
      this.store$.dispatch(
        new ManageAdminStoreActions.AfterUpdateManageAdminFailureAction()
      );
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addAddEditForm.controls[controlName].hasError(errorName);
  }
}
