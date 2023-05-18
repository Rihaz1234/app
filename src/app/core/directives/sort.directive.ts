import { Directive, EventEmitter, Output } from "@angular/core";
import { SortChangeEvent } from "./sort.interface";

@Directive({
  selector: "[appSort]",
})
export class SortDirective {
  active = null;
  direction = null;
  @Output() sortChange = new EventEmitter<SortChangeEvent>();

  constructor() {}

  sort(column: string) {
    let direction = this.direction;
    if (this.active !== column) {
      this.direction = null;
      this.active = column;
    }
    if (this.direction === null) {
      direction = "desc";
    } else if (this.direction === "asc") {
      direction = "desc";
    } else if (this.direction === "desc") {
      direction = null;
    }

    this.sortChange.emit({
      column,
      direction,
    });
    this.direction = direction;
  }
}
