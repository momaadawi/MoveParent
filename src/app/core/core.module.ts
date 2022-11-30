// essntails
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

// angular material
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// interceptors
import { AuthorizationInterceptor } from '../shared/providers/authorization.interceptor';

// localization
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';

// primeng
import { InputTextModule } from 'primeng/inputtext';

// components
import { StudentsComponent } from './students/students.component';

// dialogs
import { SetAbsentComponent } from './dialogs/dialogs';

// others
import { NgxPullToRefreshModule } from 'ngx-pull-to-refresh';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    StudentsComponent,
    SetAbsentComponent
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
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
  ]
})
export class CoreModule { }
