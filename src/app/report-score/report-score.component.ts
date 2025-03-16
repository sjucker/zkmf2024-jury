import {Component, EventEmitter, Input, Output} from '@angular/core';
import {JudgeReportRatingDTO} from "../rest";

@Component({
  selector: 'app-report-score',
  templateUrl: './report-score.component.html',
  styleUrl: './report-score.component.scss',
  standalone: false
})
export class ReportScoreComponent {

  @Input({required: true})
  rating!: JudgeReportRatingDTO;

  @Input({required: true})
  readOnly = false;

  @Input({required: true})
  min = 0;

  @Input({required: true})
  max = 20;

  @Output()
  changed = new EventEmitter<void>();

  onChange(): void {
    this.changed.emit();
  }

}
