import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: "app-data-table-cloned-view",
  templateUrl: "./data-table-cloned-view.component.html",
  styleUrls: ["./data-table-cloned-view.component.scss"],
})
export class DataTableClonedViewComponent {
  @Input() adminUsers = [];
  constructor() {}
}
