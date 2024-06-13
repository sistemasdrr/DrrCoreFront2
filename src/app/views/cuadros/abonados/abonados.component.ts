import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abonados',
  templateUrl: './abonados.component.html',
  styleUrls: ['./abonados.component.scss']
})
export class AbonadosComponent implements OnInit{
  years : number[] = []

  breadscrums = [
    {
      title: 'Reportes de Abonados',
      items: ['Reportes'],
      active: 'Abonados',
    },
  ];

  loading = false

  idQuery = 1

  constructor(){

  }

  ngOnInit(): void {

  }
}
