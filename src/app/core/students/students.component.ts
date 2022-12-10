import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { CallNumber } from 'capacitor-call-number';
import { StudentService } from '../../services/studentService/student.service';
import { SubSink } from 'subsink';
import { ParentStudent } from '../../services/studentService/models/Students.model';
import { DomSanitizer } from '@angular/platform-browser';
import { PlanService } from 'src/app/services/planService/plan.service';
import { SystemEnum } from 'src/app/configurations/system.enum';
import { MatDialog } from '@angular/material/dialog';
import { SetAbsentComponent } from '../dialogs/set-absent/set-absent.component';
import { CustomDialogService } from '../../shared/services/customDialogService/customDialog.service';
import { DilogIds } from 'src/app/configurations/dilaogs.config';
import { StudentDetails } from '../../services/planService/plan.model';
import { Browser } from '@capacitor/browser';
import { PushNotifications } from '@capacitor/push-notifications';
import { BusArrivalAlarmComponent } from '../dialogs/bus-arrival-alarm/bus-arrival-alarm.component';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  loader: boolean = false;
  expanded_StudentId: number = -1; // -1 mean that all expansion panels are closed it depends on student id

  allStudents: ParentStudent[] = [];
  students: { goToSchool: ParentStudent[]; backFromSchool: ParentStudent[]; }
    = { goToSchool: [], backFromSchool: [] }

  constructor(private _studentService: StudentService,
    private _planService: PlanService,
    private _dialog: MatDialog,
    private _customDialogService: CustomDialogService,
    private _zone: NgZone,
    private sanitizer: DomSanitizer,
    public platform: Platform) { }

  ngOnInit(): void {
    this.retriveStudents();
    if(this.platform.ANDROID || this.platform.IOS){
      PushNotifications.addListener('pushNotificationReceived', notification => {
        this._zone.run( () => {
          let config = this._customDialogService.defualtConfig()
          config.data = notification
          this._dialog.open(BusArrivalAlarmComponent, config)
        })
      })
    }
  }

  public retriveStudents() {
    this.loader = true;
    this.subs.add(
      this._studentService.get_Students().subscribe({
        next: res => {
          this.allStudents = res.Value;
        },
        complete: () => {
          this.allStudents.forEach(st => {
            this._planService.getPlan(st.Id).subscribe({
              next: planRes => {
                st.plan = planRes.Value;
                st.studentDetails = st.plan?.Students.filter(s => s.StudentId == st.Id)[0];
                st.ImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${st.Image}`);
                if (st.plan?.PlanType == SystemEnum.PlanType.PickUp)
                  this.students.goToSchool.push(st)
                if (st.plan?.PlanType == SystemEnum.PlanType.DropOff)
                  this.students.backFromSchool.push(st);
              },
              complete: () => {
                this.loader = false;
              }
            });
          });
        }
      })
    );
  }

  async call(phone: string) {
    await CallNumber.call({ number: phone, bypassAppChooser: true });
  }

  setAbsent(student: ParentStudent) {
    let config = this._customDialogService.defualtConfig()
    config.data = student
    config.id = DilogIds.Set_student_Absent
    this._dialog.open(SetAbsentComponent, config)
  }

  generate_student_status_Class_Style(studentStatus: number) {
    let cssClasses = 'student-status-btn btn btn-sm'
    switch (studentStatus) {
      case SystemEnum.StudentStatus.NoShow as number:
        return `btn-outline-danger ${cssClasses}`
      case SystemEnum.StudentStatus.Absent as number:
        return `btn-outline-secondary ${cssClasses}`
      case SystemEnum.StudentStatus.Onboard as number:
        return `btn-outline-success ${cssClasses}`
      case SystemEnum.StudentStatus['Waiting  Pickup'] as number:
        return `btn-outline-warning ${cssClasses}`
      case SystemEnum.StudentStatus['Dropped  off'] as number:
        return `btn-outline-success ${cssClasses}`

      default:
        return `btn-outline-primary ${cssClasses}`
    }
  }

  setAbsence_backgound(studentStatus: number): string {
    if (studentStatus == SystemEnum.StudentStatus.Absent as number) //absent
      return 'absent-student'
    return ''
  }

  toggle_expanding(studentId: number) {
    this.expanded_StudentId = studentId
  }

  redirect_to_googleMap(studentDetails: StudentDetails) {
    Browser.open({ url: `https://www.google.com/maps/search/?api=1&query=${studentDetails.Latitude},${studentDetails.Longtude}` });

  }

  refreshStudents(event: Subject<any>){
    event.next(this.retriveStudents())
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

}
