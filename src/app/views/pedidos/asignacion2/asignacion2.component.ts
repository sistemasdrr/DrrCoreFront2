
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ComentarioComponent } from '@shared/components/comentario/comentario.component';
import { MatDialog } from '@angular/material/dialog';
import { AdjuntarArchivosComponent } from '@shared/components/adjuntar-archivos/adjuntar-archivos.component';
import { SeleccionarAgenteComponent } from './seleccionar-agente/seleccionar-agente.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ListTicket } from 'app/models/pedidos/ticket';
import { TicketService } from 'app/services/pedidos/ticket.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-asignacion2',
  templateUrl: './asignacion2.component.html',
  styleUrls: ['./asignacion2.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class Asignacion2Component implements OnInit {
  userTo = ""
  loading:boolean=false;
  state="P";
  //BREADCRUMB
  breadscrums = [
    {
      title: 'Bandeja de Asignación',
      items: ['Producción','Pedidos'],
      active: 'Asignación',
    },
  ];

  //TABLA
  dataSource: MatTableDataSource<ListTicket>;
  columnsToDisplay = ['number', 'busineesName','status','subscriberCode', 'reportType', 'procedureType', 'quality', 'orderDate', 'expireDate', 'Acciones' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedOrder: ListTicket | null = null;
    selection = new SelectionModel<ListTicket>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  constructor(private  ticketService : TicketService,
    private router : Router,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    console.log(this.dataSource)
    const auth = JSON.parse(localStorage.getItem('authCache')+'')
    this.userTo = auth.idUser
  }

  quality = ""

  ngOnInit() {
    this.loading=true;
    this.ticketService.getTicketPreassigned(this.userTo).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSource.data = response.data
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading=false;
        }
      }
    )
  }

  volver(){
    this.router.navigate(['pedidos/lista']);
  }

  asignarTrabajador(codigoCupon : string,tipo : string, numberAssign:number,assginFromCode:string, quality : string){
    console.log(quality)
    if(quality !== '' && quality !== null){
      const dialogRef = this.dialog.open(SeleccionarAgenteComponent, {
        data: {
          idTicket: codigoCupon,
          reportType: tipo,
          numberAssign:numberAssign,
          assginFromCode:assginFromCode,
          quality : quality
        },
      }).afterClosed().subscribe(() => {
           this.ngOnInit();
         });
    }else{
      Swal.fire({
        title :'¡Calidad no seleccionada!',
        icon : 'error',
        width: '20rem',
        heightAuto : true
      });
    }

  }
  entregarTrabajo(codigoCupon : string,tipo : string, numberAssign:number,assginFromCode:string, quality : string){
    
  }
  //ACCIONES
  agregarComentario(id : string,cupon : string,comentario : string) {
    const dialogRef = this.dialog.open(ComentarioComponent, {
    data: {
      id: id,
      cupon : cupon,
      comentario : comentario

    },
  });
  console.log(dialogRef)
    // dialogRef.afterClosed().subscribe((codAbonado) => {
    //   if (codAbonado) {
    //     this.codAbonado = codAbonado.codigoAbonado
    //     this.asignarDatosAbonado()
    //   }
    // });
  }
  agregarAdjuntos(cod : string,cupon:string) {
    console.log(cod);
    const dialogRef = this.dialog.open(AdjuntarArchivosComponent, {
      data: {
        id: cod,
        cupon: cupon,
      },
  });
  console.log(dialogRef)
    // dialogRef.afterClosed().subscribe((codAbonado) => {
    //   if (codAbonado) {
    //     this.codAbonado = codAbonado.codigoAbonado
    //     this.asignarDatosAbonado()
    //   }
    // });
  }
  eliminar(id : number, asignedTo : string, numberAssign : number){
    console.log(id)
    console.log(asignedTo)
    console.log(numberAssign)
    Swal.fire({
      title: '¿Está seguro de eliminar esta asignación?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if(result.value){
        this.ticketService.deleteTicketHistory(id,asignedTo,numberAssign).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title: 'Se eliminó la asignación con exito',
                text: "",
                icon: 'success',
                width: '20rem',
                heightAuto : true
              })
            }
          }
        )
      }
    })

  }
}
