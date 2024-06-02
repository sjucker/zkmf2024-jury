import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {HELPER_PATH, SUMMARY_PATH} from "../app-routing.module";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authenticating = false;
  authenticationError = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authenticating = true;
      this.authenticationError = false;
      const val = this.loginForm.value;
      this.authenticationService.login(val.email!, val.password!).subscribe({
        next: response => {
          this.authenticating = false;
          this.authenticationService.setCredentials(response);
          if (this.authenticationService.isAdmin()) {
            this.router.navigate([SUMMARY_PATH]).catch(reason => {
              console.error(reason);
            });
          } else if (this.authenticationService.isJudgeHelper()) {
            this.router.navigate([HELPER_PATH]).catch(reason => {
              console.error(reason);
            });
          } else {
            this.router.navigate(['/']).catch(reason => {
              console.error(reason);
            });
          }
        },
        error: () => {
          this.authenticating = false;
          this.authenticationError = true;
        },
      });
    }
  }

}
