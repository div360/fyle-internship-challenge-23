import { Component, ElementRef, ViewChild, AfterViewChecked, Input, OnChanges} from '@angular/core';
import { ApiService } from '../services/api.service';
import { RepositoriesDataRepresentation } from '../services/models/repositories-data-representation';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnChanges{

  constructor(
    private apiService: ApiService,
  ) { }

  reposPerPage:number =10;
  isSubmitDisabled:boolean = false;
  isLoading:boolean = false;
  pageNumber:number = 2;
  repositoriesData:RepositoriesDataRepresentation[]= [];

  @Input() githubUsername!: string;
  @Input() searchSubmitted: boolean = false;

  ngOnChanges(): void {
    if (this.githubUsername) {
      this.callGetRepos();
    }
  }

  callGetRepos():void{
    this.isLoading = true;
    this.apiService.getRepos(this.githubUsername, this.reposPerPage, this.pageNumber).subscribe({
      next: (repositoriesData) => {
        this.repositoriesData = repositoriesData.items;
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
    if(this.isSubmitDisabled){
      this.isSubmitDisabled = false;
    }
  }

  increaseReposPerPage():void{
    if(this.reposPerPage<100) this.reposPerPage++;
  }

  decreaseReposPerPage():void{
    setTimeout(() => {
      this.reposPerPage = Math.max(1, this.reposPerPage - 1);
    });
  }

  onReposPerPageChange(value:string):void{
    const numValue = Number(value);
  this.reposPerPage = numValue > 100 ? 100 : (numValue < 1 ? 1 : numValue);;
  }

  onSubmit():void{
    this.isSubmitDisabled = true;
    this.callGetRepos();
  }

}
