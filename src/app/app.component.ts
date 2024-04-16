import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from './services/progress-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  spinningBar: any;

  constructor(private progressBar: ProgressBarService) {}
  ngOnInit(): void {
    this.spinningBar = this.progressBar.progressBarVisibility$;
  }
  title = 'Tour of Heroes';
}
