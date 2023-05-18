import {Component, Inject, InjectionToken, Input, OnInit} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AddgroupComponent } from "../addgroup/addgroup.component";
import { AuthenticationService } from "@services/authentication.service";
import {
  FormArray,
  FormBuilder, FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CountryISO } from "ngx-intl-tel-input";
import { ManageUsersService } from "../services/manage-users.service";
import { atLeastOne } from "../../../validators/custom-validator-at-least-once.validator";
import { ConfirmDialogComponent } from "../../../shared/confirm-dialog/confirm-dialog.component";
import {_validatePhoneNumberInput} from "../../../validators/phone-no.validator";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Group } from "src/app/manage-group/models/manage-groups.model";

@Component({
  selector: "app-edituser",
  templateUrl: "./edituser.component.html",
  styleUrls: ["./edituser.component.scss"],
})

export class EdituserComponent implements OnInit {
  editUserForm = new FormGroup({});
  groups: Group[] = [];
  userGroups: Group[] = [];
  cfId: string;
  usrData: any;
  userId;
  usrDataCopy: any;
  selGroups: Group[];
  error: string;
  editAccess;
  constructor(
    private manageUserService: ManageUsersService,
    private autheticationService: AuthenticationService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MatDialogRef<EdituserComponent>>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  submitted = false;
  CountryISO = CountryISO;
  phoneNum;
  loader = true;
  valuesUpdated = false;
  userRole;
  roles = [
    { name: "Supervisory clinician", value: "SC" },
    { name: "General clinician", value: "GC" },
    { name: "Physician", value: "PHY" },
  ];

  ngOnInit() {
    this.groups = [];
    this.userId = this.data.userData;
    if (this.autheticationService.getRoles().indexOf('CFA') > -1) {
      this.roles.unshift({ name: "Admin", value: "CFAC" });
    }
    this.editAccess = this.data.editAccess;
    this.editUserForm = this.formBuilder.group(
        {
          user_Id : [{value: "", disabled: true}],
          firstName: [{value: "", disabled: true}, [Validators.required]],
          lastName: [{value: "", disabled: true}, [Validators.required]],
          email: [
            {value: "", disabled: !this.editAccess},
            [Validators.email],
          ],
          phoneNo: ["", [_validatePhoneNumberInput.bind(this)]],
          roles: this.formBuilder.array([], Validators.required),
        },
        { validator: atLeastOne(Validators.required, ["email", "phoneNo"]) }
    );
    this.manageUserService.getUser(this.userId).subscribe((response: any) => {
      console.log(response);
      this.usrData = response.data;
      this.loader = false;
      this.phoneNum = this.usrData.phoneNo;
      this.userRole = this.usrData.roles;
      let roles = this.editUserForm?.get('roles') as FormArray;
      for (let i=0; i<this.usrData?.roles?.length; i++) {
        roles.push(new FormControl(this.usrData.roles[i]));
      }
      this.valuesUpdated = false;
      this.manageUserService.getGroups(this.cfId).subscribe((res) => {
        if (res.status === "OK") {
          this.groups = res.data;
          this.usrData.groupIds.forEach((groupId) => {
            if (this.groups.find((group) => group.groupId === groupId)) {
              this.userGroups.push(
                  this.groups.find((group) => group.groupId === groupId)
              );
            }
          });
          console.log(this.groups);
          this.valuesUpdated = false;
        }
      });
    });
    this.cfId = this.autheticationService.getCfId();
    // this.editUserForm.valueChanges
    //   .pipe(debounceTime(200))
    //   .subscribe((value) => {
    //     console.log("values updated");
    //     this.valuesUpdated = true;
    //   });
    // this.valuesUpdated = false;
    setTimeout(()=> {
      if(!this.editAccess) {
        const element = document.getElementById('add-group');
        element.scrollIntoView({behavior: 'smooth'});
      }
    }, 500)
  }
  get f() {
    return this.editUserForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.editUserForm.invalid) {
      this.editUserForm.markAllAsTouched();
      console.log("invalid");
      return;
    } else {
      let groupIds = [];
      if(this.showAssignGroup()) {
        this.userGroups.forEach((group) => {
          groupIds.push(group.groupId);
        });
      }
      let formData = this.editUserForm.value;
      console.log(formData);
      this.usrData.groupIds = groupIds;
      let userRoles = [];
      this.roles.forEach(role => {
        if(formData?.roles.indexOf(role.value) > -1) {
          userRoles.push(role.value)
        }
      })
      this.usrData.roles = userRoles;
      if (!this.isBlank(this.phoneNum)) {
        const parsedValue = parsePhoneNumberFromString(formData.phoneNo);
        this.usrData.phoneNo = parsedValue.number.toString();
        // this.usrData.phoneNo = this.phoneNum.e164Number;
      } else {
        this.usrData.phoneNo = "";
      }
      console.log(this.usrData);
      this.usrData.firstName = this.usrData?.firstName ? this.usrData?.firstName?.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) : '';
      this.usrData.lastName = this.usrData?.lastName ? this.usrData?.lastName?.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))): '';
      if(this.editAccess) {
        this.manageUserService.editUser(this.usrData).subscribe(
            (response) => {
              console.log(response);
              if (response.status === "OK") {
                this.dialogRef.close(true);
              }
            },
            (error) => {
              if(error === 'EMAIL_OR_PHONE_ALREADY_EXIST') {
                this.error = error;
              } else {
                this.error = 'err_generic_message';
              }
              if (!this.isBlank(this.error)) {
                return;
              }
            }
        );
      } else {
        this.manageUserService.editGroups(this.usrData).subscribe(
            (response) => {
              console.log(response);
              if (response.status === "OK") {
                this.dialogRef.close(true);
              }
            },
            (error) => {
              if(error === 'EMAIL_OR_PHONE_ALREADY_EXIST') {
                this.error = error;
              } else {
                this.error = 'err_generic_message';
              }
              if (!this.isBlank(this.error)) {
                return;
              }
            }
        );
      }
      // this.store$.dispatch(new ManageUsersStoreActions.EditUserRequestAction({data: this.usrData}));
      // this.store$.select(ManageUsersSelectors.getUsersError)
      //     .subscribe(data => {
      //       this.error = data;
      //       console.log(this.error);
      //       if (!this.isBlank(this.error)) {
      //         return;
      //       }
      //     });
      // this.store$.select(ManageUsersSelectors.getUsersStatus)
      //     .subscribe(status => {
      //       if (status === 'OK') {
      //         this.dialogRef.close();
      //       }
      //     });
    }
  }

  isBlank(str) {
    return (
      !str ||
      0 === str.length ||
      str === " " ||
      str === "null" ||
      str === "undefined"
    );
  }

  addGroup() {
    console.log("iam in");
    this.valuesUpdated = true;
    const AddGroup = this.dialog.open(AddgroupComponent, {
      width: "90vw",
      maxWidth: "600px",
      height: "auto",
      maxHeight: "90vh",
      data: { data: { selectedGroups: this.userGroups } },
      disableClose: true,
    });
    AddGroup.afterClosed().subscribe((data) => {
      if (data?.data) {
        let newGroups = data?.data;
        newGroups.forEach((groupId) => {
          if (this.groups.find((group) => group.groupId === groupId)) {
            this.userGroups.push(
                this.groups.find((group) => group.groupId === groupId)
            );
            this.userGroups = this.userGroups.filter(group => group.Ancestors.indexOf(groupId) == -1);
          }
        });
      }
    });
  }
  saveChanges(groupId) {
    const SaveChanges = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "645px",
      width: "auto",
      height: "auto",
      maxHeight: "90vw",
      data: {
        body: {
          title: "manage_users_module.savechanges.delete_title",
          text: "manage_users_module.savechanges.text1",
        },
      },
      
      disableClose: true,
    });
    SaveChanges.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        this.valuesUpdated = true;
        this.userGroups = this.userGroups.filter(
          (group) => group.groupId !== groupId
        );
      }
    });
  }
  saveRole(e) {
    const SaveChanges1 = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "645px",
      width: "auto",
      height: "auto",
      maxHeight: "90vw",
      data: {
        body: {
          title: "manage_users_module.savechanges.change_role_title",
          text: "manage_users_module.savechanges.text2",
        },
      },
      disableClose: true,
    });
    SaveChanges1.afterClosed().subscribe((data) => {
      if (!data) {
        let roles = this.editUserForm?.get('roles') as FormArray;
        while (roles.length !== 0) {
          roles.removeAt(0)
        }
        this.editUserForm.patchValue({'role': []});
        for (let i=0; i<this.userRole.length; i++) {
          roles.push(new FormControl(this.usrData.roles[i]));
        }
      } else {
        this.onRoleChange(e);
      }
      console.log(this.editUserForm);
    });
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
  onRoleChange(e) {
    const rolesArray: FormArray = this.editUserForm.get('roles') as FormArray;
    if (e?.checked) {
      rolesArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      rolesArray.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          rolesArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  showAssignGroup(){
    return this.editUserForm.value.roles.indexOf('GC') > -1 || this.editUserForm.value.roles.indexOf('PHY') > -1;
  }
}
