import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomTranslateService } from 'src/app/shared/services/customTranslateService/custom-translate.service';
import { MatDialog } from '@angular/material/dialog';
import { DilogIds } from '../../configurations/dilaogs.config';

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
    private _translate: TranslateService,
    private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.langForm.patchValue({ 'lang': this._translate.currentLang })
  }

  changeLan(event: any) {
    console.log(event)
    this._costumTranslate.changeLange(event.value);
    this._dialog.getDialogById(DilogIds.changeLangsDialog)?.close()
  }

  createForm() {
    return this._fb.group({
      'lang': ['', Validators.required],
    });
  }
}
