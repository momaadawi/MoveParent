import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from './Login.model';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../../configurations/app.config';
import { CookieService } from 'ngx-cookie-service';
import { ChangePasswordRequest, ChangePasswordResponse } from './ChangePassword.model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
@Injectable()
export class AccountService {
  constructor(private _http: HttpClient,
    private _cookieService: CookieService,
    private _router: Router) { }

  login(loginModel: LoginRequest): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(environment.api +  Configuration.api.Account.login, loginModel);
  }
  changePassword(changePasswordmodel: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this._http.put<ChangePasswordResponse>(environment.api + Configuration.api.Account.changePassword, changePasswordmodel)
  }
  logOut() {
    this._cookieService.deleteAll();
    this._router.navigate(['/login'])
  }
}
