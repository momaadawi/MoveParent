import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { StudentsComponent } from './students/students.component';
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import {MatNativeDateModule} from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from '../providers/authorization.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPullToRefreshModule } from 'ngx-pull-to-refresh';


@NgModule({
  declarations: [
    StudentsComponent
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
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
  ]
})
export class CoreModule { }
