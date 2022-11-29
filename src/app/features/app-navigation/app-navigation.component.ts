import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
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
import { Router } from '@angular/router';
import { AbsenceListComponent } from '../../dialogs/absence-list/absence-list.component';
import { DilogIds } from '../../configurations/dilaogs.config';
import { CustomTranslateService } from '../../services/customTranslateService/custom-translate.service';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { DialogConfig } from 'src/app/dialogs/dialog.config';
import { TranslateService } from '@ngx-translate/core';
import { DialogServiceService } from '../../shared/services/dialog-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppNavigationComponent implements OnInit, OnDestroy {
  menuData: { parentName: string, parentImage: string } = {
    parentName: '',
    parentImage: ''
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver,
    private _cookieService: CustomCookieService,
    public _dialog: MatDialog,
    private _router: Router,
    private _dialogService: DialogServiceService) { }

  ngOnInit(): void {
    this.menuData.parentName = this._cookieService.getCookieByKey(Configuration.cookies.UserName)
    this.menuData.parentImage = this._cookieService.getCookieByKey(Configuration.cookies.Image)
  }
  openDialog_about() {
    this._dialog.open(AboutComponent, this._dialogService.fullSize_dialogConfig())
  }
  openDialog_changePass() {
    this._dialog.open(ChangePasswordComponent, this._dialogService.fullSize_dialogConfig())
  }
  openDialog_Changelang() {
    this._dialog.open(ChangeLangComponent, this._dialogService.fullSize_dialogConfig());
  }
  openDialog_studnets() {
    this._dialog.open(StudentListComponent, this._dialogService.fullSize_dialogConfig())
  }
  open_notification_dialog() {
    this._dialog.open(NotificationComponent, this._dialogService.fullSize_dialogConfig())
  }
  openDialog_absence_list() {
    let config = this._dialogService.fullSize_dialogConfig()
    config.id = DilogIds.absence_list
    this._dialog.open(AbsenceListComponent, config)
  }
  logOut() {
    this._cookieService.clearAllCookies().then(_ => {
      this._router.navigate(['/login'])
    })
  }
  ngOnDestroy(): void {
    this._dialog.closeAll();
  }
}
