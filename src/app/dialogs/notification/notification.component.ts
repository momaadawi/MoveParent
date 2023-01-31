import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/services';
import { NotificationViewModel, NotificationsFilterCriteria } from '../../shared/services/notificationService/notificationHistory.model';
import moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit {
  loader: boolean = false;
  @ViewChild('datePicker') datePicker:any;
  notification!: NotificationViewModel[];
  notificationFormCriteria: FormGroup = this.createForm()

  constructor(private _notificationService: NotificationService,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.seedForm();
    let model: NotificationsFilterCriteria = {
      PageNumber: this.notificationFormCriteria.controls['PageNumber'].value,
      PageSize: this.notificationFormCriteria.controls['PageSize'].value,
      DateFrom: moment(new Date()).format('YYYY/MM/DD'),
      DateTo: moment(new Date()).format('YYYY/MM/DD'),
    }
    this.retriveNotifications(model);

  }

  dateChanged(event: any){
    let model: NotificationsFilterCriteria = {
      PageNumber: this.notificationFormCriteria.controls['PageNumber'].value,
      PageSize: this.notificationFormCriteria.controls['PageSize'].value,
      DateFrom: moment(event.value).format('YYYY/MM/DD'),
      DateTo: moment(event.value).format('YYYY/MM/DD'),
    }
    this.retriveNotifications(model);
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
  private createForm() {
    return this._fb.group({
      'DateFrom': ['', Validators.required],
      'DateTo': [''],
      'PageNumber': [''],
      'PageSize': ['']
    });
  }
  private seedForm(){
    this.notificationFormCriteria.patchValue({
      'DateFrom': moment(new Date()).format('MM/DD/YYYY'),
      'DateTo': moment(new Date()).format('MM/DD/YYYY'),
      'PageNumber': 1,
      'PageSize': 50
    })
  }
  openCalendar(event: any) {
    this.datePicker.showOverlay(this.datePicker.inputfieldViewChild.nativeElement);
  }
}
