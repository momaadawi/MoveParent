export interface RouteLine {
  LineGeometry: string;
}

export interface Route {
  RouteStyle: string;
  POITypeId: number;
  BufferSize: number;
  RouteLine: RouteLine;
  TotalTime: number;
  TotalDistance: number;
  RouteName: string;
}

export interface StudentDetails {
  StudentId: number;
  StudentName: string;
  Longtude: string;
  Latitude: string;
  Image?: any;
  StudentStatusId: number;
  StudnetStatusName: string;
  StudentArrivedTime: string;
  StudentDropOffTime: string;
  StudentPickupTime: string;
  StudentOrder: number;
  PlannedDate: Date;
  ActualDate?: any;
}

export interface Plan {
  Route: Route;
  DriverName: string;
  DriverImage: string;
  DriverMobileNumber: string;
  SuperVisorName: string;
  SuperVisorImage: string;
  SuperVisorMobileNumber: string;
  PlanType: number;
  TripStartTime: string;
  TripEndTime: string;
  TripDurationMins: number;
  TripMileage: number;
  TripStudentsCount: number;
  BusId: string;
  BusCode: string;
  PlateNo: string;
  Students: StudentDetails[];
}

export interface PlanResponse {
  IsErrorState: boolean;
  Value: Plan;
}
