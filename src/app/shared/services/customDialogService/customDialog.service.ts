import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { CustomCookieService } from '../customCookieService/customCookie.service';
import { Direction } from '@angular/cdk/bidi';

@Injectable()
export class CustomDialogService {

  constructor(private _customCookieService: CustomCookieService) { }

  fullSize_dialogConfig() {
    let dialogConfig: MatDialogConfig = {
      panelClass: 'dialog_size',
      direction: this._customCookieService.getCookieByKey('dir') as Direction
    }
    return dialogConfig
  }

  defualtConfig() {
    let dialogConfig: MatDialogConfig = {}
    return dialogConfig
  }
}
