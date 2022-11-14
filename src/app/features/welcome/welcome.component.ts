import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent implements OnInit {
  welcome_infographImg = 'assets/intro-building.png'
  constructor(private _translate: TranslateService) { }

  ngOnInit(): void {
  }
  onSlide(event: NgbSlideEvent) {
    if (event.current == 'ngb-slide-0')
      this.welcome_infographImg = 'assets/intro-building.png'
    if (event.current == 'ngb-slide-1')
      this.welcome_infographImg = 'assets/female_sitting.png'
    if (event.current == 'ngb-slide-2')
      this.welcome_infographImg = 'assets/bus_moving.png'
  }
  nextSlide(carousel: any) {
    console.log(carousel)
    carousel.next()
  }
  changeLang(){
    if(this._translate.currentLang == 'en')
      this._translate.use('ar')
    else
      this._translate.use('en')
  }
}
