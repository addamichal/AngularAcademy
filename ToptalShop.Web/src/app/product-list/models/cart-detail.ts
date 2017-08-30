import { Product } from './product';

export interface CartDetails {
  lines: CartDetailsLine[];
  total: number;
}

export interface CartDetailsLine {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subTotal: number;
}
