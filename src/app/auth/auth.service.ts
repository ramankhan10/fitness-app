import { User } from './user.model';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();

  private user: User | null;

  constructor(private router: Router) {}

  private successFullAuth() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.successFullAuth();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.successFullAuth();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getuser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
