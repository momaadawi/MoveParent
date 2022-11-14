export interface AbsenceRequest {
  StudentsId: number[];
  StartDate: Date;
  EndDate: Date;
  Comment: string;
  Name: string;
}

export interface AbsenceResponse {
  IsErrorState: boolean;
  ErrorDescription: string;
  Exception: string;
}
