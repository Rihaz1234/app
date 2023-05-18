import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {ManageRelaysService} from "../services/manage-relays.service";

@Component({
  selector: "app-add-relay",
  templateUrl: "./add-relay.component.html",
  styleUrls: ["./add-relay.component.scss"],
})
export class AddRelayComponent {
  constructor(
    private dialogRef: MatDialogRef<MatDialogRef<any>>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: ManageRelaysService
  ) {}
  location : string = '';
  submitted = false;
  groupExists = false;
  save() {
    this.submitted = true;
    if (this.isBlank(this.location)  || !this.locationValid(this.location)) {
      return;
    } else {
      this.dialogRef.close({ data: this.location });
    }
  }
  isBlank(str) {
    let input = str.replace(/\s/g, "");
    return (
      !input ||
      0 === input.length ||
      input === " " ||
      input === "null" ||
      input === "undefined"
    );
  }
  locationValid(location) {
    let regex = /^[a-zA-Z0-9]{1}[a-zA-Z0-9-_ ]*$/;
    let valid = regex.test(location);
    let loc = location.replace(/\s/g, "");
    return loc.length > 0 && valid;
  }

  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let key = clipboardData.getData('text');
    let charsOnlyPattern = /^[a-zA-Z0-9-_ ]+$/;
    if (charsOnlyPattern.test(key)) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
  }
}
