import {Component, computed, OnInit, signal} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Modul, VereinPlayingDTO} from "../rest";
import {formatDuration} from "../utils";

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrl: './helper.component.scss'
})
export class HelperComponent implements OnInit {

  options: VereinPlayingDTO[] = [];
  value?: VereinPlayingDTO;

  durationMinutes = 0;
  durationSeconds = 0;

  loading = signal(false);
  saving = signal(false);
  showProgressBar = computed(() => this.loading() || this.saving());

  constructor(private backendService: BackendService,
              public snackBar: MatSnackBar) {
  }

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
    if (this.value && this.value.minutesOverrun) {
      this.saving.set(true);
      this.backendService.penalty(this.value.vereinProgrammId, this.value.minutesOverrun).subscribe({
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

  bonus() {
    if (this.value && this.value.bonus) {
      this.saving.set(true);
      this.backendService.bonus(this.value.vereinProgrammId, this.value.bonus).subscribe({
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

  get hasZeitlimite(): boolean {
    return this.value?.modul !== Modul.G;
  }

  get hasBonus(): boolean {
    return this.value?.modul === Modul.G;
  }

  calculatePenalty() {
    if (this.value) {
      if (this.durationMinutes) {
        const totalDurationInSeconds = (this.durationMinutes * 60) + this.durationSeconds;
        if (this.value.minDurationInSeconds && this.value.maxDurationInSeconds) {
          if (totalDurationInSeconds < this.value.minDurationInSeconds) {

          }
        }
      }
    }
  }
}
