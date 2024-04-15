import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  ChangeDetectorRef,
  Input,
  OnChanges,
} from '@angular/core';
import { ApiService } from '../services/api.service';
import { RepositoriesDataRepresentation } from '../services/models/repositories-data-representation';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnChanges {
  constructor(private apiService: ApiService, private cdref: ChangeDetectorRef) {}

  reposPerPage: number = 10;
  isSubmitDisabled: boolean = false;
  isLoading: boolean = false;
  pageNumber: number = 1;
  repositoriesData: RepositoriesDataRepresentation[] = [];
  topicColors: string[] = ['#FF2E63', '#D53A8C', '#9B4D9E'];
  totalCount: number = 0;
  noOfPages: number = 0;
  nextDisabled: boolean = false;
  prevDisabled: boolean = true;
  searchQuery: string = '';

  @Input() githubUsername!: string;
  @Input() searchSubmitted: boolean = false;

  ngOnChanges(): void {
    if (this.githubUsername) {
      this.callGetRepos();
    }
  }

  onPageChange(action: string | number) {
    if (action === 'prev' && this.pageNumber > 1) {
      this.pageNumber--;
      this.callGetRepos();
    } else if (action === 'next' && this.pageNumber < this.noOfPages) {
      this.pageNumber++;
      this.callGetRepos();
    } else if (typeof action === 'number' && action >= 1 && action <= this.noOfPages) {
      this.pageNumber = action;
      this.callGetRepos();
    }
  }
  callGetRepos(): void {
    this.isLoading = true;
    this.apiService
      .getRepos(this.githubUsername, this.reposPerPage, this.pageNumber)
      .subscribe({
        next: (repositoriesData) => {
          this.repositoriesData = repositoriesData.body.items;
          this.noOfPages = Math.ceil(repositoriesData.body.total_count / this.reposPerPage);
          this.isLoading = false;
          console.log(this.repositoriesData);
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
    if (this.isSubmitDisabled) {
      this.isSubmitDisabled = false;
    }
  }

  increaseReposPerPage(): void {
    if (this.reposPerPage < 100) this.reposPerPage++;
  }

  decreaseReposPerPage(): void {
    setTimeout(() => {
      this.reposPerPage = Math.max(1, this.reposPerPage - 1);
    });
  }

  getRandomColor(index:number): string {
    return this.topicColors[index % this.topicColors.length];
  }

  onReposPerPageChange(value: string): void {
    const numValue = Number(value);
    this.reposPerPage = numValue > 100 ? 100 : numValue < 1 ? 1 : numValue;
  }

  onSubmit(): void {
    this.isSubmitDisabled = true;
    this.callGetRepos();
  }

  onRepoNameClick(): void {
    window.open(this.repositoriesData[0].html_url, '_blank');
  }

  onSearch():void{
    this.apiService.getSearchedReposForUser(this.githubUsername, this.reposPerPage, this.pageNumber, this.searchQuery).subscribe({
      next: (repositoriesData) => {
        this.repositoriesData = repositoriesData.body.items;
        this.reposPerPage = repositoriesData.body.total_count;
        this.noOfPages = Math.ceil(repositoriesData.body.total_count / this.reposPerPage);
        this.isLoading = false;
        console.log(this.repositoriesData);
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
    })
  }
}
