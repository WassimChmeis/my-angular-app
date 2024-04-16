import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../services/card.service';
import { ProgressBarService } from '../services/progress-bar.service';

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
    private progressBar: ProgressBarService
  ) {}

  ngOnInit(): void {
    this.profileId = sessionStorage.getItem('profileId');
    this.getProfileData();
  }

  getProfileData() {
    // this.spinningBar = true;

    this.cardService.getProfile(this.profileId).subscribe((result: any) => {
      this.profileData = result;
      // this.progressBar.setProgressBarVisibility(false);
    });
  }

  returnToHome() {
    this.router.navigate(['/']);
  }
}
