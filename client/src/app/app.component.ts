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
  // Dependency injection -- shorthand declaration
  constructor(private accountService: AccountService) { }

  // Life cycle
  ngOnInit(): void {
    this.setCurrentUser();
  }
  // Check local storage to see if user already exists to set
  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}
