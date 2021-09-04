import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import URL_SERVICIOS from 'src/app/config/config';
import { Router } from '@angular/router';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TarifaEntregaService {

  constructor(
    private http: HttpClient,
  ) { }

  
  getTarifaEntrega()
  {
    let url = URL_SERVICIOS.tarifa_entrega;
    
    return this.http.get(url);
    
  }

  updateTarifaEntrega(tarifa_entrega:FormData)
  {
    let url = URL_SERVICIOS.tarifa_entrega;
    /*let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken(),
      })
    }*/
    return this.http.put(url, tarifa_entrega/*, httpOptions*/);
  }
}
