import { Injectable, OnInit } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { CookieService } from 'ngx-cookie-service';
import { Configuration } from '../../../configurations/app.config';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogService } from '../customDialogService/customDialog.service';
import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { NotificationsFilterCriteria, NotificationHistoryResponse } from './notificationHistory.model';
import { environment } from '../../../../environments/environment.prod';

@Injectable()
export class NotificationService implements OnInit {

  constructor(private _cookies: CookieService, private _http: HttpClient) { }
  ngOnInit(): void {
  }

  async initPushNotification() {

      await PushNotifications.addListener('registration', token => {
        this._cookies.set(Configuration.cookies.DeviceToken, token.value)
        console.info('Registration token: ', token.value);
      });

      await PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err.error);
      });

      await PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push notification received: ', notification);
      });

      await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });

      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();

      const notificationList = await PushNotifications.getDeliveredNotifications();
      console.log('delivered notifications', notificationList);
    }

  async pushServiceLisetner() {
    // await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    //   console.log('Push notification action performed', notification.actionId, notification.inputValue);
    // });

    // let permStatus = await PushNotifications.checkPermissions();

    // if (permStatus.receive === 'prompt') {
    //   permStatus = await PushNotifications.requestPermissions();
    // }

    // if (permStatus.receive !== 'granted') {
    //   throw new Error('User denied permissions!');
    // }

    // await PushNotifications.register();

    // const notificationList = await PushNotifications.getDeliveredNotifications();
    // console.log('delivered notifications', notificationList);
  }

  async unInitlize_Notification() {
  }

  GetHistoryNotification(model: NotificationsFilterCriteria){
    return this._http.post<NotificationHistoryResponse>(environment.api + Configuration.api.Notification.GetHistoryNotification, model)
  }
}
