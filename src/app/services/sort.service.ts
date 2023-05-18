import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SortService {
  constructor() {}

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
