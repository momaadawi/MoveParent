export interface AbsenceRequest {
  Id?: number;
  StudentsId: number[];
  StartDate: string;
  EndDate: string;
  Comment?: string;
  Name?: string;
  DeletedStudents?: number[]
}


export interface AbsenceResponse {
  IsErrorState: boolean;
  ErrorDescription: string;
  Exception: string;
  Value: AbsencePlan[];
}

export interface AbsencePlan {
  StudentsId: number[];
  DeletedStudents?: any;
  StartDate: Date;
  EndDate: Date;
  Comment: string;
  Name: string;
  Id: number;
}
