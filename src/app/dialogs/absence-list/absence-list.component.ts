import { Component, Inject, OnInit, TemplateRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { AbsencePlanComponent } from '../absence-plan/absence-plan.component';
import { DilogIds } from '../../configurations/dilaogs.config';
import { CustomDialogService } from '../../shared/services/customDialogService/customDialog.service';
import { CustomTranslateService } from 'src/app/shared/services/customTranslateService/custom-translate.service';
import { AbsencePlan } from 'src/app/services/absenceService/absence.model';
import { AbsenceService } from 'src/app/services/absenceService/absence.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '../../shared/services/snackbarService/snackbar.service';
import { SystemEnum } from 'src/app/configurations/system.enum';

@Component({
  selector: 'app-absence-list',
  templateUrl: './absence-list.component.html',
  styleUrls: ['./absence-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AbsenceListComponent implements OnInit, OnDestroy {
  culture: string = 'en'
  private _subsink = new SubSink();
  spinner: boolean = false;
  loader: boolean = false;
  $absences!: Observable<AbsencePlan[]>
  constructor(private _absenceService: AbsenceService,
    private _customSnackBar: SnackbarService,
    private _dialog: MatDialog,
    private _customTranslate: CustomTranslateService,
    private _dialogService: CustomDialogService,
    private _transalte: TranslateService,
    @Inject(MAT_DIALOG_DATA) public deleteId: number) { }

  ngOnInit(): void {
    this.culture = this._transalte.currentLang
    this.retriveAbsences()
  }

  retriveAbsences() {
    this._dialog.getDialogById(DilogIds.absence_plan)?.close()
    this.loader = true;
    let absenceSubscription = this._absenceService.getAbsence().subscribe({
      next: res => {
        this.$absences = of(res.Value)
      },
      error: err => {
      },
      complete: () => {
        this.loader = false;
      }
    })
    this._subsink.add(absenceSubscription)
  }
  openDialogWithTemplateRef(templateRef: TemplateRef<any>, absenceId: number) {
    let config = this._dialogService.defualtConfig();
    config.id = DilogIds.absence_delete;
    config.data = absenceId
    this.deleteId = absenceId;
    this._dialog.open(templateRef, config);
  }
  open_add_absence() {
    let config = this._dialogService.fullSize_dialogConfig();
    config.id = DilogIds.absence_plan
    config.data = null
    this._dialog.open(AbsencePlanComponent, config)
  }

  edit_absence(absenecePlan: AbsencePlan) {
    let config = this._dialogService.fullSize_dialogConfig();
    config.data = absenecePlan
    config.id = DilogIds.absence_plan
    config.direction = this._customTranslate.direction()
    this._dialog.open(AbsencePlanComponent, config)
  }
  delete_absence() {
    this.spinner = true;
    let deleteSubscription = this._absenceService.deleteAbsence(this.deleteId).subscribe({
      next: res => {
        if (res.IsErrorState)
          this._customSnackBar.open(res.ErrorDescription, SystemEnum.ResponseAction.Failed)
          // this._snackBar.open(res.ErrorDescription, '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
        else if (!res.IsErrorState) {
          this._customSnackBar.open(this._customTranslate.translate('snack-bar.success_absence_delete'), SystemEnum.ResponseAction.Success)
          // this._snackBar.open(this._customTranslate.translate('snack-bar.success_absence_delete'), '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.success] })
          this._dialog.getDialogById(DilogIds.absence_delete)?.close()
          this.retriveAbsences()
        }
      },
      error: err => {
        console.log(err)
        this.spinner = false;
        this._customSnackBar.open(this._customTranslate.translate('snack-bar.something_wrong_retry_again'), SystemEnum.ResponseAction.Failed)
        // this._snackBar.open('success', '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
      },
      complete: () => { this.spinner = false }
    })
    this._subsink.add(deleteSubscription);
  }
  ngOnDestroy(): void {
    this._subsink.unsubscribe()
  }
}
