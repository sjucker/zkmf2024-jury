import {Component, computed, OnInit, signal} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {JudgeReportOverviewDTO, JudgeReportStatus} from "../rest";
import {HttpErrorResponse} from "@angular/common/http";
import {HeaderComponent} from '../header/header.component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {ReportCardComponent} from '../components/report-card/report-card.component';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [HeaderComponent, MatProgressBar, ReportCardComponent, MatCard, MatCardContent]
})
export class MainComponent implements OnInit {

  newReports: JudgeReportOverviewDTO[] = [];
  inProgressReports: JudgeReportOverviewDTO[] = [];
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
          } else if (dto.status === JudgeReportStatus.IN_PROGRESS) {
            this.inProgressReports = [...this.inProgressReports, dto];
          } else {
            this.newReports = [...this.newReports, dto];
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
