import {Component, computed, OnInit, signal} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {JudgeReportOverviewDTO, JudgeReportStatus} from "../rest";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {REPORT_PATH} from "../app-routing.module";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  openReports: JudgeReportOverviewDTO[] = [];
  doneReports: JudgeReportOverviewDTO[] = [];

  notFound = signal(false);
  error = signal(false);

  loading = signal(false);
  saving = signal(false);

  showProgressBar = computed(() => (this.loading() || this.saving()));

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.loading.set(true);
    this.backendService.getAll().subscribe({
      next: response => {
        for (const dto of response) {
          if (dto.status === JudgeReportStatus.DONE) {
            this.doneReports = [...this.doneReports, dto];
          } else {
            this.openReports = [...this.openReports, dto];
          }
        }
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        if (err.status === 404) {
          this.notFound.set(true);
        } else {
          this.error.set(true);
        }
      }
    });
  }
}
