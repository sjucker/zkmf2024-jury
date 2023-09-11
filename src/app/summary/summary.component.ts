import {Component, OnInit} from '@angular/core';
import {JudgeReportStatus, JudgeReportSummaryDTO} from "../rest";
import {BackendService} from "../service/backend.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  summaries = new Map<string, JudgeReportSummaryDTO[]>;
  categories: string[] = [];

  loading = false;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.loading = true;
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

        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  getEntriesForCategory(category: string): JudgeReportSummaryDTO[] {
    // TODO sort it correctly
    return this.summaries.get(category) ?? [];
  }


  protected readonly JudgeReportStatus = JudgeReportStatus;

  openReport(reportId: number) {
    // TODO open report
    console.log(reportId);
  }
}
