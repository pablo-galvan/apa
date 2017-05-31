import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Hotel } from './hotel';

@Injectable()
export class HotelService {
  // private hotelsUrl = 'api/hotels';
  // hago una busqueda simplificada para poder obtener información lo más similar a la maqueta
  private hotelsUrl = 'https://almundo.com.ar/hotels/async/1317979/hotels?date=2017-08-03,2017-08-11&rooms=2&type=CITY';

  constructor (private http: Http) {}

  getHotels(): Observable<Hotel[]> {
    return this.http.get(this.hotelsUrl)
                    .map(this.parseData)
                    .catch(this.handleError);
  }

  private parseData(res: Response) {
    let body = res.json();
    return body.hotels || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}