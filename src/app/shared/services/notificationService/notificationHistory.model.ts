export interface NotificationsFilterCriteria {
  PageNumber: number;
  PageSize: number;
  DateTo: string;
  DateFrom: string;
}

export interface NotificationHistoryResponse{
  Value: NotificationViewModel[]
}
export interface NotificationViewModel {
  notificationId: number;
  notificationText: string;
  notificationDate: string;
}
