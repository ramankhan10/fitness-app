import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { Exercise } from '../training/exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exercisesSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.exercisesSubscription =
      this.trainingService.exercisesChanged.subscribe((thiexercises) => {
        this.exercises = this.exercises;
      });
    this.trainingService.fetchAvailableExrsciss();
  }

  ngOnDestroy(): void {
    this.exercisesSubscription.unsubscribe()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
