import {Component, EventEmitter, Input, Output} from '@angular/core';
import {JudgeReportCategoryRating, JudgeReportRatingDTO} from "../rest";

@Component({
  selector: 'app-report-rating',
  templateUrl: './report-rating.component.html',
  styleUrls: ['./report-rating.component.scss']
})
export class ReportRatingComponent {
  negative = JudgeReportCategoryRating.NEGATIVE;
  neutral = JudgeReportCategoryRating.NEUTRAL;
  positive = JudgeReportCategoryRating.POSITIVE;

  @Input({required: true})
  // @ts-ignore
  rating: JudgeReportRatingDTO;

  @Input({required: true})
  readOnly = false;


  @Output()
  changed = new EventEmitter<void>();

  onChange(): void {
    this.changed.emit();
  }
}
