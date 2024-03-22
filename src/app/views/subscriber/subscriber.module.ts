import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriberRoutingModule } from './subscriber-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page/main-page.component';
import { PedidosOnlineComponent } from './pedidos-online/pedidos-online.component';
import { PedidosOfflineComponent } from './pedidos-offline/pedidos-offline.component';
import { HistorialPedidosComponent } from './historial-pedidos/historial-pedidos.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';



@NgModule({
  declarations: [
    MainPageComponent,
    PedidosOnlineComponent,
    PedidosOfflineComponent,
    HistorialPedidosComponent,
  ],
  imports: [
    CommonModule,
    SubscriberRoutingModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule
  ]
})
export class SubscriberModule { }
