import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LsTableComponent } from "./_components/ls-table/ls-table.component";
import { LsWidgetComponent } from "./_components/ls-widget/ls-widget.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { LsWidgetNameDirective } from "./_directives/ls-widget-name.directive";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { I18nModule } from "../i18n/i18n.module";
import { LsPageHeaderComponent } from "./_components/ls-page-header/ls-page-header.component";
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { LsPaginatorComponent } from './_components/ls-paginator/ls-paginator.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [
    LsTableComponent,
    LsWidgetComponent,
    LsWidgetNameDirective,
    LsPageHeaderComponent,
    LsPaginatorComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressBarModule,
    I18nModule,
    MatCardModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule
  ],
    exports: [
        LsTableComponent,
        LsWidgetComponent,
        LsWidgetNameDirective,
        LsPageHeaderComponent,
        LsPaginatorComponent,
    ],
})
export class LifeSignalsModule {}
