import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../training/exercise.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'duration',
    'calories',
    'date',
    'state',
  ];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompleteOrCancelExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase()
  }
}
