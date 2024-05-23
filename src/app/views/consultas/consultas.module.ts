import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { AbonadosComponent } from './abonados/abonados.component';
import { ReporterosComponent } from './reporteros/reporteros.component';
import { AgentesComponent } from './agentes/agentes.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { InformesComponent } from './informes/informes.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AbonadosComponent,
    ReporterosComponent,
    AgentesComponent,
    FacturacionComponent,
    InformesComponent
  ],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    SharedModule,
    ComponentsModule,
    MatTableModule,
    MatSortModule
  ]
})
export class ConsultasModule { }
