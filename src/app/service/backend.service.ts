import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {JudgeReportDTO, JudgeReportOverviewDTO} from "../rest";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = environment.baseUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  public getAll(): Observable<JudgeReportOverviewDTO[]> {
    return this.httpClient.get<JudgeReportOverviewDTO[]>(`${this.baseUrl}/secured/judge`);
  }

  public get(id: number): Observable<JudgeReportDTO> {
    return this.httpClient.get<JudgeReportDTO>(`${this.baseUrl}/secured/judge/${id}`);
  }

  public update(report: JudgeReportDTO): Observable<JudgeReportDTO> {
    return this.httpClient.put<JudgeReportDTO>(`${this.baseUrl}/secured/judge/${report.id}`, report);
  }

  public finish(report: JudgeReportDTO): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/secured/judge/${report.id}/finish`, undefined);
  }
}
