import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../service/backend.service";
import {JudgeReportCategory, JudgeReportCategoryRating, JudgeReportFeedbackDTO, JudgeReportModulCategory, JudgeReportRatingDTO, JudgeReportTitleDTO, JudgeReportViewDTO, Modul} from "../rest";

@Component({
  selector: 'app-report-feedback',
  templateUrl: './report-feedback.component.html',
  styleUrl: './report-feedback.component.scss'
})
export class ReportFeedbackComponent implements OnInit {

  feedback?: JudgeReportFeedbackDTO;

  loading = signal(false);

  constructor(private readonly route: ActivatedRoute,
              private backendService: BackendService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const category = this.route.snapshot.paramMap.get('category') ?? undefined;
    if (id) {
      this.loading.set(true);
      const programmId = parseInt(id);
      this.backendService.feedback(programmId, category).subscribe({
        next: value => {
          this.feedback = value;
          this.loading.set(false);
        },
        error: err => {
          console.error(err);
          this.loading.set(false);
        }
      });
    }
  }

  get judge1(): JudgeReportViewDTO {
    return this.feedback!.judge1;
  }

  get judge2(): JudgeReportViewDTO {
    return this.feedback!.judge2;
  }

  get judge3(): JudgeReportViewDTO {
    return this.feedback!.judge3;
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
    return this.feedback?.modul === Modul.G;
  }

  isModulGKatA(): boolean {
    return this.feedback?.category === JudgeReportModulCategory.MODUL_G_KAT_A;
  }

  isModulGKatB(): boolean {
    return this.feedback?.category === JudgeReportModulCategory.MODUL_G_KAT_B;
  }

  isModulGKatC(): boolean {
    return this.feedback?.category === JudgeReportModulCategory.MODUL_G_KAT_C;
  }

  getJudge2Titel(titelId: number): JudgeReportTitleDTO {
    return this.judge2.titles.find(dto => dto.titel.id === titelId)!;
  }

  getJudge3Titel(titelId: number): JudgeReportTitleDTO {
    return this.judge3.titles.find(dto => dto.titel.id === titelId)!;
  }

  getJudgeRating(titel: JudgeReportTitleDTO, category: JudgeReportCategory): JudgeReportRatingDTO {
    return titel.ratings.find(r => r.category === category)!;
  }

  getJudge2OverallRating(category: JudgeReportCategory): JudgeReportRatingDTO {
    return this.judge2.overallRatings.find(r => r.category === category)!;
  }

  getJudge3OverallRating(category: JudgeReportCategory): JudgeReportRatingDTO {
    return this.judge3.overallRatings.find(r => r.category === category)!;
  }

}
