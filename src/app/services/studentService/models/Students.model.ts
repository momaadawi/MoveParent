import { Plan, PlanResponse, StudentDetails } from '../../planService/plan.model';
import { Observable } from 'rxjs';

export interface ParentStudent {
  studentDetails: StudentDetails;
  ImageRerouce: any;
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



