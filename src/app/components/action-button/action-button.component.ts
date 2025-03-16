import {Component, EventEmitter, input, Output} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  imports: [MatButton, MatIcon, MatProgressSpinner]
})
export class ActionButtonComponent {

  readonly buttonLabel = input.required<string>();
  readonly processing = input.required<boolean>();
  readonly disabled = input(false);
  readonly color = input<ThemePalette>('primary');

  @Output()
  buttonClicked = new EventEmitter<void>()

}
