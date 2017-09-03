import { Address } from '../../login/models/user';

export class Profile {
  email: string;
  password: string;
  confirmPassword: string;
  billingAddress: Address;
  shippingAddress: Address;
}
