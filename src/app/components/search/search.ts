import {Component, AfterViewInit, OnDestroy} from 'angular2/core';
import {NgModel} from 'angular2/common';
import {Observable, Subscription} from 'rxjs/Rx';

import {DataService} from '../../services/data/data.service';
import {Query} from '../../services/data/Query';


@Component({
  selector: 'search-component',
  template: require('./search.html'),
  directives: [NgModel]
})
export class SearchComponent implements AfterViewInit, OnDestroy {

  // Store user's input.
  private model = {
    query: null,
    nearMe: false
  };


  private prev: Subscription<number> = null;
  private next: Subscription<number> = null;


  constructor(private ds: DataService) { }



  private text: string = null;
  private tags: string = null;
  private lon: number = 0;
  private lat: number = 0;


  ngAfterViewInit() {
    this.prev = this.ds.prev.subscribe((page) => {
      this.search({
        text: this.text || '',
        tags: this.tags || '',
        lon: this.lon || 0,
        lat: this.lat || 0,
        page
      });
    });

    this.next = this.ds.next.subscribe((page) => {
      this.search({
        text: this.text || '',
        tags: this.tags || '',
        lon: this.lon || 0,
        lat: this.lat || 0,
        page
      });
    });
  }

  ngOnDestroy() {
    this.prev.unsubscribe();
    this.next.unsubscribe();
  }


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

  onChange() {
    if (!this.model.nearMe && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
      });
    } else {
      this.lat = 0;
      this.lon = 0;
    }
  }


  /**
   * Makes request to the endpoint for given params.
   */
  onSubmit(): void {
    if (!this.model.query) {
      this.tags = this.text = '';
    } else {
      this.tags = (this.model.query.match(/#\w+/g) || []).join(',').replace('#', '');
      this.text = this.model.query.replace(/#\w+,? ?/g, '');
    }


    // For now, handle text only.
    this.search({
      text: this.text || '',
      tags: this.tags || '',
      lon: this.lon || 0,
      lat: this.lat || 0,
    })
  }

}
