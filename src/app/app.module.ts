import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationInterceptor } from './providers/authorization.interceptor';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavigationComponent } from './features/app-navigation/app-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'
import { LoginComponent } from './features/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MissingTranslationHandler, TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './core/core.module';
import { StudentListComponent } from './dialogs/student-list/student-list.component';
import { ChangePasswordComponent } from './dialogs/change-password/change-password.component';
import { AboutComponent } from './dialogs/about/about.component';
import { ChangeLangComponent } from './dialogs/change-lang/change-lang.component';
import { SetAbsetntComponent } from './dialogs/set-absetnt/set-absetnt.component';
import { NotificationComponent } from './dialogs/notification/notification.component';
import { MatMenuModule } from '@angular/material/menu';
import { AbsencePlanComponent } from './dialogs/absence-plan/absence-plan.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UpdatePOIComponent } from './dialogs/update-poi/update-poi.component';
import { GoogleMapsModule } from '@angular/google-maps'

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
    MatListModule,MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    GoogleMapsModule,
    MatDialogModule,
    MatMenuModule,
    MatDatepickerModule,
    MatSelectModule,
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
