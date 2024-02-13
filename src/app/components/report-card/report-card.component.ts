import {Component, Input} from '@angular/core';
import {JudgeReportOverviewDTO, JudgeReportStatus, Modul} from "../../rest";
import {MODUL_D, REPORT_PATH} from "../../app-routing.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.scss'
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

  openModulDSelection(): void {
    this.router.navigate([MODUL_D]).catch(reason => {
      console.error(reason);
    });
  }

  isFinished() {
    return this.report.status === JudgeReportStatus.DONE;
  }

  isModulD() {
    return this.report.modul == Modul.D;
  }
}
