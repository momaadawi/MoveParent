// essntails
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// angular material
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

// interceptors
import { AuthorizationInterceptor } from '../shared/providers/authorization.interceptor';

// localization
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button'
import {SkeletonModule} from 'primeng/skeleton';

// components
import { StudentsComponent } from './students/students.component';

// dialogs
import { SetAbsentComponent } from './dialogs/dialogs';

// others
import { NgxPullToRefreshModule } from 'ngx-pull-to-refresh';
import { SharedModule } from '../shared/shared.module';
import { PopUpNotification } from './dialogs/popup-notification/popup-notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestConnectionInterceptor } from '../shared/providers/request-connection.interceptor';


@NgModule({
  declarations: [
    StudentsComponent,
    SetAbsentComponent,
    PopUpNotification
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatExpansionModule,
    CoreRoutingModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgbModule,
    NgxPullToRefreshModule,
    InputTextModule,
    AvatarModule,
    DropdownModule,
    MatIconModule,
    ButtonModule,
    SkeletonModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestConnectionInterceptor, multi: true }
  ]
})
export class CoreModule { }
