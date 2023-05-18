import { User } from "../interfaces/user.interface";
import { DataSource } from "../core/data-source";
import { SortChangeEvent } from "../core/directives/sort.interface";

export class ManageAdminDataSource extends DataSource<User> {
  sortLogic({ column, direction }: SortChangeEvent, data: User[]) {
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
