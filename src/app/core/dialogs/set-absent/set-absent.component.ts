import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject, ComponentRef } from '@angular/core';
import { SubSink } from 'subsink';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ParentStudent } from '../../../services/studentService/models/Students.model';
import { CustomTranslateService } from 'src/app/shared/services/customTranslateService/custom-translate.service';
import { AbsenceService } from 'src/app/services/absenceService/absence.service';
import { AbsenceRequest, Reasons } from 'src/app/services/absenceService/absence.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DilogIds } from '../../../configurations/dilaogs.config';
import { CustomDialogService } from '../../../shared/services/customDialogService/customDialog.service';
import { TranslateService } from '@ngx-translate/core';
import { SystemEnum } from 'src/app/configurations/system.enum';
import { SnackbarService } from '../../../shared/services/snackbarService/snackbar.service';
import { map, reduce, tap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { SetStudentAbsentInProgressTripRequest } from '../../../services/absenceService/absence.model';

@Component({
  selector: 'app-set-absent',
  templateUrl: './set-absent.component.html',
  styleUrls: ['./set-absent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetAbsentComponent implements OnInit, OnDestroy {
  private _subSink = new SubSink()
  saved: boolean = false;
  AbsentForm: FormGroup = this.CreateForm()
  reasons: Reasons[] = []
  spinner: boolean = false;
  constructor(private _absenceService: AbsenceService,
              public dialogRef: MatDialogRef<SetAbsentComponent>,
              private _customTransalte: CustomTranslateService,
              private _transalte: TranslateService,
              private _dialog: MatDialog,
              private _customSnackBar: SnackbarService,
              private _fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: ParentStudent) {
              }

  ngOnInit(): void {
    this._absenceService.lookUp_reasons().subscribe({
      next: res => {
        res.Value.forEach(r => {
          this._transalte.currentLang == SystemEnum.Language.Arabic ?
             this.reasons.push({ Value: r.Id, ReasonName: r.Name_AR }) :
             this.reasons.push({ Value: r.Id, ReasonName: r.Name_EN })
        })
      }
    })
  }
  private CreateForm(): FormGroup<any> {
    return this._fb.group({
      'StudentsId': [this.data.Id, Validators.required],
      'Name': ['', Validators.required]
    });
  }

  set_student_as_Absent(form: FormGroup){
    if(!form.valid){
      this._customSnackBar.open(this._customTransalte.translate('snack-bar.please_select_reason'), SystemEnum.ResponseAction.Failed)
      // this._snakBar.open(this._customTransalte.translate('snack-bar.please_select_reason'),'', { duration: Configuration.alertTime, panelClass: cssClasses.snackBar.faild})
      return
    }
    this.spinner = true
    let absenceRequest: SetStudentAbsentInProgressTripRequest = {
      StudentId: this.data.Id,
      AbsenceReasonId: form.get('Name')?.value,
    }
    let setAbsense_subscription  = this._absenceService.SetStudentAbsentInProgressTrip(absenceRequest).subscribe({
      next: res => {
        if(res.IsErrorState)
         this._customSnackBar.open(this._customTransalte.translate('snack-bar.something_wrong_retry_again'), SystemEnum.ResponseAction.Failed)
          // this._snakBar.open(res.ErrorDescription, '', { duration: Configuration.alertTime, panelClass: cssClasses.snackBar.faild })
        else{
            this.saved = true
            this._customSnackBar.open(this._customTransalte.translate('snack-bar.student_set_absent'), SystemEnum.ResponseAction.Success)
            // this._snakBar.open(this._customTransalte.translate('snack-bar.student_set_absent'), '', { duration: Configuration.alertTime, panelClass: cssClasses.snackBar.success })
        }

      },
      error: (err) =>{
        // this._customSnackBar.open(this._customTransalte.translate('snack-bar.something_wrong_retry_again'), SystemEnum.ResponseAction.Failed)
        // this._snakBar.open(this._customTransalte.translate('snack-bar.something_wrong_retry_again'), '', { duration: Configuration.alertTime, panelClass: cssClasses.snackBar.faild})
      },
      complete: () => {
        this.spinner = false
        this._dialog.getDialogById(DilogIds.Set_student_Absent)?.close()
      }
    })
    this._subSink.add(setAbsense_subscription)
    }

  ngOnDestroy(): void {
    this._subSink.unsubscribe()
  }
}
