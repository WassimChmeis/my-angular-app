import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../services/card.service';
import { ProgressBarService } from '../services/progress-bar.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { setLoadingSpinner } from '../store/shared/shared.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  spinningBar = true;
  profileId: any;
  profileData: any;
  constructor(
    private cardService: CardService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    //getting the id from local storage
    this.profileId = sessionStorage.getItem('profileId');
    this.getProfileData();
  }

  //fetching profile data by ID
  getProfileData() {
    this.cardService.getProfile(this.profileId).subscribe((result: any) => {
      this.profileData = result;
      this.store.dispatch(setLoadingSpinner({ status: false }));
    });
  }

  returnToHome() {
    this.router.navigate(['/']);
  }
}
