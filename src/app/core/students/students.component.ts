import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CallNumber } from 'capacitor-call-number';
import { StudentService } from '../../services/studentService/student.service';
import { SubSink } from 'subsink';
import { ParentStudent } from '../../services/studentService/models/Students.model';
import { DomSanitizer } from '@angular/platform-browser';
import { PlanService } from 'src/app/services/planService/plan.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentsComponent implements OnInit, OnDestroy {
  absence_backGround: string =  'white'
  private subs = new SubSink();
  loader: boolean = false;
  panelOpenState = false;
  allStudents: ParentStudent[] = [];
  backFromSchool: ParentStudent[] = []
  students: { goToSchool: ParentStudent[]; backFromSchool: ParentStudent[]; }
    = { goToSchool: [], backFromSchool: [] }

  constructor(private _studentService: StudentService,
    private _planService: PlanService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.retriveStudents();
  }

  private retriveStudents() {
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
                if (st.plan?.PlanType == 1)
                  this.students.goToSchool.push(st)
                if (st.plan?.PlanType == 2)
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
    // this._dialog.open(SetAbsetntComponent, {data: student})
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
  generate_student_status_Class_Style(studentStatus: number) {
    if (studentStatus == 1) //no show
      return 'btn-outline-danger student-status-btn btn btn-sm'
    if (studentStatus == 2) //Absent
      return 'btn-outline-secondary student-status-btn btn btn-sm'
    if (studentStatus == 3) //Onboard
      return 'btn-outline-success student-status-btn btn btn-sm'
    if (studentStatus == 4) //wating pickup
      return 'btn-outline-danger student-status-btn btn btn-sm'
    if (studentStatus == 6) //Dropped  off
      return 'btn-outline-success student-status-btn btn btn-sm'

    return 'btn-outline-success student-status-btn btn btn-sm'

  }
  setAbsence_backgound(studentStatus: number):string{
    if(studentStatus == 2) //absent
      return 'absent-student'
    return ''
  }
}
