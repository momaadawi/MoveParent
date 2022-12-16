import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Configuration } from '../../../configurations/app.config';
import { SystemEnum } from 'src/app/configurations/system.enum';
import { cssClasses } from '../../cssClasses.conf';
import { CustomTranslateService } from '../customTranslateService/custom-translate.service';

@Injectable()
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar,
              private _customTransate: CustomTranslateService) {
  }

  open(message: string, action: SystemEnum.ResponseAction){
    this._snackBar.open(message, '',
          {
            duration: Configuration.alertTime,
            panelClass: this.generateCssClass(action),
            direction: this._customTransate.direction()
          })
  }

  private generateCssClass(action: SystemEnum.ResponseAction) {
    let PanelClass: string = '';
    switch (action) {
      case SystemEnum.ResponseAction.Success:
        PanelClass = cssClasses.snackBar.success;
        break;
      case SystemEnum.ResponseAction.Failed:
        PanelClass = cssClasses.snackBar.faild;
        break;
      default:
        PanelClass = '';
        break;
    }
    return PanelClass;
  }
}
