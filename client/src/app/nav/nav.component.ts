import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  // Make account service public to access in template
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe(
      (res) => {
        console.log(res);
        this.router.navigateByUrl('/members');
      }
    );
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
