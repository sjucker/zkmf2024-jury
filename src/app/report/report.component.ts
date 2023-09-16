import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../service/backend.service";
import {JudgeReportDTO, JudgeReportStatus} from "../rest";
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

  loading = false;
  saving = false;
  finishing = false;

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
      this.loading = true;
      this.backendService.get(parseInt(id)).subscribe({
        next: value => {
          this.report = value;
          this.readOnly = this.report.status === JudgeReportStatus.DONE;
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

  saveReport(report: JudgeReportDTO) {
    this.saving = true;
    this.backendService.update(report).subscribe({
      next: _ => {
        this.saving = false;
        this.pendingChanges = false;
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

  onChange(): void {
    this.pendingChanges = true;
  }

  get valid(): boolean {
    const score = this.report?.score ?? 0;
    return (score > 50 && score <= 100) && !this.pendingChanges;
  }

  finishReport(report: JudgeReportDTO) {
    this.dialog.open(ReportFinishComponent).afterClosed().subscribe(decision => {
      if (decision) {
        this.doFinishReport(report);
      }
    });
  }

  doFinishReport(report: JudgeReportDTO): void {
    this.finishing = true;
    this.backendService.finish(report).subscribe({
      next: _ => {
        this.finishing = false;
        this.readOnly = true;
        this.snackBar.open('Erfolgreich abgeschlossen', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 2000,
          panelClass: 'success'
        });
      },
      error: _ => {
        this.finishing = false;
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
