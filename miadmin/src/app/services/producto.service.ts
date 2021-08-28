import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import URL_SERVICIOS from 'src/app/config/config';
import { Router } from '@angular/router';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private _http: HttpClient,
  ) { }

  crearProducto (producto: any): Promise<any> {
    const url = URL_SERVICIOS.producto;
    return this._http.post<any>(url, producto).toPromise();
  }

  getAllProducts()
  {
    let url = URL_SERVICIOS.producto;
    return this._http.get(url);
  }


  getProduct(key:number)
  {
    let url = URL_SERVICIOS.producto + key + '/';
    
    return this._http.get(url);
  }

  getProductCategoriaSubcategoria(key:number)
  {
    let url = URL_SERVICIOS.producto_categoria_subcategoria + key + '/';
    
    return this._http.get(url);
  }


  actualizarProducto(producto:FormData, key:number){
    let url = URL_SERVICIOS.producto + key + '/';
    /*let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    }*/
    return this._http.put(url, producto/*, httpOptions*/);
  }
  


}
