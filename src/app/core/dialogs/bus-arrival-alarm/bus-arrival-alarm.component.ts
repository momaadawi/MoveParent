import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Haptics, VibrateOptions } from '@capacitor/haptics';
import { PushNotificationSchema } from '@capacitor/push-notifications';

@Component({
  selector: 'app-bus-arrival-alarm',
  templateUrl: './bus-arrival-alarm.component.html',
  styleUrls: ['./bus-arrival-alarm.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BusArrivalAlarmComponent implements OnInit {
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
