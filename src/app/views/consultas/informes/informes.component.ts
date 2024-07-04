import { animate, state, style, transition,trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Query5_1_1, Query5_1_1Tickets } from 'app/models/consulta';
import { ConsultaService } from 'app/services/Consultas/consulta.service';
import { HistorialPedidoComponent } from 'app/views/situacion/lista/historial-pedido/historial-pedido.component';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class InformesComponent implements OnInit{
  breadscrums = [
    {
      title: 'Consultas de Informes',
      items: ['Consultas'],
      active: 'Informes',
    },
  ];

  loading = false

  abonados : Query5_1_1[] = []

  idQuery = 1

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;


  constructor(private consultaService : ConsultaService,public dialog: MatDialog){
    this.dataSource = new MatTableDataSource()
  }
  ngOnInit(): void {
    this.consultaService.GetQuery5_1_1().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.abonados = response.data
        }
      }
    )
  }

  limpiar(){
    this.query5_1_1_idSubscriber = 0
    this.query5_1_1_number = ""
    this.query5_1_1_name = ""
    this.dataSource.data = []
  }
  buscar(){
    let tickets : Query5_1_1Tickets[] = []
    this.abonados.forEach(element => {
      element.tickets.forEach(ticket => {
        if(ticket.requestedName.includes(this.query5_1_1_name) && ticket.number.includes(this.query5_1_1_number)){
          tickets.push(ticket)
        }
      });
    });
    tickets.sort((a, b) => {
      let numberA = parseInt(a.number, 10);
      let numberB = parseInt(b.number, 10);

      return numberA - numberB;
    });
    this.query5_1_1_idSubscriber = 0
    this.dataSource.data = tickets
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  query5_1_1_idSubscriber = 0
  query5_1_1_number = ""
  query5_1_1_name = ""

  dataSource: MatTableDataSource<Query5_1_1Tickets>;

  columnsToDisplay = ['number','requestedName','status','country','reportType','procedureType','orderDate', 'expireDate', 'Acciones' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedOrder: Query5_1_1Tickets | null = null;

  query5_1_1_selectSubscriber(idSubscriber : number){
    console.log(this.abonados.filter(x => x.id === idSubscriber)[0].tickets)
    this.dataSource.data = this.abonados.filter(x => x.id === idSubscriber)[0].tickets
    this.dataSource.data.sort((a, b) => {
      let numberA = parseInt(a.number, 10);
      let numberB = parseInt(b.number, 10);

      return numberA - numberB;
    });
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }
  verHistorial(idTicket : number) {
    const dialogRef = this.dialog.open(HistorialPedidoComponent, {
      data : {
          idTicket : idTicket
      },
    });
  }
}
