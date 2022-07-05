import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { UsersService } from '../../services/users.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HelperService } from '../../services/helper.service';
import { ModalController } from '@ionic/angular';
import { LoginRegisterComponent } from '../modals/login-register/login-register.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {

  mobile: boolean;
  componentName = 'AdminPanelComponent';
  adminVerificated = false;
  loading = true;

  constructor(public router: Router,
              public breakpointObserver: BreakpointObserver,
              private us: UsersService,
              private as: AdminService,
              private hs: HelperService,
              public modalController: ModalController,) { }

  ngOnInit(): void {
    this.hs.updateBrowserMeta('description', 'Panel de control de skynovels', 'SkyNovels | Panel de control');

    this.as.adminPanelAccess(this.us.getUserLoged().token).subscribe((data: any) => {
      if (data.status === 200) {
        this.adminVerificated = true;
        this.loading = false;
        if (this.router.url === '/panel') {
          this.router.navigate(['/panel/administracion-de-pagina-de-inicio']);
        }
      } else {
        this.presentModal();
        this.router.navigate(['']);
      }
    }, error => {
      if ((error && error.status === 401)) {
        this.presentModal();
      }  
      this.router.navigate(['']);
    });
  }

  goToLink(link: string) {
    this.router.navigate([link]);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginRegisterComponent,
      componentProps: {
        'openRegisterForm': false
      }
    });
    return await modal.present();
  }

}
