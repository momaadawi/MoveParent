import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {

  constructor(private _tranlate: TranslateService) { }

  translate(key: string){
    let value: string = '';
    this._tranlate.get(key).subscribe(x => value = x)
    return value
  }
}
