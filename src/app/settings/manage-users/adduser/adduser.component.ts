import { AddgroupComponent } from "../addgroup/addgroup.component";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {
  FormArray,
  FormBuilder, FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { atLeastOne } from "../../../validators/custom-validator-at-least-once.validator";
import { AuthenticationService } from "@services/authentication.service";
import { CountryISO } from "ngx-intl-tel-input";
import {
  ManageUsersSelectors,
  ManageUsersStoreActions,
  ManageUsersStoreState,
} from "../store";
import { Store } from "@ngrx/store";
import { ConfirmDialogComponent } from "../../../shared/confirm-dialog/confirm-dialog.component";
import { debounceTime } from "rxjs/operators";
import parsePhoneNumberFromString from "libphonenumber-js";
import { _validatePhoneNumberInput } from "../../../validators/phone-no.validator";
import { Group } from "src/app/manage-group/models/manage-groups.model";
import {ManageUsersService} from "../services/manage-users.service";
@Component({
  selector: "app-adduser",
  templateUrl: "./adduser.component.html",
  styleUrls: ["./adduser.component.scss"],
})
export class AdduserComponent implements OnInit {
  addUserForm: FormGroup;
  matcher = new ErrorStateMatcher();
  groups: Group[] = [];
  selectedRole = [];
  facilityId: string;
  serviceProviderId: string;
  userGroups = [];
  roles = [
    { name: "Supervisory clinician", value: "SC" },
    { name: "General clinician", value: "GC" },
    { name: "Physician", value: "PHY" },
  ];
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MatDialogRef<any>>,
    private autheticationService: AuthenticationService,
    private store$: Store<ManageUsersStoreState.ManageUsersState>,
    private manageUserService: ManageUsersService
  ) { }
  submitted = false;
  CountryISO = CountryISO;
  error: string;
  valuesUpdated = false;
  loaderSubscription;
  loader = false;
  public config = {
    id: "0",
    title: "Are you sure? ",
    text: "manage_users_module.savechanges.text1",
  };
  ngOnInit() {
    this.facilityId = this.autheticationService.getCfId();
    if (this.autheticationService.getRoles().indexOf('CFA') > -1) {
      this.roles.unshift({ name: "Admin", value: "CFAC" });
    }
    this.serviceProviderId = this.autheticationService.getSPId();
    this.userGroups = [];
    this.manageUserService.getGroups(this.facilityId).subscribe((res) => {
      if (res.status === "OK") {
        this.groups = res.data;
      }
    });
    this.addUserForm = this.formBuilder.group(
      {
        // user_Id : [""],
        firstName: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-Z]{1}[a-zA-Z ]*$"), Validators.maxLength(25)],
        ],
        lastName: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-Z]{1}[a-zA-Z ]*$"), Validators.maxLength(25)],
        ],
        email: [
          "",
          [ Validators.email,],
        ],
        phoneNo: ["", [_validatePhoneNumberInput.bind(this)]],
        roles: this.formBuilder.array([], Validators.required),
      },
      { validator: atLeastOne(Validators.required, ["email", "phoneNo"]) }
    );
    // this.addUserForm.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
    //   console.log("values updated");
    //   this.valuesUpdated = true;
    // });
    // setTimeout(() => {
    //   this.valuesUpdated = false;
    // }, 500);
    this.loaderSubscription = this.store$
      .select(ManageUsersSelectors.getLoaderStatus)
      .subscribe((loaded) => {
        if (loaded) {
          this.loader = false;
        }
      });
  }

  addGroup() {
    const addGroup = this.dialog.open(AddgroupComponent, {
      width: "90vw",
      maxWidth: "600px",
      height: "auto",
      maxHeight: "90vh",
      data: { data: { selectedGroups: this.userGroups } },
      disableClose: true,
    });
    addGroup.afterClosed().subscribe((data) => {
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
  get f() {
    return this.addUserForm.controls;
  }
  onSubmit() {
    console.log(this.addUserForm.value);
    console.log(this.addUserForm)
    this.submitted = true;
    if (this.addUserForm.invalid) {
      this.addUserForm.markAllAsTouched();
      return;
    } else {
      let groupIds = [];
      if (this.showAssignGroup()) {
        this.userGroups.forEach((group) => {
          groupIds.push(group.groupId);
        });
      }
      let formData = this.addUserForm.value;
      let userRoles = [];
      this.roles.forEach(role => {
        if(formData?.roles.indexOf(role.value) > -1) {
          userRoles.push(role.value)
        }
      });
      formData.roles = userRoles;
      formData.firstName = formData?.firstName ? formData?.firstName?.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) : '';
      formData.lastName = formData?.lastName ? formData?.lastName?.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) : '';
      if (!this.isBlank(formData.phoneNo)) {
        const parsedValue = parsePhoneNumberFromString(formData.phoneNo);
        formData.phoneNo = parsedValue.number.toString();
        // formData.phoneNo = formData.phoneNo.e164Number;
      }
      console.log(formData);
      let userData = {
        serviceProviderId: this.serviceProviderId,
        facilityId: this.facilityId,
        groupIds: groupIds,
        isActive: true,
      };
      let addUserData = { ...formData, ...userData };
      console.log("addUserData in popup", addUserData);
      // this.userService.addUser(addUserData)
      //     .subscribe(response => {
      //         console.log(response);
      //     });
      this.loader = true;
      this.store$.dispatch(
        new ManageUsersStoreActions.AddUserRequestAction({ data: addUserData })
      );
      this.store$
        .select(ManageUsersSelectors.getUsersError)
        .subscribe((data) => {
          if(data) {
            if (data === 'EMAIL_OR_PHONE_ALREADY_EXIST') {
              this.error = data;
            } else {
              this.error = 'err_generic_message';
            }
            if (!this.isBlank(this.error)) {
              return;
            }
          }
        });
      this.store$
        .select(ManageUsersSelectors.getUsersStatus)
        .subscribe((status) => {
          if (status === "OK") {
            this.dialogRef.close(true);
          }
        });
    }
  }
  remove(groupId) {
    this.userGroups = this.userGroups.filter((group) => group.groupId !== groupId);
  }
  saveChanges(groupId) {
    const SaveChanges = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "645px",
      width: "auto",
      height: "auto",
      maxHeight: "90vw",
      data: {
        body: {
          title: "manage_users_module.savechanges.title",
          text: "manage_users_module.savechanges.text1",
        },
      },
      disableClose: true,
    });
    SaveChanges.afterClosed().subscribe((data) => {
      if (data) {
        this.userGroups = this.userGroups.filter((group) => group.groupId !== groupId);
      }
    });
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
  charsOnly(control: string, event: KeyboardEvent) {
    let charsOnlyPattern = /^[a-zA-Z ]$/;
    let key = event.key;
    if (charsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  numericsOnly(control: string, event: KeyboardEvent) {
    let numericsOnlyPattern = /^[0-9]$/;
    let key = event.key;
    if (numericsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  showAssignGroup() {
    return this.addUserForm.value.roles.indexOf('GC') > -1 || this.addUserForm.value.roles.indexOf('PHY') > -1;
  }
  onRoleChange(e) {
    const rolesArray: FormArray = this.addUserForm.get('roles') as FormArray;
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
}
