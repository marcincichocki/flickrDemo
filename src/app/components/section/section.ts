import {Component} from 'angular2/core';
import {NgIf} from 'angular2/common';

import {DataService} from '../../services/data/data.service';
import {PhotosComponent} from '../photos/photos';


@Component({
  selector: '[section-component]',
  template: require('./section.html'),
  directives: [PhotosComponent, NgIf]
})
export class SectionComponent {
  constructor(private ds: DataService) { }



  nextPage() {
    if (this.ds.activePage < this.ds.maxPage) {
      this.ds.changePage.emit(this.ds.activePage + 1);
    }
  }

  prevPage() {
    if (this.ds.activePage > 1) {
      this.ds.changePage.emit(this.ds.activePage - 1);
    }
  }
}
