import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-alert-settings-two-a",
  templateUrl: "./alert-settings-two-a.component.html",
  styleUrls: ["./alert-settings-two-a.component.scss"],
})
export class AlertSettingsTwoAComponent {
  alertSettingsDataArr = [
    {
      type: "Name",
      value: "Radhika garwal",
    },
    {
      type: "Number",
      value: "+918860528102",
    },
    {
      type: "SMS",
      value: "+918860528102",
    },
    {
      type: "Whatsapp",
      value: "+918860528102",
    },
    {
      type: "Send to default number",
      value: "+918860528102",
    },
  ];
  constructor(private dialogRef: MatDialogRef<AlertSettingsTwoAComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
