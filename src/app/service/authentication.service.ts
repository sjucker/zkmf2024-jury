import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequestDTO, LoginResponseDTO, UserRole} from "../rest";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly httpClient = inject(HttpClient);


  private readonly token = 'token';
  private readonly userId = 'user-id';
  private readonly role = 'role';

  private baseUrl = environment.baseUrl;

  login(email: string, password: string): Observable<LoginResponseDTO> {
    const request: LoginRequestDTO = {
      email: email,
      password: password
    };

    return this.httpClient.post<LoginResponseDTO>(`${this.baseUrl}/public/auth`, request);
  }

  logout(): void {
    localStorage.clear();
  }

  setCredentials(dto: LoginResponseDTO): void {
    localStorage.setItem(this.token, dto.jwt);
    localStorage.setItem(this.userId, dto.email);
    localStorage.setItem(this.role, dto.role);
  }

  getAuthorizationToken(): string | null {
    return localStorage.getItem(this.token);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.userId);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.token) !== null;
  }

  isJudge(): boolean {
    return localStorage.getItem(this.role) === UserRole.JUDGE;
  }

  isJudgeHelper(): boolean {
    return localStorage.getItem(this.role) === UserRole.JUDGE_HELPER;
  }

  isAdmin(): boolean {
    return localStorage.getItem(this.role) === UserRole.ADMIN;
  }

}
