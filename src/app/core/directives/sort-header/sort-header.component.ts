import { Component, HostListener, Input, OnInit } from "@angular/core";
import { SortDirective } from "../sort.directive";

@Component({
  selector: "app-sort-header",
  templateUrl: "./sort-header.component.html",
  styleUrls: ["./sort-header.component.scss"],
})
export class SortHeaderComponent {
  @Input()
  ref: string;

  @Input() enableSort = true;

  constructor(public sorter: SortDirective) {}

  @HostListener("click")
  sort() {
    this.sorter.sort(this.ref);
  }
}
