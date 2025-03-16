import {Component, computed, inject, Input, OnInit, signal} from '@angular/core';
import {JudgeRankingEntryDTO} from "../rest";
import {BackendService} from "../service/backend.service";
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
  imports: [MatSlideToggle, FormsModule, DecimalPipe]
})
export class RankingComponent implements OnInit {
  private backendService = inject(BackendService);

  @Input({required: true})
  reportId!: number;

  ranking: JudgeRankingEntryDTO[] = [];
  rankingOwn: JudgeRankingEntryDTO[] = [];

  rankingOwnOnly = signal(false);

  relevantRanking = computed(() => {
    return this.rankingOwnOnly() ? this.rankingOwn : this.ranking;
  });

  ngOnInit(): void {
    this.backendService.ranking(this.reportId).subscribe({
      next: value => {
        this.ranking = value;
      },
    });

    this.backendService.rankingOwnOnly(this.reportId).subscribe({
      next: value => {
        this.rankingOwn = value;
      },
    });
  }
}
