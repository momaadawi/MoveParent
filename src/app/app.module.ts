// essentail
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// angular  materials
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

// localization
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// primeng
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputTextModule} from 'primeng/inputtext';

// google map
import { GoogleMapsModule } from '@angular/google-maps'

// interceptors
import { AuthorizationInterceptor } from './shared/providers/authorization.interceptor';

// components
import { AppComponent } from './app.component';
import { AppNavigationComponent,
         LoginComponent,
         ResetPasswordComponent,
         WelcomeComponent } from './features/features'

// dialogs
import {
  UpdatePOIComponent,
  StudentListComponent,
  ChangePasswordComponent,
  AboutComponent,
  ChangeLangComponent,
  AbsencePlanComponent,
  NotificationComponent,
  AbsenceListComponent
} from './dialogs/dialogs';

// other imports
import { NgxPullToRefreshModule } from 'ngx-pull-to-refresh';

// cros cutting concern
import { SharedModule } from './shared/shared.module';

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
    NotificationComponent,
    AbsencePlanComponent,
    UpdatePOIComponent,
    AbsenceListComponent
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
    MatListModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    GoogleMapsModule,
    MatDialogModule,
    MatMenuModule,
    NgxPullToRefreshModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    MultiSelectModule,
    CalendarModule,
    FormsModule,
    SharedModule,
    NgbModule,
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
