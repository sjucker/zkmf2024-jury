import {Component, input, output} from '@angular/core';
import {JudgeReportCategoryRating, JudgeReportRatingDTO} from "../rest";
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-report-rating',
  templateUrl: './report-rating.component.html',
  styleUrls: ['./report-rating.component.scss'],
  imports: [MatButtonToggleGroup, FormsModule, MatButtonToggle, MatFormField, MatLabel, MatInput, MatIconButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem]
})
export class ReportRatingComponent {
  veryNegative = JudgeReportCategoryRating.VERY_NEGATIVE;
  negative = JudgeReportCategoryRating.NEGATIVE;
  neutral = JudgeReportCategoryRating.NEUTRAL;
  positive = JudgeReportCategoryRating.POSITIVE;
  veryPositive = JudgeReportCategoryRating.VERY_POSITIVE;

  readonly rating = input.required<JudgeReportRatingDTO>();

  readonly readOnly = input.required<boolean>();

  readonly changed = output<void>();

  onChange(): void {
    this.changed.emit();
  }

  get label(): string {
    if (this.readOnly()) {
      return '';
    }

    return this.isNegative() ? 'Bemerkung' : 'Optionale Bemerkung';
  }

  get required(): boolean {
    return this.isNegative();
  }

  private isNegative() {
    const rating = this.rating();
    return rating.rating === this.negative || rating.rating === this.veryNegative;
  }

  apply(description: string) {
    this.rating().comment = description;
    this.onChange();
  }
}
