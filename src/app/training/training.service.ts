import { Subject, map } from 'rxjs';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();

  private availableExrcises: Exercise[] = [];

  private exercises: Exercise[] = [];

  private runningExercises: Exercise | null;

  constructor(private db: AngularFirestore) {}

  fetchAvailableExrsciss() {
    this.db
      .collection('exercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              name: (doc.payload.doc.data() as any).name,
              duration: (doc.payload.doc.data() as any).duration,
              calories: (doc.payload.doc.data() as any).calories,
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExrcises = exercises;
        this.exercisesChanged.next([...this.availableExrcises]);
      });
  }

  startExercise(selectedId: string) {
    this.runningExercises = this.availableExrcises.find(
      (ex) => ex.id === selectedId
    )!;
    this.exerciseChanged.next({ ...this.runningExercises });
  }

  getRunningExercise() {
    return { ...this.runningExercises };
  }

  completeExercise() {
    this.addDataToDataBase({
      ...this.runningExercises!,
      date: new Date(),
      state: 'completed',
    });

    this.runningExercises = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDataBase({
      ...this.runningExercises!,
      date: new Date(),
      state: 'canceled',
      duration: (this.runningExercises?.duration! * progress) / 100,
      calories: (this.runningExercises?.calories! * progress) / 100,
    });

    this.runningExercises = null;
    this.exerciseChanged.next(null);
  }

  getCompleteOrCancelExercises() {
    return [...this.exercises];
  }

 private addDataToDataBase(exercise: Exercise) {
    this.db.collection('finishedExercise').add(exercise);
  }
}
