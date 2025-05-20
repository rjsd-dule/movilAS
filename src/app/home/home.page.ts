import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
   // Configuración básica del slider
   slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private navCtrl: NavController) {}

  onLogin() {
    // Lógica para iniciar sesión
    this.navCtrl.navigateForward('/login');
  }

  crearCuenta() {
    // Redirige a la página/flujo para crear cuenta
    // this.navCtrl.navigateForward('/register');
  }

  olvideContrasena() {
    // Redirige a la página de recuperación de contraseña
    // this.navCtrl.navigateForward('/recover-password');
  }

}
