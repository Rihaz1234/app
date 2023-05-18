import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User, UserErrors } from "../../../interfaces/user.interface";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { SpinnerService } from "src/app/shared/_services/spinner.service";
import { atLeastOne } from "../../../validators/custom-validator-at-least-once.validator";
import { SearchCountryField, CountryISO } from "ngx-intl-tel-input";
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
import { ConfirmDialogComponent } from "../../../shared/confirm-dialog/confirm-dialog.component";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-add-edit-sp-admin",
  templateUrl: "./add-edit-sp-admin.component.html",
  styleUrls: ["./add-edit-sp-admin.component.scss"],
})
export class AddEditSpAdminComponent implements OnInit, OnDestroy {
  addEditForm: FormGroup;
  submitted: boolean;
  spAdminData: User;
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
  spAdmin: User;
  spId: string;
  addManageAdminSuccessSubs: Subscription;
  addManageAdminFailureSubs: Subscription;
  updateManageAdminSuccessSubs: Subscription;
  updateManageAdminFailureSubs: Subscription;

  constructor(
    private dialogRef: MatDialogRef<AddEditSpAdminComponent>,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store$: Store<ManageAdminStoreState.ManageAdminState>,
    private authService: AuthenticationService,
    private snackbar: SnackbarService,
    private dialog : MatDialog
  ) {}

  ngOnInit() {
    this.spAdminData = this.data.spAdmin;
    console.log(this.spAdminData);
    this.spId = this.data.spId;
    this.createAddEditForm();
    this.doSubscriptionAddEditSPA();
  }

  doSubscriptionAddEditSPA() {
    if (this.spAdminData === undefined) {
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
            } else if (data.errorMessage === 'SPA_ALREADY_EXIST') {
              this.snackbar.openSnackBar("error_message.spa_already_exist", "top", "center", true);
            }else {
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
    this.addEditForm.patchValue({
      phoneNo: {
        number: undefined,
        countryCode: CountryISO.India,
      },
    });
  }

  createAddEditForm() {
    this.addEditForm = this.formBuilder.group(
      {
        firstName: [
          this.spAdminData !== undefined ? this.spAdminData.firstName : "",
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z]{1}[a-zA-Z ]*$"),
            Validators.maxLength(25)
          ],
        ],
        lastName: [
          this.spAdminData !== undefined ? this.spAdminData.lastName : "",
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z]{1}[a-zA-Z ]*$"),
            Validators.maxLength(25)
          ],
        ],
        phoneNo: [
          this.spAdminData !== undefined ? this.spAdminData.phoneNo : "",
          [_validatePhoneNumberInput.bind(this)]
        ],
        email: [
          this.spAdminData !== undefined ? this.spAdminData.email : "",
          [Validators.email]
        ],
      },
      { validator: atLeastOne(Validators.required, ["email", "phoneNo"]) }
    );
  }

  get f() {
    return this.addEditForm.controls;
  }

  saveServiceProviderAdmin() {
    this.submitted = true;
    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched();
      return;
    }

    this.spinnerService.show();
    this.spAdmin = this.addEditForm.value;
    this.spAdmin.serviceProviderId = this.spId;

    if (
      this.addEditForm.get("phoneNo").value !== null &&
      this.addEditForm.get("phoneNo").value !== ""
    ) {
      const parsedValue = parsePhoneNumberFromString(this.addEditForm
          .get("phoneNo")
          .value);
      this.spAdmin.phoneNo = parsedValue.number.toString();
    }

    if (this.spAdminData === undefined) {
      this.spAdmin.isActive = true;
      this.spAdmin.roles = ['SPA'];
      this.spAdmin.createdBy = this.authService.getLoggedUser().email;
      this.spAdmin.createdById = this.authService.getLoggedUser().uId;
      const cDialog = this.dialog.open(ConfirmDialogComponent,{
        maxWidth: "90vw",
        width: "500px",
        backdropClass: "backdropBackground",
        disableClose: true,
        data: {
          body:{
            title: "super_admin.add_service_provider_admin.label_add_administrator",
            text :"super_admin.add_service_provider_admin.label_name_cannot_edited",
            message :"super_admin.add_service_provider_admin.label_confirm_adding",
          }
        }
      });
      cDialog.afterClosed().subscribe((boolean)=>{
        let confirmValue =  boolean;
        if(confirmValue){
          this.store$.dispatch(
            new ManageAdminStoreActions.SaveManageAdminAction(
              this.spAdmin,
              environment.dataApiUrl + 'service-providers/users/spa'
            )
          );
        }
      });
      
    } else {
      this.spAdmin.modifiedBy = this.authService.getLoggedUser().email;
      this.spAdmin.modifiedById = this.authService.getLoggedUser().uId;
      this.spAdmin.id = this.spAdminData.id;
      this.spAdmin.isActive = this.spAdminData.isActive;
      this.store$.dispatch(
        new ManageAdminStoreActions.UpdateManageAdminAction(
          this.spAdmin,
          environment.dataApiUrl + 'service-providers/users/spa'
        )
      );
    }
  }

  ngOnDestroy() {
    this.doUnsubscribeAddEditSPA();
  }

  doUnsubscribeAddEditSPA() {
    if (this.spAdminData === undefined) {
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
    return this.addEditForm.controls[controlName].hasError(errorName);
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
}
