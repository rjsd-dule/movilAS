import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/api/login.service';
import { Ubicaciones } from 'src/app/pages/interfaces/ubicaciones.interface';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-ubicacion',
  templateUrl: './modal-ubicacion.component.html',
  styleUrls: ['./modal-ubicacion.component.scss'],
  standalone: false,

})
export class ModalUbicacionComponent implements OnInit {
  @Input() formGroup!: FormGroup; // Recibe el formulario del padre
  @Input() provincias: string[] = []; // Recibe la lista de provincias
  @Input() mode: 'create' | 'view' | 'edit' = 'create'; // Recibe el modo de la modal
  @Input() ubicacionData: Ubicaciones = {}; // Recibe los datos de la ubicación
  // @Output() event = new EventEmitter<boolean>();
  isReadOnly = false;

  constructor(private modalCtrl: ModalController, private service: LoginService) { }

  ngOnInit() {
    if (this.mode === 'view' && this.ubicacionData) {
      this.formGroup.patchValue(this.ubicacionData);
      this.formGroup.disable();
    } else {
      this.resetForm();
      this.formGroup.enable();
    }
  }

  resetForm() {
    this.formGroup.reset({
      nombreUbicacion: '',
      direccion: '',
      estadoProvincia: '',
      descripcion: '',
      comentarios: '',
      latitud: '',
      longitud: '',
      creadoPor: '',
      fechaCreacion: ''
    });
  }

  habilitarEdicion() {
    this.formGroup.enable();
    this.mode = 'edit';
  }

  getTitulo() {
    switch (this.mode) {
      case 'create':
        return 'Crear Ubicación';
      case 'view':
        return 'Ver Ubicación';
      case 'edit':
        return 'Editar Ubicación';
    }
  }

  async createUbicacion() {
    console.log("ubicacion Id", this.ubicacionData)
    if (this.mode == 'edit') {
      const payload = {
        ubicacionId: this.ubicacionData.ubicacionId,
        nombreUbicacion: this.formGroup.value.nombreUbicacion,
        direccion: this.formGroup.value.direccion,
        estadoProvincia: this.formGroup.value.estadoProvincia,
        descripcion: this.formGroup.value.descripcion,
        comentarios: this.formGroup.value.comentarios,
        latitud: parseFloat(this.formGroup.value.latitud),
        longitud: parseFloat(this.formGroup.value.longitud),
        modificadoPor: this.formGroup.value.creadoPor
      }
      this.service.updateUbicaciones(payload).subscribe ({
        next: (data) =>{
          this.openModal();
          this.modalCtrl.dismiss(true);
        },
        error: (error) => {
          console.error(error);
        }
      })

    } else {
      if (this.formGroup.valid) {
        const payload = {
          ...this.formGroup.value,
          latitud: parseFloat(this.formGroup.value.latitud),
          longitud: parseFloat(this.formGroup.value.longitud)
        }
        console.log('payload', payload);
        this.service.addUbicacion(payload).subscribe(
          {
            next: (data) => {
              console.log(data);
              this.openModal();
              this.modalCtrl.dismiss(true);
            },
            error: (error) => {
              console.error(error);
            }
          });
  
        // this.formGroup.value.fechaCreacion = new Date().toISOString();
      }
    }
    
  }

  async openModal() {
      const modal = await this.modalCtrl.create({
        component: ModalComponent,
        cssClass: 'custom-modal'
      });
      await modal.present();
    }

  closeModal() {
    this.modalCtrl.dismiss();
    console.log('Cerrar modal');
  }


}
