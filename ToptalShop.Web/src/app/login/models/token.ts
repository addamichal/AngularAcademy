export class Token {
  '.issued': string;
  '.expires': string;
  access_token: string;
  expires_in: number;
  userName: string;
  token_type: string;
}

export interface Authenticate {
  email: string;
  password: string;
}
