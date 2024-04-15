import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError, catchError } from 'rxjs';
import { UserDataRepresentation } from './models/user-data-representation';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://api.github.com';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string):Observable<UserDataRepresentation> {
    return this.httpClient.get<UserDataRepresentation>(`${this.baseUrl}/users/${githubUsername}`);
  }

  getStarReposCount(githubUsername: string):Observable<number> {
    return this.httpClient.get<UserDataRepresentation>(`${this.baseUrl}/users/${githubUsername}/starred`, {
      observe: 'response',
      params: { per_page: '1' }
    }).pipe(
      map((response: any) => {
        const linkHeader = response.headers.get('Link');
        if (linkHeader) {
          const lastLink = linkHeader.split(', ').find((s: string) => s.endsWith('rel="last"'));
          const lastPageNumber = lastLink.match(/&page=(\d+)/)[1];
          return parseInt(lastPageNumber, 10) * 30;
        } else {
          return 0;
        }
      }),
      catchError(error => {
        console.error('Error retrieving starred repos count:', error);
        return of(0);
      })
    );
  }

  getRepos(githubUsername:string, perPageCount:number, pageNumber:number):Observable<any> {
    const apiUrl = `https://api.github.com/search/repositories?q=user:${githubUsername}&per_page=${perPageCount}&page=${pageNumber}`;
      return this.httpClient.get(apiUrl).pipe(
        map(response => response),
        catchError(error => {
          if (error.status === 404) {
            alert('User does not exist : Enter correct username');
            window.location.href = "index.html";
          } else if (error.status === 403 || error.status === 429) {
            alert('API rate limit exceeded');
            window.location.href = "index.html";
          } else if (error.status === 401) {
            alert('Unauthorized');
            window.location.href = "index.html";
          } else if (error.status === 500) {
            alert('Internal Server Error');
            window.location.href = "index.html";
          }
          return of(null);
        })
      );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
