import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppNavigationComponent, LoginComponent, WelcomeComponent } from './features/features';
import { AuthorizationGuardGuard } from './providers/authorization-guard.guard';
import { AbsenceListComponent } from './dialogs/absence-list/absence-list.component';

const routes: Routes = [
  {
    path: '',
     component: WelcomeComponent,
     canActivate: [AuthorizationGuardGuard]
  },
  {
    path:'login',
    component: LoginComponent,
    canActivate: [AuthorizationGuardGuard]
  },
  {
    path: 'ab',
    component: AbsenceListComponent
  },
  {
    path: 'home',
    component: AppNavigationComponent,
    loadChildren:()=> import('../app/core/core.module').then(x => x.CoreModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
