import { Observable } from 'rxjs';
import { Plan, StudentDetails } from '../../planService/plan.model';
import { Student } from './student.model';

export interface ParentStudent {
  studentDetails: StudentDetails;
  ImageUrl: any;
  Id: number;
  Name: string;
  Image: string;
  LiveStatus: number;
  Latitude: number;
  Longitude: number;
  ActualDate: Date;
  TimeZone: string;
  plan: Plan;
  StudentInfo?: Student;
}

export interface ParentStudentsResponse {
  IsErrorState: boolean;
  Value: ParentStudent[];
}



