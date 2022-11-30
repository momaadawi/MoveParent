import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppNavigationComponent, LoginComponent, WelcomeComponent } from './features/features';
import { AuthorizationGuardGuard } from './shared/providers/authorization-guard.guard';

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
