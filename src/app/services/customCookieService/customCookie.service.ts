import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CapacitorCookies } from '@capacitor/core';
import { LoginResponse } from '../accountService/Login.model';
import { Configuration } from '../../configurations/app.config';

@Injectable({
  providedIn: 'root'
})
export class CustomCookieService {

  constructor(private _cookieService: CookieService) { }

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
     this._cookieService.set(Configuration.coookies.Id, loginresponse.Value.Id)
     this._cookieService.set(Configuration.coookies.Authorization, loginresponse.Token.replace('Basic', ''))
     this._cookieService.set(Configuration.coookies.UserName, loginresponse.Value.Name)
     this._cookieService.set(Configuration.coookies.Image, loginresponse.Value.Image)
  }
}


