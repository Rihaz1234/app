import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ServiceProvider } from "../../manage-service-provider/service-provider.interface";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { SearchCountryField, CountryISO } from "ngx-intl-tel-input";
import {
  ManageServiceProvideStoreActions,
  ManageServiceProvideStoreSelectors,
  ManageServiceProvideStoreState,
} from "../../store/manage-service-provider";
import { Store } from "@ngrx/store";
import { AuthenticationService } from "@services/authentication.service";
import csc from "country-state-city";
import { Subscription } from "rxjs";
import { SnackbarService } from "@services/snackbar.service";
import {_validatePhoneNumberInput} from "../../../validators/phone-no.validator";
import parsePhoneNumberFromString from "libphonenumber-js";
import { ConfirmDialogComponent } from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-add-edit-service-provider",
  templateUrl: "./add-edit-service-provider.component.html",
  styleUrls: ["./add-edit-service-provider.component.scss"],
})
export class AddEditServiceProviderComponent implements OnInit, OnDestroy {
  addServiceProviderForm: FormGroup;
  submitted: boolean;
  // for country code
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries = ["in", "us", "za"];
  validCountry = true;
  selectedCountry: string;
  serviceProvider: ServiceProvider;
  serviceProviderData: ServiceProvider;
  countryCode = [];
  addSpSuccessSubs: Subscription;
  addSpFailureSubs: Subscription;
  updateSpSuccessSubs: Subscription;
  updateSpFailureSubs: Subscription;

  constructor(
      private dialogRef: MatDialogRef<AddEditServiceProviderComponent>,
      private formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private store$: Store<ManageServiceProvideStoreState.ServiceProviderState>,
      private authService: AuthenticationService,
      private snackbar: SnackbarService,
      private dialog : MatDialog
  ) {}

  ngOnInit() {
    this.serviceProviderData = this.data.spData;
    this.createAddServiceProviderForm();
    this.countryCode = csc.getAllCountries() || [];
    this.doSubscriptionAddEditSP();
  }

  doSubscriptionAddEditSP() {
    if (this.serviceProviderData === undefined) {
      this.addSpSuccessSubs = this.store$
          .select(ManageServiceProvideStoreSelectors.addServiceProviderSuccess)
          .subscribe((data) => {
            if (data) {
              this.dialogRef.close();
            }
          });
      this.addSpFailureSubs = this.store$
          .select(ManageServiceProvideStoreSelectors.addServiceProviderFailure)
          .subscribe((data) => {
            if (data) {
              this.snackbar.openSnackBar(data.errorMessage, "top", "center");
            }
          });
    } else {
      this.updateSpSuccessSubs = this.store$
          .select(ManageServiceProvideStoreSelectors.updateServiceProviderSuccess)
          .subscribe((data) => {
            if (data) {
              this.dialogRef.close();
            }
          });

      this.updateSpFailureSubs = this.store$
          .select(ManageServiceProvideStoreSelectors.updateServiceProviderFailure)
          .subscribe((data) => {
            if (data) {
              this.snackbar.openSnackBar(data.errorMessage, "top", "center");
            }
          });
    }
  }

  createAddServiceProviderForm() {
    this.addServiceProviderForm = this.formBuilder.group(
        {
          user_id:[
            this.serviceProviderData !== undefined ? this.serviceProviderData.id : "",
          ],
          companyName: [
            this.serviceProviderData !== undefined
                ? this.serviceProviderData.companyName
                : "",
            [
              Validators.required,
              Validators.pattern("^[a-zA-Z0-9]{1}[a-zA-Z0-9-_ ]*$"),
              Validators.maxLength(128),
              Validators.minLength(2)
            ],
          ],
          addressLine1: [
            this.serviceProviderData !== undefined
                ? this.serviceProviderData.addressLine1
                : "",
            [Validators.pattern("^(?!\\s+$)[#&()./0-9a-zA-Z\s ,-]+$"),Validators.maxLength(128),Validators.minLength(2)],
          ],
          addressLine2: [
            this.serviceProviderData !== undefined
                ? this.serviceProviderData.addressLine2
                : "",
            [Validators.pattern("^(?!\\s+$)[#&()./0-9a-zA-Z\s ,-]+$"),Validators.maxLength(128),Validators.minLength(2)],
          ],
          firstName: [
            this.serviceProviderData !== undefined
                ? this.serviceProviderData.firstName
                : "",
            [
              Validators.required,
              Validators.pattern("^[a-zA-Z]{1}[a-zA-Z ]*$"),
              Validators.maxLength(25)
            ],
          ],
          lastName: [
            this.serviceProviderData !== undefined
                ? this.serviceProviderData.lastName
                : "",
            [
              Validators.required,
              Validators.pattern("^[a-zA-Z]{1}[a-zA-Z ]*$"),
              Validators.maxLength(25)
            ],
          ],
          phoneNo: [
            this.serviceProviderData !== undefined
                ? this.serviceProviderData.phoneNo
                : "",
            [_validatePhoneNumberInput.bind(this)]
          ],
          email: [
            this.serviceProviderData !== undefined
                ? this.serviceProviderData.email
                : "",
            [ Validators.email],
          ],
        },
          /*{ validator: atLeastOne(Validators.required, ["email", "phoneNo"]) }*/
    );
  
  }

