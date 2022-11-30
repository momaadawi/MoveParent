export namespace SystemEnum {

  export enum StudentStatus {
    NoShow = 1,
    Absent = 2,
    Onboard = 3,
    "Waiting  Pickup" = 4,
    "Dropped  off" = 5
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
}

