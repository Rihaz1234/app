import { Sort } from "@angular/material/sort";

export interface LSColumn {
  id: string;
  label?: string;
  headerClass?: string | string[];
  extraHeaderClass?: string | string[];
  cellClass?: string | string[];
  style?: string;
  extraHeaderStyle?: string;
  sortable?: boolean;
  type?: LSColumnType;
  config?: any;
  labelClass?: string;
  hidden?: boolean;
  colspan?: number;
}

export enum LSColumnType {
  "TEXT" = "TEXT",
  "TAG_LIST" = "TAG_LIST",
  "ACTIONS" = "ACTIONS",
}

export interface LSTableConfig {
  id: string;
  rowSelectEnabled?: boolean;
  actions?: LSActions;
  showExtraHeader?: boolean;
  extraHeader?: {
    class?: string[];
    style?: string;
  }
  page?: {
    pageSize?: number;
    pageIndex?: number;
    length?: number;
  };
  translateKey?: string;
  translate?: boolean;
  paginator?: {
    offline?: boolean;
    hide?: boolean;
  };
  isActive?: Function;
  sort?: Sort;
  footer?: {
    colspan?: number;
    style?: string;
    class?: string[];
  };
  tableState?: TableState;
}

export enum TableState {
  LOADING = "LOADING",
  DEFAULT = "DEFAULT",
  SUCCESS = "SUCCESS",
  NO_DATA = "NO_DATA",
  FAILURE = "FAILURE"
}

export interface LSActions {
  headerLabel?: string;
  header?: {
    style?: string;
    class?: string[];
  };
  style?: string;
  class?: string[];
  show?: boolean;
  contentSelector?: string;
}

export interface LSAction {
  label?: string;
  type?: string;
  color?: string;
}
