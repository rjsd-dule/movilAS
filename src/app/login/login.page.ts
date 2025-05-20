import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../api/login.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';
import { Router } from '@angular/router';
import { ConstantsService } from '../api/constants.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private apiService: LoginService,
    private modalCtrl: ModalController,
    private router: Router,
    private constants: ConstantsService
  ) { 

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
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
    if (this.loginForm.valid) {
      // try {
      //   const response = await this.apiService.loginCap(this.loginForm.value.email, this.loginForm.value.password);
      //   console.log("response", response);
      // } catch (error) {
      //   console.error(error);
        
      // }
      // this.apiService.addMuestreo().subscribe({
      //   next: (data) => {
      //     console.log("muestreo",data);
      //   },
      //   error: (error) => {
      //     console.error(error);
      //   }
      // });

      // this.apiService.getMuestreo().subscribe({
      //   next: (data) => {
      //     console.log("muestreo",data);
      //   },
      //   error: (error) => {
      //     console.error(error);
      //   }
      // });

      // this.apiService.addTipoCultivo().subscribe({
      //   next: (data) => {
      //     console.log("Tipo cultivo",data);
      //   },
      //   error: (error) => {
      //     console.error(error);
      //   }
      // });

      this.apiService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        {
          next: (data) => {
            this.decodifcateToken(data);
            this.router.navigate(['/menu']);
          },
          error: (error) => {
            console.error(error);
          }
        });
    } else {
      console.log('Formulario inválido');
    }
  }

  private decodifcateToken(data: string){
    const payloadBase64 = data.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    this.constants.USERNAME = decodedPayload.Nombre;
    this.constants.LASTNAME = decodedPayload.Apellido;
    
    console.log("decodedPayload", decodedPayload);
  }

  



  crearCuenta() {
    this.router.navigate(['/create-account']);
    // Redirige a la página/flujo para crear cuenta
    // this.navCtrl.navigateForward('/register');
  }

  olvideContrasena() {
    // Redirige a la página de recuperación de contraseña
    // this.navCtrl.navigateForward('/recover-password');
  }

}
