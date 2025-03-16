import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {HELPER_PATH, SUMMARY_PATH} from "../app-routing.module";
import {HeaderComponent} from '../header/header.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ActionButtonComponent} from '../components/action-button/action-button.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [HeaderComponent, MatCard, MatCardHeader, MatCardTitle, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, ActionButtonComponent]
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);


  authenticating = false;
  authenticationError = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

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
