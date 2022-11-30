import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Configuration } from '../../configurations/app.config';

@Injectable()
export class AuthorizationGuardGuard implements CanActivate {

  constructor( private _cookieService: CookieService,
              private _router: Router){}
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
