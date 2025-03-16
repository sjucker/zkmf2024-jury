import {Component, computed, Input, OnInit, signal} from '@angular/core';
import {JudgeRankingEntryDTO} from "../rest";
import {BackendService} from "../service/backend.service";

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
  standalone: false
})
export class RankingComponent implements OnInit {
  @Input({required: true})
  reportId!: number;

  ranking: JudgeRankingEntryDTO[] = [];
  rankingOwn: JudgeRankingEntryDTO[] = [];

  rankingOwnOnly = signal(false);

  relevantRanking = computed(() => {
    return this.rankingOwnOnly() ? this.rankingOwn : this.ranking;
  });

  constructor(private backendService: BackendService) {
  }

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
