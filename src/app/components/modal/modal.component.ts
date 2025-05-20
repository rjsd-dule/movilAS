import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: false,
})
export class ModalComponent implements OnInit {

  @Input() tipo: 'success' | 'error' = 'success';
  @Input() message: string = 'Revise su bandeja de entrada del correo o spam';
  @Input() title: string = 'Usuario Creado';
  src: string = 'assets/images/ok.png';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    switch (this.tipo) {
      case 'success':
        this.src = 'assets/images/success.png'
        break;
      case 'error':
        this.src = 'assets/images/error.png'
        break;
      default:
        break;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
    console.log('Cerrar modal');
  }

}
