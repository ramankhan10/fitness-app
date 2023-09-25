import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  ongoingTraining: boolean = false;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService.exerciseChanged.subscribe((exercise) => {
      if (exercise) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    });
  }
}
