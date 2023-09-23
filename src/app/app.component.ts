import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fitness-app';

  constructor(private db: AngularFirestore) {
    this.db
      .collection('exercises')
      .valueChanges()
      .subscribe((data) => {
        console.log(data);
      });
  }
}
