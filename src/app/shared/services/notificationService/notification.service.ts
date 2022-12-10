import { Injectable, OnInit } from '@angular/core';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { CookieService } from 'ngx-cookie-service';
import { Configuration } from '../../../configurations/app.config';
import { BusArrivalAlarmComponent } from '../../../core/dialogs/bus-arrival-alarm/bus-arrival-alarm.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogService } from '../customDialogService/customDialog.service';
import { Platform } from '@angular/cdk/platform';

@Injectable()
export class NotificationService implements OnInit {

  constructor(private _cookies: CookieService,
    private _dialog: MatDialog,
    private _customDialog: CustomDialogService,
    private platform: Platform) { }
  ngOnInit(): void {
  }

  async initPushNotification() {
    if (!this.platform.ANDROID || !this.platform.IOS)
      return

    await PushNotifications.addListener('registration', token => {
      this._cookies.set(Configuration.cookies.DeviceToken, token.value)
      console.info('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

  }
  async pushServiceLisetner() {
    if (!this.platform.ANDROID || !this.platform.IOS)
      return

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

  async unInitlize_Notification() {
  }
}
