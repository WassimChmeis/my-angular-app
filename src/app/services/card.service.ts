import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getCards(page: number): Observable<any> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<any>(url);
  }

  getProfile(id: number): Observable<any> {
    const url = 'https://reqres.in/api/users/' + id;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error in getProfile:', error);
        // Handle error if necessary
        return throwError(error);
      })
    );
  }
}
