import {Component} from 'angular2/core';

import {AsideComponent} from '../aside/aside';


@Component({
  selector: 'app-component',
  template: require('./app.html'),
  directives: [AsideComponent]
})
export class AppComponent {}
