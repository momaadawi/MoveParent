import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SystemEnum } from './configurations/system.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(translate: TranslateService) {
    translate.addLangs([SystemEnum.Language.English, SystemEnum.Language.Arabic]);
    translate.setDefaultLang(SystemEnum.Language.English);
    translate.use(SystemEnum.Language.English);

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(`/${SystemEnum.Language.English}|{${SystemEnum.Language.English}}/`) ? browserLang : SystemEnum.Language.English);
  }
}
