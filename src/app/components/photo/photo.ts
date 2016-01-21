import {Component, Input} from 'angular2/core';


@Component({
  selector: '[photo-component]',
  template: require('./photo.html')
})
export class PhotoComponent {
  @Input() photo;
  @Input() index;

  private noDescription: string = 'No description provided.'
}
