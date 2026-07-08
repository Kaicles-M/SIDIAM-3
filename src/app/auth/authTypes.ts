export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  schoolName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
