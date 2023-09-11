import {Component, Input} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {LOGIN_PATH, SUMMARY_PATH} from "../app-routing.module";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  header = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  get loggedIn(): boolean {
    return this.authenticationService.isLoggedIn()
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate([LOGIN_PATH]);
  }

  home() {
    this.router.navigate(['/']);
  }

  summaries() {
    this.router.navigate([SUMMARY_PATH]);
  }
}
