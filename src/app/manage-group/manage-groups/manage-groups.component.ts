import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "@services/authentication.service";
import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {ManageGroupsManagerService} from "../managers/manage-groups-manager.service";
import {Group, groupNamePattern, restrictedGroupNames} from "../models/manage-groups.model";
import {ManageGroupState} from "../store/manage-groups.reducer";
import {SnackbarService} from "@services/snackbar.service";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: "app-manage-groups",
  templateUrl: "./manage-groups.component.html",
  styleUrls: ["./manage-groups.component.scss"],
})
export class ManageGroupsComponent implements OnInit, OnDestroy {
  isCreationAllowed: boolean = false;
  loading: boolean = true;
  keepOpen: string;
  tempName = null;

  manageGroups$: Observable<ManageGroupState>;
  manageGroupSubscription: Subscription;
  loaderSubscription: Subscription;
  cGroups: Group[] = [];
  pGroups: Group[] = [];

  constructor(
    private router: Router,
    private manager: ManageGroupsManagerService,
    private authSevice: AuthenticationService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) { }

  isAuthorisedUser() {
    if (this.authSevice.getRoles().indexOf('CFA') > -1
        || this.authSevice.getRoles().indexOf('CFAC') > -1 ) {
      this.isCreationAllowed = true;
    }
  }

  ngOnInit(): void {
    this.isAuthorisedUser();
    this.getGroups();
  }

  ngOnDestroy(): void {
    this.manageGroupSubscription?.unsubscribe();
    this.loaderSubscription?.unsubscribe();
  }

  toggleAddPgroup(parentId: string) {
    if (!this.pGroups.some(g => (!g.groupId && (g.parent === parentId)))) {
      if (parentId !== 'ROOT') {
        this.pGroups.find(g => g.groupId === parentId).expanded = true;
        this.pGroups.find(g => g.groupId === parentId).hasChildren = true;
      }
      this.pGroups = [
        {
          name: "",
          parent: parentId,
          type: "PHYSICAL",
          isShow: true
        },
        ...this.pGroups
      ]
    }
  }

  onUpdateGroups(groups) {
    this.pGroups = [...groups];
  }

  toggleAddCgroup(parentId: string) {
    this.cGroups = [
      {
        name: "",
        parent: parentId,
        type: "CLINICAL",
        isShow: true
      },
      ...this.cGroups
    ]
  }

  savePGroup(obj, parent) {
    obj.parent = parent;
    const ob: Group = {
      name: this.capitalizeText(obj.name),
      parent: obj.parent,
      type: "PHYSICAL",
      // facilityId: this.pGroups[this.pGroups.length - 1].facilityId
    }
    if (obj.groupId) {
      ob.groupId = obj.groupId;
      this.manager.updateGroup(ob).subscribe((r) => {
        if (r.error) {
          if (r.error === 'DUPLICATE_GROUP_NAME') {
            this.snackbar.openCustomSnackBar('errors.DUPLICATE_GROUP_NAME', 'bottom', 'center', true);
          } else {
            this.snackbar.openCustomSnackBar('errors.err_generic_message', 'bottom', 'center', true);
          }
        }
      });
    } else {
      this.manager.saveGroup(ob).subscribe((r) => {
        if (r.error) {
          if (r.error === 'DUPLICATE_GROUP_NAME') {
            this.snackbar.openCustomSnackBar('errors.DUPLICATE_GROUP_NAME', 'bottom', 'center', true);
          } else {
            this.snackbar.openCustomSnackBar('errors.err_generic_message', 'bottom', 'center', true);
          }
        }
      });
    }
  }

  saveCGroup(obj, parent) {
    obj.parent = parent;
    const ob: Group = {
      name: this.capitalizeText(obj.name),
      parent: obj.parent,
      type: "CLINICAL"
    }
    if (obj.groupId) {
      ob.groupId = obj.groupId;
      this.manager.updateGroup(ob);
    } else {
      this.manager.saveGroup(ob).subscribe((r) => {
        if (r.error) {
          if (r.error === 'DUPLICATE_GROUP_NAME') {
            this.snackbar.openCustomSnackBar('errors.DUPLICATE_GROUP_NAME', 'bottom', 'center', true);
          } else {
            this.snackbar.openCustomSnackBar('errors.err_generic_message', 'bottom', 'center', true);
          }
        }
      });
    }
  }

  cancelAdd(groupItem: Group) {
    groupItem.isShow = false;
    if (groupItem.type === "PHYSICAL") {
      if (groupItem.parent !== 'ROOT') {
        if (!this.pGroups.find(g => g.parent === groupItem.parent)) {
          this.pGroups.find(g => g.groupId === groupItem.parent).hasChildren = false;
          this.pGroups.find(g => g.groupId === groupItem.parent).expanded = false;
        }
      }
      this.pGroups = this.pGroups.filter(g => g.groupId);
    } else if (groupItem.type === "CLINICAL") {
      this.cGroups = this.cGroups.filter(g => g.groupId);
    }
  }

