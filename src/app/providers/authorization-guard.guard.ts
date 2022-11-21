import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, TitleStrategy, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { CustomCookieService } from '../services/customCookieService/customCookie.service';
import { Configuration } from '../configurations/app.config';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cssClasses } from '../shared/cssClasses.conf';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuardGuard implements CanActivate {

  constructor( private _cookieService: CookieService,
              private _router: Router,
              private _snackBar: MatSnackBar){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let auth = this._cookieService.get(Configuration.cookies.Authorization)
        if(auth.length != 0){
          this._router.navigate(['/home'])
          return true
      }
      return true;
  }
}
