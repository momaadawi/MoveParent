import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';

import { AuthorizationGuardGuard } from './providers/authorization-guard.guard';
import { CustomDialogService,
         AccountService,
         CustomCookieService,
         CustomTranslateService,
         NotificationService, } from './services/services';
import { ShortTimePipe } from './pipes/short-time.pipe';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ShortTimePipe
  ],
  providers:[
    CustomDialogService,
    AccountService,
    CustomCookieService,
    CustomTranslateService,
    NotificationService,
    AuthorizationGuardGuard,
    AuthorizationGuardGuard
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports: [ShortTimePipe]
})
export class SharedModule { }