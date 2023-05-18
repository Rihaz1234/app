import { Subject, isObservable, Observable } from "rxjs";
import { map, tap, withLatestFrom } from "rxjs/operators";
import { SubSink } from "subsink";
import { SortDirective } from "./directives/sort.directive";
import { SortChangeEvent } from "./directives/sort.interface";

export abstract class DataSource<T> {
  private subs = new SubSink();

  private initialDataSubject = new Subject<T[]>();
  initialData$ = this.initialDataSubject.asObservable();

  private dataSubject = new Subject<T[]>();
  // The exposed observable for the table  to user
  data$ = this.dataSubject.asObservable();

  constructor(data: T[] = []) {
    this.updateData(data);
  }

  /**
   * Register the sorter with the datasoruce
   */
  set sorter(sorter: SortDirective) {
    this.listenToSortChanges(sorter);
  }

  destroy() {
    this.subs.unsubscribe();
  }

  /**
   * The data which drives the table. It will accept
   * either array or an observable.
   * @param data - data for the table
   */
  updateData(data: T[] | Observable<T[]>) {
    if (isObservable(data)) {
      const sub = data
        .pipe(
          tap((res) => {
            this.dataSubject.next(res);
            this.initialDataSubject.next(res);
          })
        )
        .subscribe();
      this.subs.add(sub);
    } else {
      this.dataSubject.next(data);
    }
  }

  abstract sortLogic(sorter: SortChangeEvent, data: T[]): T[];

  /**
   * Update the data when the user sorts
   * @param sorter - sorter instance
   */
  private listenToSortChanges(sorter: SortDirective) {
    const sub = sorter.sortChange
      .pipe(
        withLatestFrom(this.initialData$),
        map(([sortEvent, data]) => this.sortLogic(sortEvent, data))
      )
      .subscribe((data) => this.dataSubject.next(data));
    this.subs.add(sub);
  }
}
