import {Component, OnInit, signal} from '@angular/core';
import {JudgeReportCategory, JudgeReportCategoryRating, JudgeReportModulCategory, JudgeReportRatingDTO, JudgeReportTitleDTO, JudgeReportViewDTO, Modul} from "../rest";
import {BackendService} from "../service/backend.service";
import {ActivatedRoute} from "@angular/router";
import {HeaderComponent} from '../header/header.component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {NgClass} from '@angular/common';
import {ScorePipe} from '../pipe/score.pipe';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.scss',
  imports: [HeaderComponent, MatProgressBar, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, NgClass, ScorePipe]
})
export class ReportViewComponent implements OnInit {
  report?: JudgeReportViewDTO;

  loading = signal(false);

  constructor(private readonly route: ActivatedRoute,
              private backendService: BackendService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading.set(true);
      const reportId = parseInt(id);
      this.backendService.view(reportId).subscribe({
        next: value => {
          this.report = value;
          this.loading.set(false);
        },
        error: err => {
          console.error(err);
          this.loading.set(false);
        }
      });
    }
  }

  getGroups(title: JudgeReportTitleDTO): string[] {
    return [...new Set(title.ratings.map(r => r.group))];
  }

  getRatings(title: JudgeReportTitleDTO, group: string): JudgeReportRatingDTO[] {
    return title.ratings.filter(r => r.group === group);
  }

  getRatingDescription(rating: JudgeReportCategoryRating) {
    switch (rating) {
      case JudgeReportCategoryRating.VERY_NEGATIVE:
        return "--";
      case JudgeReportCategoryRating.NEGATIVE:
        return "-";
      case JudgeReportCategoryRating.NEUTRAL:
        return "0";
      case JudgeReportCategoryRating.POSITIVE:
        return "+";
      case JudgeReportCategoryRating.VERY_POSITIVE:
        return "++";
    }
  }

  getRatingClass(rating: JudgeReportCategoryRating) {
    switch (rating) {
      case JudgeReportCategoryRating.VERY_NEGATIVE:
        return "very-negative";
      case JudgeReportCategoryRating.NEGATIVE:
        return "negative";
      case JudgeReportCategoryRating.NEUTRAL:
        return "neutral";
      case JudgeReportCategoryRating.POSITIVE:
        return "positive";
      case JudgeReportCategoryRating.VERY_POSITIVE:
        return "very-positive";
    }
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
}
