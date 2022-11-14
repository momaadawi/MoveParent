import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/accountService/account.service';
import { LoginRequest, LoginResponse } from '../../services/accountService/Login.model';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubSink } from 'subsink';
import { CustomCookieService } from 'src/app/services/customCookieService/customCookie.service';
import { delay, interval, timer } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
    private _translate: TranslateService) { }
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
      this._snackBar.open('please check username or passwrod!!', 'X', { duration: 2000 })
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
            this.UserName.setErrors({'not-found': true})
            this.Password.setErrors({'not-found': true})
            this._snackBar.open( response?.ErrorDescription, 'x' , { duration: 5000})
            return
          }
          if (response.Token?.length > 0)
            this._cookiesService.setCookies(response)
          this._router.navigate(['home'])
        },
        error: er =>{ console.log(er); this.spinner = false;},
        complete: () => {
          this.spinner = false
          }
      })
    )
  }
  changeLang(){
    if(this._translate.currentLang == 'en')
      this._translate.use('ar')
    else
      this._translate.use('en')
  }
  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
