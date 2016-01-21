import {Component} from 'angular2/core';
import {NgModel} from 'angular2/common';


@Component({
  selector: 'search-component',
  template: require('./search.html'),
  directives: [NgModel]
})
export class SearchComponent {

  // Store user's input.
  private model = {
    query: null
  };


  /**
   * Makes request to the endpoint for given params.
   */
  onSubmit(): void {

    // make request here
  }

}
