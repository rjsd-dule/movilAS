import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ConstantsService } from 'src/app/api/constants.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  titulo = ''; 
  isMenuOpen = false;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
  public constant: ConstantsService) { }

  ngOnInit() {
    console.log('URL actual =>', this.router.url);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
       const ruta = this.router.url
       const rutaActual = ruta.split('/')[2];
       console.log('Ruta actual =>', rutaActual);
       switch (rutaActual) {
         case 'ubicacion':
           this.titulo = 'Ubicaciones';
           break;
         case 'grafica':
           this.titulo = 'Gráficas';
           break;
        case 'token':
            this.titulo = 'Token';
            break;
        case 'cultivo':
          this.titulo = 'Cultivos';
          break;
       }
      });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isMenuOpen = false; // opcional: cerrar el menú al navegar
  }

}
