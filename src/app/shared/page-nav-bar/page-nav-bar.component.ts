import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-nav-bar",
  templateUrl: "./page-nav-bar.component.html",
  styleUrls: ["./page-nav-bar.component.scss"],
})
export class PageNavBarComponent {
  @Input() title: any;
  @Input() image: any;
  @Input() url: any;

  constructor(private router: Router) {}

  navigateUrl(url: string) {
    this.router.navigate([url]).then();
  }
}
