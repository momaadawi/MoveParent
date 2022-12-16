import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';

// interceptors
import { AuthorizationGuardGuard } from './providers/authorization-guard.guard';

// services
import { CustomDialogService,
         AccountService,
         CustomCookieService,
         CustomTranslateService,
         NotificationService,
         SnackbarService } from './services/services';
// pipes
import { ShortTimePipe } from './pipes/short-time.pipe';

// components
import { LoaderComponent } from './components/loader/loader.component';

// primeng
import { SkeletonModule } from 'primeng/skeleton'

@NgModule({
  declarations: [
    ShortTimePipe,
    LoaderComponent
  ],
  providers:[
    CustomDialogService,
    AccountService,
    CustomCookieService,
    CustomTranslateService,
    NotificationService,
    AuthorizationGuardGuard,
    AuthorizationGuardGuard,
    SnackbarService
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    SkeletonModule
  ],
  exports: [ShortTimePipe, LoaderComponent]
})
export class SharedModule { }
