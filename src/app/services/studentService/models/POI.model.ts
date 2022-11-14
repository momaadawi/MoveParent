export interface UpdatePOIRequest{
  StudentId: number;
  PickLocationLongitude: string;
  PickLocationLatitude: string;
  DropOffLatitude: string;
  DropOffLongitude: string;
}

export interface UpdatePOIResponse{
  IsErrorState: string;
  ErrorDescription: string
}
