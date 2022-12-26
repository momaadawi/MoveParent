import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../shared/services/accountService/account.service';
import { CookieService } from 'ngx-cookie-service';
import { Configuration } from '../../configurations/app.config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { MatDialog } from '@angular/material/dialog';
import { cssClasses } from '../../shared/cssClasses.conf';
import { CustomTranslateService } from 'src/app/shared/services/customTranslateService/custom-translate.service';
import { SnackbarService } from '../../shared/services/snackbarService/snackbar.service';
import { SystemEnum } from 'src/app/configurations/system.enum';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (control.value !== matchingControl.value)
      matchingControl.setErrors({ confirmedValidator: true });
    else
      matchingControl.setErrors(null);
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  private _subSink = new SubSink();
  resetPassForm: FormGroup;
  spinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _cookieService: CookieService,
    private _snackBar: MatSnackBar,
    private _customSnackBar: SnackbarService,
    private _router: Router,
    private _dialog: MatDialog,
    private _customTranslate: CustomTranslateService) {
    this.resetPassForm = this.formBuilder.group({
      'oldPassword': ['', Validators.required],
      'newPassword': ['', [Validators.required]],
      'confirmPassword': ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmPassword')
    });
  }
  ngOnInit(): void {}

  submit() {
    this.spinner = true;
    if (!this.resetPassForm.valid) {
      this._customSnackBar.open(this._customTranslate.translate('snack-bar.please_check_password'), SystemEnum.ResponseAction.Failed)
      // this._snackBar.open(this._customTranslate.translate('snack-bar.please_check_password'), '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
      this.spinner = false;
      return
    }
     let changePassword_subscription =  this._accountService.changePassword({
        userName: this._cookieService.get(Configuration.cookies.UserName),
        password: this.resetPassForm.controls['oldPassword'].value,
        newPassword: this.resetPassForm.controls['newPassword'].value
      }).subscribe({
        next: res => {
          if (res.IsErrorState)
          this._customSnackBar.open(res.Value, SystemEnum.ResponseAction.Failed)
            // this._snackBar.open(res.Value, '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
          else if (!res.IsErrorState && res.Value == 'Success') {
            this._customSnackBar.open(this._customTranslate.translate('snack-bar.password_changed_sucessfully'), SystemEnum.ResponseAction.Success)
            // this._snackBar.open(this._customTranslate.translate('snack-bar.password_changed_sucessfully'), '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.success] })
            this._router.navigate(['login'])
            this._dialog.closeAll();
          }
        },
        error: err => {
          console.log(err)
          // this._customSnackBar.open(this._customTranslate.translate('snack-bar.something_wrong_retry_again'), SystemEnum.ResponseAction.Failed)
          // this._snackBar.open(this._customTranslate.translate('snack-bar.something_wrong_retry_again'), '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
        }
      })
    this.spinner = false;
    this._subSink.add(changePassword_subscription)
  }
  ngOnDestroy(): void {
    this._subSink.unsubscribe()
  }
}
