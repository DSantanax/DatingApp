import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error: any;


  constructor(private router: Router) {
    const navi = this.router.getCurrentNavigation();
    this.error = navi?.extras?.state?.error;
  }

  ngOnInit(): void {
    
  }

}
