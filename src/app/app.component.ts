import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ChangeDetectorRef } from '@angular/core';
import { UserDataRepresentation } from './services/models/user-data-representation';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private apiService: ApiService,
  ) {
    this.topBar = new TopBarComponent();
  }

  userData: UserDataRepresentation = {};
  starred_repos_count: number = 0;
  isLoading: boolean = false;

  @ViewChild(TopBarComponent) topBar: any;

  ngOnInit() {

  }

  getUserData(githubUsername: string): void {
    this.apiService.getUser(githubUsername).subscribe({
      next: (userData) => {
        this.userData = userData;
        this.isLoading = false;
        console.log(this.userData);
      },
      error: (error) => {
        if (error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            'Server returned code: ',
            error.status,
            'error message is: ',
            error.error.message
          );
        }
      },
    });

    this.apiService.getStarReposCount(githubUsername).subscribe({
      next: (starReposCount) => {
        this.starred_repos_count = starReposCount;
        console.log(this.starred_repos_count);
      },
      error: (error) => {
        if (error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            'Server returned code: ',
            error.status,
            'error message is: ',
            error.error.message
          );
        }
      },
    });
  }

  onSearch(query: string) {
    this.isLoading = true;
    this.getUserData(query);
  }
}
