import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { setLoadingSpinner } from '../store/shared/shared.actions';

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
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // loading spinner activated
    this.store.dispatch(setLoadingSpinner({ status: true }));

    this.initialDataFetching();
  }

  initialDataFetching() {
    const cachedData = this.getCachedData();
    //checking for chached Data
    if (cachedData) {
      this.data = cachedData;
      this.cloneData = this.data.data;
      this.currentPage = cachedData.page;
      this.totalPages = cachedData.total_pages;
      this.store.dispatch(setLoadingSpinner({ status: false }));
    } else {
      //no chached data so fetch data from api
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

      //for data filtering
      this.cloneData = this.data['data'];
      // Cache the data
      this.cacheData(this.data);

      //deactivate spinner animation
      this.store.dispatch(setLoadingSpinner({ status: false }));
    });
  }

  // this function fetches the next page
  getNextPage(number: any) {
    //spinner true
    this.store.dispatch(setLoadingSpinner({ status: true }));

    //checking if the next page is available
    if (number > 0 && number <= this.totalPages) this.loadCards(number);
  }

  handleSearching(event: any) {
    if (event !== '') {
      this.cloneData = this.data.data.filter((item) => {
        return item['id'] == event;
      });
    } else {
      this.cloneData = this.data.data;
    }
  }
}
