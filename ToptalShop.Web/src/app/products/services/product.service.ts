import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../models/Product';
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

  updateProduct(product: Product) {
    if (product.id) {
      const updateUrl = `${this.url}/${product.id}`;
      return this.httpClient.put<Product>(updateUrl, product);
    }
    return this.httpClient.post<Product>(this.url, product);
  }

  deleteProduct(id: string) {
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }
}
