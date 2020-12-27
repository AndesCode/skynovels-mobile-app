import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { AdminService } from '../../services/admin.service';
import { HelperService } from '../../services/helper.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// ionic
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MatDialog } from '@angular/material/dialog';
import { ModalController } from '@ionic/angular';
import { TermsAndConditionsComponent } from '../modals/terms-and-conditions/terms-and-conditions.component';
import { LoginRegisterComponent } from '../modals/login-register/login-register.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  currentComponent: string;
  themeToggled = false;
  loginRegisterComponent = LoginRegisterComponent;

  constructor(private menuCtrl: MenuController,
              public alertController: AlertController,
              public toastController: ToastController,
              public modalController: ModalController,
              public us: UsersService,
              private hs: HelperService,
              public as: AdminService,
              public dialog: MatDialog,
              private router: Router) { 

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }

  async presentToast(color: 'danger' | 'success', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color
    });
    toast.present();
  }

  async presentModal(component, register: boolean) {
    const modal = await this.modalController.create({
      component: component,
      componentProps: {
        'openRegisterForm': register
      }
    });
    return await modal.present();
  }

  ngOnInit() {
    this.hs.sendCurrentComponnent.subscribe((data: any) => {
      this.currentComponent = data;
    });
    if (localStorage.getItem('presence') && localStorage.getItem('presence') === 'dark') {
      this.themeToggled = true;
      this.toggleTheme();
    }
  }

  logout() {
    this.us.logOut().subscribe((data: any) => {
      localStorage.removeItem('sknvl_s');
      if (this.currentComponent === 'UserNovelComponent'
      || this.currentComponent === 'UserNovelsComponent'
      || this.currentComponent === 'UserChapterComponent'
      || this.currentComponent === 'AdminPanelComponent') {
        this.router.navigate(['']);
      }
      this.hs.openExternalFunction('reloadUser');
    }, error => {
      localStorage.removeItem('sknvl_s');
      if (this.currentComponent === 'UserNovelComponent'
      || this.currentComponent === 'UserNovelsComponent'
      || this.currentComponent === 'UserChapterComponent'
      || this.currentComponent === 'AdminPanelComponent') {
        this.router.navigate(['']);
      }
      this.hs.openExternalFunction('reloadUser');
    });
  }

  toggleMenu() {
  this.menuCtrl.toggle();
  }

  toggleTheme() {
    if (this.themeToggled) {
      //this.themeToggled = true;
      document.body.setAttribute('theme', 'dark');
      localStorage.setItem('presence', 'dark');
    } else {
      //this.themeToggled = false;
      document.body.setAttribute('theme', 'light');
      localStorage.setItem('presence', 'light');
    }
  } 

}
