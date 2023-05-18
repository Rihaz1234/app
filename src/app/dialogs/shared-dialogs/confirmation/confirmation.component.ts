import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"],
})
export class ConfirmationComponent implements OnInit {
  @Output() confirm = new EventEmitter<any>(true);

  constructor(
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onClose(flag) {
    this.dialogRef.close(flag);
  }

  onConfirm() {
    this.confirm.emit();
  }
}
