import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from '../models/Order';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.orderUrl;
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.url);
  }
}
