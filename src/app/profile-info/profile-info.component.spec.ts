import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileInfoComponent } from './profile-info.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


describe('ProfileInfoComponent', () => {
    let component: ProfileInfoComponent;
    let fixture: ComponentFixture<ProfileInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgxSkeletonLoaderModule],
            declarations: [ProfileInfoComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should have default values for userData, isLoading, and starred_repos_count', () => {
        expect(component.userData).toEqual({});
        expect(component.isLoading).toBeTrue();
        expect(component.starred_repos_count).toBe(0);
    });

});
