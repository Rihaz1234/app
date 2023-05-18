import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SortDirective } from "./sort.directive";
import { SortHeaderComponent } from "./sort-header/sort-header.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [SortDirective, SortHeaderComponent],
  exports: [SortDirective, SortHeaderComponent],
})
export class SortModule {}
