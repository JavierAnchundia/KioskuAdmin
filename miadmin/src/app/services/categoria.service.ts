import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import URL_SERVICIOS from 'src/app/config/config';
import { Router } from '@angular/router';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient,

  ) { }


  getCategorias() {
    let url = URL_SERVICIOS.categoria;
    
    return this.http.get(url);
  }

  deleteCategoria(key:number)
  {
    let url = URL_SERVICIOS.categoria + key + '/';
    
    return this.http.delete(url);
    
  }

  getCategoria(key:number){
    let url = URL_SERVICIOS.categoria + key + '/';
    return this.http.get(url);

  }

  actualizarCategoria(categoria:FormData, key:number){
    let url = URL_SERVICIOS.categoria + key + '/';
    /*let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    }*/
    return this.http.put(url, categoria/*, httpOptions*/);
  }

  crearCategoria(categoria:FormData)
  {
    let url = URL_SERVICIOS.categoria;
    /*let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    }*/
    return this.http.post(url, categoria/*, httpOptions*/);
  }

}
