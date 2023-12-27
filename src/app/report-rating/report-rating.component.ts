import {Component, EventEmitter, Input, Output} from '@angular/core';
import {JudgeReportCategoryRating, JudgeReportRatingDTO} from "../rest";

@Component({
  selector: 'app-report-rating',
  templateUrl: './report-rating.component.html',
  styleUrls: ['./report-rating.component.scss']
})
export class ReportRatingComponent {
  veryNegative = JudgeReportCategoryRating.VERY_NEGATIVE;
  negative = JudgeReportCategoryRating.NEGATIVE;
  neutral = JudgeReportCategoryRating.NEUTRAL;
  positive = JudgeReportCategoryRating.POSITIVE;
  veryPositive = JudgeReportCategoryRating.VERY_POSITIVE;

  @Input({required: true})
  rating!: JudgeReportRatingDTO;

  @Input({required: true})
  readOnly = false;


  @Output()
  changed = new EventEmitter<void>();

  onChange(): void {
    this.changed.emit();
  }

  get label(): string {
    if (this.readOnly) {
      return '';
    }

    return this.isNegative() ? 'Bemerkung' : 'Optionale Bemerkung';
  }

  get required(): boolean {
    return this.isNegative();
  }

  private isNegative() {
    return this.rating.rating === this.negative || this.rating.rating === this.veryNegative;
  }
}
