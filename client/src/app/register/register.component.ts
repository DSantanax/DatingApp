import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter<boolean>();

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.model);
    this.accountService.register(this.model).subscribe((user) => {
      console.log(user);
      this.cancel();
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.toastr.error(err.error, "Registration Failed");
    })
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
