import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import URL_SERVICIOS from 'src/app/config/config';
import { Router } from '@angular/router';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private _http: HttpClient,
  ) { }

  getItemUnassigned() {
    let url = URL_SERVICIOS.itemunassigned;
    
    return this._http.get(url);
  }

  getItemsUserAccepted()
  {
    let url = URL_SERVICIOS.items_user_accepted;
    
    return this._http.get(url);
  }

  getItemAssigned(key:number) {
    let url = URL_SERVICIOS.itemassigned + key + '/';
    
    return this._http.get(url);
  }

  asignaradminItem(adminItem:FormData)
  {
    let url = URL_SERVICIOS.adminItem;
    /*let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    }*/
    return this._http.post(url, adminItem/*, httpOptions*/);

  }

  getItem(key:number)
  {
    let url = URL_SERVICIOS.item + key + '/';
    
    return this._http.get(url);
  }

  getItemImagenes(key:number)
  {
    let url = URL_SERVICIOS.item_imagen + key + '/';
    
    return this._http.get(url);

  }

  actualizarItem(item:FormData, key:number)
  {
    let url = URL_SERVICIOS.item + key + '/';
    
    return this._http.put(url, item/*, httpOptions*/);

  }

}
