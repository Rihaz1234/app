import { Injectable } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Injectable({
  providedIn: 'root'
})
export class NestedDropdownService {
  trigger: MatMenuTrigger;
  constructor() { }

  getChildren(parentId, options) {
    let groups = options?.filter(o => o.parent === parentId);
    if(parentId === 'ROOT') {
      options.forEach(group => {
        if (group.parent !== 'ROOT' && !(options.find(grp => grp.groupId === group.parent))) {
          groups.push(group);
        }
      });
    }
    return groups;
  }
}
