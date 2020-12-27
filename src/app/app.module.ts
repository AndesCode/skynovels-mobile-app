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
// Pipes
import { NoUserImagePipe } from './pipes/no-user-image.pipe';
import { NoimagePipe } from './pipes/noimage.pipe';
import { NovelFilterPipe } from './pipes/novel-filter.pipe';
import { NoAdvertisementImagePipe} from './pipes/no-advertisement-image.pipe';

import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';

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
    LoginRegisterComponent,
    NavbarComponent,
    HomeComponent,
    AppComponent,
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
    BrowserAnimationsModule,
    // Angular material
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
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
