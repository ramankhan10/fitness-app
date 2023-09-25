import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

@Output() closeSidenav = new EventEmitter<void>();
isAuth:boolean = false;
authSubscription: Subscription;

constructor(private authService: AuthService) {}


  onClose(){
    this.closeSidenav.emit();
  }
  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }


  onLogout(){
    this.onClose();
    this.authService.logout();
  }
}
