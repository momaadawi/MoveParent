import { Component, ViewEncapsulation, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CustomCookieService } from '../../services/customCookieService/customCookie.service';
import { Configuration } from '../../configurations/app.config';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AboutComponent } from 'src/app/dialogs/about/about.component';
import { ChangePasswordComponent } from 'src/app/dialogs/change-password/change-password.component';
import { ChangeLangComponent } from 'src/app/dialogs/change-lang/change-lang.component';
import { StudentListComponent } from '../../dialogs/student-list/student-list.component';
import { NotificationComponent } from '../../dialogs/notification/notification.component';
import { AbsencePlanComponent } from 'src/app/dialogs/absence-plan/absence-plan.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppNavigationComponent implements OnInit, OnDestroy {
  private _dilaogConfig: MatDialogConfig = {
    panelClass: 'dialog_size'
  }

  menuData: { parentName: string, parentImage: string } = {
    parentName: '',
    parentImage: ''
  }
  isLoged: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver,
    private _cookieService: CustomCookieService,
    public _dialog: MatDialog,
    private _router: Router) { }

  ngOnInit(): void {
    this.menuData.parentName = this._cookieService.getCookieByKey(Configuration.cookies.UserName)
    this.menuData.parentImage = this._cookieService.getCookieByKey(Configuration.cookies.Image)
  }
  openDialog_about() {
    this._dialog.open(AboutComponent, this._dilaogConfig)
  }
  openDialog_changePass() {
    this._dialog.open(ChangePasswordComponent, this._dilaogConfig)
  }
  openDialog_Changelang() {
    this._dialog.open(ChangeLangComponent, this._dilaogConfig);
  }
  openDialog_studnets() {
    this._dialog.open(StudentListComponent, this._dilaogConfig)
  }
  open_notification_dialog() {
    this._dialog.open(NotificationComponent, this._dilaogConfig)
  }
  openDialog_absence_plan() {
    this._dialog.open(AbsencePlanComponent, this._dilaogConfig)
  }
  logOut() {
    this._cookieService.clearAllCookies()
    this._router.navigate(['/login'])
  }
  ngOnDestroy(): void {
    this._dialog.closeAll();
  }
}
