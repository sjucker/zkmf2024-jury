import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../service/backend.service";
import {JudgeReportCategoryRating, JudgeReportDTO} from "../rest";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  negative = JudgeReportCategoryRating.NEGATIVE;
  neutral = JudgeReportCategoryRating.NEUTRAL;
  positive = JudgeReportCategoryRating.POSITIVE;

  report?: JudgeReportDTO;

  loading = false;
  saving = false;

  errorMessage?: string;

  ratingSelection?: string;

  constructor(private readonly route: ActivatedRoute,
              private backendService: BackendService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.backendService.get(parseInt(id)).subscribe({
        next: value => {
          this.report = value;
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.errorMessage = "Ein Fehler ist aufgetreten";
          this.loading = false;
        }
      });
    }
  }

  get hasVorgabeDauer(): boolean {
    return !!(this.report?.minDurationInSeconds && this.report?.maxDurationInSeconds);
  }

  formatDuration(durationInSeconds?: number): string {
    if (durationInSeconds) {
      const seconds = Math.abs(durationInSeconds);
      let formatted = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

      if (durationInSeconds < 0) {
        formatted = "-" + formatted;
      }

      return formatted;
    }

    return '';
  }

  saveReport(report: JudgeReportDTO) {
    this.saving = true;
    this.backendService.update(report).subscribe({
      next: _ => {
        this.saving = false;
        this.snackBar.open('Speichern war erfolgreich', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 2000,
          panelClass: 'success'
        });
      },
      error: _ => {
        this.saving = false;
        this.snackBar.open('Ein Fehler ist aufgetreten', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        });
      }
    });
  }
}
