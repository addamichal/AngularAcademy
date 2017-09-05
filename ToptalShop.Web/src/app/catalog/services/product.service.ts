import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.productUrl;
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }
}
