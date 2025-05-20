import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/api/login.service';
import { Cultivos } from 'src/app/pages/interfaces/cultivos.interface';
import { Ubicaciones } from 'src/app/pages/interfaces/ubicaciones.interface';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-cultivo',
  templateUrl: './modal-cultivo.component.html',
  styleUrls: ['./modal-cultivo.component.scss'],
  standalone: false
})
export class ModalCultivoComponent implements OnInit {

  @Input() cultivo!: Cultivos;
  @Input() mode: 'view' | 'create' | 'edit' = 'view';

  @Input() formGroup!: FormGroup;
  @Input() ubicaciones: Ubicaciones[] = [];

  constructor(private modalCtrl: ModalController, private service: LoginService) { }

  ngOnInit() {
    if (this.mode === 'edit' && this.cultivo.fechaCosecha && this.cultivo.fechaSiembra) {
      console.log("cultivos desde modal", this.cultivo);
      this.cultivo.fechaCosecha = new Date(this.cultivo.fechaCosecha)
        .toISOString()
        .substring(0, 10);
      this.cultivo.fechaSiembra = new Date(this.cultivo.fechaSiembra)
        .toISOString()
        .substring(0, 10);
      this.formGroup.patchValue(this.cultivo);
    } else if (this.mode === 'create') {
      console.log("ubicacionData", this.ubicaciones)
      this.resetForm();
    }
  }

  submitCultivo() {
    if (this.mode == 'create') {
      this.addCultivo();
    } else {
      this.updateCultivo();
    }
    
  }

  addCultivo(){
    const payload = this.createPayload('crear');
    this.service.addTipoCultivo(payload).subscribe({
      next: (response) => {
        this.openModal('success', 'Cultivo', 'Cultivo creado exitosamente');
        this.modalCtrl.dismiss(true);
      },
      error: (error) =>{
        this.openModal('error', 'Cultivo', 'Ha ocurrido un error al crear Cultivo');
        this.modalCtrl.dismiss(true);
        console.log("error", error);
      }
    })
  }

  updateCultivo(){
    const payload = this.createPayload('editar');
    this.service.updateCultivo(payload).subscribe({
      next: (response) => {
        this.openModal('success', 'Cultivo', 'Se ha actualizado corectamente el Cultivo');
        this.modalCtrl.dismiss(true);
      },
      error: (error) => {
        this.openModal('error', 'Cultivo', 'Ha ocurrido un error al actualizar Cultivo');
        this.modalCtrl.dismiss(true);
      }
    })
  }

  createPayload(type: 'crear' | 'editar'): any {
    const basePayload = {
      nombreCultivo: this.formGroup.value.nombreCultivo,
      descripcion: this.formGroup.value.descripcion,
      cicloDeCultivo: this.formGroup.value.cicloDeCultivo,
      temporada: this.formGroup.value.temporada,
      requerimientosClimaticos: this.formGroup.value.requerimientosClimaticos,
      fechaSiembra: this.convertToISOString(this.formGroup.value.fechaSiembra),
      fechaCosecha: this.convertToISOString(this.formGroup.value.fechaCosecha),
      tipoDeSuelo: this.formGroup.value.tipoDeSuelo,
      phRecomendado: this.formGroup.value.phRecomendado,
      
    };
  
    if (type === 'crear') {
      return {
        ...basePayload,
        ubicacionid: this.formGroup.value.ubicacionid,
        creadoPor: this.formGroup.value.creadoPor
      };
    } else if (type === 'editar') {
      return {
        ...basePayload,
        tipoCultipoId: this.cultivo.tipoCultipoId,
        modificadoPor: this.formGroup.value.modificadoPor
      };
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

  convertToISOString(dateString: string): string {
    if (!dateString) return '';
    const fecha = new Date(dateString);
    return fecha.toISOString();
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

  closeModal() {
    this.modalCtrl.dismiss();
    console.log('Cerrar modal');
  }

}
