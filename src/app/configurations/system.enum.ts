export namespace SystemEnum {

  export enum StudentStatus {
    NoShow = 1,
    Absent = 2,
    Onboard = 3,
    "Waiting  Pickup" = 4,
    "Dropped  off" = 6
  }
  export enum StudentTripStatus
  {
      Missed = 1,
      Absent = 2,
      OnBoard = 3,
      Notonboard = 4,
      Dropped = 6,
      BusArrived = 7
  }
  export enum UpdatePoiState{
    UpdatePickUpLocation = 1,
    updateDropOffLocation = 2
  }

  export enum ResponseAction{
    Success = 0,
    Failed = 1,
    Warning = 2
  }
  export enum Language{
    English = 'en',
    Arabic = 'ar'
  }
  export enum FMC_Notification{
    'Bus is arrived' = 0,
  }
  export enum PlanType{
    PickUp = 1,
    DropOff = 2
  }
  export enum ResponseMessage {
    invalid_Credentails = 'invalid credentails',
    lockedOut = 'locked out',
    NotFound = "NotFound"
  }
}

