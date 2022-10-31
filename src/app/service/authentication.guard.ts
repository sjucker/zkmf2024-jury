import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./authentication.service";
import {LOGIN_PATH} from "../app-routing.module";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authenticationService.isLoggedIn()) {
            return true;
        } else {
            return this.router.parseUrl(LOGIN_PATH);
        }
    }

}
