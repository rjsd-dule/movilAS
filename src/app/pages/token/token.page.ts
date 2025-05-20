import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/api/login.service';
import { Tokens, TokensResponse } from '../interfaces/tokens.interface';

@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
  standalone: false,
})
export class TokenPage implements OnInit {
  formGroup!: FormGroup;
  mode: 'edit' | 'view' = 'view'; // Recibe el modo de la modal
  tokens: Tokens[] = [];

  constructor(private apiService: LoginService, private fb: FormBuilder) {

    this.formGroup = this.fb.group({
      nuevaFecha: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.fetchTokens();
  }

  // formatDate(dateString: string): string {
  //   console.log("dateString", dateString)
  //   if (!dateString) return ''; // Manejo de caso donde la fecha no exista

  //   // Convertir la cadena ISO a un objeto Date
  //   const fecha = new Date(dateString);
  //   console.log("fecha", fecha);

  //   // Formatear la fecha en español
  //   return fecha.toLocaleDateString('es-ES', { 
  //     day: 'numeric', 
  //     month: 'long', 
  //     year: 'numeric' 
  //   });
  // }

  convertedDate(date: string): any {
    if (date) {
      const [anio, mes, dia] = date.split('-');
      const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      const fechaFormateada = `${dia} de ${meses[parseInt(mes) - 1]} de ${anio}`;
      console.log("tipo de dato", typeof fechaFormateada);
      return fechaFormateada;
    }

  }

  fetchTokens() {
    this.apiService.getTokens(0).subscribe(
      {
        next: (data: TokensResponse) => {
          this.tokens = data.dataResult.map(token => ({
            ...token, // Copiar todas las propiedades del objeto original
            isEditing: false, // Agregar la nueva propiedad con valor false
            expira: token.expira && new Date(token.expira).toISOString().substring(0, 10)
            // expira: token.expira ? this.formatDate(token.expira) : 'Fecha no disponible'
          }));

          console.log("token response", this.tokens)
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  updateToken(token: Tokens) {
    const payload = {
      tokenId: token.tokenId,
      nuevaFecha: this.convertToISOString(this.formGroup.value.nuevaFecha)
    }

    console.log("payload", payload);

    this.apiService.updateToken(payload).subscribe({
      next: (data) => {
        this.fetchTokens();
        token.isEditing = false;
        // this.openModal();
      },
      error: (error) => {
        console.error(error);
      }
    })
    // {
    //   "tokenId": 3,
    //   "nuevaFecha": "2025-04-28T06:11:05.711Z"
    // }

    console.log("fecha", typeof this.convertToISOString(this.formGroup.value.nuevaFecha));
    // TODO: this.mode = 'view';
  }

  convertToISOString(dateString: string): string {
    if (!dateString) return '';
    const fecha = new Date(dateString);
    return fecha.toISOString();
  }


  habilitarEdicion(token: Tokens) {
    this.tokens.forEach(t => t.isEditing = false);
    token.isEditing = true;

  }

}
