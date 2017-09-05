export interface User {
  id: string;
  email: string;
  userRole: string;
}

export class SaveUserData {
  id: string;
  email: string;
  userRole: string;
  password: string;
  confirmPassword: string;
}
