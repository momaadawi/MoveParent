import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../services/snackbarService/snackbar.service';
import { SystemEnum } from 'src/app/configurations/system.enum';
import { CustomTranslateService } from '../services/customTranslateService/custom-translate.service';

@Injectable()
export class RequestConnectionInterceptor implements HttpInterceptor {

  constructor(private _snackBar :SnackbarService,
              private _cusotmTransalte: CustomTranslateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!window.navigator.onLine)
      this._snackBar.open(this._cusotmTransalte.translate('snack-bar.No_internet_connection'), SystemEnum.ResponseAction.Failed)
    return next.handle(request);
  }
}
