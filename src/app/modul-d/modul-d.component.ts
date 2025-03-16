import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ModulDSelection, ModulDSelectionDTO} from "../rest";
import {HeaderComponent} from '../header/header.component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-modul-d',
  templateUrl: './modul-d.component.html',
  styleUrl: './modul-d.component.scss',
  imports: [HeaderComponent, MatProgressBar, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatButtonToggleGroup, FormsModule, MatButtonToggle, DatePipe]
})
export class ModulDComponent implements OnInit {
  private backendService = inject(BackendService);
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);


  titel1 = ModulDSelection.TITEL_1;
  titel2 = ModulDSelection.TITEL_2;

  modulDSelections: ModulDSelectionDTO[] = [];

  loading = signal(false);
  saving = signal(false);
  showProgressBar = computed(() => this.loading() || this.saving());

  ngOnInit(): void {
    this.loading.set(true);
    this.backendService.modulD().subscribe({
      next: value => {
        this.modulDSelections = value;
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  onChange(): void {
    this.loading.set(true);
    this.backendService.updateModulD(this.modulDSelections).subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
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
