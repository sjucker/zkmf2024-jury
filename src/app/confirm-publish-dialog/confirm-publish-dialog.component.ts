import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirm-publish-dialog',
  templateUrl: './confirm-publish-dialog.component.html',
  styleUrl: './confirm-publish-dialog.component.scss',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class ConfirmPublishDialogComponent {

}
