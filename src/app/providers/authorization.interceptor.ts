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
                  .set('Authorization', this._cookieSerivce.get(Configuration.cookies.Authorization))
      });
    return next.handle(request);
  }
}
