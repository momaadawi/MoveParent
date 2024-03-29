import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Configuration } from '../../../configurations/app.config';
import { SystemEnum } from 'src/app/configurations/system.enum';
import { Direction } from '@angular/cdk/bidi';
import { PrimeNGConfig } from 'primeng/api';

@Injectable()
export class CustomTranslateService {

  constructor(private _translate: TranslateService,
    private _cookieService: CookieService,
    private config: PrimeNGConfig) {
  }

  translate(key: string) {
    let value: string = '';
    this._translate.get(key).subscribe(x => value = x)
    return value
  }

  changeLange(lang: string) {
    this._translate.use(lang).subscribe({
      complete: () => {
        this.Change_document_direction()
        this._translate.get('primeng').subscribe(res => this.config.setTranslation(res));
      }
    })
  }
  toggleLang() {
    this._translate.currentLang == 'en' ?
     this._translate.use('ar').subscribe({
      complete: () => this.Change_document_direction()
    }) :
    this._translate.use('en').subscribe({
      complete: () => this.Change_document_direction()
    })
  }

  private Change_document_direction() {
    if (this._translate.currentLang == 'en') {
      document.getElementsByTagName('html')[0].removeAttribute('dir')
      document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr')
      this._cookieService.set('dir', 'ltr')
      this._cookieService.set(Configuration.cookies.Culture, SystemEnum.Language.English)
    }
    if (this._translate.currentLang == 'ar') {
      document.getElementsByTagName('html')[0].removeAttribute('dir')
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl')
      this._cookieService.set('dir', 'rtl')
      this._cookieService.set(Configuration.cookies.Culture, SystemEnum.Language.Arabic)
    }
  }
  direction(): Direction  {
    return this._translate.currentLang == SystemEnum.Language.Arabic ? "rtl" : 'ltr'
  }
  currentLan(){
    return this._translate.currentLang
  }
}

