import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { of } from 'rxjs';
import { NgIconsModule } from '@ng-icons/core';
import { HttpClientModule } from  '@angular/common/http';
import {ionSearchOutline, ionLocationSharp, ionLogoGithub, ionArrowBack, ionArrowForward, ionOpenOutline} from '@ng-icons/ionicons';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgIconsModule.withIcons({ionSearchOutline, ionLocationSharp, ionLogoGithub, ionArrowBack, ionArrowForward, ionOpenOutline}), HttpClientModule, FormsModule],
      declarations: [AppComponent, TopBarComponent],
      providers: [ApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userData, starred_repos_count, and isLoading', () => {
    expect(component.userData).toEqual({});
    expect(component.starred_repos_count).toEqual(0);
    expect(component.isLoading).toEqual(false);
  });

  it('should call apiService.getUserData and update userData on getUserData', () => {
    const githubUsername = 'testuser';
    const userData = { name: 'Test User', repos: 5 };
    spyOn(apiService, 'getUser').and.returnValue(of(userData));
    component.getUserData(githubUsername);
    expect(apiService.getUser).toHaveBeenCalledWith(githubUsername);
    expect(component.userData).toEqual(userData);
  });

});
