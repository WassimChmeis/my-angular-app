import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { ProgressBarService } from '../services/progress-bar.service';

const CACHE_KEY = 'httpDataCache';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  cards: any[] = [];
  data = {
    data: [],
  };
  cloneData = [];
  currentPage: any;
  totalPages: any;
  spinningBar: any;

  constructor(
    private cardService: CardService,
    private progressBar: ProgressBarService
  ) {}

  ngOnInit() {
    this.spinningBar = this.progressBar.progressBarVisibility$;
    const cachedData = this.getCachedData();
    if (cachedData) {
      this.data = cachedData;
      this.cloneData = this.data.data;
      this.currentPage = cachedData.page;
      this.totalPages = cachedData.total_pages;
    } else {
      this.loadCards();
    }
  }

  private cacheData(data: any): void {
    const cacheValue = {
      timestamp: new Date().getTime(),
      data: data,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheValue));
  }

  private getCachedData(): any | null {
    const cachedValue = localStorage.getItem(CACHE_KEY);
    if (cachedValue) {
      const cacheValue = JSON.parse(cachedValue);
      const currentTime = new Date().getTime();
      const cacheTime = cacheValue.timestamp;
      const expirationTime = 10 * 60 * 1000; // 10 minutes (adjust as needed)

      if (currentTime - cacheTime < expirationTime) {
        return cacheValue.data;
      } else {
        // Cache expired, remove it
        localStorage.removeItem(CACHE_KEY);
      }
    }
    return null;
  }

  loadCards(page = 1) {
    // Replace with the desired page number
    this.cardService.getCards(page).subscribe((result: any) => {
      this.data = result; // Assuming the data structure has a 'data' property
      this.currentPage = result.page;
      this.totalPages = result.total_pages;
      this.cloneData = this.data['data'];
      // console.log(this.data);
      // Cache the data
      this.cacheData(this.data);
      this.progressBar.setProgressBarVisibility(false);
    });
  }

  getNextPage(number: any) {
    this.progressBar.setProgressBarVisibility(true);

    if (number > 0 && number <= this.totalPages) this.loadCards(number);
  }

  handleSearching(event: any) {
    console.log(event, ': testing');
    console.log(this.data['data']);
    if (event !== '') {
      this.cloneData = this.data.data.filter((item) => {
        return item['id'] == event;
      });
    } else {
      this.cloneData = this.data.data;
    }

    console.log(this.data['data']);
  }
}
