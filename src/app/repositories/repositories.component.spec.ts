import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoriesComponent } from './repositories.component';
import { ApiService } from '../services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { RepositoriesDataRepresentation } from '../services/models/repositories-data-representation';
import { HttpClient } from '@angular/common/http';
import { AppModule } from '../app.module';

describe('RepositoriesComponent', () => {
  let component: RepositoriesComponent;
  let fixture: ComponentFixture<RepositoriesComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [RepositoriesComponent],
      providers: [ApiService, ChangeDetectorRef],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoriesComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.reposPerPage).toBe(10);
    expect(component.isSubmitDisabled).toBe(false);
    expect(component.isLoading).toBe(false);
    expect(component.pageNumber).toBe(1);
    expect(component.repositoriesData).toEqual([]);
    expect(component.topicColors).toEqual(['#FF2E63', '#D53A8C', '#9B4D9E']);
    expect(component.totalCount).toBe(0);
    expect(component.noOfPages).toBe(0);
    expect(component.nextDisabled).toBe(false);
    expect(component.prevDisabled).toBe(true);
    expect(component.searchQuery).toBe('');
    expect(component.githubUsername).toBeUndefined();
  });

  it('should call the apiService.getRepos method when onSubmit is called', () => {
    spyOn(apiService, 'getRepos').and.returnValue(of([]));
    component.onSubmit();
    expect(apiService.getRepos).toHaveBeenCalled();
  });

  // it('should update the repositoriesData when apiService.getRepos returns data', () => {
  //   const mockData: RepositoriesDataRepresentation[] = [
  //     {
  //       allow_forking: true,
  //       archive_url: 'https://api.github.com/repos/owner/repo/{archive_format}{/ref}',
  //       archived: false,
  //       assignees_url: 'https://api.github.com/repos/owner/repo/assignees{/user}',
  //       blobs_url: 'https://api.github.com/repos/owner/repo/git/blobs{/sha}',
  //       branches_url: 'https://api.github.com/repos/owner/repo/branches{/branch}',
  //       clone_url: 'https://github.com/owner/repo.git',
  //       collaborators_url: 'https://api.github.com/repos/owner/repo/collaborators{/collaborator}',
  //       comments_url: 'https://api.github.com/repos/owner/repo/comments{/number}',
  //       commits_url: 'https://api.github.com/repos/owner/repo/commits{/sha}',
  //       compare_url: 'https://api.github.com/repos/owner/repo/compare/{base}...{head}',
  //       contents_url: 'https://api.github.com/repos/owner/repo/contents/{+path}',
  //       contributors_url: 'https://api.github.com/repos/owner/repo/contributors',
  //       created_at: '2022-01-01T00:00:00Z',
  //       default_branch: 'main',
  //       deployments_url: 'https://api.github.com/repos/owner/repo/deployments',
  //       description: 'This is a sample repository',
  //       disabled: false,
  //       downloads_url: 'https://api.github.com/repos/owner/repo/downloads',
  //       events_url: 'https://api.github.com/repos/owner/repo/events',
  //       fork: false,
  //       forks: 0,
  //       forks_count: 0,
  //       forks_url: 'https://api.github.com/repos/owner/repo/forks',
  //       full_name: 'owner/repo',
  //       git_commits_url: 'https://api.github.com/repos/owner/repo/git/commits{/sha}',
  //       git_refs_url: 'https://api.github.com/repos/owner/repo/git/refs{/sha}',
  //       git_tags_url: 'https://api.github.com/repos/owner/repo/git/tags{/sha}',
  //       git_url: 'git://github.com/owner/repo.git',
  //       has_discussions: false,
  //       has_downloads: true,
  //       has_issues: true,
  //       has_pages: false,
  //       has_projects: true,
  //       has_wiki: true,
  //       homepage: 'https://github.com/owner/repo',
  //       hooks_url: 'https://api.github.com/repos/owner/repo/hooks',
  //       html_url: 'https://github.com/owner/repo',
  //       id: 1234567890,
  //       is_template: false,
  //       issue_comment_url: 'https://api.github.com/repos/owner/repo/issues/comments{/number}',
  //       issue_events_url: 'https://api.github.com/repos/owner/repo/issues/events{/number}',
  //       issues_url: 'https://api.github.com/repos/owner/repo/issues{/number}',
  //       keys_url: 'https://api.github.com/repos/owner/repo/keys{/key_id}',
  //       labels_url: 'https://api.github.com/repos/owner/repo/labels{/name}',
  //       language: 'TypeScript',
  //       languages_url: 'https://api.github.com/repos/owner/repo/languages',
  //       license: null,
  //       merges_url: 'https://api.github.com/repos/owner/repo/merges',
  //       milestones_url: 'https://api.github.com/repos/owner/repo/milestones{/number}',
  //       mirror_url: null,
  //       name: 'repo',
  //       node_id: 'MDEwOlJlcG9zaXRvcnkxMjM0NTY3ODkw',
  //       notifications_url: 'https://api.github.com/repos/owner/repo/notifications{?since,all,participating}',
  //       open_issues: 0,
  //       open_issues_count: 0,
  //       owner: {
  //         login: 'owner',
  //         id: 123456789,
  //         node_id: 'MDQ6VXNlcjEyMzQ1Njc4OQ==',
  //         avatar_url: 'https://avatars.githubusercontent.com/u/123456789?v=4',
  //         gravatar_id: '',
  //       },
  //       private: false,
  //       pulls_url: 'https://api.github.com/repos/owner/repo/pulls{/number}',
  //       pushed_at: '2022-01-01T00:00:00Z',
  //       releases_url: 'https://api.github.com/repos/owner/repo/releases{/id}',
  //       score: 1.0,
  //       size: 100,
  //       ssh_url: 'git@github.com:owner/repo.git',
  //       stargazers_count: 0,
  //       stargazers_url: 'https://api.github.com/repos/owner/repo/stargazers',
  //       statuses_url: 'https://api.github.com/repos/owner/repo/statuses/{sha}',
  //       subscribers_url: 'https://api.github.com/repos/owner/repo/subscribers',
  //       subscription_url: 'https://api.github.com/repos/owner/repo/subscription',
  //       svn_url: 'https://github.com/owner/repo',
  //       tags_url: 'https://api.github.com/repos/owner/repo/tags',
  //       teams_url: 'https://api.github.com/repos/owner/repo/teams',
  //       topics: ['angular', 'typescript', 'github'],
  //       trees_url: 'https://api.github.com/repos/owner/repo/git/trees{/sha}',
  //       updated_at: '2022-01-01T00:00:00Z',
  //       url: 'https://api.github.com/repos/owner/repo',
  //       visibility: 'public',
  //       watchers: 0,
  //       watchers_count: 0,
  //       web_commit_signoff_required: false,
  //     },
  //   ];
  //   spyOn(apiService, 'getRepos').and.returnValue(of(mockData));
  //   component.onSubmit();
  //   expect(component.repositoriesData).toEqual(mockData);
  // });

  // it('should update the pageNumber when onPageChange is called with a number', () => {
  //   component.onPageChange(2);
  //   expect(component.pageNumber).toBe(2);
  // });

  // it('should call the apiService.getRepos method when onPageChange is called with "next"', () => {
  //   spyOn(apiService, 'getRepos').and.returnValue(of([]));
  //   component.onPageChange('next');
  //   expect(apiService.getRepos).toHaveBeenCalled();
  // });

  // it('should call the apiService.getRepos method when onPageChange is called with "prev"', () => {
  //   spyOn(apiService, 'getRepos').and.returnValue(of([]));
  //   component.onPageChange('prev');
  //   expect(apiService.getRepos).toHaveBeenCalled();
  // });

  it('should increase the reposPerPage value when increaseReposPerPage is called', () => {
    component.increaseReposPerPage();
    expect(component.reposPerPage).toBe(11);
  });

  // it('should decrease the reposPerPage value when decreaseReposPerPage is called', () => {
  //   component.decreaseReposPerPage();
  //   expect(component.reposPerPage).toBe(9);
  // });

  it('should return a random color when getRandomColor is called', () => {
    const color = component.getRandomColor(0);
    expect(color).toMatch(/^#[0-9A-F]{6}$/i);
  });

  it('should update the reposPerPage value when onReposPerPageChange is called', () => {
    component.onReposPerPageChange('15');
    expect(component.reposPerPage).toBe(15);
  });

});
