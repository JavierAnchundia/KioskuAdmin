import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import URL_SERVICIOS from 'src/app/config/config';
import { Router } from '@angular/router';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BodegaProductoService {

  constructor(
    private _http: HttpClient,
  ) { }


  crearBodegaProducto(bodegaProducto:FormData)
  {
    let url = URL_SERVICIOS.bodega_producto;
    /*let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    }*/
    return this._http.post(url, bodegaProducto/*, httpOptions*/);
  }
}
