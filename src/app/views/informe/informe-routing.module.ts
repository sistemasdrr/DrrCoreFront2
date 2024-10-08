import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IEListaComponent } from './info-empresa/ie-lista/ie-lista.component';
import { IEDetalleComponent } from './info-empresa/ie-detalle/ie-detalle.component';
import { IPListaComponent } from './info-persona/ip-lista/ip-lista.component';
import { IPDetalleComponent } from './info-persona/ip-detalle/ip-detalle.component';
import { ReferencistaComponent } from './referencista/referencista.component';

const routes: Routes = [
  {
    path: 'empresa/lista',
    component: IEListaComponent,
    data: { title: 'Lista de Empresas - DRR Core V1' }
  },
  {
    path: 'empresa/detalle/:id',
    component: IEDetalleComponent,
    data: { title: 'Detalles de Empresa - DRR Core V1' }
  },
  {
    path: 'empresa/detalle/:id',
    component: IEDetalleComponent,
    data: { title: 'Detalles de Empresa - DRR Core V1' },
  },
  {
    path: 'empresa/detalle/:id/:cupon',
    component: IEDetalleComponent,
    data: { title: 'Detalles de Empresa - DRR Core V1' },
  },
  {
    path: 'persona/lista',
    component: IPListaComponent,
    data: { title: 'Lista de Personas - DRR Core V1' }
  },
  {
    path: 'persona/detalle/:id',
    component: IPDetalleComponent,
    data: { title: 'Detalles de Persona - DRR Core V1' }
  },
  {
    path: 'referencias/:type/:idTicket/:id/:asignedTo',
    component: ReferencistaComponent,
    data: { title: 'Referencias del cupón - DRR Core V1' }
  },
  {
    path: 'referencias/:type/:idTicket/:id/:asignedTo/:complement',
    component: ReferencistaComponent,
    data: { title: 'Referencias del cupón - DRR Core V1' }
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformeRoutingModule { }
