import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import URL_SERVICIOS from 'src/app/config/config';
import { Router } from '@angular/router';
import { map, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(
    private _http: HttpClient,
  ) { }


  getEstado(estado:string) {
    let url = URL_SERVICIOS.estado_id + estado + '/';
    return this._http.get(url);
  }

  uptdateEstado(estado:FormData, key:number)
  {
    let url = URL_SERVICIOS.estado + key + '/';
    
    return this._http.put(url, estado/*, httpOptions*/);
  }

 
}
