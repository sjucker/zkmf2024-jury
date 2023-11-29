import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent {

  @Input({required: true})
  buttonLabel = ''
  @Input({required: true})
  processing = false
  @Input()
  disabled = false;
  @Input()
  color: ThemePalette = 'primary';

  @Output()
  buttonClicked = new EventEmitter<void>()

}
