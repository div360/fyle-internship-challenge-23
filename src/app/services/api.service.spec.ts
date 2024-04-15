import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { UserDataRepresentation } from './models/user-data-representation';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data', () => {
    const mockUserData: UserDataRepresentation = {
      id: 12345,
      login: 'exampleUser',
      avatar_url: 'https://example.com/avatar.jpg',
      name: 'Example User',
      bio: 'I am an example user.',
      public_repos: 10,
      followers: 20,
      following: 30
    };

    const githubUsername = 'exampleUser';

    service.getUser(githubUsername).subscribe((userData) => {
      expect(userData).toEqual(mockUserData);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${githubUsername}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

  it('should return the count of starred repositories', () => {
    const githubUsername = 'exampleUser';
    const totalCount = 0;

    service.getStarReposCount(githubUsername).subscribe((count) => {
      expect(count).toEqual(totalCount);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${githubUsername}/starred?per_page=1`);
    expect(req.request.method).toEqual('GET');

    req.flush({
      headers: {
        Link: '<https://api.github.com/resource?page=2&per_page=30>; rel="next", <https://api.github.com/resource?page=3&per_page=30>; rel="last"',
      },
    }, {
      status: 200,
      statusText: 'OK',
    });
  });


  // Add more test cases for other methods

});