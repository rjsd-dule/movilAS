import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalUbicacionComponent } from './modal-ubicacion/modal-ubicacion.component';
import { IonicModule } from '@ionic/angular';
import { ModalCultivoComponent } from './modal-cultivo/modal-cultivo.component';



@NgModule({
  declarations: [
    ModalComponent,
    ModalUbicacionComponent,
    ModalCultivoComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalComponent,
    ModalUbicacionComponent,
    ModalCultivoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
