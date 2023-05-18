import { Component, Inject, OnInit } from "@angular/core";
import { User } from "../../../interfaces/user.interface";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import {
  UserManagementStoreActions,
  UserManagementStoreState,
} from "../../store/user-management/index";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-enable-disable",
  templateUrl: "./enable-disable.component.html",
  styleUrls: ["./enable-disable.component.scss"],
})
export class EnableDisableComponent implements OnInit {
  userData: User;
  mode: string;
  constructor(
    private dialogRef: MatDialogRef<EnableDisableComponent>,
    private store$: Store<UserManagementStoreState.UserManagementState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.userData = this.data.userData;
    this.mode = this.data.mode;
    console.log(this.userData);
  }

  onCancel() {
    if (this.mode === "DISABLE") {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }

  onConfirm() {
    if (this.mode === "DISABLE") {
      const url = environment.dataApiUrl + 'users/' + this.userData.id + '/disable';
      this.store$.dispatch(
        new UserManagementStoreActions.DisableUserAction(url, this.userData.id)
      );
      this.dialogRef.close(true);
    } else {
      const url = environment.dataApiUrl + 'users/'+this.userData.id + '/enable';
      this.store$.dispatch(
        new UserManagementStoreActions.EnableUserAction(url, this.userData.id)
      );
      this.dialogRef.close(false);
    }
  }
}
