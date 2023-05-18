import {Component, OnInit} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {JudgeReportOverviewDTO} from "../rest";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {REPORT_PATH} from "../app-routing.module";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  reports?: JudgeReportOverviewDTO[];

  notFound = false;
  error = false;

  saving = false;

  constructor(private backendService: BackendService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.backendService.getAll().subscribe({
      next: response => {
        this.reports = response;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.notFound = true;
        } else {
          this.error = true;
        }
      }
    });
  }

  openReport(report: JudgeReportOverviewDTO) {
    this.router.navigate([REPORT_PATH, report.id]).then();
  }
}
