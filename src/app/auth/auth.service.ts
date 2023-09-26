import { User } from './user.model';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from 'src/app/shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  private user: User | null;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private snakBar: MatSnackBar,
    private uiService: UIService
  ) {}

  registerUser(authData: AuthData) {
    this.uiService.loadingState.next(true);

    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.successfullAuth();

        this.uiService.loadingState.next(false);
      })
      .catch((error) => {
        this.uiService.loadingState.next(false);

        this.snakBar.open(error.message, null, {
          duration: 3000,
        });
        this.failFullAuth();
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingState.next(true);

    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.successfullAuth();
        this.uiService.loadingState.next(false);
      })
      .catch((error) => {
        this.uiService.loadingState.next(false);

        this.snakBar.open(error.message, null, {
          duration: 3000,
        });
        this.failFullAuth();
      });
  }

  logout() {
    this.fireAuth.signOut();
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private successfullAuth() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  private failFullAuth() {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/signup']);
  }
}
