import {Component} from 'angular2/core';

import {AsideComponent} from '../aside/aside';
import {SectionComponent} from '../section/section';


@Component({
  selector: 'app-component',
  template: require('./app.html'),
  directives: [AsideComponent, SectionComponent]
})
export class AppComponent {}
