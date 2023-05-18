import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SearchCountryField, CountryISO } from "ngx-intl-tel-input";
import csc from "country-state-city";
import { ClinicalFacility } from "../../clinical-facility-management/clinical-facility.interface";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import {
  ClinicalFacilityStoreActions,
  ClinicalFacilityStoreSelectors,
  ClinicalFacilityStoreState,
} from "../../store/clinical-facility-management";
import { Store } from "@ngrx/store";
import { AuthenticationService } from "@services/authentication.service";
import { Subscription } from "rxjs";
import { SnackbarService } from "@services/snackbar.service";
import {_validatePhoneNumberInput} from "../../../validators/phone-no.validator";
import parsePhoneNumberFromString from "libphonenumber-js";
import { CautionBoxComponent } from "../caution-box/caution-box.component";

@Component({
  selector: "app-add-edit-facility",
  templateUrl: "./add-edit-facility.component.html",
  styleUrls: ["./add-edit-facility.component.scss"],
})
export class AddEditFacilityComponent implements OnInit, OnDestroy {
  facilityForm: FormGroup;
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
  countryArray = [];
  statesOfCountry = [];
  selectedCountry: string;
  countryCode: string;
  selectedState: string;
  stateCode: string;
  citiesOfStateAndCountry = [];
  clinicalFacility: ClinicalFacility;
  clinicalFacilityData: ClinicalFacility;
  selectedCountryData = [];
  selectedStateData = [];
  selectedCityData = [];
  spId: string;
  noStatesFound: boolean;
  addCfSuccessSubs: Subscription;
  addCfFailureSubs: Subscription;
  updateCfSuccessSubs: Subscription;
  updateCfFailureSubs: Subscription;
  bedsMin = 1;
  bedsMax = 50000;

  constructor(
    private dialogRef: MatDialogRef<AddEditFacilityComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store$: Store<ClinicalFacilityStoreState.ClinicalFacilityState>,
    private authService: AuthenticationService,
    private snackbar: SnackbarService,
    private dialog : MatDialog
  ) {}

  ngOnInit() {
    this.spId = this.authService.getLoggedUser()?.spId;
    this.clinicalFacilityData = this.data.clinicalFacilityData;
    console.log(this.clinicalFacilityData)
    this.setupCountryStateCity();
    this.createFacilityForm();
    this.doSubscriptionAddEditCF();
  }

  doSubscriptionAddEditCF() {
    if (this.clinicalFacilityData === undefined) {
      this.addCfSuccessSubs = this.store$
        .select(ClinicalFacilityStoreSelectors.saveClinicalFacilitySuccess)
        .subscribe((data) => {
          if (data) {
            this.dialogRef.close();
          }
        });
      this.addCfFailureSubs = this.store$
        .select(ClinicalFacilityStoreSelectors.saveClinicalFacilityFailure)
        .subscribe((data) => {
          if (data) {
            this.snackbar.openSnackBar(data, "top", "center");
          }
        });
    } else {
      this.updateCfSuccessSubs = this.store$
        .select(ClinicalFacilityStoreSelectors.updateClinicalFacilitySuccess)
        .subscribe((data) => {
          if (data) {
            this.dialogRef.close();
          }
        });

      this.updateCfFailureSubs = this.store$
        .select(ClinicalFacilityStoreSelectors.updateClinicalFacilityFailure)
        .subscribe((data) => {
          if (data) {
            this.snackbar.openSnackBar(data, "top", "center");
          }
        });
    }
  }

