import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  constructor(
    private router: Router,
    private progressBar: ProgressBarService
  ) {}

  @Input() data: any;

  navigateById(event: any) {
    // this.progressBar.setProgressBarVisibility(true);
    sessionStorage.setItem('profileId', event.id);
    // this.progressBar.setStatus(true);
    this.router.navigate(['/profile']);
    // console.log(event.id);
  }

  asd() {}
}
