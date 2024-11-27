import { animate, state, style, transition,trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-observados',
  templateUrl: './lista-observados.component.html',
  styleUrls: ['./lista-observados.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListaObservadosComponent implements OnInit {

  loading = false
  idUser = 0
  idEmployee = 0

  constructor(public dialog: MatDialog)
  {
    const auth = JSON.parse(localStorage.getItem('authCache')+'')
    if(auth){
      this.idUser = parseInt(auth.idUser)
      this.idEmployee = parseInt(auth.idEmployee)
    }
  }

  ngOnInit() {
  }

}
