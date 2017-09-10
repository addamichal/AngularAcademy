import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../catalog/models';

@Injectable()
export class ProductService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.productUrl;
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
