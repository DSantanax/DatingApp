import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  // Make account service public to access in template
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    
  }

  login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  logout() {
    this.accountService.logout();
  }
}
