import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../service/backend.service";
import {JudgeReportDTO} from "../rest";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  report?: JudgeReportDTO;

  saving = false;

  constructor(private readonly route: ActivatedRoute,
              private backendService: BackendService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.backendService.get(parseInt(id)).subscribe({
        next: value => {
          this.report = value;
        },
        error: err => {
          // TODO
        }
      });
    }
  }
}
