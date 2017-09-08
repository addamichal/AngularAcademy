import { Address } from '../../login/models';

export interface Order {
  id: number;
  email: string;
  totalPrice: number;
  status: string;
  billingAddress: Address;
  shippingAddress: Address;
  lines: OrderLine[];
  created: string;
  modified: string;
}

export interface OrderLine {
  productId: number;
  description: string;
  quantity: number;
  unitPrice: number;
  price: number;
}

export interface UpdateOrderStatus {
  id: number;
  status: string;
}
