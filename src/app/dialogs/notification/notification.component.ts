import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/services';
import { NotificationViewModel, NotificationsFilterCriteria } from '../../shared/services/notificationService/notificationHistory.model';
import moment from 'moment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit {
  loader: boolean = false;
  notification!: NotificationViewModel[];
  constructor(private _notificationService: NotificationService) { }

  ngOnInit(): void {

  }


  private retriveNotifications(model: NotificationsFilterCriteria) {
    this.loader = true;
    this._notificationService.GetHistoryNotification(model).subscribe({
      next: res => {
        this.notification = res.Value;
      },
      complete: () => {
        this.loader = false;
      }
    });
  }
  dateChanged(event: any){
    let model: NotificationsFilterCriteria = {
      PageNumber: 1,
      PageSize: 10,
      DateFrom: moment(event.value[0]).format('MM/DD/YYYY'),
      DateTo: moment(event.value[1]).format('MM/DD/YYYY'),
      // DateTo: moment().subtract(10, 'day').format('MM/DD/YYYY')
    }
    this.retriveNotifications(model);
  }
}
