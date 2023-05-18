import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-caution-box',
  templateUrl: './caution-box.component.html',
  styleUrls: ['./caution-box.component.scss']
})
export class CautionBoxComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CautionBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
   
  }

  ngOnInit(): void {
  }

  submitYes(){
    this.dialogRef.close(true);
  }

  submitNo(){
    this.dialogRef.close(false);
  }


}
