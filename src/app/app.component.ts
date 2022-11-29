import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { delay, interval, Subject, timeInterval, timeout, timer } from 'rxjs';
import { CustomTranslateService } from './services/customTranslateService/custom-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(translate: TranslateService,
            private _customeTransalte: CustomTranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    translate.use('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|ar/) ? browserLang : 'en');
  }
}
