import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;
  // Dependency injection -- shorthand declaration
  constructor(private httpService: HttpClient, private accountService: AccountService) { }

  // Life cycle
  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }
  // Check local storage to see if user already exists to set
  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
  getUsers() {
    this.httpService.get('https://localhost:5001/api/users').subscribe(
      res => {
        this.users = res;
      }
    ), error => {
      console.log(error);
    };
  }

}
