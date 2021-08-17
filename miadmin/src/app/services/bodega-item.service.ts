import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import URL_SERVICIOS from 'src/app/config/config';
import { Router } from '@angular/router';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BodegaItemService {

  constructor(
    private _http: HttpClient,
  ) { }


  crearBodegaItem(bodegaItem:FormData)
  {
    let url = URL_SERVICIOS.bodega_item;
    /*let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    }*/
    return this._http.post(url, bodegaItem/*, httpOptions*/);
  }

}
