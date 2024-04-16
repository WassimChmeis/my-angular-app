import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  public status: boolean = false;
  private progressBarVisibility = new BehaviorSubject<boolean>(false);

  // Observable to subscribe to changes in progress bar visibility
  progressBarVisibility$ = this.progressBarVisibility.asObservable();

  // Method to update progress bar visibility
  setProgressBarVisibility(visibility: boolean) {
    this.progressBarVisibility.next(visibility);
  }

  setStatus(status: boolean) {
    this.status = status;
  }

  getProgressBarVisibility() {
    return this.progressBarVisibility;
  }

  constructor() {}
}