  saveSubPGroup(obj, parentId) {
    delete obj.isShow;
    obj.parent = parentId;
    if (!obj.groupId) {
      const ob: Group = {
        name: this.capitalizeText(obj.name),
        parent: parentId,
        type: obj.type,
        groupId: null
      }
      this.manager.saveGroup(ob).subscribe((r) => {
        if (r.error) {
          if (r.error === 'DUPLICATE_GROUP_NAME') {
            this.snackbar.openCustomSnackBar('errors.DUPLICATE_GROUP_NAME', 'bottom', 'center', true);
          } else {
            this.snackbar.openCustomSnackBar('errors.err_generic_message', 'bottom', 'center', true);
          }
        }
      });
    } else {
      const ob: Group = {
        name: this.capitalizeText(obj.name),
        parent: parentId,
        type: obj.type,
        groupId: obj.groupId
      }
      this.manager.updateGroup(ob).subscribe((r) => {
        if (r.error) {
          if (r.error === 'DUPLICATE_GROUP_NAME') {
            this.snackbar.openCustomSnackBar('errors.DUPLICATE_GROUP_NAME', 'bottom', 'center', true);
          } else {
            this.snackbar.openCustomSnackBar('errors.err_generic_message', 'bottom', 'center', true);
          }
        }
      });
    }
  }

  editGroup(groupItem: Group) {
    this.tempName = groupItem.name;
    groupItem.tempName = groupItem.name;
    groupItem.isShow = true;
  }
  cancelEdit(groupItem: Group) {
    groupItem.name = groupItem.tempName;
    groupItem.isShow = false;
  }

  editSubGroup(groupItem: Group, parentId) {
    this.tempName = groupItem.name;
    groupItem.tempName = groupItem.name;
    groupItem.isShow = true;
    groupItem.parent = parentId;
  }

  onGetGroups() {
    console.log('reload');
    this.getGroups();
  }

  deletePGroupItem(groupId) {
    if (groupId) {
      this.manager.removeGroup(groupId).subscribe((r) => {
        if (r.error) {
          this.snackbar.openCustomSnackBar('errors.err_generic_message', 'bottom', 'center', true);
        } else {
          // this.pGroups = [...this.pGroups.filter(g => g.groupId !== groupId)];
        }
      });
    } else {
      this.pGroups = this.pGroups.filter(g => g.groupId);
    }
    setTimeout(() => {
      this.getGroups();
    }, 200);
  }

  deleteCGroupItem(groupId) {
    if (groupId) {
      this.manager.removeGroup(groupId).subscribe((r) => {
        if (r.error) {
          this.snackbar.openCustomSnackBar('errors.err_generic_message', 'bottom', 'center', true);
        } else {
          //this.cGroups = this.cGroups.filter(g => g.groupId !== groupId);
        }
      });
    } else {
      this.cGroups = this.cGroups.filter(g => g.groupId);
    }
    setTimeout(() => {
      this.getGroups();
    }, 200);
  }
  confirmDelete(groupId, type) {
    const confirm = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "85vw",
      height: "auto",
      maxHeight: "90vh",
      data: {
        body: {
          title: "manage-group-module.delete_group",
          text: "manage-group-module.confirm_delete_group",
        },
      },
      disableClose: true,
    });
    confirm.afterClosed().subscribe((data) => {
      if (data) {
        if(type === 'PHYSICAL') {
         this.deletePGroupItem(groupId);
        } else {
          this.deleteCGroupItem(groupId)
        }
      }
    });
  }

  goBackToSummary() {
    this.router.navigate(["summary"]);
  }

  getGroups() {
    this.manageGroups$ = this.manager.fetchGroups();
    this.manageGroupSubscription = this.manageGroups$.pipe(map(x => {
        const cGroups = (x?.CLINICAL_GROUPS || []).map(y => {
          return {
            ...y,
            isShow: false
          }
        });
        this.cGroups = cGroups.map(g => {
          return {
            ...g
          }
        });

        const pGroups = (x?.PHYSICAL_GROUPS || []).map(y => {
          return {
            ...y,
            isShow: false
          }
        });
        this.pGroups = [...pGroups.filter(p => !p.deleted)
            .map(g => {
              return {
                ...g,
                expanded: this.pGroups.find(group => group.groupId === g.groupId)?.expanded || false,
                hasChildren: !!pGroups?.find(group => group.parent === g.groupId)
              }
            })];
        console.log(this.pGroups);
    })).subscribe();
    this.loaderSubscription = this.manager.getLoadedStatus()
      .subscribe((loaded) => {
        this.loading = !loaded;
      });
  }

  getSubPGroups(parentId) {
    let groups = (this.pGroups || []).filter(g => g.parent === parentId);
    if (parentId === 'ROOT') {
      this.pGroups.forEach(group => {
        if (group.parent !== 'ROOT' && !(this.pGroups.find(grp => grp.groupId === group.parent))) {
          groups.push(group);
        }
      });
    }
    return groups;
  }

  getSubCGroups(parentId) {
    return (this.cGroups || []).filter(g => g.parent === parentId);
  }

  alphaNumericsOnly(event: KeyboardEvent) {
    let charsOnlyPattern = /^[a-zA-Z0-9-_ ]+$/;
    let key = event.key;
    if (charsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  validateName(groupName) {
    return (groupNamePattern.test(groupName) && restrictedGroupNames.indexOf(groupName) === -1);
  }

  alphaNumericsOnPaste(event) {
    let regex = /^[a-zA-Z0-9-_ ]+$/;
    let pasteData = event.clipboardData.getData('text');
    if (!regex.test(pasteData)) {
      event.preventDefault();
      return false;
    }
  }
  capitalizeText(name) {
    //let transform = name.toLowerCase();
    return name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
  }
}
