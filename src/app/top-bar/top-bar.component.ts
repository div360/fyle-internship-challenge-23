import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  // fyleLogoImagePath = 'assets/fylelogo.svg';
  _searchQuery: string = '';
  @Output() searchQueryOutput = new EventEmitter<string>();
  searchSubmitted:boolean = false;
  get searchQuery(): string {
    return this._searchQuery;
  }

  set searchQuery(value: string) {
    this._searchQuery = value;
    this.searchQueryOutput.emit(value);
  }
  onSearch():void {
    // this.searchSubmitted = false;
    console.log(this.searchQuery);
    this.searchSubmitted=true;
    console.log(this.searchSubmitted);
    this.searchQueryOutput.emit(this.searchQuery);
    // this.searchSubmitted.emit(this.searchQuery);
  }
}
