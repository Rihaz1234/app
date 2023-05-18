import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Group } from 'src/app/manage-group/models/manage-groups.model';
import { NestedDropdownService } from '../nested-dropdown.service';

export interface MenuMove{
  option: any;
  trigger: MatMenuTrigger;
  direction: "ENTER" | "LEAVE";
  hasChildren: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  @Input() options: Group[];
  @Input() parent: string;
  @Input() key: string;
  @Input() disabled: boolean = false;
  @Input() displayKey: string;
  @Input() option: Group;
  @Output() clickChild: EventEmitter<Group> = new EventEmitter<Group>();
  @Output() sequence: EventEmitter<MenuMove> = new EventEmitter<MenuMove>();
  @ViewChild("subchildren", { static: false }) subchildren: MatMenu;
  constructor(public readonly service: NestedDropdownService) { }

  ngOnInit(): void {
    console.log();
  }

  onClickChild(item: Group) {
    this.clickChild.emit(item);
  }

  mouseMove(trigger: MatMenuTrigger, option: Group, direction: "ENTER" | "LEAVE", hasChildren: boolean) {
    this.sequence.emit({ option, trigger, direction, hasChildren });
  }

  onSequence(event: MenuMove){
    this.sequence.emit(event);
  }

}
