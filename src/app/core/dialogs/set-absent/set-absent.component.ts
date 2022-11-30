import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { SubSink } from 'subsink';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ParentStudent } from '../../../services/studentService/models/Students.model';
import { Configuration } from '../../../configurations/app.config';
import { cssClasses } from '../../../shared/cssClasses.conf';
import { CustomTranslateService } from 'src/app/shared/services/customTranslateService/custom-translate.service';
import { AbsenceService } from 'src/app/services/absenceService/absence.service';
import { AbsenceRequest } from 'src/app/services/absenceService/absence.model';

@Component({
  selector: 'app-set-absent',
  templateUrl: './set-absent.component.html',
  styleUrls: ['./set-absent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetAbsentComponent implements OnInit, OnDestroy {
  private _subSink = new SubSink()
  spinner: boolean = false;
  constructor(private _absenceService: AbsenceService,
              private _snakBar: MatSnackBar,
              public dialogRef: MatDialogRef<SetAbsentComponent>,
              private _customTransalte: CustomTranslateService,
              @Inject(MAT_DIALOG_DATA) public data: ParentStudent) { }

  ngOnInit(): void {

  }

  set_student_as_Absent(){
    let absenceRequest: AbsenceRequest = {
      StudentsId: [this.data.Id],
      StartDate: this.data.studentDetails.ActualDate,
      EndDate: this.data.studentDetails.ActualDate,
      Name: '',
      Comment: ''
    }
    let setAbsense_subscription  = this._absenceService.setAbsense(absenceRequest).subscribe({
      next: res => {
        if(res.IsErrorState)
          this._snakBar.open(res.ErrorDescription, '', { duration: Configuration.alertTime, panelClass: cssClasses.snackBar.faild })
        else
          this._snakBar.open(this._customTransalte.translate('snack-bar.student_set_absent'), '', { duration: Configuration.alertTime, panelClass: cssClasses.snackBar.success })
      }
    })
    this._subSink.add(setAbsense_subscription)
    }

  ngOnDestroy(): void {
    this._subSink.unsubscribe()
  }
}
