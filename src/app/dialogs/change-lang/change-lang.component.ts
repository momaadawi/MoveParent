import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'change-lang',
  templateUrl: './change-lang.component.html',
  styleUrls: ['./change-lang.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangeLangComponent implements OnInit, OnDestroy {
  langForm: FormGroup = this.createForm()
  selectedLang: string = '';

  constructor(private _translate: TranslateService,
              private _fb: FormBuilder ) { }
  ngOnDestroy(): void {
    console.log('destorued')
  }

  ngOnInit(): void {
    this.selectedLang = this._translate.currentLang;
  }
  changeLan(selection: any){
    this._translate.use(selection.srcElement.value);
  }
  createForm() {
    return this._fb.group({
      'lang': ['', Validators.required],
    });
  }
  get Lang() {
    return this.langForm.get('lang') as FormControl
  }
}
