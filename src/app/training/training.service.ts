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
  private availableExercises: Exercise[] = [];
  finishedExChanged = new Subject<Exercise[]>();

  constructor(private db: AngularFirestore) {}

  private exercises: Exercise[] = [];

  private runningExercise: Exercise | null;

  fetchAvailableExercises() {
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
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    )!;
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunnigExercise() {
    return { ...this.runningExercise };
  }

  completeExecise() {
    this.addDataToDatabase({
      ...this.runningExercise!,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    console.log(this.exercises);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise!,
      date: new Date(),
      state: 'canceled',
      duration: this.runningExercise?.duration! * (progress / 100),
      calories: this.runningExercise?.calories! * (progress / 100),
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    console.log(this.exercises);
  }

  fetchCompleteOrCancelExercises() {
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExChanged.next([...exercises]);
      });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
