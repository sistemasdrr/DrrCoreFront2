import { Component, OnInit } from '@angular/core';
import { TicketService } from 'app/services/pedidos/ticket.service';

@Component({
  selector: 'app-referencias-comerciales',
  templateUrl: './referencias-comerciales.component.html',
  styleUrls: ['./referencias-comerciales.component.scss']
})
export class ReferenciasComercialesComponent  implements OnInit {
//BREADCRUMB
breadscrums = [
  {
    title: 'Proveedores',
    items: ['Producción','Pedidos'],
    active: 'Asignación',
  },
];
  constructor(private ticketService : TicketService){

  }
  ngOnInit(): void {

  }
}
