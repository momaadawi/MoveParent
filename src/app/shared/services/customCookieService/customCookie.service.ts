import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CapacitorCookies } from '@capacitor/core';
import { LoginResponse } from '../accountService/Login.model';
import { Configuration } from '../../../configurations/app.config';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomCookieService {

  constructor(private _cookieService: CookieService,
    private _transalte: TranslateService) { }

  getCookies = () => {
    return this._cookieService.getAll()
  };
  getCookieByKey = (key: string) => {
    return this._cookieService.get(key)
  }

  setCapacitorCookie = async (url: string, key: string, value: string) => {
    await CapacitorCookies.setCookie({
      url: url,
      key: key,
      value: value,
    });
  };

  deleteCookie = async (url: string, key: string) => {
    await CapacitorCookies.deleteCookie({
      url: url,
      key: key,
    });
  };

  clearCookiesOnUrl = async (url: string) => {
    await CapacitorCookies.clearCookies({
      url: url,
    });
  };

  clearAllCookies = async () => {
    await CapacitorCookies.clearAllCookies();
  };
  setCookies = (loginresponse :LoginResponse) => {
     this._cookieService.set(Configuration.cookies.Id, loginresponse.Value.Id)
     this._cookieService.set(Configuration.cookies.Authorization, loginresponse.Token.replace('Basic', ''))
     this._cookieService.set(Configuration.cookies.UserName, loginresponse.Value.Name)
     this._cookieService.set(Configuration.cookies.Image, loginresponse.Value.Image)
     this._cookieService.set(Configuration.cookies.Direction, this._transalte.currentLang == 'ar' ? 'rtl' : 'ltr' )
  }
  clearlogOutCookies(){
    this._cookieService.delete(Configuration.cookies.Authorization)
    this._cookieService.delete(Configuration.cookies.Id)
    this._cookieService.delete(Configuration.cookies.Image)
    this._cookieService.delete(Configuration.cookies.UserName)
    this._cookieService.delete(Configuration.cookies.DeviceToken)
  }
}


