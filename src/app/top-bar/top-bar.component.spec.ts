import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarComponent } from './top-bar.component';
import { NgIconsModule } from '@ng-icons/core';
import { HttpClientModule } from  '@angular/common/http';
import {ionSearchOutline, ionLocationSharp, ionLogoGithub, ionArrowBack, ionArrowForward, ionOpenOutline} from '@ng-icons/ionicons';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';


describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgIconsModule.withIcons({ionSearchOutline, ionLocationSharp, ionLogoGithub, ionArrowBack, ionArrowForward, ionOpenOutline}), HttpClientModule, FormsModule],
      declarations: [TopBarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search query when onSearch is called', () => {
    spyOn(component.searchQueryOutput, 'emit');
    component.searchQuery = 'example query';
    component.onSearch();
    expect(component.searchQueryOutput.emit).toHaveBeenCalledWith('example query');
  });

  it('should set searchSubmitted to true when onSearch is called', () => {
    component.onSearch();
    expect(component.searchSubmitted).toBe(true);
  });

  it('should initialize searchQuery to an empty string', () => {
    expect(component.searchQueryOutput).toEqual(new EventEmitter<string>());
  });

  it('should emit search query when searchQuery is updated', () => {
    spyOn(component.searchQueryOutput, 'emit');
    component.searchQuery = 'updated query';
    expect(component.searchQueryOutput.emit).toHaveBeenCalledWith('updated query');
  });
});