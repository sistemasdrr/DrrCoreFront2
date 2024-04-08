import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'app/models/pedidos/pedido';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { ListTicket } from 'app/models/pedidos/ticket';
import { TicketService } from 'app/services/pedidos/ticket.service';
import { animate, state, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
  animations: [
    trigger ('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ListaComponent implements OnInit {
  breadscrums = [
    {
      title: 'Despacho de Informes Pendientes',
      items: ['Producción'],
      active: 'Despacho',
    },
  ];

  loading = false

  dataSource: MatTableDataSource<ListTicket>;
  columnsToDisplay = ['number', 'busineesName','subscriberCode', 'status', 'reportType', 'procedureType', 'origen', 'orderDate', 'expireDate', 'Acciones' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedOrder: Pedido | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private ticketService : TicketService,public dialog: MatDialog){
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.loading = true
    this.ticketService.getListToDispatch().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSource.data = response.data
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        }else{
          this.loading = false
        }
      }).add(() => {

         this.loading = false
      })
  }

  enviarInforme(id : number){

  }
  consultar(ticket : ListTicket){

  }
  getColor(arg0: boolean,arg1: number): string {

    if(!arg0){
      return 'black';
    } else if(arg1===1){
       return'red';
    }else{
      return 'green';
    }

    }
}
