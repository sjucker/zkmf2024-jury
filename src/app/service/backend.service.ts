import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {
  JudgeRankingEntryDTO,
  JudgeReportDTO,
  JudgeReportOverviewDTO,
  JudgeReportSummaryDTO,
  JudgeReportViewDTO,
  ModulDSelectionDTO
} from "../rest";

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

  public get(reportId: number): Observable<JudgeReportDTO> {
    return this.httpClient.get<JudgeReportDTO>(`${this.baseUrl}/secured/judge/${reportId}`);
  }

  public view(reportId: number): Observable<JudgeReportViewDTO> {
    return this.httpClient.get<JudgeReportViewDTO>(`${this.baseUrl}/secured/judge/view/${reportId}`);
  }

  public update(report: JudgeReportDTO): Observable<JudgeReportDTO> {
    return this.httpClient.put<JudgeReportDTO>(`${this.baseUrl}/secured/judge/${report.id}`, report);
  }

  public finish(report: JudgeReportDTO): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/secured/judge/${report.id}/finish`, {});
  }

  public fixRating(report: JudgeReportDTO): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/secured/judge/${report.id}/fix-rating`, {});
  }

  public summaries(): Observable<JudgeReportSummaryDTO[]> {
    return this.httpClient.get<JudgeReportSummaryDTO[]>(`${this.baseUrl}/secured/judge/summary`);
  }

  public ranking(reportId: number): Observable<JudgeRankingEntryDTO[]> {
    return this.httpClient.get<JudgeRankingEntryDTO[]>(`${this.baseUrl}/secured/judge/ranking/${reportId}`);
  }

  public rankingOwnOnly(reportId: number): Observable<JudgeRankingEntryDTO[]> {
    return this.httpClient.get<JudgeRankingEntryDTO[]>(`${this.baseUrl}/secured/judge/ranking/own/${reportId}`);
  }

  public confirmScores(programmId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/secured/judge/confirm-scores/${programmId}`, {});
  }

  public modulD(): Observable<ModulDSelectionDTO[]> {
    return this.httpClient.get<ModulDSelectionDTO[]>(`${this.baseUrl}/secured/judge/modul-d`);
  }

  public updateModulD(dtos: ModulDSelectionDTO[]): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/secured/judge/modul-d`, dtos);
  }
}
