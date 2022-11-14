export interface ChangePasswordRequest {
  password: string;
  userName: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  IsErrorState: boolean;
  ErrorDescription: string;
  Value: any;
}
