import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'grafica',
        loadChildren: () => import('../../pages/grafica/grafica.module').then(m => m.GraficaPageModule),
        data: { titulo: 'Gráficas' } 
      },
      {
        path: 'ubicacion',
        loadChildren: () => import('../../pages/ubicacion/ubicacion.module').then(m => m.UbicacionPageModule),
        data: { titulo: 'Ubicaciones' }
      },
      {
        path: 'token',
        loadChildren: () => import('../../pages/token/token.module').then(m => m.TokenPageModule),
        data: { titulo: 'Token' }
      },
      {
        path: 'cultivo',
        loadChildren: () => import('../../pages/cultivo/cultivo.module').then(m => m.CultivoPageModule),
        data: { titulo: 'Cultivos' }
      },
      {
        path: '',
        redirectTo: 'grafica',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
