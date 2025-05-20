import { Component, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ModalController } from '@ionic/angular';
import { ModalUbicacionComponent } from 'src/app/components/modal-ubicacion/modal-ubicacion.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/api/login.service';
import { Ubicaciones, UbicacionesResponse } from '../interfaces/ubicaciones.interface';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
  standalone: false,
})
export class UbicacionPage implements OnInit {
  loginForm!: FormGroup;
  provincias: string[] = [
    'Bocas del Toro', 'Coclé', 'Colón', 'Chiriquí', 'Darién',
    'Herrera', 'Los Santos', 'Panamá', 'Veraguas', 'Panamá Oeste'
  ];
  ubicaciones: Ubicaciones[] = [];

  constructor(private fb: FormBuilder, private modalCtrl: ModalController, private apiService: LoginService) {
    this.loginForm = this.fb.group({
      nombreUbicacion: ['', [Validators.required]],
          direccion: ['', [Validators.required]],
          estadoProvincia: ['', [Validators.required]],
          descripcion: ['', [Validators.required]],
          comentarios: ['', [Validators.required]],
          latitud: ['', [Validators.required]],
          longitud: ['', [Validators.required]],
          creadoPor:  ['', [Validators.required]],
            });
   }

  ngOnInit() {
    this.fetchUbicaciones();
  }

  fetchUbicaciones(){
    this.apiService.getUbicaciones(0).subscribe(
          {
            next: (data: UbicacionesResponse) => {
              this.ubicaciones = data.dataResult;
              console.log("ubicaciones", this.ubicaciones);
            },
            error: (error) => {
              console.error(error);
            }
          });
  }

  verDetalle(ubicacion: Ubicaciones){
    this.openModalView(ubicacion);
    console.log("ubicacion", ubicacion
    );
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalUbicacionComponent,
      cssClass: 'custom-modal-ubicacion',
      componentProps: {
        mode: 'create',
        formGroup: this.loginForm,
        provincias: this.provincias
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.fetchUbicaciones();
    }
  }

  async openModalView(ubicacion: Ubicaciones) {
    const modal = await this.modalCtrl.create({
      component: ModalUbicacionComponent,
      cssClass: 'custom-modal-ubicacion',
      componentProps: {
        mode: 'view',
        formGroup: this.loginForm,
        provincias: this.provincias,
        ubicacionData: {
          ubicacionId: ubicacion.ubicacionId,
          nombreUbicacion: ubicacion.nombreUbicacion,
          direccion: ubicacion.direccion,
          estadoProvincia: ubicacion.estadoProvincia,
          descripcion: ubicacion.descripcion,
          comentarios: ubicacion.comentarios,
          latitud: ubicacion.latitud,
          longitud: ubicacion.longitud,
          creadoPor: ubicacion.creadoPor,
          fechaCreacion: ubicacion.fechaCreacion
        }
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.fetchUbicaciones();
    }
  }


  deleteUbicacion(ubicacion: Ubicaciones){
    if (ubicacion.ubicacionId) {
      this.apiService.deleleUbicaciones(ubicacion.ubicacionId).subscribe({
        next: (response) => {
          console.log("response delete", response);
        },
        error: (error) => {
          console.log("error", error);
        }
      });
    }
  
    console.log('Eliminando ubicación');
  }

}
