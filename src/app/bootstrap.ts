import {bootstrap} from 'angular2/platform/browser';
import {HTTP_BINDINGS} from 'angular2/http';

import {AppComponent} from './components/app/app';
import {DataService} from './services/data/data.service';


bootstrap(AppComponent, [
  ...HTTP_BINDINGS,
  DataService
]).catch(error => console.error(error));

