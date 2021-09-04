import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import URL_SERVICIOS from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(
    private http: HttpClient,
  ) { }

  getAnuncioById(id: string): Promise<any>{
    const url = URL_SERVICIOS.anuncio + id + '/';;

    return this.http.get<any>(url).toPromise();
  }

  getAnuncios(): Promise<any>{
    const url = URL_SERVICIOS.anuncio;

    return this.http.get<any>(url).toPromise();
  }

  editAnuncio(id: string, data: any): Promise<any>{
    const url = URL_SERVICIOS.anuncio + id + '/';

    return this.http.put<any>(url, data).toPromise();
  }

  createanuncio(data: any): Promise<any>{
    const url = URL_SERVICIOS.anuncio;

    return this.http.post(url, data).toPromise();
  }

  deleteAnuncio(id: string): Promise<any>{
    const url = URL_SERVICIOS.anuncio + id + '/';

    return this.http.delete(url).toPromise();
  }
}
