import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Haptics, VibrateOptions } from '@capacitor/haptics';
import { PushNotificationSchema } from '@capacitor/push-notifications';

@Component({
  selector: 'app-bus-arrival-alarm',
  templateUrl: './popup-notification.component.html',
  styleUrls: ['./popup-notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PopUpNotification implements OnInit {
  notification: PushNotificationSchema = {
    id: '',
    data: '',
    body: '',
    title: ''
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: PushNotificationSchema) { }
  ngOnInit(): void {
    this.notify();
    this.vibrate()
  }

  async vibrate() {
     await Haptics.vibrate();
  }

  private notify() {
    this.data == null || this.data == undefined ?
      this.notification = {
        id: '',
        data: '',
        body: '',
        title: ''
      } :
      this.notification = this.data;
  }

}
