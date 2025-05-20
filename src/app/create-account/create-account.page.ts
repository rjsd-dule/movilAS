import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../api/login.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
  standalone: false,
})
export class CreateAccountPage implements OnInit {
  loginForm!: FormGroup;


  constructor(private fb: FormBuilder,
    private apiService: LoginService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      cssClass: 'custom-modal'
    });
    await modal.present();
  }

  async onLogin() {
    this.openModal()
    // try {
      //   const response = await this.apiService.loginCap(this.loginForm.value.email, this.loginForm.value.password);
      //   console.log("response", response);
      // } catch (error) {
      //   console.error(error);
        
      // }

    // if (this.loginForm.valid) {
      
    //   this.apiService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
    //     {
    //       next: (data) => {
    //         console.log(data);
    //       },
    //       error: (error) => {
    //         console.error(error);
    //       }
    //     });
    // } else {
    //   console.log('Formulario inválido');
    // }
  }

  crearCuenta() {
    // Redirige a la página/flujo para crear cuenta
    // this.navCtrl.navigateForward('/register');
  }

  olvideContrasena() {
    // Redirige a la página de recuperación de contraseña
    // this.navCtrl.navigateForward('/recover-password');
  }

  login(){
    console.log('accediendo a login');
  }

}
