import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/api/login.service';
import { CultivosResponse, Cultivos } from '../interfaces/cultivos.interface';
import { ModalCultivoComponent } from 'src/app/components/modal-cultivo/modal-cultivo.component';
import { Ubicaciones, UbicacionesResponse } from '../interfaces/ubicaciones.interface';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-cultivo',
  templateUrl: './cultivo.page.html',
  styleUrls: ['./cultivo.page.scss'],
  standalone: false,
})
export class CultivoPage implements OnInit {
  cultivos: Cultivos[] = [];
  cultivoForm!: FormGroup;
  ubicaciones: Ubicaciones[] = [];

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private apiService: LoginService,
    private actionSheetController: ActionSheetController) {
    this.cultivoForm = this.fb.group({
      nombreCultivo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      cicloDeCultivo: ['', [Validators.required]],
      temporada: ['', [Validators.required]],
      requerimientosClimaticos: ['', [Validators.required]],
      fechaSiembra: ['', [Validators.required]],
      fechaCosecha: ['', [Validators.required]],
      tipoDeSuelo: ['', [Validators.required]],
      ubicacionid: ['', [Validators.required]],
      phRecomendado: ['', [Validators.required]],
      creadoPor: [''],
      modificadoPor: ['']
    });
  }

  ngOnInit() {
    this.fetchCultivos();
    this.fetchUbicaciones();
  }

  fetchCultivos() {
    this.apiService.getCultivo(0).subscribe(
      {
        next: (data: CultivosResponse) => {
          this.cultivos = data.dataResult;
          console.log("cultivos", this.cultivos);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  fetchUbicaciones() {
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

  async openModalCultivo(cultivo: Cultivos) {
    const modal = await this.modalCtrl.create({
      component: ModalCultivoComponent,
      cssClass: 'custom-modal-ubicacion',
      componentProps: {
        mode: 'view',
        cultivo: cultivo,
        // provincias: this.provincias
      }
    });
    await modal.present();

    // const { data } = await modal.onDidDismiss();
    // if (data) {
    //   this.fetchCultivos();
    // }
  }

  async openModalCreate(mode:'edit' | 'create', cultivo?: Cultivos) {
    const modal = await this.modalCtrl.create({
      component: ModalCultivoComponent,
      cssClass: 'custom-modal-ubicacion',
      componentProps: {
        formGroup: this.cultivoForm,
        ubicaciones: this.ubicaciones,
        mode: mode,
        cultivo: cultivo ? cultivo : null,
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.fetchCultivos();
    }
  }

  async openModal(tipo: string, title: string, message: string) {
          const modal = await this.modalCtrl.create({
            component: ModalComponent,
            cssClass: 'custom-modal',
            componentProps: {
              tipo: tipo,
              title: title,
              message: message
            }
          });
          await modal.present();
        }

  async openActionSheet(cultivo: Cultivos) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Ver Detalle',
          icon: 'eye-outline',
          handler: () => {
            this.openModalCultivo(cultivo);
            console.log('Eliminar seleccionado para:', cultivo);
            // Aquí agregas la lógica para eliminar el registro.
          }
        },
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => {
            this.openModalCreate('edit', cultivo);
            console.log('Editar seleccionado para:', cultivo);
            // Aquí agregas la lógica para editar el registro.
          }
        },
        {
          text: 'Eliminar',
          icon: 'trash-outline',
          handler: () => {
            this.deleteCultivo(cultivo);
            console.log('Eliminar seleccionado para:', cultivo);
            // Aquí agregas la lógica para eliminar el registro.
          }
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
          handler: () => {
            console.log('Acción cancelada');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  deleteCultivo(cultivo: Cultivos){
    if (cultivo.tipoCultipoId) {
      this.apiService.deleleCultivo(cultivo.tipoCultipoId).subscribe({
        next:(response: any)=> {
          this.openModal('success', 'Cultivo', response.message);
          this.fetchCultivos();
        },
        error: (error) =>{
          this.openModal('error', 'Cultivo', 'Ha ocurrido un error al eliminar un Cultivo');
        }
      });
    }

   
  }

}