  get f() {
    return this.addServiceProviderForm.controls;
  }

  onClose() {
    this.dialogRef.close();
  }

  resetNumber() {
    this.addServiceProviderForm.patchValue({
      phoneNo: {
        number: undefined,
        countryCode: CountryISO.India,
      },
    });
  }

  saveServiceProvider() {
    this.submitted = true;
    if (this.addServiceProviderForm.invalid) {
      this.addServiceProviderForm.markAllAsTouched();
      return;
    }
    this.serviceProvider = this.addServiceProviderForm.value;
    if (
        this.addServiceProviderForm.get("phoneNo").value !== null &&
        this.addServiceProviderForm.get("phoneNo").value !== ""
    ) {
      const parsedValue = parsePhoneNumberFromString(this.addServiceProviderForm
          .get("phoneNo")
          .value);
      this.serviceProvider.phoneNo = parsedValue.number.toString();
    }

    if (this.serviceProviderData === undefined) {
      this.serviceProvider.isActive = true;
      this.serviceProvider.createdBy = this.authService.getLoggedUser().email;
      this.serviceProvider.createdById = this.authService.getLoggedUser().uId;
      const cDialog = this.dialog.open(ConfirmDialogComponent,{
        maxWidth: "90vw",
        width: "500px",
        backdropClass: "backdropBackground",
        disableClose: true,
        data: {
          body:{
            title: "super_admin.add_service_provider.label_caution",
            text :"super_admin.add_service_provider.label_confirm_spa_1",
            message : "super_admin.add_service_provider.label_confirm_spa_2"
          }
        }
      });
      cDialog.afterClosed().subscribe((confirm)=>{
        if(confirm){
          this.store$.dispatch(
              new ManageServiceProvideStoreActions.SaveServiceProviderAction(
                  this.serviceProvider
              )
          );
        }
      })

    } else {
      this.serviceProvider.modifiedBy = this.authService.getLoggedUser().email;
      this.serviceProvider.modifiedById = this.authService.getLoggedUser().uId;
      this.serviceProvider.id = this.serviceProviderData.id;
      this.store$.dispatch(
          new ManageServiceProvideStoreActions.UpdateServiceProviderAction(
              this.serviceProvider
          )
      );
    }
  }

  ngOnDestroy() {
    this.doUnsubscribeAddEditSP();
  }

  doUnsubscribeAddEditSP() {
    if (this.serviceProviderData === undefined) {
      if (this.addSpSuccessSubs) this.addSpSuccessSubs.unsubscribe();
      if (this.addSpFailureSubs) this.addSpFailureSubs.unsubscribe();
      this.store$.dispatch(
          new ManageServiceProvideStoreActions.AfterSaveServiceProviderSuccess()
      );
      this.store$.dispatch(
          new ManageServiceProvideStoreActions.AfterSaveServiceProviderFailure()
      );
    } else {
      if (this.updateSpSuccessSubs) this.updateSpSuccessSubs.unsubscribe();
      if (this.updateSpFailureSubs) this.updateSpFailureSubs.unsubscribe();
      this.store$.dispatch(
          new ManageServiceProvideStoreActions.AfterUpdateServiceProviderSuccess()
      );
      this.store$.dispatch(
          new ManageServiceProvideStoreActions.AfterUpdateServiceProviderFailure()
      );
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addServiceProviderForm.controls[controlName].hasError(errorName);
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
