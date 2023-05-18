import {
  Component,
  EventEmitter, Input, OnChanges,
  OnInit,
  Output, SimpleChanges
} from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { CommonService } from "@services/common.service";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import {
  AlertConfigurationModels,
  AlertConfigurationStoreSelectors,
  AlertConfigurationStoreState
} from "../store";
import { AuthenticationService } from "@services/authentication.service";
import { isAllowedRole, uiAccessRoles } from "@utils/helpers";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray
} from "@angular/forms";
import {LSColumn, LSTableConfig} from "../../../life-signals/_models/ls-column.model";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SnackbarService } from "@services/snackbar.service";
import {AlertConfigurationStoreActions} from "../../../dialogs/notifications-component/store";

@Component({
  selector: "app-alert-destination",
  templateUrl: "./alert-destination.component.html",
  styleUrls: ["./alert-destination.component.scss"],
})
export class AlertDestinationComponent implements OnInit, OnChanges {
  @Output() reloadData = new EventEmitter<any>(true);
  @Input() alertDestinationSettings;
  @Input() alertDestinationSettingsCopy;
  @Input() alertType;
  @Input() userData;
  @Output() updateDestination = new EventEmitter<string>();
  alertDestinationSettings$: Observable<AlertConfigurationModels.AlertDestinationConfigData>;
  private subscriptions: Subscription[] = [];
  cfId: string = "";
  alertGroupId: any = null;

  roles: string[];
  destinationAlertAccess: any =
    uiAccessRoles.ALERT_CONFIGURATIONS.ALERT_DESTINATIONS;
  isEditAccess: boolean = false;

  contactLists: any = [];
  activeContactLists: any = [];
  activePhoneNoLists: any = [];
  activeEmailLists: any = [];
  contactLists$: Observable<AlertConfigurationModels.ClinicalFacilityContactListData>;

  alertDestinationForm: FormGroup;
  contactListsSMS: any = [];
  contactListsWhatsApp: any = [];
  contactListsEMAIL: any = [];
  contactListsCaregiverApp: any = [];
  selectedSmsContact;
  selectedEmailContact;
  selectedWhatsappContact;
  selectedCaregiverContact;
  config: LSTableConfig = {
    id: "alert_config_module",
    rowSelectEnabled: false,
    translate: true,
    translateKey: "alert_config_module",
  };
  columns: LSColumn[] = [
    {
      id: "enabled",
      label: "",
      sortable: false,
      style: "width: 100px",
    },
    {
      id: "alert_type",
      sortable: false,
      headerClass: ["align-left"],
      style: "width: 200px",
    },
    {
      id: "alert_dest",
      sortable: false,
      headerClass: ["align-left"],
    },
    {
      id: "alert_select",
      sortable: false,
      headerClass: ["align-left"],
    },
  ];
  constructor(
    private commonService: CommonService,
    private autheticationService: AuthenticationService,
    private snackbar: SnackbarService,
    public dialog: MatDialog,
    private store$: Store<AlertConfigurationStoreState.AlertConfigurationState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.alertDestinationForm = this.formBuilder.group({
      smsContactList: this.formBuilder.array([]),
      whatsAppContactList: this.formBuilder.array([]),
      emailContactList: this.formBuilder.array([]),
      caregiverAppContactList: this.formBuilder.array([]),
    });
    this.setDefaultData();
    this.cfId = this.autheticationService.getCfId();
    this.roles = this.autheticationService.getRoles();

    if (isAllowedRole(this.destinationAlertAccess["EDIT"], this.roles)) {
      this.isEditAccess = true;
    }

    this.contactLists$ = this.store$.select(
      AlertConfigurationStoreSelectors.getClinicalFacilityContacts
    );

    this.subscriptions.push(
      this.commonService.destinationAlertEditHide.subscribe((isHide) => {
        if (isHide) {
          this.alertDestinationSettings = JSON.parse(
            JSON.stringify(this.alertDestinationSettingsCopy)
            
          );
          this.updateDestination.emit(JSON.stringify(this.alertDestinationSettings));
          this.setDefaultContactListData(this.alertDestinationSettings);
        }
      })
    );
    this.store$.select(
        AlertConfigurationStoreSelectors.getDestinationAlertConfigurations
    ).subscribe(data => {
      this.setDefaultContactListData(this.alertDestinationSettings);
    });


    this.contactLists$.subscribe((data:any) => {
      this.contactLists = data.map((x) => {
        return {
          ...x,
          displayName: `${x.firstName} ${x.lastName}`,
        };
      });
      this.activeContactLists = this.contactLists.filter(user => user?.isActive === true);
      this.activePhoneNoLists = this.activeContactLists.filter(user => user?.phoneNo);
      this.activeEmailLists = this.activeContactLists.filter(user => user?.email);
    });
    this.setDefaultContactListData(this.alertDestinationSettings);
  }
  ngOnChanges(changes: SimpleChanges){
    //this.setDefaultContactListData(this.alertDestinationSettings);
  }


