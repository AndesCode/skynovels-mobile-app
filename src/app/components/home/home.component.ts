import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NovelsService } from '../../services/novels.service';
import { HelperService } from '../../services/helper.service';
import { Advertisement, Novel } from '../../models/models';
import { PageService } from '../../services/page.service';
import { SwiperConfigInterface} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public swiperHomeConfig = {
    spaceBetween: 12,
    observer: true,
    slidesPerView: 1,
    loop: true,
    roundLengths: true,
    centeredSlides: true,
    initialSlide: 0,
    mousewheel: false,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true,
    },
  }  

  public swiperTopConfig: SwiperConfigInterface = {
    observer: true,
    spaceBetween: 0,
    mousewheel: false,
  };

  recentNovels: Array<Novel>;
  advertisements: Array<Advertisement>;
  topNovels: Array<Novel>;
  recomendedNovel: Novel;
  updatedNovels: Array<Novel>;
  mobile: boolean;
  swiperConfigured = false;
  loading = true;
  loadingError = false;
  componentName = 'HomeComponent';
  novelChaptersForWeeks = 0;

  constructor(
    private ns: NovelsService,
    private router: Router,
    public hs: HelperService,
    public ps: PageService
  ) {}

  ngOnInit() {
    this.hs.updateBrowserMeta('description', 'Skynovels, el catálogo más extenso y completo de novelas web en español, con traducciones literarias originales. Disfruta de los títulos más destacados como Against The Gods (ATG), Tales of Demons and Gods (TDG) o A Will Eternal (AWE). Con las mejores traducciones de la web.', 'SkyNovels | ¡Asciende a Mundos Increíbles!');
    this.ns.getHome().subscribe((data: any) => {
        this.topNovels = data.topNovels;
        this.recentNovels = data.recentNovels;
        this.recomendedNovel = data.recommendedNovel[0];
        if (this.recomendedNovel) {
          this.recomendedNovel.date_data = this.hs.getRelativeTime(this.recomendedNovel.nvl_last_update);
          if (this.recomendedNovel.nvl_status === 'Finished') {
            this.recomendedNovel.nvl_status = 'Finalizada';
          } else {
            if (this.recomendedNovel.date_data.seconds > 1296000) {
              this.recomendedNovel.nvl_status = 'Inactiva';
            } else {
              this.recomendedNovel.nvl_status = 'Activa';
            }
          }
        }
        this.updatedNovels = data.updatedNovels;
        for (const updatedNovel of this.updatedNovels) {
          updatedNovel.date_data = this.hs.getRelativeTime(updatedNovel.nvl_last_update);
          this.ns.getHomeUpdatedNovelChapters(updatedNovel.id).subscribe((updatedChapters: any) => {
            updatedNovel.chapters = updatedChapters.updatedChapters;
            for (const chapter of updatedNovel.chapters) {
              chapter.date_data = this.hs.getRelativeTime(chapter.createdAt);
              if (chapter.date_data.seconds > 1296000) {
                chapter.new = false;
              } else {
                chapter.new = true;
              }
            }
          });
        }
        this.loading = false;
        setTimeout(() => {
          this.setSwiperSlidesPerView(3);
        }, 500);
    }, error => {
      this.loadingError = true;
    });

    this.ps.getAdvertisements().subscribe((data: any) => {
      this.advertisements = data.advertisements;
    });
  }

  setSwiperSlidesPerView(slides: number) {
    this.swiperTopConfig.slidesPerView = slides;
    this.swiperConfigured = true;
  }
}
