import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AlertSettingsTwoAComponent } from "../alert-settings-two-a/alert-settings-two-a.component";

@Component({
  selector: "app-customise-notifications",
  templateUrl: "./customise-notifications.component.html",
  styleUrls: ["./customise-notifications.component.scss"],
})
export class CustomiseNotificationsComponent {
  @Input() customizedNotificationsArr;
  constructor(private dialog: MatDialog) {}

  openAlertSettings() {
    this.dialog.open(AlertSettingsTwoAComponent, {
      width: "700px",
      height: "500px",
      
      // disableClose: true,
      backdropClass: "backdropBackground",
    });
  }
}
