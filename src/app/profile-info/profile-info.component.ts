import { Component, Input, OnChanges } from '@angular/core';
import { UserDataRepresentation } from '../services/models/user-data-representation';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent {
  constructor() { }
  @Input() userData: UserDataRepresentation = {}
  @Input() isLoading: boolean = true;
  @Input() starred_repos_count: number = 0;
  openLink(): void {
    window.open(this.userData.html_url, '_blank');
  }
}
