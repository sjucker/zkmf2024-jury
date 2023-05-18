import {inject, NgModule} from '@angular/core';
import {CanActivateFn, RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AuthenticationGuard} from "./service/authentication.guard";
import {LoginComponent} from "./login/login.component";
import {ReportComponent} from "./report/report.component";

export const LOGIN_PATH = 'login';
export const REPORT_PATH = 'report';

const canActivateFn: CanActivateFn = () => inject(AuthenticationGuard).canActivate();

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [canActivateFn]
  },
  {
    path: `${REPORT_PATH}/:id`,
    component: ReportComponent,
    canActivate: [canActivateFn]
  },
  {
    path: LOGIN_PATH,
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
