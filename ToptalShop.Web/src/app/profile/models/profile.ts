export class Profile {
  firstName: string;
  lastName: string;
  billingAddress: Address;
  shippingAddress: Address;
}

export class Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
}
