import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { TopBarComponent } from './top-bar/top-bar.component';

import { NgIconsModule } from '@ng-icons/core';
import {ionSearchOutline, ionLocationSharp, ionLogoGithub, ionArrowBack, ionArrowForward, ionOpenOutline} from '@ng-icons/ionicons';
import { FormsModule } from '@angular/forms';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RepositoriesComponent } from './repositories/repositories.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    RepositoriesComponent,
    ProfileInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    NgIconsModule.withIcons({ionSearchOutline, ionLocationSharp, ionLogoGithub, ionArrowBack, ionArrowForward, ionOpenOutline}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
