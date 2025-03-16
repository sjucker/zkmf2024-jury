import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {
  ConfirmScoreDTO,
  JudgeRankingEntryDTO,
  JudgeReportDTO,
  JudgeReportFeedbackDTO,
  JudgeReportModulCategory,
  JudgeReportOverviewDTO,
  JudgeReportSummaryDTO,
  JudgeReportViewDTO,
  ModulDSelectionDTO,
  PublicRankingDTO,
  RankingBonusDTO,
  RankingListDTO,
  RankingPenaltyDTO,
  VereinPlayingDTO
} from "../rest";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private readonly httpClient = inject(HttpClient);


  private baseUrl = environment.baseUrl;

  public getAll(): Observable<JudgeReportOverviewDTO[]> {
    return this.httpClient.get<JudgeReportOverviewDTO[]>(`${this.baseUrl}/secured/judge`);
  }

  public get(reportId: number): Observable<JudgeReportDTO> {
    return this.httpClient.get<JudgeReportDTO>(`${this.baseUrl}/secured/judge/${reportId}`);
  }

  public view(reportId: number): Observable<JudgeReportViewDTO> {
    return this.httpClient.get<JudgeReportViewDTO>(`${this.baseUrl}/secured/judge/view/${reportId}`);
  }

  public feedback(programmId: number, category?: string): Observable<JudgeReportFeedbackDTO> {
    let url = `${this.baseUrl}/secured/judge/feedback/${programmId}`;
    if (category) {
      url += `?category=${category}`;
    }
    return this.httpClient.get<JudgeReportFeedbackDTO>(url);
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

  public confirmScore(programmId: number, score: number, category?: JudgeReportModulCategory): Observable<void> {
    const request: ConfirmScoreDTO = {
      vereinProgrammId: programmId,
      category: category,
      score: score
    };
    return this.httpClient.post<void>(`${this.baseUrl}/secured/judge/confirm-score`, request);
  }

  public modulD(): Observable<ModulDSelectionDTO[]> {
    return this.httpClient.get<ModulDSelectionDTO[]>(`${this.baseUrl}/secured/judge/modul-d`);
  }

  public updateModulD(dtos: ModulDSelectionDTO[]): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/secured/judge/modul-d`, dtos);
  }

  public helper(): Observable<VereinPlayingDTO[]> {
    return this.httpClient.get<VereinPlayingDTO[]>(`${this.baseUrl}/secured/judge/helper`);
  }

  public currentPlayStarted(timetableEntryId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/secured/judge/helper/started/${timetableEntryId}`, {});
  }

  public currentPlayEnded(timetableEntryId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/secured/judge/helper/ended/${timetableEntryId}`, {});
  }

  public penalty(vereinProgrammId: number, actualDurationInSeconds: number, minutesOverrun: number): Observable<void> {
    const request: RankingPenaltyDTO = {
      vereinProgrammId: vereinProgrammId,
      actualDurationInSeconds: actualDurationInSeconds,
      minutesOverrun: minutesOverrun,
    };
    return this.httpClient.post<void>(`${this.baseUrl}/secured/judge/helper/penalty`, request);
  }

  public bonus(vereinProgrammId: number, category: JudgeReportModulCategory, bonus: number): Observable<void> {
    const request: RankingBonusDTO = {
      vereinProgrammId: vereinProgrammId,
      category: category,
      bonus: bonus,
    };
    return this.httpClient.post<void>(`${this.baseUrl}/secured/judge/helper/bonus`, request);
  }

  public rankingLists(): Observable<RankingListDTO[]> {
    return this.httpClient.get<RankingListDTO[]>(`${this.baseUrl}/secured/judge/ranking-list`);
  }

  public publishRankingList(rankingId: number, intermediate: boolean): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/secured/judge/ranking-list/${rankingId}`, <PublicRankingDTO>{
      intermediate: intermediate
    });
  }

}
