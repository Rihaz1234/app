import { Location } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ls-page-header",
  templateUrl: "./ls-page-header.component.html",
  styleUrls: ["./ls-page-header.component.scss"],
})
export class LsPageHeaderComponent {
  @Input() type: string;
  constructor(private router: Router, private location: Location) {}

  goBack() {
    this.location.back();
  }

  goBackToSummary() {
    this.router.navigate(["summary"]);
  }
}
