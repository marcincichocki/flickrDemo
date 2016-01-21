import {Component} from 'angular2/core';

import {AsideComponent} from '../aside/aside';
import {SectionComponent} from '../section/section';


@Component({
  selector: 'app-component',
  template: require('./app.html'),
  directives: [AsideComponent, SectionComponent],
  styles: [`
    section {
      max-height: 100vh;
      overflow-y: auto;
    }
  `]
})
export class AppComponent {}
