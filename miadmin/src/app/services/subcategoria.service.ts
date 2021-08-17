import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import URL_SERVICIOS from 'src/app/config/config';
import { Router } from '@angular/router';
import { map, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  constructor(
    private http: HttpClient,
  ) { }

  getSubcategorias(categoriaKey:number)
  {
    let url = URL_SERVICIOS.subcategoria_categoria + categoriaKey + '/';
    
    return this.http.get(url);
    
  }

  getAllSubcategorias()
  {
    let url = URL_SERVICIOS.subcategoria;
    
    return this.http.get(url);
    
  }

  deleteSubcategoria(key:number)
  {
    let url = URL_SERVICIOS.subcategoria + key + '/';
    
    return this.http.delete(url);
    
  }

  createSubcategoria(subCategoria:FormData)
  {
    let url = URL_SERVICIOS.subcategoria;
    /*let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    }*/
    return this.http.post(url, subCategoria/*, httpOptions*/);
  }

  actualizarSubcategoria(subCategoria:FormData, key:number){
    let url = URL_SERVICIOS.subcategoria + key + '/';
    /*let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    }*/
    return this.http.put(url, subCategoria/*, httpOptions*/);
  }
}
