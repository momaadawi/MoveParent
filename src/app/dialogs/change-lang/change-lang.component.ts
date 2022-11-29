import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomTranslateService } from '../../services/customTranslateService/custom-translate.service';

@Component({
  selector: 'change-lang',
  templateUrl: './change-lang.component.html',
  styleUrls: ['./change-lang.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangeLangComponent implements OnInit {
  langForm: FormGroup = this.createForm()
  languages: { value: string, name: string }[] = [
    { value: 'en', name: 'English'},
    { value: 'ar', name: 'عربي'}
  ]

  constructor(private _fb: FormBuilder,
    private _costumTranslate: CustomTranslateService,
    private _translate: TranslateService) { }

  ngOnInit(): void {
    this.langForm.patchValue({ 'lang': this._translate.currentLang })
  }

  changeLan(event: any) {
    this._costumTranslate.changeLange(event.value);
  }

  createForm() {
    return this._fb.group({
      'lang': ['', Validators.required],
    });
  }
}
