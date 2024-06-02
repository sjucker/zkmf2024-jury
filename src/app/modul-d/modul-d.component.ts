import {Component, computed, OnInit, signal} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ModulDSelection, ModulDSelectionDTO} from "../rest";

@Component({
  selector: 'app-modul-d',
  templateUrl: './modul-d.component.html',
  styleUrl: './modul-d.component.scss'
})
export class ModulDComponent implements OnInit {

  titel1 = ModulDSelection.TITEL_1;
  titel2 = ModulDSelection.TITEL_2;

  modulDSelections: ModulDSelectionDTO[] = [];

  loading = signal(false);
  saving = signal(false);
  showProgressBar = computed(() => this.loading() || this.saving());

  constructor(private backendService: BackendService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

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
