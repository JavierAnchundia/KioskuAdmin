import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import URL_SERVICIOS from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(
    private http: HttpClient,
  ) { }


  retrieveOrdersPendings(): Promise<any>{
    const url = URL_SERVICIOS.ordenesPendientes;

    return this.http.get(url).toPromise();
  }

  retrieveMyDeliveries(id: string): Promise<any>{
    const url = URL_SERVICIOS.misEntregas + id + '/';

    return this.http.get(url).toPromise();
  }

  updateOrderDeliveryMan(id: string, deliveryMan: any): Promise<any>{
    const url = URL_SERVICIOS.estadoCompra + id + '/';

    return this.http.put(url, deliveryMan).toPromise();
  }

  updateOrderStatus(id: string, status: any): Promise<any>{
    const url = URL_SERVICIOS.estadoCompra + id + '/';

    return this.http.put(url, status).toPromise();
  }
}
