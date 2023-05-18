import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import {
  ManageGroupsStoreActions,
  ManageGroupsStoreSelectors,
  ManageGroupsStoreState,
} from "./../store";

@Injectable({
  providedIn: "root",
})
export class ManageGroupsManagerService {
  constructor(private store$: Store<ManageGroupsStoreState.ManageGroupState>) {}

  saveGroup(groupData) {
    this.store$.dispatch(
      new ManageGroupsStoreActions.SaveGroupRequestAction(groupData)
    );
    return this.store$.select(
      ManageGroupsStoreSelectors.saveGroup
    )
  }

  updateGroup(groupData) {
    this.store$.dispatch(
      new ManageGroupsStoreActions.UpdateGroupRequestAction(groupData)
    );
    return this.store$.select(
        ManageGroupsStoreSelectors.saveGroup
    )
  }

  removeGroup(groupId) {
    this.store$.dispatch(
      new ManageGroupsStoreActions.RemoveGroupRequestAction(groupId)
    );
    return this.store$.select(
      ManageGroupsStoreSelectors.removeGroup
    )
  }

  fetchGroups() {
    this.store$.dispatch(
      new ManageGroupsStoreActions.LoadGroupsRequestAction()
    );
    return this.store$.select(
      ManageGroupsStoreSelectors.selectGroupsList
    );
  }
  getLoadedStatus() {
    return this.store$.select(
        ManageGroupsStoreSelectors.groupsLoaded
    );
  }
}
