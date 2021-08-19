import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import URL_SERVICIOS from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {

  constructor(
    private http: HttpClient,
  ) { }

  getMembresiasById(id: string): Promise<any>{
    const url = URL_SERVICIOS.membresia + id + '/';;

    return this.http.get<any>(url).toPromise();
  }

  getMembresias(): Promise<any>{
    const url = URL_SERVICIOS.membresia;

    return this.http.get<any>(url).toPromise();
  }

  editMembresias(id: string, data: any): Promise<any>{
    const url = URL_SERVICIOS.membresia + id + '/';

    return this.http.put<any>(url, data).toPromise();
  }

  createMembresia(data: any): Promise<any>{
    const url = URL_SERVICIOS.membresia;

    return this.http.post(url, data).toPromise();
  }
}
