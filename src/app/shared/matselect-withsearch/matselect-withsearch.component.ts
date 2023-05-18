import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-matselect-withsearch',
  templateUrl: './matselect-withsearch.component.html',
  styleUrls: ['./matselect-withsearch.component.scss']
})
export class MatselectWithsearchComponent implements OnInit {

  constructor() { }
  @Input() items;
  @Input() key;
  @Input() value;
  @Input() selected;
  @Input() disabled;
  @Input() placeholder;
  @Input() backendSearch:boolean = false;
  @Output() valueUpdated = new EventEmitter<string>();
  @Output() reload = new EventEmitter<string>();
  searchText;

  ngOnInit(): void {
  }
  filteredResults(items, key, searchTxt) {
    if(!items || !items.length) return items;
    if(!searchTxt || !searchTxt.length) return items;
      return items.filter(item => {
        return item[key].toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
      });
  }
  reloadItems(searchText) {
    this.reload.emit(searchText);
  }
  clearFilter() {
    this.searchText = '';
    this.reload.emit('')
  }
  updated() {
    this.valueUpdated.emit(this.selected);
  }

}
