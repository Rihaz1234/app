import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {LSColumn, LSTableConfig} from "../../../life-signals/_models/ls-column.model";

@Component({
  selector: 'app-rename-roles',
  templateUrl: './rename-roles.component.html',
  styleUrls: ['./rename-roles.component.scss']
})
export class RenameRolesComponent implements OnInit {
  valuesUpdated = false;
  editCurrent = [false];
  constructor(private dialogRef: MatDialogRef<MatDialogRef<RenameRolesComponent>>,
              private dialog: MatDialog) { }
  rolesdata = [
    {
      role: "CFA",
      default: "Admin",
      current: "Administrator"
    },
    {
      role: "SC",
      default: "Supervisory Nurse",
      current: "Staff Nurse"
    },
    {
      role: "GC",
      default: "General Nurse",
      current: "Nurse"
    },
    {
      role: "PHY",
      default: "Physician",
      current: "Doctor"
    }

  ]
  config: LSTableConfig = {
    id: "manage_users_module.rename_roles",
    rowSelectEnabled: false,
    translate: true,
    translateKey: "manage_users_module.rename_roles",
  };
  columns: LSColumn[] = [
    {
      id: "default",
      sortable: false,
      headerClass: ["align-left"],
      style: "min-width: 450px",
    },
    {
      id: "current",
      sortable: false,
      headerClass: ["align-left"],
    }
  ];
  ngOnInit(): void {
    let roles = [];
    this.rolesdata.forEach((role, i) => {
      roles.push({
        ...role,
        index: i
      })
    });
    this.rolesdata = roles;
  }
  close() {
    if (this.valuesUpdated) {
      const confirm = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "90vw",
        width: "auto",
        height: "auto",
        maxHeight: "80vh",
        data: {
          body: {
            title: "manage_users_module.cancel_title",
            text: "manage_users_module.cancel_text",
          },
        },
        disableClose: true,
      });
      confirm.afterClosed().subscribe((data) => {
        if (data) {
          this.dialogRef.close();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }
  onSubmit(){
    this.dialogRef.close();
  }
  editRole(index, editStatus) {
    this.editCurrent[index] = editStatus;
  }

}
