import {Component, Inject, OnInit} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertConfigurationsService} from "../notifications-component/services/alert-configuration.service";
import {SnackbarService} from "@services/snackbar.service";
import { ForwardNoteComponent } from "../forward-note/forward-note.component";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: "app-forward-alert",
  templateUrl: "./forward-alert.component.html",
  styleUrls: ["./forward-alert.component.scss"],
})

export class forwardAlertComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<MatDialogRef<any>>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private alertService: AlertConfigurationsService,
    private snackbar: SnackbarService,
  ) { }
  forwardAlertForm = new FormGroup({});
  usersList;
  emr;
  submitted = false;
    roles = [
        { name: "Supervisory clinician", value: "SC" },
        { name: "General clinician", value: "GC" },
        { name: "Physician", value: "PHY" },
    ];
    alertType = [];

  ngOnInit() {
    this.emr = sessionStorage.getItem('emr');
    this.forwardAlertForm = this.formBuilder.group(
        {
          role: ["", [Validators.required]],
          user: ["", [Validators.required]],
          type: this.formBuilder.array([], [Validators.required]),
        }
    );
    this.initAlertType();
  }
  initAlertType() {
      this.alertType = [
          {name: "SMS", value: "sms", validation: "phoneNo"},
          {name: "Whatsapp", value: "whatsapp", validation: "phoneNo"},
          {name: "Email", value: "email", validation: "email"}
        ];
        //   {name: "Caregiver", value: "caregiver", validation: null}
      if (this.emr !== "") {
          this.alertType.push({ name: "EMR", value: "emr", validation: null })
      }
  }
  fetchUsers(e) {
      let role = e.value;
      let url = `clinical-facilities/contacts?size=1000&page=1&role=${role}`;
      this.forwardAlertForm.patchValue({user: null});
        this.alertService.getClinicalFacilityContacts(url)
            .subscribe(res => {
                this.usersList = res.data.map((x:any) => {
                    return {
                        ...x,
                        displayName: `${x.firstName} ${x.lastName}`,
                    };
                });
            });
      this.userChange();
  }
    async onTypeChange(e: MatCheckboxChange) {
        const typeArray: FormArray = this.forwardAlertForm.get('type') as FormArray;
        if (e.checked && e.source.value === 'emr') {
            const noteform = this.dialog.open(ForwardNoteComponent, {
                width: "580px",
                maxWidth: "96vw",
                //height:"500px",
                backdropClass: "backdropBackground",
                disableClose: true,
            });
            let data = await noteform.afterClosed().toPromise();
            if (data) {
                let payload = {
                    patientId: this.data.patientId,
                    alertId: this.data.id,
                    sms: false,
                    whatsapp: false,
                    mail: false,
                    caregiver: false,
                    emr: true,
                    userId: '',
                    alertKey: this.data.alertKey,
                    type: this.data.type,
                    ...data
                }
                this.alertService.forwardAlert(payload)
                    .subscribe(res => {
                        if (res.status === 'OK') {
                            this.snackbar.openSnackBar("shared.dialog.forward-alert-success", 'bottom', 'center', true);
                            this.dialogRef.close();
                        } else {
                            this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
                            this.dialogRef.close();
                        }
                    }, (_ => {
                        this.dialogRef.close();
                        this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
                    }));
            } else {
                this.alertType.pop();
                this.alertType.push({ name: "EMR", value: "emr", validation: null });
                return;
            }
        }
        if (e?.checked) {
            typeArray.push(new FormControl(e.source.value));
        } else {
            let i: number = 0;
            typeArray.controls.forEach((item: FormControl) => {
                if (item.value == e.source.value) {
                    typeArray.removeAt(i);
                    return;
                }
                i++;
            });
        }
    }
    onSubmit() {
        this.submitted = true;
        if (this.forwardAlertForm.invalid) {
            this.forwardAlertForm.markAllAsTouched();
            return;
        } else {
            let payload = {
                patientId: this.data.patientId,
                alertId: this.data.id,
                sms: (this.forwardAlertForm.value.type.indexOf('sms') > -1),
                whatsapp: (this.forwardAlertForm.value.type.indexOf('whatsapp') > -1),
                mail: (this.forwardAlertForm.value.type.indexOf('email') > -1),
                caregiver: (this.forwardAlertForm.value.type.indexOf('caregiver') > -1),
                emr: (this.forwardAlertForm.value.type.indexOf('emr') > -1),
                userId: this.forwardAlertForm.value.user.userId,
                alertKey: this.data.alertKey,
                type: this.data.type,
            }
            this.alertService.forwardAlert(payload)
                .subscribe(res => {
                    if (res.status === 'OK') {
                        this.snackbar.openSnackBar("shared.dialog.forward-alert-success", 'bottom', 'center', true);
                        this.dialogRef.close();
                    } else {
                        this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
                    }
                }, (error => {
                    this.snackbar.openSnackBar("errors.err_generic_message", 'bottom', 'center', true);
                }));
        }
    }
    userChange() {
        this.alertType = [];
        this.initAlertType();
        const typeArray: FormArray = this.forwardAlertForm.get('type') as FormArray;
        while (typeArray.length !== 0) {
            typeArray.removeAt(0)
        }
    }

}
