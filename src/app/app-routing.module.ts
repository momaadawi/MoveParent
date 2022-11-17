import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { LoginComponent } from './features/login/login.component';
import { AppNavigationComponent } from './features/app-navigation/app-navigation.component';

const routes: Routes = [
  {
    path: '',
     component:WelcomeComponent
  },
  {
    path:'login',
    component: LoginComponent
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
