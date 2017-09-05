export interface Authenticate {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  userRole: string;
  billingAddress: Address;
  shippingAddress: Address;
}

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}
