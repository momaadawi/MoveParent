import { Component, ComponentRef, Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AbsenceListComponent } from '../../dialogs/absence-list/absence-list.component';
import { CustomCookieService } from '../../services/customCookieService/customCookie.service';
import { Direction } from '@angular/cdk/bidi';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(private _customCookieService: CustomCookieService) { }

  fullSize_dialogConfig(){
    let dialogConfig: MatDialogConfig = {
      panelClass: 'dialog_size',
      direction: this._customCookieService.getCookieByKey('dir') as Direction
    }
    console.log(dialogConfig)
    return dialogConfig
  }

  defualt(){
    let dialogConfig: MatDialogConfig = {}
    return dialogConfig
  }


}
