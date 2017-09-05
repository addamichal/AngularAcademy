import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order, UpdateOrderStatus } from '../models/Order';
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

  deleteOrder(id: number) {
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  updateOrder(order: UpdateOrderStatus) {
    const updateUrl = `${this.url}/${order.id}`;
    return this.httpClient.put(updateUrl, order);
  }
}
