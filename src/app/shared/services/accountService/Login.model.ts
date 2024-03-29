export interface LoginResponse {
  IsErrorState: boolean;
  ErrorDescription: string;
  Value: LoginResponseDetails;
  Token: string;
}
export interface LoginResponseDetails {
  Fullname?: string;
  Name: string;
  OperatorId?: any;
  SubId: string;
  Id: string;
  IsConsumer: boolean;
  ParentId?: any;
  StaffId: string;
  Image: string;
}

export interface LoginRequest{
  UserName: string;
  Password: string;
  DeviceToken?: string;
}
