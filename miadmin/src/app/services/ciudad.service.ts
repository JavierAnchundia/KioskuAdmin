import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import URL_SERVICIOS from 'src/app/config/config';
import { Router } from '@angular/router';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(
    private _http: HttpClient,
  ) { }

  getCiudades() {
    let url = URL_SERVICIOS.ciudad;
    
    return this._http.get(url);
  }

}
