import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  constructor(
    private router: Router,
    private progressBar: ProgressBarService,
    private store: Store<AppState>
  ) {}

  @Input() data: any;

  navigateById(event: any) {
    // this.progressBar.setProgressBarVisibility(true);
    this.store.dispatch(setLoadingSpinner({ status: true }));
    sessionStorage.setItem('profileId', event.id);
    // this.progressBar.setStatus(true);
    this.router.navigate(['/profile']);
    // console.log(event.id);
  }

  asd() {}
}
