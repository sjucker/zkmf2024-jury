import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {LOGIN_PATH} from "../app-routing.module";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request)).pipe(
      catchError((error: HttpErrorResponse) => this.handleAuthError(error))
    );
  }

  addAuthToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.authenticationService.getAuthorizationToken();
    if (!token) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.authenticationService.logout();
      if (!this.router.url.endsWith(LOGIN_PATH)) {
        this.router.navigate([LOGIN_PATH]).then();
        return of(err.message);
      }
    }
    return throwError(() => err);
  }

}
