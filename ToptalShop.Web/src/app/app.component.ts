import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as products from './product-list/actions/products';
import * as fromRoot from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
