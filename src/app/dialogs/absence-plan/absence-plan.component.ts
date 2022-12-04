import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StudentService } from '../../services/studentService/student.service';
import { map } from 'rxjs/operators';
import { ParentStudent } from '../../services/studentService/models/Students.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cssClasses } from 'src/app/shared/cssClasses.conf';
import { Configuration } from '../../configurations/app.config';
import { SubSink } from 'subsink';
import { Observable, delay } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DilogIds } from '../../configurations/dilaogs.config';
import * as moment from 'moment';
import { CustomTranslateService } from 'src/app/shared/services/customTranslateService/custom-translate.service';
import { AbsenceService } from 'src/app/services/absenceService/absence.service';
import { AbsencePlan, AbsenceResponse, AbsenceRequest, Reasons } from 'src/app/services/absenceService/absence.model';

@Component({
  selector: 'app-absence-plan',
  templateUrl: './absence-plan.component.html',
  styleUrls: ['./absence-plan.component.scss']
})
export class AbsencePlanComponent implements OnInit, OnDestroy {
  private _subSink = new SubSink();
  spinner: boolean = false;
  reasons: Reasons[] = []
  AbsenceForm: FormGroup = this.createAbsenceForm();
  students: ParentStudent[] = [];

  constructor(private _fb: FormBuilder,
    private _studentService: StudentService,
    private _absenceService: AbsenceService,
    private _snackBar: MatSnackBar,
    private _customTranslate: CustomTranslateService,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private _data: AbsencePlan) { }

  ngOnInit(): void {
    this._absenceService.lookUp_reasons().subscribe({
      next: res => {
        this.reasons = res
      }
    })
    let getStudentSubscription = this._studentService.get_Students()
      .pipe(
        map(res => { return res.Value })).subscribe({
          next: res => this.students = res,
          complete: () => {
            this.seedForm()
          }
        })
      this._subSink.add(getStudentSubscription)
  }
  seedForm(): void {
    if (this._data!?.Id > 0) {
      this.AbsenceForm.patchValue({
        'StudentsId': this._data.StudentsId,
        'StartDate':  moment(this._data.StartDate).format('MM/DD/YYYY'),
        'EndDate': moment(this._data.EndDate).format('MM/DD/YYYY'),
        'Name': this._data.Name,
        'Comment': this._data.Comment
      })
    }else{
      this.AbsenceForm.reset()
    }
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
    if (!form.valid) {
      this._snackBar.open(this._customTranslate.translate('snack-bar.wrong_data'), '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
      return;
    }
    this.spinner = true;
    let AbsenceRequest: AbsenceRequest = {
      Id: this._data?.Id == null ? 0 : this._data?.Id,
      StudentsId: form.get('StudentsId')?.value ,
      StartDate: new Date(form.get('StartDate')?.value).toLocaleString(),
      EndDate: new Date(form.get('EndDate')?.value).toLocaleString(),
      Name: form.get('Name')?.value,
      Comment: form.get('Comment')?.value,
      DeletedStudents: this._data!?.Id == null ? [] : this._data.StudentsId.filter(x => !(form.get('StudentsId')?.value as number[]).includes(x))
    }
    let addOrUpdate: Observable<AbsenceResponse>;

    if (this._data?.Id > 0)
      addOrUpdate = this._absenceService.updateAbsence(AbsenceRequest)
    else
      addOrUpdate = this._absenceService.setAbsense(AbsenceRequest)

      let addUpdateSubscription = addOrUpdate.subscribe({
        next: res => {
          if (res.IsErrorState){
            this._snackBar.open(res.ErrorDescription, '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
            this._dialog.getDialogById(DilogIds.absence_plan)?.close()
          }
          else if (!res.IsErrorState) {
            this._dialog.getDialogById(DilogIds.absence_plan)?.close()
            this._snackBar.open(this._customTranslate.translate('snack-bar.student_set_absent_succsfully'), '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.success] })
            this._dialog.getDialogById(DilogIds.absence_list)?.componentInstance.retriveAbsences()
            form.reset();
          }
        },
        error: err => {
          this._snackBar.open(this._customTranslate.translate('snack-bar.something_wrong_retry_again'), '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
        },
        complete: () => {
          this.spinner = false;
        }
      })
      this._subSink.add(addUpdateSubscription)
  }

  ngOnDestroy(): void {
    this.AbsenceForm.reset()
    this._subSink.unsubscribe()
  }
}
