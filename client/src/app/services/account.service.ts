import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';


// Service to keep track of the logged in user info.
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  // D.I.
  constructor(private httpService: HttpClient) { }

  login(model: any) {
    return this.httpService.post(this.baseUrl + 'account/login', model).pipe(
      map((res: User) => {
        const user = res;
        if (user) {
          /// Add the user to the local storage of the browser 
          localStorage.setItem('user', JSON.stringify(user));
          // Add the user to the observable
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: User) {
    return this.httpService.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          console.log(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    // Remove the user from storage and current source observable
    localStorage.removeItem('user');
    this.currentUserSource.next(null);

  }
}
