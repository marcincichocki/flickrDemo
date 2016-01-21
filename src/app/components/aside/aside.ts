import {Component} from 'angular2/core';

import {SearchComponent} from '../search/search';


@Component({
  selector: '[aside-component]',
  template: require('./aside.html'),
  directives: [SearchComponent]
})
export class AsideComponent {}
