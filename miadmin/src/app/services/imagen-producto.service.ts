import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import URL_SERVICIOS from 'src/app/config/config';
import { Router } from '@angular/router';
import { map, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ImagenProductoService {
  private httpOptions: any;


  constructor(
    private _http: HttpClient,
  ) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: '',
      })
    };
  }

  createImagenProducto(img_producto: any): Promise<any> {
    const url = URL_SERVICIOS.imagen_producto;
    return this._http.post<any>(url, img_producto).toPromise();
  }

}
