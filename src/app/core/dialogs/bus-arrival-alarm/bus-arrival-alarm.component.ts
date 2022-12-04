import { Component, OnInit } from '@angular/core';
import { Haptics, VibrateOptions } from '@capacitor/haptics';

@Component({
  selector: 'app-bus-arrival-alarm',
  templateUrl: './bus-arrival-alarm.component.html',
  styleUrls: ['./bus-arrival-alarm.component.scss']
})
export class BusArrivalAlarmComponent implements OnInit {
  ngOnInit(): void {
   this.vibrate()
  }
  vibrate(){
      Haptics.vibrate();
   };

}
