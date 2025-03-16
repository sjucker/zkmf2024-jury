import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirm-penalty-dialog',
  templateUrl: './confirm-penalty-dialog.component.html',
  styleUrl: './confirm-penalty-dialog.component.scss',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class ConfirmPenaltyDialogComponent {

}
