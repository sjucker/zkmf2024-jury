import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {RankingListDTO, RankingStatus} from "../rest";
import {BackendService} from "../service/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmPublishDialogComponent} from "../confirm-publish-dialog/confirm-publish-dialog.component";
import {HeaderComponent} from '../header/header.component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {MatButton} from '@angular/material/button';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-ranking-lists',
  templateUrl: './ranking-lists.component.html',
  styleUrl: './ranking-lists.component.scss',
  imports: [HeaderComponent, MatProgressBar, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatButton, DecimalPipe]
})
export class RankingListsComponent implements OnInit {
  private backendService = inject(BackendService);
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);


  rankingLists: RankingListDTO[] = [];

  loading = signal(false);
  saving = signal(false);
  showProgressBar = computed(() => this.loading() || this.saving());

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.loading.set(true);
    this.backendService.rankingLists().subscribe({
      next: value => {
        this.rankingLists = value;
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  publish(rankingList: RankingListDTO, intermediate: boolean): void {
    this.dialog.open(ConfirmPublishDialogComponent).afterClosed().subscribe(decision => {
      if (decision) {
        this.doPublish(rankingList, intermediate);
      }
    });
  }

  private doPublish(rankingList: RankingListDTO, intermediate: boolean) {
    this.saving.set(true);
    this.backendService.publishRankingList(rankingList.id, intermediate).subscribe({
      next: () => {
        this.snackBar.open('Rangliste publiziert', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'success'
        });
        this.saving.set(false);
        this.load();
      },
      error: () => {
        this.snackBar.open('Ein Fehler ist aufgetreten', undefined, {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
          panelClass: 'error'
        });
        this.saving.set(false);
      },
    });
  }

  protected readonly RankingStatus = RankingStatus;
}
