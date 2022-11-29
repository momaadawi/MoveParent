import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CustomTranslateService } from '../../services/customTranslateService/custom-translate.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent implements OnInit {
  welcome_infographImg = 'assets/intro/welcome-bulding.svg'
  constructor(private _customTranslate: CustomTranslateService) { }

  ngOnInit(): void {

  }
  onSlide(event: NgbSlideEvent) {
    if (event.current == 'ngb-slide-0')
      this.welcome_infographImg = 'assets/intro/welcome-bulding.svg'
    if (event.current == 'ngb-slide-1')
      this.welcome_infographImg = 'assets/intro/welcome-girl-sit.svg'
    if (event.current == 'ngb-slide-2')
      this.welcome_infographImg = 'assets/intro/welcome-bus.svg'
  }
  nextSlide(carousel: any) {
    carousel.next()
  }
  changeLang(){
   this._customTranslate.toggleLang()
  }
}
