import { DataSource } from "../core/data-source";
import { ServiceProvider } from "../super-admin/manage-service-provider/service-provider.interface";
import { SortChangeEvent } from "../core/directives/sort.interface";

export class ManageServiceProviderSourceDataSource extends DataSource<ServiceProvider> {
  sortLogic({ column, direction }: SortChangeEvent, data: ServiceProvider[]) {
    let sorted = data;
    if (direction === null) {
      return sorted;
    }
    switch (column) {
      default:
        sorted = [...data].sort((a, b) => {
          console.log(column);
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
