import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountService } from '../../shared/services/accountService/account.service';
import { LoginRequest } from '../../shared/services/accountService/Login.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubSink } from 'subsink';
import { CustomCookieService } from 'src/app/shared/services/customCookieService/customCookie.service';
import { TranslateService } from '@ngx-translate/core';
import { Configuration } from '../../configurations/app.config';
import { cssClasses } from '../../shared/cssClasses.conf';
import { CustomTranslateService } from 'src/app/shared/services/customTranslateService/custom-translate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
  private subSink = new SubSink()
  spinner: boolean =false;
  loginForm: FormGroup = this.createForm()
  constructor(private _fb: FormBuilder,
    private _accountSerivice: AccountService,
    private _cookiesService: CustomCookieService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _customTranslate: CustomTranslateService) { }
  get UserName() {
    return this.loginForm.get('UserName') as FormControl
  }
  get Password() {
    return this.loginForm.get('Password') as FormControl
  }

  ngOnInit() {
    this._cookiesService.clearAllCookies();
  }

  createForm() {
    return this._fb.group({
      'UserName': ['', Validators.required],
      'Password': ['', [Validators.required]]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      this._snackBar.open(this._customTranslate.translate('snack-bar.please_check_user_name_password'), '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
      return
    }
    this.spinner = true;
    let loginRequest: LoginRequest = {
      UserName: this.UserName.value,
      Password: this.Password.value
    }
    this.subSink.add(
      this._accountSerivice.login(loginRequest).subscribe({
        next: response => {
          if (response.IsErrorState) {
            this._snackBar.open( response?.ErrorDescription, '' , { duration: Configuration.alertTime, panelClass: [ cssClasses.snackBar.faild]})
            return
          }
          if (response.Token?.length > 0)
            this._cookiesService.setCookies(response)
          this._router.navigate(['home'])
        },
        error: er =>{
          this._snackBar.open(this._customTranslate.translate('snack-bar.something_wrong_retry_again'), '', { duration: Configuration.alertTime, panelClass: [cssClasses.snackBar.faild] })
          this.spinner = false;},
        complete: () => {
          this.spinner = false
          }
      })
    )
  }
  changeLang(){
    this._customTranslate.toggleLang()
  }
  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
