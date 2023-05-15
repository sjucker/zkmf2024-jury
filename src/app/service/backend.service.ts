import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {JudgeReportDTO} from "../rest";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = environment.baseUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  public get(): Observable<JudgeReportDTO[]> {
    return this.httpClient.get<JudgeReportDTO[]>(`${this.baseUrl}/secured/judge`);
  }

}
