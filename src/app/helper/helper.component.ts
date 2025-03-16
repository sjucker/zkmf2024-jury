import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JudgeReportModulCategory, Modul, VereinPlayingDTO} from "../rest";
import {formatDuration} from "../utils";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmPenaltyDialogComponent} from "../confirm-penalty-dialog/confirm-penalty-dialog.component";
import {HeaderComponent} from '../header/header.component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrl: './helper.component.scss',
  imports: [HeaderComponent, MatProgressBar, MatCard, MatCardContent, MatFormField, MatLabel, MatSelect, FormsModule, MatOption, MatButton, MatInput, DatePipe]
})
export class HelperComponent implements OnInit {
  private backendService = inject(BackendService);
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);


  options: VereinPlayingDTO[] = [];
  value?: VereinPlayingDTO;

  durationMinutes = 0;
  durationSeconds = 0;
  under = false;

  loading = signal(false);
  saving = signal(false);
  showProgressBar = computed(() => this.loading() || this.saving());

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.loading.set(true);
    this.backendService.helper().subscribe({
      next: options => {
        this.options = options;
        this.loading.set(false);
        if (this.value) {
          this.value = this.options.find(e => e.timetableEntryId === this.value?.timetableEntryId);
          this.onValueChange(this.value);
          this.calculatePenalty();
        }
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  protected readonly formatDuration = formatDuration;

  started() {
    if (this.value) {
      this.saving.set(true);
      this.backendService.currentPlayStarted(this.value.timetableEntryId).subscribe({
        next: () => {
          this.snackBar.open('Erfolgreich gestartet', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000,
            panelClass: 'success'
          });
          this.load();
          this.saving.set(false);
        },
        error: () => {
          this.snackBar.open('Ein Fehler ist aufgetreten', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000,
            panelClass: 'error'
          });
          this.saving.set(false);
        }
      });
    }
  }

  ended() {
    if (this.value) {
      this.saving.set(true);
      this.backendService.currentPlayEnded(this.value.timetableEntryId).subscribe({
        next: () => {
          this.snackBar.open('Erfolgreich beendet', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000,
            panelClass: 'success'
          });
          this.load();
          this.saving.set(false);
        },
        error: () => {
          this.snackBar.open('Ein Fehler ist aufgetreten', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000,
            panelClass: 'error'
          });
          this.saving.set(false);
        }
      });
    }
  }

  penalty() {
    if (this.value) {
      if ((this.value.minutesOverrun ?? 0) > 0) {
        this.dialog.open(ConfirmPenaltyDialogComponent).afterClosed().subscribe(decision => {
          if (decision) {
            this.doSavePenalty(this.value!);
          }
        });
      } else {
        this.doSavePenalty(this.value);
      }
    }
  }

  private doSavePenalty(value: VereinPlayingDTO) {
    this.saving.set(true);
    this.backendService.penalty(value.vereinProgrammId, value.actualDurationInSeconds!, value.minutesOverrun!).subscribe({
      next: () => {
        this.snackBar.open('Speichern erfolgreich', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'success'
        });
        this.load();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.open('Ein Fehler ist aufgetreten', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        });
        this.saving.set(false);
      }
    });
  }

  bonus(category: JudgeReportModulCategory, bonus: number) {
    if (this.value) {
      this.saving.set(true);
      this.backendService.bonus(this.value.vereinProgrammId, category, bonus).subscribe({
        next: () => {
          this.snackBar.open('Speichern erfolgreich', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000,
            panelClass: 'success'
          });
          this.load();
          this.saving.set(false);
        },
        error: () => {
          this.snackBar.open('Ein Fehler ist aufgetreten', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000,
            panelClass: 'error'
          });
          this.saving.set(false);
        }
      });
    }
  }

  get hasJury(): boolean {
    // not Platzkkonzert
    return this.value?.modul !== Modul.C
  }

  get hasZeitlimite(): boolean {
    return this.hasJury && (this.value?.modul === Modul.A || this.value?.modul === Modul.B || this.value?.modul === Modul.H);
  }

  get hasBonus(): boolean {
    return this.value?.modul === Modul.G;
  }

  get modulGKatA(): boolean {
    return this.value?.categories.includes(JudgeReportModulCategory.MODUL_G_KAT_A) ?? false;
  }

  get modulGKatB(): boolean {
    return this.value?.categories.includes(JudgeReportModulCategory.MODUL_G_KAT_B) ?? false;
  }

  get modulGKatC(): boolean {
    return this.value?.categories.includes(JudgeReportModulCategory.MODUL_G_KAT_C) ?? false;
  }

  calculatePenalty() {
    if (this.value) {
      if (this.durationMinutes) {
        this.value.actualDurationInSeconds = (this.durationMinutes * 60) + this.durationSeconds;
        if (this.value.minDurationInSeconds && this.value.maxDurationInSeconds) {
          if (this.value.actualDurationInSeconds < this.value.minDurationInSeconds) {
            this.value.minutesOverrun = Math.ceil((this.value.minDurationInSeconds - this.value.actualDurationInSeconds) / 60);
            this.under = true;
          } else if (this.value.actualDurationInSeconds > this.value.maxDurationInSeconds) {
            this.value.minutesOverrun = Math.ceil((this.value.actualDurationInSeconds - this.value.maxDurationInSeconds) / 60);
            this.under = false;
          } else {
            this.value.minutesOverrun = 0;
            this.under = false;
          }
        }
      }
    }
  }

  onValueChange(value?: VereinPlayingDTO) {
    if (value) {
      if (value.actualDurationInSeconds) {
        this.durationMinutes = Math.floor(value.actualDurationInSeconds / 60);
        this.durationSeconds = value.actualDurationInSeconds % 60;
        this.under = value.actualDurationInSeconds < value.minDurationInSeconds!;
      } else {
        this.durationMinutes = 0;
        this.durationSeconds = 0;
      }
    }
  }

  protected readonly JudgeReportModulCategory = JudgeReportModulCategory;
}
