import {Component} from 'angular2/core';
import {NgModel} from 'angular2/common';
import {Observable} from 'rxjs/Rx';

import {DataService} from '../../services/data/data.service';
import {Query} from '../../services/data/Query';


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



  constructor(private ds: DataService) { }


  /**
   * Search endpoints for given params and save to the service.
   * @param {Query} query Url parametrs.
   */
  private search(query: Query): void {
    this.ds.searchPhotos(query)
      .map((res) => res.json())
      .subscribe(
        (data) => {
          this.ds.maxPage = data.photos.pages;
          this.ds.activePage = data.photos.page;

          this.ds.photos = [];
          this.ds.photos.push(...data.photos.photo);
        },
        (err) => console.error(err),
        () => {
          Observable.fromArray(this.ds.photos.map(photo => photo.owner))
            .map(o => this.ds.getUserInfo(o))
            .mergeAll()
            .map(res => res.json())
            .subscribe(
              (user) => {
                this.ds.photos.map(photo => Object.assign(photo, {
                  username: user.person.username._content,
                  description: user.person.description._content
                }));
              }
            );
        }
      );
  }


  /**
   * Makes request to the endpoint for given params.
   */
  onSubmit(): void {

    // For now, handle text only.
    this.search({
      text: this.model.query
    })
  }

}