  toggle(event: MatSlideToggleChange) {
    this.updated();
  }
  openDialog(type: string, index: number) {
    const SaveChanges = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "95vw",
      maxHeight: "95vh",
      data: {
        body: {
          title: "shared.confirm_text",
          text: "additional_devices.confirm_delete",
        },
      },
      disableClose: true,
    });
    SaveChanges.afterClosed().subscribe((data) => {
      if (data) {
        this.removeContactSelected(type, index);
      }
    });
  }
  getUrserIds(type: any) {
    const ids = [];
    let list = [];
    switch (type) {
      case "sms":
        list = this.contactListsSMS;
        break;
      case "whatsapp":
        list = this.contactListsWhatsApp;
        break;
      case "email":
        list = this.contactListsEMAIL;
        break;
      case "caregiver":
        list = this.contactListsCaregiverApp;
        break;
      default:
        break;
    }
    for (let index = 0; index < list.length; index++) {
      const element: any = list[index];
      ids.push(element.userId);
    }
    return ids;
  }

  get smsContactList(): FormArray {
    return <FormArray>this.alertDestinationForm.get("smsContactList");
  }

  get whatsAppContactList(): FormArray {
    return <FormArray>this.alertDestinationForm.get("whatsAppContactList");
  }

  get emailContactList(): FormArray {
    return <FormArray>this.alertDestinationForm.get("emailContactList");
  }

  get caregiverAppContactList(): FormArray {
    return <FormArray>this.alertDestinationForm.get("caregiverAppContactList");
  }

  addContactDropdownList(type: string, isDefault: boolean = false) {
    switch (type) {
      case "sms":
        const smsContactList = this.alertDestinationForm.controls
            .smsContactList as FormArray;
        if (isDefault) {
          smsContactList.push(
              this.formBuilder.group({
                user: ["", [Validators.required]],
              })
          );
        } else {
          if (this.selectedSmsContact) {
            if (
                !this.contactListsSMS?.find((e: any) => {
                  return (
                      e.userId === this.selectedSmsContact.userId
                  );
                })
            ) {
              this.contactListsSMS.push(
                  this.selectedSmsContact
              );
              smsContactList.push(
                  this.formBuilder.group({
                    user: ["", [Validators.required]],
                  })
              );
              smsContactList.removeAt(0);
              this.selectedSmsContact = '';
              this.updated();
            } else {
              this.snackbar.openCustomSnackBar("User already added", 'bottom', 'center')
            }
          } else {
            this.snackbar.openCustomSnackBar("Please select user", 'bottom', 'center')
          }
        }
        break;
      case "email":
        const emailContactList = this.alertDestinationForm.controls
            .emailContactList as FormArray;
        if (isDefault) {
          emailContactList.push(
              this.formBuilder.group({
                user: ["", [Validators.required]],
              })
          );
        } else {
          if (
              this.selectedEmailContact
          ) {
            if (
                !this.contactListsEMAIL?.find((e: any) => {
                  return (
                      e.userId === this.selectedEmailContact.userId
                  );
                })
            ) {
              this.contactListsEMAIL.push(this.selectedEmailContact);
              emailContactList.push(
                  this.formBuilder.group({
                    user: ["", [Validators.required]],
                  })
              );
              emailContactList.removeAt(0);
              this.selectedEmailContact = '';
              this.updated();
            } else {
              this.snackbar.openCustomSnackBar("User already added", 'bottom', 'center')
            }
          } else {
            this.snackbar.openCustomSnackBar("Please select user", 'bottom', 'center')
          }
        }
        break;
      case "whatsapp":
        const whatsAppContactList = this.alertDestinationForm.controls
            .whatsAppContactList as FormArray;
        if (isDefault) {
          whatsAppContactList.push(
              this.formBuilder.group({
                user: ["", [Validators.required]],
              })
          );
        } else {
          if (this.selectedWhatsappContact) {
            if (
                !this.contactListsWhatsApp?.find((e: any) => {
                  return (
                      e.userId === this.selectedWhatsappContact.userId);
                })
            ) {
              this.contactListsWhatsApp.push(this.selectedWhatsappContact);
              whatsAppContactList.push(
                  this.formBuilder.group({
                    user: ["", [Validators.required]],
                  })
              );
              whatsAppContactList.removeAt(0);
              this.selectedWhatsappContact = '';
              this.updated();
            } else {
              this.snackbar.openCustomSnackBar("User already added", 'bottom', 'center')
            }
          } else {
            this.snackbar.openCustomSnackBar("Please select user", 'bottom', 'center')
          }
        }
        break;
      case "caregiver":
        const caregiverAppContactList = this.alertDestinationForm.controls
            .caregiverAppContactList as FormArray;
        if (isDefault) {
          caregiverAppContactList.push(
              this.formBuilder.group({
                user: ["", [Validators.required]],
              })
          );
        } else {
          if (this.selectedCaregiverContact) {
            if (
                !this.contactListsCaregiverApp?.find((e: any) => {
                  return (
                      e.userId === this.selectedCaregiverContact.userId);
                })
            ) {
              this.contactListsCaregiverApp.push(this.selectedCaregiverContact);
              caregiverAppContactList.push(
                  this.formBuilder.group({
                    user: ["", [Validators.required]],
                  })
              );
              caregiverAppContactList.removeAt(0);
              this.selectedCaregiverContact = '';
              this.updated();
            } else {
              this.snackbar.openCustomSnackBar("User already added", 'bottom', 'center')
            }
          } else {
            this.snackbar.openCustomSnackBar("Please select user", 'bottom', 'center')
          }
        }
        break;
      default:
        break;
    }
  }
  userSelected(type, value) {
    switch(type) {
      case 'sms' : {
        this.selectedSmsContact = value;
        break;
      }
      case 'whatsapp' : {
        this.selectedWhatsappContact = value;
        break;
      }
      case 'email': {
        this.selectedEmailContact = value;
        break;
      }
      case "caregiver": {
        this.selectedCaregiverContact = value;
        break
      }
      default: break;
    }

  }

  setDefaultData() {
    this.addContactDropdownList("sms", true);
    this.addContactDropdownList("email", true);
    this.addContactDropdownList("whatsapp", true);
    this.addContactDropdownList("caregiver", true);
  }

  removeContactSelected(type: string, index: number) {
    switch (type) {
      case "sms":
        this.contactListsSMS.splice(index, 1);
        break;
      case "whatsapp":
        this.contactListsWhatsApp.splice(index, 1);
        break;
      case "email":
        this.contactListsEMAIL.splice(index, 1);
        break;
      case "caregiver":
        this.contactListsCaregiverApp.splice(index, 1);
        break;
      default:
        break;
    }
    this.updated();
  }

  setDefaultContactListData(setting: any) {
    if (setting && Array.isArray(setting.AlertSMS)) {
      this.contactListsSMS = [];
      setting.AlertSMS.forEach((element) => {
        const contact = this.userData?.find((e: any) => {
          return e.userId === element;
        });
        if (contact) {
          this.contactListsSMS.push(contact);
        }
      });
    } else {
      this.contactListsSMS = [];
    }
    if (setting && Array.isArray(setting.AlertWhatsApp)) {
      this.contactListsWhatsApp = [];
      setting.AlertWhatsApp.forEach((element) => {
        const contact = this.userData.find((e: any) => {
          return e.userId === element;
        });
        if (contact) {
          this.contactListsWhatsApp.push(contact);
        }
      });
    } else {
      this.contactListsWhatsApp = [];
    }
    if (setting && Array.isArray(setting.AlertEmail)) {
      this.contactListsEMAIL = [];
      setting.AlertEmail.forEach((element) => {
        const contact = this.userData.find((e: any) => {
          return e.userId === element;
        });
        if (contact) {
          this.contactListsEMAIL.push(contact);
        }
      });
    } else {
      this.contactListsEMAIL = [];
    }
    if (setting && Array.isArray(setting.AlertCaregiverApp)) {
      this.contactListsCaregiverApp = [];
      setting.AlertCaregiverApp.forEach((element) => {
        const contact = this.userData.find((e: any) => {
          return e.userId === element;
        });
        if (contact) {
          this.contactListsCaregiverApp.push(contact);
        }
      });
    } else {
      this.contactListsCaregiverApp = [];
    }
  }
  updated() {
    let destinationSettings = JSON.parse(
        JSON.stringify(this.alertDestinationSettings));
    destinationSettings.AlertCaregiverApp =
        this.getUrserIds("caregiver");
    destinationSettings.AlertEmail =
        this.getUrserIds("email");
    destinationSettings.AlertSMS = this.getUrserIds("sms");
    destinationSettings.AlertWhatsApp =
        this.getUrserIds("whatsapp");
    this.updateDestination.emit(JSON.stringify(destinationSettings));
  }
  reloadContactList(searchString) {
    let url = `clinical-facilities/contacts?size=1000&page=1&searchText=${searchString}`;
    this.store$.dispatch(
        new AlertConfigurationStoreActions.loadClinicalFacilityContactsRequestAction(
            {url}
        )
    );
  }
}
