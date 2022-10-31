import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AuthenticationGuard} from "./service/authentication.guard";
import {LoginComponent} from "./login/login.component";

export const LOGIN_PATH = 'login'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthenticationGuard]
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
