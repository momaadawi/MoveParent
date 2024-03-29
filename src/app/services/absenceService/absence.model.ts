export interface AbsenceRequest {
  Id?: number;
  StudentsId: number[];
  StartDate: string;
  EndDate: string;
  Comment?: string;
  Name?: string;
  AbsenceReasonId?: number;
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
  AbsenceReasonId: number;
  AbsenceReasonEN: string;
  AbsenceReasonAR: string;
}
export interface Reasons{
  ReasonName: string,
  Value: number
}

export interface AbsenceReasons {
  Id: number;
  Name_AR: string;
  Name_EN: string;
}

export interface AbsenceReasonsResponse{
  IsErrorState: boolean;
  ErrorDescription: string;
  Exception: string;
  Value: AbsenceReasons[]
}
export interface SetStudentAbsentInProgressTripRequest {
  StudentId: number;
  AbsenceReasonId: number;
}
