import {Component, computed, Inject, LOCALE_ID, OnInit, signal} from '@angular/core';
import {JudgeReportStatus, JudgeReportSummaryDTO} from "../rest";
import {BackendService} from "../service/backend.service";
import {AuthenticationService} from "../service/authentication.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  summaries = new Map<string, JudgeReportSummaryDTO[]>;
  categories: string[] = [];

  loading = signal(false);
  confirming = signal(false);
  showProgressBar = computed(() => this.loading() || this.confirming());

  constructor(private backendService: BackendService,
              private authenticationService: AuthenticationService,
              @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.loading.set(true);
    this.backendService.summaries().subscribe({
      next: value => {
        this.summaries = new Map<string, JudgeReportSummaryDTO[]>();

        for (const dto of value) {
          const key = `${dto.modul} ${dto.klasse ?? ''} ${dto.besetzung ?? ''}`;
          const entries = this.summaries.get(key);
          if (entries) {
            entries.push(dto);
          } else {
            this.summaries.set(key, [dto]);
          }
        }
        this.categories = [...this.summaries.keys()]

        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  getEntriesForCategory(category: string): JudgeReportSummaryDTO[] {
    return this.summaries.get(category)?.sort((a, b) => (b.overallScore ?? 0) - (a.overallScore ?? 0)) ?? [];
  }


  protected readonly JudgeReportStatus = JudgeReportStatus;

  openReport(reportId: number) {
    // TODO open report
    console.log(reportId);
  }

  get admin(): boolean {
    return this.authenticationService.isAdmin();
  }

  confirmScores(summary: JudgeReportSummaryDTO): void {
    this.confirming.set(true);
    this.backendService.confirmScores(summary.programmId).subscribe({
      next: () => {
        this.confirming.set(false);
        this.load();
      },
      error: err => {
        console.error(err);
        this.confirming.set(false);
      }
    })
  }

  getConfirmedTooltip(summary: JudgeReportSummaryDTO): string {
    if (summary.scoresConfirmedAt) {
      return `${summary.scoresConfirmedBy}, ${formatDate(summary.scoresConfirmedAt, 'dd.MM.yyyy, HH:mm', this.locale)}`;
    } else {
      return '';
    }
  }
}
