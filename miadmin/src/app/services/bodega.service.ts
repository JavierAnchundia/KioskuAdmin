import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import URL_SERVICIOS from 'src/app/config/config';
import { Router } from '@angular/router';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  constructor(
    private _http: HttpClient,
  ) { }

  getBodegas() {
    let url = URL_SERVICIOS.bodegas_ciudad;
    
    return this._http.get(url);
  }

  deleteBodega(key:number)
  {
    let url = URL_SERVICIOS.bodega_viewset + key + '/';
    
    return this._http.delete(url);
    
  }

  crearBodega(bodega:FormData)
  {
    let url = URL_SERVICIOS.bodega_viewset;
    /*let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    }*/
    return this._http.post(url, bodega/*, httpOptions*/);
  }

  getBodega(key:number){
    let url = URL_SERVICIOS.bodegas_ciudad + key + '/';
    return this._http.get(url);

  }

  actualizarBodega(bodega:FormData, key:number){
    let url = URL_SERVICIOS.bodega_viewset + key + '/';
    /*let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    }*/
    return this._http.put(url, bodega/*, httpOptions*/);
  }
}
