import { SelectionModel } from "@angular/cdk/collections";
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  Renderer2,
} from "@angular/core";
import {  PageEvent } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SnackbarService } from "@services/snackbar.service";
import { LsWidgetNameDirective } from "../../_directives/ls-widget-name.directive";
import { LSColumn, LSTableConfig } from "../../_models/ls-column.model";

@Component({
  selector: "ls-table",
  templateUrl: "./ls-table.component.html",
  styleUrls: ["./ls-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LsTableComponent
  implements AfterViewInit, OnChanges, AfterContentInit {
  dataSource = new MatTableDataSource<any>([]);
  @Input() selection = new SelectionModel<any>(true, []);
  @Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() selected: EventEmitter<SelectionModel<any>> = new EventEmitter();
  @Input() config: LSTableConfig;
  @Input() error: any;
  @Input() tableSort = false;
  @Output() configChange: EventEmitter<LSTableConfig> =
    new EventEmitter<LSTableConfig>();
  @Output() sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Input() data: any[];
  @Input() columns: LSColumn[] = [];
  @Input() Id = "";
  @Input() selectOnlyActive = false;
  disableMasterSelect = false;
  allSelected = false;

  @ViewChild(MatSort) sort: MatSort;
  @ContentChildren(LsWidgetNameDirective)
  widgets: QueryList<LsWidgetNameDirective>;
  widgetTemplates: any = {};

  ngAfterViewInit(): void {
    if(this.tableSort) {
      this.dataSource.sort = this.sort;
    }
    this.sort.sortChange.subscribe((change) => {
      this.config = {
        ...this.config,
        sort: { ...change }
      };
      this.sortChange.emit(change);
    })
    this.selection.changed.subscribe((change) => {
      this.selected.emit(this.selection);
      this.allSelected = this.isAllSelected();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.data?.currentValue) {
      if (this.config?.paginator?.offline) {
        this.data = changes?.data?.currentValue;
        this.config.page.length = this.data?.length;
        this.sliceData(<PageEvent>this.config?.page);
      } else {
        this.dataSource.data = changes?.data?.currentValue || [];
        this.allSelected = this.isAllSelected();
      }
    }
  }

  constructor(private vr: ViewContainerRef, private snackbar: SnackbarService, private ren: Renderer2) { }

  ngAfterContentInit() {
    this.widgets.forEach((widget) => {
      this.widgetTemplates[widget.getName()] = widget.template;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    let patients;
    if (this.selectOnlyActive) {
      patients = this.dataSource.data.filter((pat) => pat.activePatch?.length);
      if (!patients.length) {
        this.disableMasterSelect = true;
        return false;
      } else {
        this.disableMasterSelect = false;
      }
    } else {
      patients = this.dataSource.data;
    }
    if (this.Id.length) {
      for (const pat of patients) {
        if (this.selection.selected
          .findIndex((selPat) => selPat[this.Id] === pat[this.Id]) === -1) {
          return false;
        }
      }
    } else {
      for (const pat of patients) {
        if (!this.selection.selected
          .includes(pat)) {
          return false;
        }
      }
    }
    return true;
  }

  @Input() isSelected;

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.allSelected) {
      this.selection.clear();
      return;
    }
    if (this.selectOnlyActive) {
      const activePatients = this.dataSource.data
        .filter((pat) => pat.activePatch?.length);// Only Active monitoring
      if (activePatients.length) {
        this.selection.select(...activePatients);
        this.snackbar.openSnackBar(activePatients.length
          + " Current Patients selected", 'bottom', 'center');
        this.allSelected = true;
      } else {
        this.allSelected = false;
        this.snackbar.openSnackBar("No Patients to select", 'bottom', 'center');
      }
    } else {
      this.selection.select(...this.dataSource.data);
      this.allSelected = true;
    }
  }

  getDisplayedColumns() {
    let columns = [];
    if (this.config?.rowSelectEnabled) {
      columns.push("select");
    }
    columns = [
      ...columns,
      ...this.columns?.filter((c) => !c?.hidden).map((c) => c?.id),
    ];
    if (this.config?.actions?.show) {
      columns.push("actions");
    }
    return columns;
  }

  getExtraHeaderId(column: LSColumn) {
    return `${column?.id}ExtraHeader`;
  }

  getExtraHeaderDisplayedColumns() {
    let columns = [];
    if (this.config?.rowSelectEnabled) {
      columns.push("select");
    }
    columns = [
      ...columns,
      ...this.columns?.filter((c) => !c?.hidden).map((c) => c?.id),
    ];
    if (this.config?.actions?.show) {
      columns.push("actions");
    }
    return columns.map(c => `${c}ExtraHeader`);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.allSelected ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.position + 1
      }`;
  }


  getHeaderTranslation(column: LSColumn) {
    if (this.config.translate) {
      return `${this.config.translateKey || this.config.id}.${column.label || column.id
        }`;
    } else {
      return column.label;
    }
  }

  getExtraHeaderTranslation(column: LSColumn) {
    if (this.config.translate) {
      return `${this.config.translateKey || this.config.id}.${column.label || column.id}_extra_heading`;
    } else {
      return column.label;
    }
  }

  onPage(event: PageEvent) {
    this.config = {
      ...this.config,
      page: {
        ...this.config.page,
        pageSize: event.pageSize,
        pageIndex: event.pageIndex
      }
    }
    if (this.config?.paginator?.offline) {
      this.sliceData(event);
    } else {
      this.page.emit(event);
    }
  }

  sliceData(event: PageEvent) {
    const data = this.data;
    const startIndex = event.pageIndex * event.pageSize;
    this.dataSource.data = data?.slice(
      startIndex,
      startIndex + this.config?.page?.pageSize > event?.length
        ? this.config?.page?.length
        : startIndex + this.config?.page?.pageSize
    );
  }

  isActive(row) {
    if (this.config?.isActive) {
      return this.config?.isActive(row);
    } else {
      return this.selection.isSelected(row);
    }
  }
  checkboxChange(event, row) {
    if (event.checked) {
      this.selection?.select(row);
    } else {
      this.selection?.deselect(row);
      if (this.Id) {
        this.selection.selected.map(s => {
          if (s[this.Id] === row[this.Id]) {
            this.selection?.deselect(s);
          }
        })
      }
    }
  }
}
