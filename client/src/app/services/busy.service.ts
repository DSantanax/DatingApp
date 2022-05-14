import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyCount = 0;

  constructor(private ngxSpinner: NgxSpinnerService) { }

  // Show spinner then hide after 1 sec
  busy() {
    this.busyCount++;
    this.ngxSpinner.show(undefined, {
      type: 'ball-pulse',
      color: '#333333',
      bdColor: 'rgba(2255, 255, 255, 0)'
    });
  }

  idle() {
    this.busyCount--;
    if(this.busyCount <= 0) {
      this.busyCount = 0;
      this.ngxSpinner.hide();
    }
  }
}
