import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {JudgeReportRatingDTO} from "../rest";
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-report-score',
  templateUrl: './report-score.component.html',
  styleUrl: './report-score.component.scss',
  imports: [MatFormField, MatLabel, FormsModule, MatInput]
})
export class ReportScoreComponent {

  @Input({required: true})
  rating!: JudgeReportRatingDTO;

  readonly readOnly = input.required<boolean>();

  readonly min = input.required<number>();

  readonly max = input.required<number>();

  @Output()
  changed = new EventEmitter<void>();

  onChange(): void {
    this.changed.emit();
  }

}
