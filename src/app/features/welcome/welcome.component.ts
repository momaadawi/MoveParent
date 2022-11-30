import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { CustomTranslateService } from 'src/app/shared/services/customTranslateService/custom-translate.service';
import { Configuration } from '../../configurations/app.config';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent implements OnInit {
  welcome_infographImg = Configuration.assets.welcome_building_img
  constructor(private _customTranslate: CustomTranslateService) { }

  ngOnInit(): void {

  }

  onSlide(event: NgbSlideEvent) {
    if (event.current == 'ngb-slide-0')
      this.welcome_infographImg = Configuration.assets.welcome_building_img
    if (event.current == 'ngb-slide-1')
      this.welcome_infographImg = Configuration.assets.welcome_girl_sitting
    if (event.current == 'ngb-slide-2')
      this.welcome_infographImg = Configuration.assets.welcome_bus
  }
  nextSlide(carousel: any) {
    carousel.next()
  }
  changeLang(){
   this._customTranslate.toggleLang()
  }
}
