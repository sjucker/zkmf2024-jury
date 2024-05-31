import {Component, computed, Inject, LOCALE_ID, OnInit, signal} from '@angular/core';
import {JudgeReportScoreDTO, JudgeReportStatus, JudgeReportSummaryDTO} from "../rest";
import {BackendService} from "../service/backend.service";
import {AuthenticationService} from "../service/authentication.service";
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";
import {VIEW_PATH} from "../app-routing.module";

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
              private router: Router,
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
          const key = this.getKey(dto);
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

  private getKey(dto: JudgeReportSummaryDTO) {
    let key = dto.modulDescription;
    if (dto.klasseDescription) {
      key += ` ${dto.klasseDescription}`;
    }
    if (dto.besetzungDescription) {
      key += ` ${dto.besetzungDescription}`;
    }
    key += ` (${dto.location.name})`;

    return key;
  }

  getEntriesForCategory(category: string): JudgeReportSummaryDTO[] {
    return this.summaries.get(category)?.sort((a, b) => (b.overallScore ?? 0) - (a.overallScore ?? 0)) ?? [];
  }


  protected readonly JudgeReportStatus = JudgeReportStatus;

  openReport(reportId: number) {
    this.router.navigate([VIEW_PATH, reportId]).catch(reason => {
      console.error(reason);
    });
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

  getTooltip(score: JudgeReportScoreDTO): string {
    return `${score.judgeName} (${score.judgeRole})`;
  }

}
