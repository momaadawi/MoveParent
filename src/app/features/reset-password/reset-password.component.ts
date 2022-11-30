import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/accountService/account.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup = this.createForm()
  userExist: boolean = false;
  spinner: boolean =false;
  get UserName() {
    return this.resetForm.get('UserName') as FormControl
  }

  constructor(private _accountService: AccountService,
              private _fb: FormBuilder,
              private _translate: TranslateService) { }

  ngOnInit(): void {
  }

  createForm() {
    return this._fb.group({
      'UserName': ['', Validators.required],
      'Email': ['', Validators.email],
      'Mobile': ['']
    });
  }
  changeLang(){
    if(this._translate.currentLang == 'en')
      this._translate.use('ar')
    else
      this._translate.use('en')
  }
  submit(){

  }

}
