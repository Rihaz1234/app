import { Component, forwardRef, HostListener, Input, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { noop } from "lodash";

@Component({
  selector: "app-tel-input",
  templateUrl: "./tel-input.component.html",
  styleUrls: ["./tel-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TelInputComponent),
      multi: true,
    },
  ],
})
export class TelInputComponent implements OnInit, ControlValueAccessor {
  /** Value we will call whenever our form is touched */
  private onTouchedCallback: () => noop;

  /** Function we will call whenever the value changes */
  private onChangeCallback: (val: any) => void = noop;
  isDisabled: boolean;
  preferredCountries = ["in", "us", "za"];

  public form = this.formBuilder.group({
    value: [],
  });

  constructor(private formBuilder: FormBuilder) {}

  @HostListener("blur") onBlur() {
    this.onTouchedCallback();
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((formValue) => {
      this.onChangeCallback(formValue.value);
    });
  }

  writeValue(value: any): void {
    this.form.get("value").setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  change() {
    const value = this.form.get("value").value;
    this.form.get("value").setValue(value);
  }
}
