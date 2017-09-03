export class Profile {
  billingAddress: Address;
  shippingAddress: Address;
}

export class Address {
  firstName: string;
  lastName: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
}
