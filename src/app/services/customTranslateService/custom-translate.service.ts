import { ChangeDetectorRef, Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Directionality, Direction } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { CustomCookieService } from '../customCookieService/customCookie.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {
  constructor(private _translate: TranslateService,
    private _cookieService: CookieService) {
     }

  translate(key: string) {
    let value: string = '';
    this._translate.get(key).subscribe(x => value = x)
    return value
  }
  // get_current_lan(): string {
  //   return this._translate.currentLang
  // }
  changeLange(lang: string) {
    this._translate.use(lang).subscribe({
      complete: () => {
        this.Change_document_direction()
      }
    })
  }
  toggleLang() {
    if (this._translate.currentLang == 'en'){
      this._translate.use('ar').subscribe({
        complete: () => this.Change_document_direction()
      })
    }
    else
      this._translate.use('en').subscribe({
        complete: () => this.Change_document_direction()
      })

    }
 Change_document_direction(){
  if( this._translate.currentLang == 'en'){
    document.getElementsByTagName('html')[0].removeAttribute('dir')
    document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr')
    this._cookieService.set('dir', 'ltr')
  }
  if( this._translate.currentLang == 'ar'){
    document.getElementsByTagName('html')[0].removeAttribute('dir')
    document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl')
    this._cookieService.set('dir', 'rtl')
  }
}
}

