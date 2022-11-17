import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm, FormControl } from '@angular/forms';
import { StudentService } from '../../services/studentService/student.service';
import { map } from 'rxjs/operators';
import { ParentStudent } from '../../services/studentService/models/Students.model';
import { AbsenceRequest } from '../../services/absenceService/absence.model';
import { AbsenceService } from '../../services/absenceService/absence.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cssClasses } from 'src/app/shared/cssClasses.conf';
import { Configuration } from '../../configurations/app.config';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-absence-plan',
  templateUrl: './absence-plan.component.html',
  styleUrls: ['./absence-plan.component.scss']
})
export class AbsencePlanComponent implements OnInit, OnDestroy {
  private _subSink = new SubSink();
  AbsenceForm: FormGroup = this.createAbsenceForm();
  students: ParentStudent[] = [];
  spinner: boolean = false;
  constructor(private _fb: FormBuilder,
    private _studentService: StudentService,
    private _absenceService: AbsenceService,
    private _snakBar: MatSnackBar) { }

  ngOnInit(): void {
    this._studentService.get_Students()
      .pipe(
        map(res => { return res.Value })).subscribe({
          next: res => this.students = res
        })
  }

  createAbsenceForm() {
    return this._fb.group({
      'StudentsId': [[], [Validators.required]],
      'StartDate': [Date, [Validators.required]],
      'EndDate': [Date, [Validators.required]],
      'Name': ['', [Validators.required]],
      'Comment': ['', Validators.required],
    })
  }

  save_absencec_plan(form: FormGroup) {
    this.spinner = true;
    let AbsenceRequest: AbsenceRequest = {
      StudentsId: form.get('StudentsId')?.value,
      StartDate: new Date(form.get('StartDate')?.value['year'], form.get('StartDate')?.value['month'], form.get('StartDate')?.value['day']),
      EndDate: new Date(form.get('EndDate')?.value['year'], form.get('EndDate')?.value['month'], form.get('EndDate')?.value['day']),
      Name: form.get('Name')?.value,
      Comment: form.get('Comment')?.value
    }
    this._subSink.add(
      this._absenceService.setAbsense(AbsenceRequest).subscribe({
        next: res => {
          if (res.IsErrorState)
            this._snakBar.open(res.ErrorDescription, 'X', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
          else if (!res.IsErrorState)
            this._snakBar.open('student set absent succsfully', 'X', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.success] })
        },
        error: err => {
          console.log(err)
          this._snakBar.open('something wrong try again!', 'X', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
        },
        complete: () => {
          this.spinner = false;
        }
      })
    )
  }
  ngOnDestroy(): void {
    this._subSink.unsubscribe()
  }

}
