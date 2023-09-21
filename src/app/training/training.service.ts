import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';

export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();

  private availableExrciss: Exercise[] = [
    { id: 'crunches', name: 'کرانچ', duration: 30, calories: 8 },
    { id: 'squat', name: 'اسکوات', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'لانچ اسکوات', duration: 120, calories: 18 },
    { id: 'burpees', name: 'شنا', duration: 60, calories: 8 },
  ];

  private exercises: Exercise[] = [];

  private runningExercises: Exercise | null;

  getAvailableExrsciss() {
    return this.availableExrciss.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercises = this.availableExrciss.find(
      (ex) => ex.id === selectedId
    )!;
    this.exerciseChanged.next({ ...this.runningExercises });
  }

  getRunningExercise() {
    return { ...this.runningExercises };
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercises!,
      date: new Date(),
      state: 'completed',
    });

    this.runningExercises = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
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
}
