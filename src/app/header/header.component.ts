import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // Search related properties
  @Output() valueToSearch: EventEmitter<any> = new EventEmitter();
  searchQuery: string = '';

  onSearchChange() {
    this.valueToSearch.emit(this.searchQuery);
  }
}
