import {Component, computed, OnInit, signal} from '@angular/core';
import {RankingListDTO, RankingStatus} from "../rest";
import {BackendService} from "../service/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmPublishDialogComponent} from "../confirm-publish-dialog/confirm-publish-dialog.component";

@Component({
  selector: 'app-ranking-lists',
  templateUrl: './ranking-lists.component.html',
  styleUrl: './ranking-lists.component.scss',
  standalone: false
})
export class RankingListsComponent implements OnInit {

  rankingLists: RankingListDTO[] = [];

  loading = signal(false);
  saving = signal(false);
  showProgressBar = computed(() => this.loading() || this.saving());

  constructor(private backendService: BackendService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

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
