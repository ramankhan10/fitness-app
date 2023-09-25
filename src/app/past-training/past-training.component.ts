import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../training/exercise.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit,OnDestroy {
  displayedColumns: string[] = [
    'name',
    'duration',
    'calories',
    'date',
    'state',
  ];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private finishedExSubs: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
   this.finishedExSubs= this.trainingService.finishedExChanged.subscribe(
      (exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      }
    );
    this.trainingService.fetchCompleteOrCancelExercises();
  }

  ngOnDestroy(): void {
    this.finishedExSubs.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
