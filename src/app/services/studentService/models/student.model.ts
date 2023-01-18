
  export interface Student {
      Id: number;
      Name: string;
      Grade: string;
      Class: string;
      Brach: string;
      IsBusSubscriped: boolean;
      HasActivePlan: boolean;
      PickLocationLongitude: string;
      PickLocationLatitude: string;
      DropOffLatitude: string;
      DropOffLongitude: string;
      BirthDate: Date;
  }

  export interface StudentResponse {
      IsErrorState: boolean;
      ErrorDescription: string;
      Exception: string
      Value: Student;
  }
  export interface StudentsTripsHistoryRequest {
    Id: number;
    DateFrom: string;
    DateTo: string;
}
export interface StudentTripsHistoryViewResponse{
  IsErrorState: boolean;
  ErrorDescription: string;
  Exception: string;
  Value: StudentTripsHistoryViewValue
}
export interface StudentTripsHistoryViewValue {
  Id: number;
  StartTime: string;
  EndTime: string;
  DriverName: string;
  SupervisorName: string;
  BusPlateNumber: string;
  TripMileage: number;
  TripDurationMins: number;
}

