import {Component, OnInit} from '@angular/core';
import {BackendService} from "../service/backend.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
  }

}
