import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {JudgeReportOverviewDTO, JudgeReportStatus} from "../../rest";
import {REPORT_PATH} from "../../app-routing.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-report-card',
  standalone: true,
    imports: [
        DatePipe,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule
    ],
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.scss'
})
export class ReportCardComponent {

  @Input({required: true})
  report!: JudgeReportOverviewDTO;

  constructor(private readonly router: Router) {
  }

  openReport(report: JudgeReportOverviewDTO) {
    this.router.navigate([REPORT_PATH, report.id]).catch(reason => {
      console.error(reason);
    });
  }

  isFinished(report: JudgeReportOverviewDTO) {
    return report.status === JudgeReportStatus.DONE;
  }
}
