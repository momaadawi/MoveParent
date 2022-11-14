import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/accountService/account.service';
import { CookieService } from 'ngx-cookie-service';
import { Configuration } from '../../configurations/app.config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { MatDialog } from '@angular/material/dialog';

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
  private sink = new SubSink();
  resetPassForm: FormGroup;
  spinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _cookieService: CookieService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _dialog: MatDialog) {
    this.resetPassForm = this.formBuilder.group({
      'oldPassword': ['', Validators.required],
      'newPassword': ['', [Validators.required]],
      'confirmPassword': ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmPassword')
    });
  }
  ngOnInit(): void {

  }
  submit() {
    this.spinner = true;
    if (!this.resetPassForm.valid) {
      this._snackBar.open('please check your passwords', 'X', { duration: 3000 })
      this.spinner = false;
      return
    }
    this.sink.add(
      this._accountService.changePassword({
        userName: this._cookieService.get(Configuration.coookies.UserName),
        password: this.resetPassForm.controls['oldPassword'].value,
        newPassword: this.resetPassForm.controls['newPassword'].value
      }).subscribe({
        next: res => {
          if (res.IsErrorState)
            this._snackBar.open(res.Value, '', { duration: 3000 })
          else if (!res.IsErrorState && res.Value == 'Success') {
            this._snackBar.open('password changed please login with new password', res.Value, { duration: 5000 })
            this._router.navigate(['login'])
            this._dialog.closeAll();
          }
        },
        error: err => {
          console.log(err)
          this._snackBar.open('something wrong please ask for help.')
        }
      })
    )
    this.spinner = false;
  }
  ngOnDestroy(): void {
    this.sink.unsubscribe()
  }


}
