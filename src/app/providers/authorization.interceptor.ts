import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Configuration } from '../configurations/app.config';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private _cookieSerivce: CookieService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
       headers: request.headers
                  .set('Authorization', this._cookieSerivce.get(Configuration.coookies.Authorization))
                  // .set('Access-Control-Allow-Origin', '*')
                  // .set('Access-Control-Allow-Headers', '*')
                  // .set('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With, Accept, Pragma, Cache-Control, Authorization ')
                  // .set('Content-Type', 'application/json; charset=utf-8')
                  // .set('X-Requested-With', 'move parent')
                  // .set('Accept', '*/*')
                  // .set('Cache-Control', 'no-cache')
                  // .set('User-Agent', 'move parent')
      });
    return next.handle(request);
  }
}
