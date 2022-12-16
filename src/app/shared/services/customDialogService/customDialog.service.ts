import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CustomCookieService } from '../customCookieService/customCookie.service';
import { Direction } from '@angular/cdk/bidi';

@Injectable()
export class CustomDialogService {

  constructor(private _customCookieService: CustomCookieService,
              private _dialog: MatDialog) { }

  fullSize_dialogConfig() {
    let dialogConfig: MatDialogConfig = {
      panelClass: 'dialog_size',
      direction: this._customCookieService.getCookieByKey('dir') as Direction
    }
    return dialogConfig
  }

  defualtConfig() {
    let dialogConfig: MatDialogConfig = {}
    dialogConfig.panelClass = 'custom-modal'
    return dialogConfig
  }
  //will be used after refactor
  // open_Dialog(component: any, config: MatDialogConfig){
  //   this._dialog.open(component, config)
  // }

}
