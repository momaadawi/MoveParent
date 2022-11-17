import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'change-lang',
  templateUrl: './change-lang.component.html',
  styleUrls: ['./change-lang.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangeLangComponent implements OnInit {
  langForm: FormGroup = this.createForm()
  selectedLang: string = '';
  get Lang() {
    return this.langForm.get('lang') as FormControl
  }


  constructor(private _translate: TranslateService,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.selectedLang = this._translate.currentLang;
  }
  changeLan(selection: any) {
    this._translate.use(selection.srcElement.value);
  }
  createForm() {
    return this._fb.group({
      'lang': ['', Validators.required],
    });
  }
}
