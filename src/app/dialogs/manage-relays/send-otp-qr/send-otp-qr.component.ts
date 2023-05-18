import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ManageRelaysService } from "../../../settings/manage-relays/services/manage-relays.service";
import { CountryISO } from "ngx-intl-tel-input";
import { atLeastOne } from "../../../validators/custom-validator-at-least-once.validator";
import { SnackbarService } from "@services/snackbar.service";

@Component({
  selector: "app-send-otp-qr",
  templateUrl: "./send-otp-qr.component.html",
  styleUrls: ["./send-otp-qr.component.scss"],
})
export class SendOtpQrComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MatDialogRef<any>>,
    private manageRelayService: ManageRelaysService,
    private snackbar: SnackbarService
  ) {}
  sendOtpForm = new FormGroup({});
  submitted = false;
  CountryISO = CountryISO;
  noSelection = false;
  ngOnInit() {
    this.sendOtpForm = this.formBuilder.group(
      {
        email: [
          "",
          [Validators.email],
        ],
        phoneNumber: [""],
        type: this.formBuilder.array([], [Validators.required]),
      },
      { validator: atLeastOne(Validators.required, ["email", "phoneNumber"]) }
    );
    this.sendOtpForm.controls["phoneNumber"].disable();
  }
  get f() {
    return this.sendOtpForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    let formData = this.sendOtpForm.value;
    if (this.isBlank(formData.phoneNumber) && this.isBlank(formData.email)) {
      this.noSelection = true;
      return;
    } else if (this.sendOtpForm.invalid) {
      this.sendOtpForm.markAllAsTouched();
      this.noSelection = false;
      return;
    } else {
      if (!this.isBlank(formData.phoneNumber)) {
        formData.phoneNumber = formData.phoneNumber.e164Number;
      }
      this.noSelection = false;
      console.log(formData);
      this.manageRelayService.sendOtpQr(formData).subscribe((resp) => {
        console.log("api response", resp);
        if (resp.status === "OK") {
          this.snackbar.openCustomSnackBar("manage_relays_module."+resp.message, 'bottom', 'center', true);
        }
      });
    }
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
  isBlank(str) {
    return (
      !str ||
      0 === str.length ||
      str === " " ||
      str === "null" ||
      str === "undefined"
    );
  }
  onCheckboxChange(e) {
    const checkArray: FormArray = this.sendOtpForm.get('type') as FormArray;
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
