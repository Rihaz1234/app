import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef , MatDialog} from "@angular/material/dialog";
import { SearchCountryField, CountryISO } from "ngx-intl-tel-input";
import { atLeastOne } from "../../../validators/custom-validator-at-least-once.validator";
import { SpinnerService } from "src/app/shared/_services/spinner.service";
import {User, UserErrors} from "../../../interfaces/user.interface";
import {
  UserManagementStoreActions,
  UserManagementStoreSelectors,
  UserManagementStoreState,
} from "../../store/user-management";
import { Store } from "@ngrx/store";
import { AuthenticationService } from "@services/authentication.service";
import { Subscription } from "rxjs";
import { SnackbarService } from "@services/snackbar.service";
import {_validatePhoneNumberInput} from "../../../validators/phone-no.validator";
import parsePhoneNumberFromString from "libphonenumber-js";
import { LSvalidators } from "src/app/shared/lsValidators/lsvalidators";
import { CautionBoxComponent } from "../caution-box/caution-box.component";

@Component({
  selector: "app-add-edit-user-management",
  templateUrl: "./add-edit-user-management.component.html",
  styleUrls: ["./add-edit-user-management.component.scss"],
})
export class AddEditUserManagementComponent implements OnInit, OnDestroy {
  addUserForm: FormGroup;
  submitted: boolean;
  // for country code
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
  user: User;
  userData: User;
  isUpdate: any;
  userRoles = [{name: "PHYSICIAN", value: "SPP"}];
  spId: string;
  saveUserSuccessSub: Subscription;
  saveUserFailureSub: Subscription;
  updateUserSuccessSub: Subscription;
  updateUserFailureSub: Subscription;
  roles = [];

  constructor(
    private dialogRef: MatDialogRef<AddEditUserManagementComponent>,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store$: Store<UserManagementStoreState.UserManagementState>,
    private authService: AuthenticationService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.spId = this.authService.getLoggedUser()?.spId;
    this.userData = this.data.userData;
    this.createUserForm();
    this.doSubscriptionAddEditUser();
    this.roles = this.authService.getRoles();
    if(this.roles.indexOf('SPA') > -1) {
      this.userRoles = [{name: "SPA", value: "SPAC"}, {name: "PHYSICIAN", value: "SPP"}];
    }
  }

