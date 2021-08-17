import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import URL_SERVICIOS from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private http: HttpClient,
  ) { }

  retrieveStatistics(): Promise<any>{
    const url = URL_SERVICIOS.statistics;

    return this.http.get(url).toPromise();
  }

  retrieveDailyOrders(): Promise<any>{
    const url = URL_SERVICIOS.dailyOrders;

    return this.http.get(url).toPromise();
  }

  retrieveRecentItems(): Promise<any>{
    const url = URL_SERVICIOS.recentSubmissions;

    return this.http.get(url).toPromise();
  }

  retrieveRecentProducts(): Promise<any>{
    const url = URL_SERVICIOS.recentProducts;

    return this.http.get(url).toPromise();
  }
}
