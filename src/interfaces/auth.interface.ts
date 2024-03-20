export interface IAuthState {
  user: AuthResult;
}

export interface AuthResult {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  phone: string;
  login: string;
  organization: number;
  token: string;
  user_id: string;
  is_root: boolean;
}

export interface UserSigninData {
  login: string;
  password: string;
}
export interface UserSignupData {
  first_name: string;
  last_name: string;
  phone: string;
  login: string;
  password: string;
  organization: number;
}

export interface CodeResponse {
  id: number;
  packed_at: string;
  mark: string;
  item: string;
  assigned_by: string;
  assigned_at: string;
}
