import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';

import {PhotoComponent} from '../photo/photo';
import {DataService} from '../../services/data/data.service';


@Component({
  selector: '[photos-component]',
  template: require('./photos.html'),
  directives: [PhotoComponent, NgFor]
})
export class PhotosComponent {
  constructor(private ds: DataService) { }
}
