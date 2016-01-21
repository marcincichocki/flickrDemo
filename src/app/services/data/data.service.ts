import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {Query} from './Query';


@Injectable()
export class DataService {

  // Api key.
  private API_KEY: string = 'e794f772ea891c930ef219cc3b24ce15';

  // Endpoint url.
  private endpoint: string = 'https://api.flickr.com/services/rest';

  // Store url of photos from flickr api.
  public photos: any[] = [];

  // Determines how may photos display on single page.
  public perPage: number = 10;

  // Store active page.
  public activePage: number = 1;

  // Max pages for current query.
  public maxPage: number = null;



  /**
   * Service constructor. Created at bootstrap.
   * @param {Http} http Angular's http module.
   */
  constructor(public http: Http) { }



  /**
   * Get url for given query.
   * @param {Query} query Paramets to be searched.
   * @return {string} Url of query.
   */
  private url(query: Query): string {
    let url = `${this.endpoint}?method=flickr.photos.search` +
      `&api_key=${this.API_KEY}&format=json&per_page=${this.perPage}&nojsoncallback=1`;

    // Extend url with optional parametrs.
    if (query.text) url += `&text=${query.text}`;
    if (query.tags) url += `&tags=${query.tags}`;
    if (query.lat) url  += `&lat=${query.lat}`;
    if (query.lon) url  += `&lon=${query.lon}`;
    if (query.page) url += `&page=${query.page}`;


    return url;
  }


  /**
   * Search photos for given params.
   * @param {Query} query Url parametrs.
   * @return {Observable<Response>} Observable to which we can subscribe to.
   */
  public searchPhotos(query: Query): Observable<Response> {
    return this.http.get(this.url(query));
  }


  /**
   * Get user info based on given user id.
   * @param {string} user_id Id of the user.
   * @return {Observable<Response>} Observable to which we can subscribe to.
   */
  public getUserInfo(user_id: string): Observable<Response> {
    const url = `${this.endpoint}?method=flickr.people.getInfo` +
      `&api_key=${this.API_KEY}&format=json&user_id=${user_id}&nojsoncallback=1`;

    return this.http.get(url);
  }
}