  doSubscriptionAddEditUser() {
    if (this.userData === undefined) {
      this.saveUserSuccessSub = this.store$
        .select(UserManagementStoreSelectors.saveUserManagementSuccess)
        .subscribe((data) => {
          if (data) {
            this.dialogRef.close();
          }
        });
      this.saveUserFailureSub = this.store$
        .select(UserManagementStoreSelectors.saveUserManagementFailure)
        .subscribe((data) => {
          if (data) {
            if (data.errorMessage === UserErrors.EMAIL_OR_PHONE_ALREADY_EXIST) {
              this.snackbar.openSnackBar("error_message.err_email_phone_exist", "top", "center", true);
            } else {
              this.snackbar.openSnackBar("errors.err_generic_message", "top", "center", true);
            }
          }
        });
    } else {
      this.updateUserSuccessSub = this.store$
        .select(UserManagementStoreSelectors.updateUserManagementSuccess)
        .subscribe((data) => {
          if (data) {
            this.dialogRef.close();
          }
        });

      this.updateUserFailureSub = this.store$
        .select(UserManagementStoreSelectors.updateUserManagementFailure)
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

  createUserForm() {
    this.addUserForm = this.formBuilder.group(
      {
        user_id:[this.userData !== undefined ? this.userData.id : ""],
        firstName: [
          this.userData !== undefined ? this.userData.firstName : "",
          [
            Validators.required,
            LSvalidators.validatePatientName,
            Validators.maxLength(25)
            //Validators.pattern("^(?!\\s+$)[a-zA-Z0-9_ ]*$"),
          ],
        ],
        lastName: [
          this.userData !== undefined ? this.userData.lastName : "",
          [
            Validators.required,
            LSvalidators.validatePatientName,
            Validators.maxLength(25)
            //Validators.pattern("^(?!\\s+$)[a-zA-Z0-9_ ]*$"),
          ],
        ],
        phoneNo: [
          this.userData !== undefined
            ? this.userData?.phoneNo : "",
          [_validatePhoneNumberInput.bind(this)]
        ],
        email: [
          this.userData !== undefined ? this.userData.email : "",
          [Validators.email]
        ],
        roles: [
          this.userData !== undefined
            ? this.userData.roles[0] : "",
          Validators.required,
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
    return this.addUserForm.controls;
  }

  onClose() {
    this.dialogRef.close();
  }

  resetNumber() {
    this.addUserForm.patchValue({
      phoneNo: {
        number: undefined,
        countryCode: CountryISO.India,
      },
    });
  }

  saveUser() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      this.addUserForm.markAllAsTouched();
      return;
    }

    this.spinnerService.show();
    this.user = this.addUserForm.value;
    if(!Array.isArray(this.addUserForm.value.roles)) {
      this.user.roles = [this.addUserForm.value.roles];
    }
    this.user.serviceProviderId = this.spId;

    if (
      this.addUserForm.get("phoneNo").value !== null &&
      this.addUserForm.get("phoneNo").value !== ""
    ) {
      const parsedValue = parsePhoneNumberFromString(this.addUserForm
          .get("phoneNo")
          .value);
      this.user.phoneNo = parsedValue.number.toString();
    }
    let url = '';
    if(this.user.roles[0] === 'SPP')
      url = 'service-providers/users/physician';
    else
      url = 'service-providers/users/spac';

    if (this.userData === undefined) {
      this.user.isActive = true;
      this.user.createdBy = sessionStorage.getItem("user");
      this.user.createdById = sessionStorage.getItem("user_id");
      console.log(this.user);
      const cDialog = this.dialog.open(CautionBoxComponent,{
        maxWidth: "90vw",
        width: "500px",
        backdropClass: "backdropBackground",
        disableClose: true,
        data:{
          message_1 :"clinical_facility.caution.add_user_caution",
          message_2 :"clinical_facility.caution.add_user_caution_1"
        } 
      });
      cDialog.afterClosed().subscribe((boolean)=>{
        let confirmValue =  boolean;
        if(confirmValue){
          this.store$.dispatch(
            new UserManagementStoreActions.SaveUserManagementAction(this.user, url)
          );
        }
      });
    } else {
      this.user.modifiedBy = sessionStorage.getItem("user");
      this.user.modifiedById = sessionStorage.getItem("user_id");
      this.user.id = this.userData.id;
      this.user.isActive = this.userData.isActive;
      console.log(this.user);
      this.store$.dispatch(
        new UserManagementStoreActions.UpdateUserManagementAction(this.user, url)
      );
    }
  }

  ngOnDestroy() {
    this.doUnsubscriptionAddEditUser();
  }

  doUnsubscriptionAddEditUser() {
    if (this.userData === undefined) {
      if (this.saveUserSuccessSub) this.saveUserSuccessSub.unsubscribe();
      if (this.saveUserFailureSub) this.saveUserFailureSub.unsubscribe();
      this.store$.dispatch(
        new UserManagementStoreActions.AfterSaveUserManagementSuccessAction()
      );
      this.store$.dispatch(
        new UserManagementStoreActions.AfterSaveUserManagementFailureAction()
      );
    } else {
      if (this.updateUserSuccessSub) this.updateUserSuccessSub.unsubscribe();
      if (this.updateUserFailureSub) this.updateUserFailureSub.unsubscribe();
      this.store$.dispatch(
        new UserManagementStoreActions.AfterUpdateUserManagementSuccessAction()
      );
      this.store$.dispatch(
        new UserManagementStoreActions.AfterUpdateUserManagementFailureAction()
      );
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addUserForm.controls[controlName].hasError(errorName);
  }
}
