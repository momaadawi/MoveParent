import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountService } from '../../shared/services/accountService/account.service';
import { LoginRequest } from '../../shared/services/accountService/Login.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubSink } from 'subsink';
import { CustomCookieService } from 'src/app/shared/services/customCookieService/customCookie.service';
import { Configuration } from '../../configurations/app.config';
import { cssClasses } from '../../shared/cssClasses.conf';
import { CustomTranslateService } from 'src/app/shared/services/customTranslateService/custom-translate.service';
import { NotificationService } from '../../shared/services/notificationService/notification.service';
import { Capacitor } from '@capacitor/core';
import { SnackbarService } from '../../shared/services/snackbarService/snackbar.service';
import { SystemEnum } from 'src/app/configurations/system.enum';
import { PushNotifications } from '@capacitor/push-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
  private subSink = new SubSink()
  spinner: boolean = false;
  loginForm: FormGroup = this.createForm()
  constructor(private _fb: FormBuilder,
    private _accountSerivice: AccountService,
    private _cookiesService: CustomCookieService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _customSnackBar: SnackbarService,
    private _notificationService: NotificationService,
    private _customTranslate: CustomTranslateService) { }
  get UserName() {
    return this.loginForm.get('UserName') as FormControl
  }
  get Password() {
    return this.loginForm.get('Password') as FormControl
  }

  ngOnInit() {
    this._cookiesService.clearlogOutCookies().then(_ => {
      const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

      if(isPushNotificationsAvailable){
        console.log('1--push notificaiton available.')
        this._notificationService.initPushNotification()
      }
    })
  }

  createForm() {
    return this._fb.group({
      'UserName': ['', Validators.required],
      'Password': ['', [Validators.required]]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      this._customSnackBar.open(this._customTranslate.translate('snack-bar.please_check_user_name_password'), SystemEnum.ResponseAction.Failed)
      return
    }
    this.spinner = true;
    let loginRequest: LoginRequest = {
      UserName: this.UserName.value,
      Password: this.Password.value,
      DeviceToken: this._cookiesService.getCookieByKey(Configuration.cookies.DeviceToken)
    }
    let loginSub = this._accountSerivice.login(loginRequest).subscribe({
      next: response => {
        if (response.IsErrorState) {
          if (response.ErrorDescription == SystemEnum.ResponseMessage.invalid_Credentails){
            this._customSnackBar.open(this._customTranslate.translate('snack-bar.invalid_credentails'), SystemEnum.ResponseAction.Failed)
            return;
          }
          if(response.ErrorDescription == SystemEnum.ResponseMessage.lockedOut){
            this._customSnackBar.open(this._customTranslate.translate('snack-bar.user_locked_out'), SystemEnum.ResponseAction.Failed)
            return;
          }else {
            this._customSnackBar.open(this._customTranslate.translate('snack-bar.something_wrong_retry_again'), SystemEnum.ResponseAction.Failed)
            return;
          }
        }
        if (response.Token?.length > 0) {
          this._cookiesService.setLoginCookies(response)
          this._notificationService.pushServiceLisetner()
        }
        this._router.navigate(['home'])
      },
      error: er => {
        console.error(er)
        // this._customSnackBar.open(this._customTranslate.translate('snack-bar.something_wrong_retry_again'), SystemEnum.ResponseAction.Failed)
        this.spinner = false;
      },
      complete: () => {
        this.spinner = false
      }
    })
    this.subSink.add(loginSub)
  }
  changeLang() {
    this._customTranslate.toggleLang()
  }
  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