  setupCountryStateCity() {
    this.countryArray = csc.getAllCountries() || [];
    if (this.clinicalFacilityData !== undefined) {
      try {
        this.selectedCountryData = this.countryArray.filter((data) => {
          return data.name === this.clinicalFacilityData.country;
        });
        this.countryCode = this.selectedCountryData[0]?.isoCode;
        this.statesOfCountry =
          csc.getStatesOfCountry(this.selectedCountryData[0]?.isoCode) || [];
        this.selectedStateData = this.statesOfCountry.filter((data) => {
          return data.name === this.clinicalFacilityData.state;
        });
        this.stateCode = this.selectedStateData[0]?.isoCode;
        this.citiesOfStateAndCountry =
          csc.getCitiesOfState(this.countryCode, this.stateCode) || [];
        this.selectedCityData = this.citiesOfStateAndCountry.filter((data) => {
          return data.name === this.clinicalFacilityData.city;
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // this.countryCode = this.countryArray[0]?.isoCode;
      // this.statesOfCountry = csc.getStatesOfCountry(
      //   this.countryArray[0]?.isoCode
      // );
      // this.stateCode = this.statesOfCountry[0]?.isoCode;
      // this.citiesOfStateAndCountry = csc.getCitiesOfState(
      //   this.countryArray[0]?.isoCode,
      //   this.statesOfCountry[0]?.isoCode
      // );
    }
  }

  createFacilityForm() {
    this.facilityForm = this.formBuilder.group({
      user_id:[this.clinicalFacilityData !== undefined ? this.clinicalFacilityData.id :""],
      name: [
        this.clinicalFacilityData !== undefined
          ? this.clinicalFacilityData.name
          : "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9]{1}[a-zA-Z0-9-_ ]*$"),Validators.maxLength(64)],
      ],
      address: [
        this.clinicalFacilityData !== undefined
          ? this.clinicalFacilityData.address
          : "",
        [Validators.required,Validators.pattern("^(?!\\s+$)[#&()./0-9a-zA-Z\s ,-]+$"),Validators.maxLength(128),Validators.minLength(2)],
      ],
      area: [
        this.clinicalFacilityData !== undefined
          ? this.clinicalFacilityData.area
          : "",
        Validators.pattern("^(?!\\s+$)[a-zA-Z0-9_ ]*$"),
      ],
      country: [
        this.clinicalFacilityData === undefined
          ? ""
          : this.selectedCountryData[0]?.isoCode +
            "|" +
            this.selectedCountryData[0]?.name,
            Validators.required
      ],
      state: [
        this.clinicalFacilityData === undefined
          ? ""
          : this.selectedStateData[0]?.name || this.clinicalFacilityData?.state,
        [Validators.pattern("^(?!\\s+$)[a-zA-ZÀ-ȕÀ-ÖØ-öø-ÿ-&' ]*$")]
      ],
      city: [
        this.clinicalFacilityData === undefined
          ? ""
          : this.selectedCityData[0]?.name || this.clinicalFacilityData.city,
        [Validators.pattern("^(?!\\s+$)[a-zA-ZÀ-ȕÀ-ÖØ-öø-ÿ-&' ]*$")],
      ],
      groupHospital: [this.clinicalFacilityData === undefined
        ? false : this.clinicalFacilityData.groupHospital || false],
      numberOfBeds: [this.clinicalFacilityData === undefined
        ? null : this.clinicalFacilityData?.numberOfBeds, [Validators.required]],
      firstName: [
        this.clinicalFacilityData !== undefined
          ? this.clinicalFacilityData.firstName
          : "",
        [Validators.required, Validators.pattern("^[a-zA-Z]{1}[a-zA-Z ]*$"), Validators.maxLength(25)],
      ],
      lastName: [
        this.clinicalFacilityData !== undefined
          ? this.clinicalFacilityData.lastName
          : "",
        [Validators.required, Validators.pattern("^[a-zA-Z]{1}[a-zA-Z ]*$"), Validators.maxLength(25)],
      ],
      email: [
        this.clinicalFacilityData !== undefined
          ? this.clinicalFacilityData.email
          : "",
          [ Validators.email]
      ],
      phoneNo: [
        this.clinicalFacilityData !== undefined
          ? this.clinicalFacilityData.phoneNo
          : // ? this.clinicalFacilityData.phoneNo.substring(3)
            // : ""
            "", [_validatePhoneNumberInput.bind(this)],
      ],
      dataStorageMode: [
        this.clinicalFacilityData !== undefined
          ? this.clinicalFacilityData.dataStorageMode
          : "archived",
      ],
      multiFactorAuthEn: [
        this.clinicalFacilityData !== undefined
          ? this.clinicalFacilityData.multiFactorAuthEn
          : false,
      ],
      zipCode: [
        this.clinicalFacilityData !== undefined
          ? this.clinicalFacilityData.zipCode
          : "",
        [Validators.pattern("^(?!\\s+$)[a-zA-Z0-9]*$"), Validators.minLength(3), Validators.maxLength(12)],
      ],
    },
    //{ validator: atLeastOne(Validators.required, ["email", "phoneNo"]) }
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
    return this.facilityForm.controls;
  }

  onClose() {
    this.dialogRef.close();
  }

  resetNumber() {
    this.facilityForm.patchValue({
      contact: {
        number: undefined,
        countryCode: CountryISO.India,
      },
    });
  }

  saveFacility() {
    this.submitted = true;
    console.log(this.facilityForm);
    if (this.facilityForm.invalid) {
      this.facilityForm.markAllAsTouched();
      return;
    }
    this.clinicalFacility = this.facilityForm.value;
    console.log(this.clinicalFacility)
    if(this.clinicalFacility.country.includes('|')){
      this.clinicalFacility.country = this.clinicalFacility.country.split("|")[1];
    }
    if(this.clinicalFacility.state.includes('|')){
      this.clinicalFacility.state = this.clinicalFacility.state.split("|")[1];
    }
    this.clinicalFacility.serviceproviderId = this.spId;
    if(this.selectedCountryData[0]?.timezones?.length) {
      this.clinicalFacility.timezone = this.selectedCountryData[0]?.timezones[0]?.zoneName;
    }
    if (
      this.facilityForm.get("phoneNo").value !== null &&
      this.facilityForm.get("phoneNo").value !== ""
    ) {
      const parsedValue = parsePhoneNumberFromString(this.facilityForm
          .get("phoneNo")
          .value);
      this.clinicalFacility.phoneNo = parsedValue.number.toString();
    }

    if (this.clinicalFacilityData === undefined) {
      this.clinicalFacility.isActive = true;
      this.clinicalFacility.createdBy = sessionStorage.getItem("user");
      this.clinicalFacility.createdById = sessionStorage.getItem("user_id");
      const cDialog = this.dialog.open(CautionBoxComponent,{
        maxWidth: "90vw",
        width: "500px",
        backdropClass: "backdropBackground",
        disableClose: true,
        data :{
          message_1 : "clinical_facility.caution.add_facility_caution_1",
          message_2 : "clinical_facility.caution.add_facility_caution_2"
        } 
      });
      cDialog.afterClosed().subscribe((boolean)=>{
        let confirmValue =  boolean;
        if(confirmValue){
          this.store$.dispatch(
            new ClinicalFacilityStoreActions.SaveClinicalFacilityAction(
              this.clinicalFacility
            )
          );
        }
      });
    } else {
      console.log("editing");
      this.clinicalFacility.isActive = this.clinicalFacilityData.isActive;
      this.clinicalFacility.modifiedBy = sessionStorage.getItem("user");
      this.clinicalFacility.modifiedById = sessionStorage.getItem("user_id");
      this.clinicalFacility.id = this.clinicalFacilityData.id;
      this.store$.dispatch(
        new ClinicalFacilityStoreActions.UpdateClinicalFacilityAction(
          this.clinicalFacility
        )
      );
    }
  }

  getStatesByCountry(event) {
    try {
      const domValue = event.value;
      this.countryCode = domValue.split("|")[0];
      this.selectedCountry = domValue.split("|")[1];
      this.selectedCountryData = this.countryArray.filter((data) => {
        return data.name === this.selectedCountry;
      });
      this.statesOfCountry = csc.getStatesOfCountry(this.countryCode);
      if (this.statesOfCountry.length > 0) {
        // this.facilityForm
        //   .get("state")
        //   .patchValue(
        //     this.statesOfCountry[0].isoCode + "|" + this.statesOfCountry[0].name
        //   );
        // this.citiesOfStateAndCountry = csc.getCitiesOfState(
        //   this.countryCode.trim(),
        //   this.statesOfCountry[0].isoCode
        // );
        // this.facilityForm
        //   .get("city")
        //   .patchValue(this.citiesOfStateAndCountry[0].name);
      } else {
        this.noStatesFound = true;
        this.citiesOfStateAndCountry = [];
        this.facilityForm.get("state").patchValue("");
        this.facilityForm.get("city").patchValue("");
      }
      console.log(this.facilityForm)
    } catch (error) {
      console.log(error);
    }
  }

  getCityByStateAndCountry(event) {
    this.selectedState = event.option.value;
    this.stateCode = this.statesOfCountry.find(state => state.name === this.selectedState)?.isoCode || '';
    this.citiesOfStateAndCountry = csc.getCitiesOfState(
      this.countryCode,
      this.stateCode
    );
    
    if(this.citiesOfStateAndCountry.length > 0 ){
      // this.facilityForm
      // .get("city")
      // .patchValue(this.citiesOfStateAndCountry[0].name);
       
    }else{
      this.facilityForm
      .get("city")
      .patchValue("");
       
    }
    console.log(this.facilityForm)
  }

  getCountryValues(country) {
    return country.isoCode + "|" + country.name;
  }

  getStateValues(state) {
    return state.isoCode + "|" + state.name;
  }

  ngOnDestroy() {
    this.doUnsubscribeAddEditCF();
  }

  doUnsubscribeAddEditCF() {
    if (this.clinicalFacilityData === undefined) {
      if (this.addCfSuccessSubs) this.addCfSuccessSubs.unsubscribe();
      if (this.addCfFailureSubs) this.addCfFailureSubs.unsubscribe();
      this.store$.dispatch(
        new ClinicalFacilityStoreActions.AfterSaveClinicalFacilitySuccess()
      );
      this.store$.dispatch(
        new ClinicalFacilityStoreActions.AfterSaveClinicalFacilityFailure()
      );
    } else {
      if (this.updateCfSuccessSubs) this.updateCfSuccessSubs.unsubscribe();
      if (this.updateCfFailureSubs) this.updateCfFailureSubs.unsubscribe();
      this.store$.dispatch(
        new ClinicalFacilityStoreActions.AfterUpdateClinicalFacilitySuccess()
      );
      this.store$.dispatch(
        new ClinicalFacilityStoreActions.AfterUpdateClinicalFacilityFailure()
      );
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.facilityForm.controls[controlName].hasError(errorName);
  }
  filteredResults(items, key, searchTxt) {
    if(!items || !items.length) return items;
    if(!searchTxt || !searchTxt.length) return items;
    return items.filter(item => {
      return item[key].toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });
  }
  stateChange(value) {
    let selectedState = this.statesOfCountry.find(state => state.name.toUpperCase() == value.toUpperCase());
    if(selectedState) {
      this.citiesOfStateAndCountry = csc.getCitiesOfState(
          this.countryCode,
          selectedState?.isoCode
      );
    } else {
      this.citiesOfStateAndCountry = [];
    }
  }
}
