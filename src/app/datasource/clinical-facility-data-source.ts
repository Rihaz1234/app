import { DataSource } from "../core/data-source";
import { SortChangeEvent } from "../core/directives/sort.interface";
import { ClinicalFacility } from "../service-provider-admin/clinical-facility-management/clinical-facility.interface";

export class ClinicalFacilityDataSource extends DataSource<ClinicalFacility> {
  sortLogic({ column, direction }: SortChangeEvent, data: ClinicalFacility[]) {
    let sorted = data;
    if (direction === null) {
      return sorted;
    }
    switch (column) {
      default:
        sorted = [...data].sort((a, b) => {
          const order = direction === "asc" ? -1 : 1;
          if (a[column] > b[column]) {
            return order;
          }
          return order * -1;
        });
        return sorted;
    }
  }
}
