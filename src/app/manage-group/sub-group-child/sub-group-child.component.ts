import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { SnackbarService } from '@services/snackbar.service';
import { ManageGroupsManagerService } from '../managers/manage-groups-manager.service';
import {Group, groupNamePattern, restrictedGroupNames} from '../models/manage-groups.model';
import {ManageGroupsService} from "../services/manage-groups.service";
import {error} from "protractor";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-sub-group-child',
  templateUrl: './sub-group-child.component.html',
  styleUrls: ['./sub-group-child.component.scss']
})
export class SubGroupChildComponent implements OnInit {
  @Input() pGroups = [];
  @Input() isCreationAllowed: boolean;
  @Input() pGroupItem;
  @Input() level: number;
  keepOpen = false;
  @Output() getGroups: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateGroups: EventEmitter<any> = new EventEmitter<any>();
  tempName;
  constructor(
    private manager: ManageGroupsManagerService,
    private snackbar: SnackbarService,
    private service: ManageGroupsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  getSubPGroups(parentId) {
    let groups = (this.pGroups || []).filter(g => g.parent === parentId);
    if (parentId === 'ROOT') {
      this.pGroups.forEach(group => {
        if (group.parent !== 'ROOT' && !(this.pGroups.find(grp => grp.groupId === group.parent))) {
          if (!group.deleted)
            groups.push(group);
        }
      });
    }
    return groups;
  }

  onUpdateGroups(event) {
    this.getGroups.emit(event);
  }

  getEmptyGroup() {
    return this.pGroups.filter(a => !a.groupId);
  }
  validateName(groupName) {
    return (groupNamePattern.test(groupName) && restrictedGroupNames.indexOf(groupName) === -1);
  }

  toggleAddPgroup(parentId: string) {
    console.log(parentId);
    console.log(this.pGroups);
      if (parentId !== 'ROOT') {
        const group = this.pGroups.find(g => g.groupId === parentId);
        group.expanded = true;
        group.hasChildren = true;
      }
    if (!this.pGroups.some(g => (!g?.groupId && g.parent === parentId))) {
      this.pGroups = [
        {
          name: "",
          parent: parentId,
          type: "PHYSICAL",
          isShow: true
        },
        ...this.pGroups
      ];
      this.updateGroups.emit(this.pGroups);
    } else {
      this.pGroups.find(g => (!g?.groupId && g.parent === parentId)).isShow = true;
    }
  }

  cancelAdd(groupItem: Group) {
    groupItem.isShow = false;
    this.pGroups = [...this.pGroups.filter(g => (g?.groupId || g.parent !==  groupItem.parent))];
    if (groupItem.parent !== 'ROOT') {
      if (!this.pGroups.find(g => g.parent === groupItem.parent)) {
        this.pGroups.find(g => g.groupId === groupItem.parent).hasChildren = false;
        this.pGroups.find(g => g.groupId === groupItem.parent).expanded = false;
      }
    }
    this.updateGroups.emit(this.pGroups);
  }

  deletePGroupItem(groupItem) {
    const groupId = groupItem.groupId;
    if (groupId) {
      this.service.remove(groupId)
          .subscribe((res: any) => {
            console.log(res);
            if(res.status === 'OK') {
              this.manager.fetchGroups();
            } else {
              this.snackbar.openCustomSnackBar('errors.err_generic_message', 'bottom', 'center', true);
            }
          }, error => {
            if(error) {
              this.snackbar.openCustomSnackBar('errors.err_generic_message', 'bottom', 'center', true);
            }
          })
    } else {
      this.pGroups = [...this.pGroups.filter(g => g.groupId)];
      this.updateGroups.emit(this.pGroups);
    }
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

  editSubGroup(groupItem: Group, parentId) {
    this.tempName = groupItem.name;
    groupItem.tempName = groupItem.name;
    groupItem.isShow = true;
    groupItem.parent = parentId;
  }
  confirmDelete(groupItem) {
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
        this.deletePGroupItem(groupItem);
      }
    });
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
        if (r?.error) {
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
        if (r?.error) {
          if (r.error === 'DUPLICATE_GROUP_NAME') {
            this.snackbar.openCustomSnackBar('errors.DUPLICATE_GROUP_NAME', 'bottom', 'center', true);
          } else {
            this.snackbar.openCustomSnackBar('errors.err_generic_message', 'bottom', 'center', true);
          }
        }
      });
    }
  }

  cancelEdit(groupItem: Group) {
    groupItem.name = groupItem.tempName;
    groupItem.isShow = false;
  }
}
