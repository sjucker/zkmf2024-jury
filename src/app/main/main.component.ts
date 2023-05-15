import {Component, OnInit} from '@angular/core';
import {BackendService} from "../service/backend.service";
import {JudgeReportDTO} from "../rest";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  judge?: JudgeReportDTO[];

  notFound = false;
  error = false;

  saving = false;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.backendService.get().subscribe({
      next: response => {
        this.judge = response;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.notFound = true;
        } else {
          this.error = true;
        }
      }
    });
  }
}
