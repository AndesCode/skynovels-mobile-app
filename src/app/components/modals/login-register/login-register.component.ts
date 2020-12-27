import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {

  @Input() openRegisterForm: boolean;
  loginForm: FormGroup;
  registerForm: FormGroup;
  passwordRecoveryForm: FormGroup;
  loginFormLoading = false;
  registerCompleted = false;
  termsAndConditionsAccepted = false;
  passwordRecoveryCompleted = false;
  currentForm = 'login';
  title = 'Iniciar sesión'
  hide = true;
  

  constructor(public us: UsersService,
              private hs: HelperService,
              public toastController: ToastController,
              public modalController: ModalController,) { 
                
                this.loginForm = new FormGroup({
                  user_login: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(75)]),
                  user_pass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)])
                });
              
                this.registerForm = new FormGroup({
                  user_login: new FormControl('', [Validators.required,
                                              Validators.pattern('^[a-zA-Z\u00d1\u00f1]{3}(?=.{2,12}$)(?![0-9])[a-zA-Z0-9\\u00d1\\u00f1]+$'),
                                              Validators.minLength(5), Validators.maxLength(12)]),
                  user_email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(75)]),
                  user_pass: new FormControl('', [Validators.required,
                                                  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$_\-!%*?&.,"'#{}()¡¿])[A-Za-z\d@$_\-!%*?&.,"'#{}()¡¿]{8,16}$/),
                                                  Validators.minLength(8), Validators.maxLength(16)])
                });
              
                this.passwordRecoveryForm = new FormGroup({
                  user_email: new FormControl('', [Validators.required, Validators.email])
                });

  }

  ngOnInit() {
    if (this.openRegisterForm) {
      this.title = 'Registrarse';
      this.currentForm = 'register';
    }
  }

  swichtTab(tab: string, title: string) {
    this.title = title;
    this.currentForm = tab;
  }

  login() {
    this.loginFormLoading = true;
    if (this.loginForm.valid) {
      this.us.logIn(this.loginForm.value).subscribe((data: any) => {
        if (data.sknvl_s) {
          localStorage.setItem('sknvl_s', data.sknvl_s);
        }
        this.hs.openExternalFunction('reloadUser');
        this.registerCompleted = false;
        this.loginFormLoading = false;
        this.loginForm.reset();
        this.dismiss();
      }, error => {
        this.presentToast('danger', error.error.message);
        this.loginFormLoading = false;
      });
    } else {
      this.presentToast('danger', 'Debes escribir un usuario y contraseña');
      this.loginFormLoading = false;
    }
  }

  register() {
    this.loginFormLoading = true;
    if (this.registerForm.valid && this.termsAndConditionsAccepted === true) {
      this.us.createUser(this.registerForm.value).subscribe((data: any) => {
        this.registerCompleted = true;
        this.loginFormLoading = false;
        this.registerForm.reset();
      }, error => {
        this.presentToast('danger', error.error.message);
        this.loginFormLoading = false;
      });
    } else {
      this.presentToast('danger', 'Debes rellenar correctamente los campos');
      this.loginFormLoading = false;
    }
  }

  passwordRecovery() {
    this.loginFormLoading = true;
    if (this.passwordRecoveryForm.valid) {
      this.us.passwordResetRequest(this.passwordRecoveryForm.value.user_email).subscribe((data: any) => {
        this.passwordRecoveryCompleted = true;
        this.loginFormLoading = false;
        this.passwordRecoveryForm.reset();
      }, error => {
        this.presentToast('danger', error.error.message);
        this.loginFormLoading = false;
      });
    } else {
      this.presentToast('danger', 'Debes rellenar correctamente los campos');
      this.loginFormLoading = false;
    }
  }

  async presentToast(color: 'danger' | 'success', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color
    });
    toast.present();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
