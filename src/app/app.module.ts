import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationInterceptor } from './providers/authorization.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './core/core.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { GoogleMapsModule } from '@angular/google-maps'
import { NgxPullToRefreshModule } from 'ngx-pull-to-refresh';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// components
import { AppComponent } from './app.component';
import { AppNavigationComponent, LoginComponent, ResetPasswordComponent, WelcomeComponent } from './features/features'
//dialogs
import {
  UpdatePOIComponent, StudentListComponent, ChangePasswordComponent,
  AboutComponent, ChangeLangComponent, AbsencePlanComponent,
  SetAbsetntComponent, NotificationComponent
} from './dialogs/dialogs';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AppNavigationComponent,
    LoginComponent,
    ResetPasswordComponent,
    ChangeLangComponent,
    AboutComponent,
    ChangePasswordComponent,
    StudentListComponent,
    SetAbsetntComponent,
    NotificationComponent,
    AbsencePlanComponent,
    UpdatePOIComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule, MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    GoogleMapsModule,
    MatDialogModule,
    MatMenuModule,
    MatDatepickerModule,
    MatSelectModule,
    NgxPullToRefreshModule,
    NgbModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
