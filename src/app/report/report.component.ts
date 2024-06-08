import {Component, computed, HostListener, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../service/backend.service";
import {JudgeReportCategory, JudgeReportCategoryRating, JudgeReportDTO, JudgeReportModulCategory, JudgeReportRatingDTO, JudgeReportStatus, JudgeReportTitleDTO, Modul} from "../rest";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ReportFinishComponent} from "../report-finish/report-finish.component";
import {Observable, of} from "rxjs";
import {PendingChangesDialogComponent} from "../pending-changes-dialog/pending-changes-dialog.component";
import {formatDuration} from "../utils";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  report?: JudgeReportDTO;

  loading = signal(false);
  saving = signal(false);
  finishing = signal(false);
  fixing = signal(false);
  showProgressBar = computed(() => this.loading() || this.saving() || this.finishing() || this.fixing());

  pendingChanges = signal(false);
  readOnly = signal(false);

  ratingAverage = signal(0.5);

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
          this.readOnly.set(this.report.status === JudgeReportStatus.DONE);
          this.loading.set(false);
          this.calculateRatingAverage();
          this.calculateTotalScore();
        },
        error: err => {
          console.error(err);
          this.errorMessage = "Ein Fehler ist aufgetreten";
          this.loading.set(false);
        }
      });
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  handleClose($event: BeforeUnloadEvent) {
    if (this.pendingChanges()) {
      $event.preventDefault();
    }
  }

  get hasVorgabeDauer(): boolean {
    return !!(this.report?.minDurationInSeconds && this.report?.maxDurationInSeconds);
  }

  saveReport(report: JudgeReportDTO): void {
    this.saving.set(true);
    this.backendService.update(report).subscribe({
      next: () => {
        this.saving.set(false);
        this.pendingChanges.set(false);
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
    this.calculateRatingAverage();
    this.calculateTotalScore();
    this.pendingChanges.set(true);
  }

  private calculateTotalScore(): void {
    if (this.report) {
      if (!this.isModulG()) {
        return;
      }
      let total = 0;
      this.report.titles.forEach(title => {
        title.ratings.forEach(rating => {
          if (rating.category === JudgeReportCategory.ABZUG) {
            total -= rating.score ?? 0;
          } else {
            total += rating.score ?? 0;
          }
        })
      })
      this.report.overallRatings.forEach(overallRating => {
        if (overallRating.category === JudgeReportCategory.GRUNDLAGE_1_ABZUG || overallRating.category === JudgeReportCategory.GRUNDLAGE_2_ABZUG) {
          total -= overallRating.score ?? 0;
        } else {
          total += overallRating.score ?? 0;
        }
      })

      this.report.score = total;
    }
  }

  private calculateRatingAverage(): void {
    if (this.isModulG()) {
      return;
    }

    let count = 0;
    let ratingsSum = 0;
    this.report?.titles.forEach(title => {
      title.ratings.forEach(rating => {
        count++;
        ratingsSum += this.getRatingValue(rating)
      });
    });

    if (count === 0) {
      this.ratingAverage.set(0);
    } else {
      this.ratingAverage.set(ratingsSum / count);
    }
  }

  private getRatingValue(rating: JudgeReportRatingDTO) {
    switch (rating.rating) {
      case JudgeReportCategoryRating.VERY_NEGATIVE:
        return 0;
      case JudgeReportCategoryRating.NEGATIVE:
        return 0.25;
      case JudgeReportCategoryRating.NEUTRAL:
        return 0.5;
      case JudgeReportCategoryRating.POSITIVE:
        return 0.75;
      case JudgeReportCategoryRating.VERY_POSITIVE:
        return 1;
    }
  }

  get canFinishModulG(): boolean {
    if (this.pendingChanges()) {
      return false;
    }

    if (this.report?.category) {
      const score = this.report.score ?? 0;
      switch (this.report.category) {
        case JudgeReportModulCategory.MODUL_G_KAT_A:
          return (score > 0 && score <= 100);
        case JudgeReportModulCategory.MODUL_G_KAT_B:
          return (score > 0 && score <= 40);
        case JudgeReportModulCategory.MODUL_G_KAT_C:
          return (score >= 30 && score <= 61);
      }
    }
    return false;
  }

  get canFinish(): boolean {
    if (this.report) {
      return this.validScore && this.report.ratingFixed && !this.pendingChanges();
    }
    return false;
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
        this.readOnly.set(true);
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
    if (this.pendingChanges()) {
      return this.dialog.open(PendingChangesDialogComponent, {
        disableClose: true,
        autoFocus: false
      }).afterClosed();
    } else {
      return of(true);
    }
  }

  getGroups(title: JudgeReportTitleDTO): string[] {
    return [...new Set(title.ratings.map(r => r.group))];
  }

  getRatings(title: JudgeReportTitleDTO, group: string): JudgeReportRatingDTO[] {
    return title.ratings.filter(r => r.group === group);
  }

  isModulG(): boolean {
    return this.report?.modul === Modul.G;
  }

  isModulGKatA(): boolean {
    return this.report?.category === JudgeReportModulCategory.MODUL_G_KAT_A;
  }

  isModulGKatB(): boolean {
    return this.report?.category === JudgeReportModulCategory.MODUL_G_KAT_B;
  }

  isModulGKatC(): boolean {
    return this.report?.category === JudgeReportModulCategory.MODUL_G_KAT_C;
  }

  get grundlage1Rating(): JudgeReportRatingDTO {
    return this.report?.overallRatings.find(dto => dto.category === JudgeReportCategory.GRUNDLAGE_1) ?? {
      category: JudgeReportCategory.GRUNDLAGE_1,
      categoryDescription: '',
      group: '',
      ratingDescriptions: [],
      rating: JudgeReportCategoryRating.NEUTRAL
    };
  }

  get grundlage1Abzug(): JudgeReportRatingDTO {
    return this.report?.overallRatings.find(dto => dto.category === JudgeReportCategory.GRUNDLAGE_1_ABZUG) ?? {
      category: JudgeReportCategory.GRUNDLAGE_1_ABZUG,
      categoryDescription: '',
      group: '',
      ratingDescriptions: [],
      rating: JudgeReportCategoryRating.NEUTRAL
    };
  }

  get grundlage2Rating(): JudgeReportRatingDTO {
    return this.report?.overallRatings.find(dto => dto.category === JudgeReportCategory.GRUNDLAGE_2) ?? {
      category: JudgeReportCategory.GRUNDLAGE_2,
      categoryDescription: '',
      group: '',
      ratingDescriptions: [],
      rating: JudgeReportCategoryRating.NEUTRAL
    };
  }

  get grundlage2Abzug(): JudgeReportRatingDTO {
    return this.report?.overallRatings.find(dto => dto.category === JudgeReportCategory.GRUNDLAGE_2_ABZUG) ?? {
      category: JudgeReportCategory.GRUNDLAGE_2_ABZUG,
      categoryDescription: '',
      group: '',
      ratingDescriptions: [],
      rating: JudgeReportCategoryRating.NEUTRAL
    };
  }

  get katATitel1(): JudgeReportTitleDTO | undefined {
    return this.report?.titles[0];
  }

  get katATitel2(): JudgeReportTitleDTO | undefined {
    return this.report?.titles[1];
  }

  get katBTitel(): JudgeReportTitleDTO | undefined {
    return this.report?.titles[0];
  }

  get katCTitel(): JudgeReportTitleDTO | undefined {
    return this.report?.titles[0];
  }

  protected readonly formatDuration = formatDuration;
}
