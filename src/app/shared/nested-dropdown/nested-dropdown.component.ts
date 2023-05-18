import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { merge, Subject } from 'rxjs';
import { Group } from 'src/app/manage-group/models/manage-groups.model';
import { MenuMove } from './menu/menu.component';
import { NestedDropdownService } from './nested-dropdown.service';

@Component({
  selector: 'app-nested-dropdown',
  templateUrl: './nested-dropdown.component.html',
  styleUrls: ['./nested-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedDropdownComponent implements OnInit, OnChanges {
  @Input() label: string;
  @Input() customLabel: boolean;
  @Input() selectedValue: string = null;
  selectedItem: any = {};
  @Input() displayKey: string = "name";
  @Input() disabled: boolean = false;
  @Input() key: string = "groupId";
  @Input() showSelect: boolean = false;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();
  @Input() options: Group[] = [];
  @Input() assignGroup: Boolean = false;
  @Input() noSelection: Boolean = false;
  @ViewChild("children", { static: false }) children: MatMenu;
  @ViewChild("subchildren", { static: false }) subchildren: MatMenu;
  @ViewChild("childrentrigger", { static: false }) childrentrigger: MatMenuTrigger;
  sequence: Subject<MenuMove> = new Subject<MenuMove>();
  selectedValueSubject = new Subject<string>();
  optionsSubject = new Subject<Group[]>();
  parentGroup;
  rootGroupBuffer = [];
  constructor(public readonly service: NestedDropdownService) {
    merge(
      this.selectedValueSubject.asObservable(),
      this.optionsSubject.asObservable()
    )
      .subscribe(() => {
        const value = this.selectedValue;
        const options = this.options;
          this.options?.forEach(group => {
              if (group.parent !== 'ROOT' && !(this.options.find(grp => grp.groupId === group.parent))) {
                  group.parent = 'ROOT';
              }
          });
        if (value && options?.length) {
          this.assignSelection(value);
        }
        if (!value) {
          this.selectedItem = {};
        }
      });
  }

  buffer: any;
  ngOnInit(): void {
    this.sequence
      .pipe()
      .subscribe((res: MenuMove) => {
        let groups = this.rootGroupBuffer.filter(item => item?.option?.parent === res.option?.parent);
        groups.forEach(group => {
            if(group?.trigger) group?.trigger.closeMenu();
        });
        if (res?.option?.parent === this.parentGroup?.option?.parent) {
          if (this.parentGroup?.trigger) this.parentGroup?.trigger?.closeMenu();
        }
        if (res?.hasChildren) {
          if (res?.trigger) res.trigger.openMenu();
        } else if (res?.option?.parent === this.buffer?.option?.parent) {
          if (this.buffer?.hasChildren) this.buffer?.trigger.closeMenu();
        } else if (res?.hasChildren) {
          if (res?.trigger) res?.trigger?.openMenu();
        }
        else if (!res.option?.Children?.includes(this.buffer?.option[this.key]) && !this.buffer?.option.parent === res.option[this.key]) {
          if (this.buffer?.trigger)
            this.buffer.trigger.closeMenu();
        }
        if (res?.option?.parent === this.buffer?.option?.parent) {
          if (this.buffer?.hasChildren) this.buffer?.trigger.closeMenu();
        }
        this.buffer = res;
        if (res?.hasChildren) {
          this.parentGroup = res;
          this.rootGroupBuffer.push(res);
        }
      });
  }

  ngOnChanges(change: SimpleChanges) {
    // if (change && (change?.options || change?.selectedValue)) {
    //   this.selectedValueSubject.next(change?.selectedValue?.currentValue);
    // }
    if (change) {
      if (change.options) {
        this.optionsSubject.next(change.options.currentValue);
      }
      if (change.selectedValue) {
        this.selectedValueSubject.next(change.selectedValue.currentValue);
      }
    }
  }

  assignSelection(value) {
    this.selectedItem = this.options.find(o => o[this.key] === value);
  }

  onMenuOpened(){
    this.buffer = undefined;
  }

  onClickedOption(option) {
    this.selectedValue = option[this.key];
    this.onSelectItem();
    this.childrentrigger.closeMenu();
    this.selected.emit(this.selectedValue);
  }

  onSelectItem() {
    this.selectedItem = this.options.find(o => o[this.key] === this.selectedValue);
  }

  onSequence(event: MenuMove) {
    if (event?.option[this.key] !== this.buffer?.option[this.key])
      this.sequence.next(event);
  }
}
