import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from "../../../interfaces/user.interface";
import { Store } from "@ngrx/store";
import {
  ManageAdminStoreActions,
  ManageAdminStoreState,
} from "../../store/manage-admin";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-inactive-active",
  templateUrl: "./inactive-active.component.html",
  styleUrls: ["./inactive-active.component.scss"],
})
export class InactiveActiveComponent implements OnInit {
  userData: User;
  mode: string;
  constructor(
    private dialogRef: MatDialogRef<InactiveActiveComponent>,
    private store$: Store<ManageAdminStoreState.ManageAdminState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.userData = this.data.userData;
    this.mode = this.data.mode;
    console.log(this.userData);
  }

  onCancel() {
    if (this.mode === "INACTIVE") {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }

  onConfirm() {
    if (this.mode === "INACTIVE") {
      const url = environment.dataApiUrl + 'users/' + this.userData.id + '/disable';
      this.store$.dispatch(
        new ManageAdminStoreActions.InactiveManageAdminAction(
          url,
          this.userData.id
        )
      );
      this.dialogRef.close(false);
    } else {
      const url = environment.dataApiUrl + 'users/' + this.userData.id + '/enable';
      this.store$.dispatch(
        new ManageAdminStoreActions.ActiveManageAdminAction(
          url,
          this.userData.id
        )
      );
      this.dialogRef.close(true);
    }
  }
}
