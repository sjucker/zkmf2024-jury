import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authenticating = false;
  authenticationError = false;

  loginForm = this.formBuilder.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberMe: [false],
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
          this.router.navigate(['/']);
        },
        error: _ => {
          this.authenticating = false;
          this.authenticationError = true;
        }
      })
    }
  }

}
