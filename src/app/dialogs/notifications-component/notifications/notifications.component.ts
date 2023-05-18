import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit{
  selectedTab = "notificationsList";
  patientData;
  openEventTab : boolean = true;
  constructor(private dialogRef: MatDialogRef<NotificationsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
    this.patientData = this.data.patientData;
    this.openEventTab = this.data.add_event;
    this.selectedTab = this.data?.selectedTab;
  }

  closeDialog() {
    this.dialogRef.close();
  }
  selectTab(value) {
    this.selectedTab = value;
  }
}
