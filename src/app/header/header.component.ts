import {Component, Input} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {LOGIN_PATH, RANKINGLISTS_PATH, SUMMARY_PATH} from "../app-routing.module";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent {

  @Input({required: true})
  header = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  get loggedIn(): boolean {
    return this.authenticationService.isLoggedIn()
  }

  get admin(): boolean {
    return this.authenticationService.isAdmin();
  }

  get judge(): boolean {
    return this.authenticationService.isJudge();
  }

  get judgeHelper(): boolean {
    return this.authenticationService.isJudgeHelper();
  }

  get username(): string {
    return this.authenticationService.getUsername() ?? '?';
  }

  logout(): void {
    this.router.navigate([LOGIN_PATH]).then(value => {
      if (value) {
        this.authenticationService.logout();
      }
    });
  }

  home() {
    this.router.navigate(['/']).catch(reason => {
      console.error(reason);
    });
  }

  summaries() {
    this.router.navigate([SUMMARY_PATH]).catch(reason => {
      console.error(reason);
    });
  }

  rankingLists() {
    this.router.navigate([RANKINGLISTS_PATH]).catch(reason => {
      console.error(reason);
    });
  }
}
