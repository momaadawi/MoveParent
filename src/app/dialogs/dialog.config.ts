import { MatDialogConfig } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { CustomTranslateService } from "../services/customTranslateService/custom-translate.service";

export class DialogConfig{
  private _dialogConfig!: MatDialogConfig;
  public get dialogConfig(): MatDialogConfig {
    return this.dialogConfig;
  }
  public set dialogConfig(value: MatDialogConfig) {
    this.dialogConfig = value;
  }

  constructor(private _transalte: TranslateService,
              private _customTransalte: CustomTranslateService){
  }
}


