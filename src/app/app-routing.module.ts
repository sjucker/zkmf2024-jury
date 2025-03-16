import {inject, NgModule} from '@angular/core';
import {CanActivateFn, RouterModule, Routes} from '@angular/router';

import {AuthenticationGuard} from "./service/authentication.guard";
import {ReportComponent} from "./report/report.component";


export const LOGIN_PATH = 'login';
export const REPORT_PATH = 'report';
export const MODUL_D_PATH = 'modul-d';
export const SUMMARY_PATH = 'summary';
export const VIEW_PATH = 'view';
export const FEEDBACK_PATH = 'feedback';
export const HELPER_PATH = 'sekretariat';
export const RANKINGLISTS_PATH = 'ranglisten';

const canActivateFn: CanActivateFn = () => inject(AuthenticationGuard).canActivate();

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/main.component').then(m => m.MainComponent),
    canActivate: [canActivateFn]
  },
  {
    path: `${REPORT_PATH}/:id`,
    loadComponent: () => import('./report/report.component').then(m => m.ReportComponent),
    canActivate: [canActivateFn],
    canDeactivate: [(component: ReportComponent) => component.canDeactivate()]
  },
  {
    path: `${VIEW_PATH}/:id`,
    loadComponent: () => import('./report-view/report-view.component').then(m => m.ReportViewComponent),
    canActivate: [canActivateFn],
  },
  {
    path: `${FEEDBACK_PATH}/:id`,
    loadComponent: () => import('./report-feedback/report-feedback.component').then(m => m.ReportFeedbackComponent),
    canActivate: [canActivateFn],
  },
  {
    path: `${FEEDBACK_PATH}/:id/:category`,
    loadComponent: () => import('./report-feedback/report-feedback.component').then(m => m.ReportFeedbackComponent),
    canActivate: [canActivateFn],
  },
  {
    path: SUMMARY_PATH,
    loadComponent: () => import('./summary/summary.component').then(m => m.SummaryComponent),
    canActivate: [canActivateFn]
  },
  {
    path: MODUL_D_PATH,
    loadComponent: () => import('./modul-d/modul-d.component').then(m => m.ModulDComponent),
    canActivate: [() => false]
  },
  {
    path: HELPER_PATH,
    loadComponent: () => import('./helper/helper.component').then(m => m.HelperComponent),
    canActivate: [canActivateFn]
  },
  {
    path: RANKINGLISTS_PATH,
    loadComponent: () => import('./ranking-lists/ranking-lists.component').then(m => m.RankingListsComponent),
    canActivate: [canActivateFn]
  },
  {
    path: LOGIN_PATH,
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
