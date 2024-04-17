import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getLoading } from './store/shared/shared.selector';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showLoading!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
  }
}
