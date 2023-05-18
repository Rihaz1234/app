import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { RemoveBiosensorComponent } from "../remove-biosensor/remove-biosensor.component";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"],
})
export class ConfirmationDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog : MatDialog
  ) {}

  submitYes(): void {
    this.dialogRef.close(true);
    if(this.data.stop_biosensor){
      this.dialogRef.afterClosed().subscribe((res)=>{
        this.dialog.open(RemoveBiosensorComponent,{
          maxWidth: "90vw",
          // minWidth: "500px",
          width: "500px",
          backdropClass: "backdropBackground",
          disableClose: true
        });
    })
    }
   
  }
}
