import {inject, NgModule} from '@angular/core';
import {CanActivateFn, RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AuthenticationGuard} from "./service/authentication.guard";
import {LoginComponent} from "./login/login.component";
import {ReportComponent} from "./report/report.component";
import {SummaryComponent} from "./summary/summary.component";
import {ModulDComponent} from "./modul-d/modul-d.component";
import {ReportViewComponent} from "./report-view/report-view.component";
import {HelperComponent} from "./helper/helper.component";
import {RankingListsComponent} from "./ranking-lists/ranking-lists.component";
import {ReportFeedbackComponent} from "./report-feedback/report-feedback.component";

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
    component: MainComponent,
    canActivate: [canActivateFn]
  },
  {
    path: `${REPORT_PATH}/:id`,
    component: ReportComponent,
    canActivate: [canActivateFn],
    canDeactivate: [(component: ReportComponent) => component.canDeactivate()]
  },
  {
    path: `${VIEW_PATH}/:id`,
    component: ReportViewComponent,
    canActivate: [canActivateFn],
  },
  {
    path: `${FEEDBACK_PATH}/:id`,
    component: ReportFeedbackComponent,
    canActivate: [canActivateFn],
  },
  {
    path: `${FEEDBACK_PATH}/:id/:category`,
    component: ReportFeedbackComponent,
    canActivate: [canActivateFn],
  },
  {
    path: SUMMARY_PATH,
    component: SummaryComponent,
    canActivate: [canActivateFn]
  },
  {
    path: MODUL_D_PATH,
    component: ModulDComponent,
    canActivate: [() => false]
  },
  {
    path: HELPER_PATH,
    component: HelperComponent,
    canActivate: [canActivateFn]
  },
  {
    path: RANKINGLISTS_PATH,
    component: RankingListsComponent,
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
