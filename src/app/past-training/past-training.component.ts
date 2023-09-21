import { Component } from '@angular/core';
import { TrainingService } from '../training/training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent {
  displayedColumns: string[] = [
    'name',
    'duration',
    'calories',
    'date',
    'state',
  ];

  constructor(private trainingService: TrainingService) {}

  dataSource = this.trainingService.getCompleteOrCancelExercises();
}
