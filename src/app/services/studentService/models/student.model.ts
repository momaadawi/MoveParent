
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


