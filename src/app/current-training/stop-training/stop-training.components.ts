import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-stop-training',
  templateUrl: './stop-training.components.html',
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData:any) {}
}
