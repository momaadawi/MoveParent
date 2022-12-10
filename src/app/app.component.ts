import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SystemEnum } from './configurations/system.enum';
import { CookieService } from 'ngx-cookie-service';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Configuration } from './configurations/app.config';
import { NotificationService } from './shared/services/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService,
              private _cookieService: CookieService) {
    translate.addLangs([SystemEnum.Language.English, SystemEnum.Language.Arabic]);
    translate.setDefaultLang(SystemEnum.Language.English);

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(`/${SystemEnum.Language.English}|{${SystemEnum.Language.English}}/`) ? browserLang : SystemEnum.Language.English);
  }
  ngOnInit(): void {
    this.localization_bootstraping();

  }

  private localization_bootstraping() {
    if (this.translate.currentLang == SystemEnum.Language.English) {
      this._cookieService.delete('dir');
      this._cookieService.set('dir', 'ltr');
    }
    if (this.translate.currentLang == SystemEnum.Language.Arabic) {
      this._cookieService.delete('dir');
      this._cookieService.set('dir', 'rtl');
    }
  }

}
