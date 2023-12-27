import {Component, computed, HostListener, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../service/backend.service";
import {
  JudgeRankingEntryDTO,
  JudgeReportCategoryRating,
  JudgeReportDTO,
  JudgeReportRatingDTO,
  JudgeReportStatus
} from "../rest";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ReportFinishComponent} from "../report-finish/report-finish.component";
import {Observable, of} from "rxjs";
import {PendingChangesDialogComponent} from "../pending-changes-dialog/pending-changes-dialog.component";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  report?: JudgeReportDTO;
  ranking: JudgeRankingEntryDTO[] = [];

  loading = signal(false);
  saving = signal(false);
  finishing = signal(false);
  fixing = signal(false);
  showProgressBar = computed(() => this.loading() || this.saving() || this.finishing() || this.fixing())

  pendingChanges = false;
  readOnly = false;

  errorMessage?: string;

  constructor(private readonly route: ActivatedRoute,
              private backendService: BackendService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading.set(true);
      const reportId = parseInt(id);
      this.backendService.get(reportId).subscribe({
        next: value => {
          this.report = value;
          this.readOnly = this.report.status === JudgeReportStatus.DONE;
          this.loading.set(false);
        },
        error: err => {
          console.error(err);
          this.errorMessage = "Ein Fehler ist aufgetreten";
          this.loading.set(false);
        }
      });

      this.backendService.ranking(reportId).subscribe({
        next: value => {
          this.ranking = value;
        },
      });
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  handleClose($event: BeforeUnloadEvent) {
    if (this.pendingChanges) {
      $event.returnValue = 'pendingChanges';
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

  saveReport(report: JudgeReportDTO): void {
    this.saving.set(true);
    this.backendService.update(report).subscribe({
      next: () => {
        this.saving.set(false);
        this.pendingChanges = false;
        this.snackBar.open('Speichern war erfolgreich', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 2000,
          panelClass: 'success'
        });
      },
      error: () => {
        this.saving.set(false);
        this.snackBar.open('Ein Fehler ist aufgetreten', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        });
      }
    });
  }

  fixRating(report: JudgeReportDTO): void {
    this.fixing.set(true);
    this.backendService.fixRating(report).subscribe({
      next: () => {
        this.report = {...report, ratingFixed: true}
        this.fixing.set(false);
      },
      error: () => {
        this.fixing.set(false);
        this.snackBar.open('Ein Fehler ist aufgetreten', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        });
      }
    })
  }

  onChange(): void {
    this.pendingChanges = true;
  }

  get valid(): boolean {
    return this.validScore && !this.pendingChanges;
  }

  get validScore(): boolean {
    const score = this.report?.score ?? 0;
    return (score >= 50 && score <= 100);
  }

  finishReport(report: JudgeReportDTO) {
    if (this.hasNegativeRatingWithoutComment(report) || this.hasNegativeOverallWithoutComment(report)) {
      this.snackBar.open('Alle negativen Bewertung müssen einen Kommentar haben!', undefined, {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 2000,
        panelClass: 'info'
      });
    } else {
      this.dialog.open(ReportFinishComponent).afterClosed().subscribe(decision => {
        if (decision) {
          this.doFinishReport(report);
        }
      });
    }
  }

  private hasNegativeRatingWithoutComment(report: JudgeReportDTO): boolean {
    return report.titles.some(dto => dto.ratings.some(r => this.isInvalid(r)))
  }

  private hasNegativeOverallWithoutComment(report: JudgeReportDTO): boolean {
    return report.overallRatings.some(r => this.isInvalid(r))
  }

  private isInvalid(rating: JudgeReportRatingDTO) {
    return (rating.rating === JudgeReportCategoryRating.VERY_NEGATIVE || rating.rating === JudgeReportCategoryRating.NEGATIVE) && !rating.comment;
  }

  doFinishReport(report: JudgeReportDTO): void {
    this.finishing.set(true);
    this.backendService.finish(report).subscribe({
      next: () => {
        this.finishing.set(false);
        this.readOnly = true;
        this.snackBar.open('Erfolgreich abgeschlossen', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 2000,
          panelClass: 'success'
        });
      },
      error: () => {
        this.finishing.set(false);
        this.snackBar.open('Ein Fehler ist aufgetreten', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        });
      }
    });
  }

  canDeactivate(): Observable<boolean> {
    if (this.pendingChanges) {
      return this.dialog.open(PendingChangesDialogComponent, {
        disableClose: true,
        autoFocus: false
      }).afterClosed();
    } else {
      return of(true);
    }
  }
}
