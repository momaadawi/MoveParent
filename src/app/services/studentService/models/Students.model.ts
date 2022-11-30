import { Observable } from 'rxjs';
import { Plan, StudentDetails } from '../../planService/plan.model';

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
  plan: Plan
}

export interface ParentStudentsResponse {
  IsErrorState: boolean;
  Value: ParentStudent[];
}



