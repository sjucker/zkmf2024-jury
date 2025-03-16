import {Component, Input} from '@angular/core';
import {JudgeReportOverviewDTO, JudgeReportStatus, Modul} from "../../rest";
import {REPORT_PATH} from "../../app-routing.module";
import {Router} from "@angular/router";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.scss',
  imports: [MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle, MatIcon, MatCardContent, MatDivider, MatCardActions, MatButton, DatePipe]
})
export class ReportCardComponent {

  @Input({required: true})
  report!: JudgeReportOverviewDTO;

  constructor(private readonly router: Router) {
  }

  openReport(): void {
    this.router.navigate([REPORT_PATH, this.report.id]).catch(reason => {
      console.error(reason);
    });
  }

  isInProgress(): boolean {
    return this.report.status === JudgeReportStatus.IN_PROGRESS;
  }

  isFinished() {
    return this.report.status === JudgeReportStatus.DONE;
  }

  isModulD() {
    return this.report.modul == Modul.D;
  }
}
