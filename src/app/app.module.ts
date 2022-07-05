// Angular/Ionic
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Dev, Prod } from './config/config';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// App Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginRegisterComponent } from './components/modals/login-register/login-register.component';
import { TermsAndConditionsComponent } from './components/modals/terms-and-conditions/terms-and-conditions.component';
import { NovelsComponent } from './components/novels/novels.component';
import { NovelCardComponent } from './components/cards/novel-card/novel-card.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UsersManagementComponent } from './components/admin-panel/users-management/users-management.component';
import { UserManagementComponent } from './components/admin-panel/users-management/user-management/user-management.component';
import { NovelsManagementComponent } from './components/admin-panel/novels-management/novels-management.component';
import { HomeManagementComponent } from './components/admin-panel/home-management/home-management.component';
import { NovelManagementComponent } from './components/admin-panel/novels-management/novel-management/novel-management.component';
import { ChapterManagementComponent } from './components/admin-panel/novels-management/novel-management/chapter-management/chapter-management.component';
import { AdvertisementManagementComponent } from './components/admin-panel/home-management/advertisement-management/advertisement-management.component';
import { NovelComponent } from './components/novel/novel.component';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { LoadingErrorComponent } from './components/loading-error/loading-error.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

// Angular material
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
// Pipes
import { NoUserImagePipe } from './pipes/no-user-image.pipe';
import { NoimagePipe } from './pipes/noimage.pipe';
import { NovelFilterPipe } from './pipes/novel-filter.pipe';
import { NoAdvertisementImagePipe} from './pipes/no-advertisement-image.pipe';
// Installations
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { NgxPaginationModule } from 'ngx-pagination';


const config: SwiperConfigInterface = {
  direction: 'horizontal',
  observer: true,
  slidesPerView: 1,
  keyboard: true,
  mousewheel: true,
  scrollbar: false,
  navigation: true,
  pagination: false
};

@NgModule({
  declarations: [
    TermsAndConditionsComponent,
    LoginRegisterComponent,
    NavbarComponent,
    HomeComponent,
    CommentsComponent,
    NovelCardComponent,
    NovelsComponent,
    NovelComponent,
    AppComponent,
    UserProfileComponent,
    AdminPanelComponent,
    BookmarksComponent,
    UsersManagementComponent ,
    UserManagementComponent,
    NovelsManagementComponent,
    HomeManagementComponent ,
    NovelManagementComponent,
    ChaptersComponent,
    ChapterManagementComponent,
    AdvertisementManagementComponent,
    LoadingErrorComponent,
    AdvertisementComponent,
    // pipes
    NoimagePipe,
    NoAdvertisementImagePipe,
    NoUserImagePipe,
    NovelFilterPipe],
  entryComponents: [],
  imports: [
    // Angular / Ionic
    MarkdownModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    // Angular material
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSortModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    NgbModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: SWIPER_CONFIG,
      useValue: config
    },
    Dev,
    Prod
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
