import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CustomTranslateService {
  constructor(private _translate: TranslateService,
    private _cookieService: CookieService) {
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
    }
    if (this._translate.currentLang == 'ar') {
      document.getElementsByTagName('html')[0].removeAttribute('dir')
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl')
      this._cookieService.set('dir', 'rtl')
    }
  }
}

