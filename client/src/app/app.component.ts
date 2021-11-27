import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;
  // Dependency injection -- shorthand declaration
  constructor(private httpService: HttpClient) { }

  // Life cycle
  ngOnInit(): void {
    this.getUsers();
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
