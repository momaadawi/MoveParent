import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { CustomTranslateService } from '../services/customTranslateService/custom-translate.service';
import { SystemEnum } from 'src/app/configurations/system.enum';
import { DatePipe, getLocaleId } from '@angular/common';

@Pipe({
  name: 'translateDate',
  pure: false
})
export class TranslateDatePipe implements PipeTransform {

  constructor(private _customTransalte: CustomTranslateService) { }

  transform(value: any, pattern: string = 'mediumDate'): any {
      const datePipe: DatePipe = new DatePipe(this._customTransalte.currentLan());
      return datePipe.transform(value, pattern,undefined, this._customTransalte.currentLan());
  }
}
