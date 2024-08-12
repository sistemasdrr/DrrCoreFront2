
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ComentarioComponent } from '@shared/components/comentario/comentario.component';
import { MatDialog } from '@angular/material/dialog';
import { AdjuntarArchivosComponent } from '@shared/components/adjuntar-archivos/adjuntar-archivos.component';
import {  SeleccionarAgenteComponent } from './seleccionar-agente/seleccionar-agente.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ListTicket, ListTicket2, OtherUserCode } from 'app/models/pedidos/ticket';
import { TicketService } from 'app/services/pedidos/ticket.service';
import Swal from 'sweetalert2';
import { ReferenciasComercialesComponent } from './referencias-comerciales/referencias-comerciales.component';
import { UsuarioService } from 'app/services/usuario.service';
import { HistorialPedidoComponent } from 'app/views/situacion/lista/historial-pedido/historial-pedido.component';


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
  dataSource: MatTableDataSource<ListTicket2>;
  columnsToDisplay = ['number','subscriber','country', 'busineesName','status','subscriberCode', 'reportType', 'procedureType', 'quality', 'orderDate', 'expireDate', 'Acciones' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedOrder: ListTicket2 | null = null;
    selection = new SelectionModel<ListTicket2>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  userCodes : string[] = []

  constructor(private  ticketService : TicketService, private router : Router,
    private usuarioService : UsuarioService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    console.log(this.dataSource)
    const auth = JSON.parse(localStorage.getItem('authCache')+'')
    this.userTo = auth.idUser
  }
  actualizar(){
    this.ngOnInit()
  }
  ngOnInit() {
    this.loading=true;
    this.ticketService.getTicketPreassigned(this.userTo).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSource.data = response.data
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        }
      }
    ).add(
      () => {
        this.loading=false;
      }
    )
    this.usuarioService.getOtherUserCode(parseInt(this.userTo)).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.userCodes = response.data
        }
      }
    )
  }

  volver(){
    this.router.navigate(['pedidos/lista']);
  }
  activeQuality(obj : OtherUserCode[]){
    let active = false;
    obj.forEach(element => {
      if(element.code.includes('S') && element.active === true){
        active = true
      }
    });
    return active
  }
  verHistorial(idTicket : number) {
    const dialogRef = this.dialog.open(HistorialPedidoComponent, {
      data : {
          idTicket : idTicket
      },
    });
  }
  asignarTrabajador(order : ListTicket2){
    console.log(order)
    let quality : boolean = false
    order.otherUserCode.forEach(element => {

      if(element.code.includes('S') && element.active === true){
        quality = true
      }
    });
    console.log(quality)
    console.log(order.quality)

    if(quality){
      if((order.quality !== null && order.quality.trim() !== '') && (order.qualityReport !== null && order.qualityReport.trim() !== '')){
        console.log(order.quality)
        console.log(order.qualityReport)
        const dialogRef = this.dialog.open(SeleccionarAgenteComponent, {
          data: {
            id : order.id,
            idTicket: order.idTicket,
            reportType: order.reportType,
            numberAssign : order.numberAssign,
            assginFromCode : order.asignedTo,
            quality : quality === true ? order.quality : '',
            qualityTypist : quality === true ? order.qualityTypist : '',
            qualityTranslator : quality === true ? order.qualityTranslator : '',
            hasBalance : quality === true ? order.hasBalance : false,
            otherUserCode : order.otherUserCode,
            order : order
          },
        }).afterClosed().subscribe(() => {
             this.ngOnInit();
           });
      }else if(order.quality === null || order.quality.trim() === ''){
        Swal.fire({
          title :'¡Calidad no seleccionada!',
          icon : 'error',
          width: '20rem',
          heightAuto : true
        });
      }else if(order.qualityReport === null || order.qualityReport.trim() === ''){
        Swal.fire({
          title : order.about === 'E' ? '¡Calidad de la Empresa no seleccionada!' : '¡Calidad de la Persona no seleccionada!',
          icon : 'error',
          width: '20rem',
          heightAuto : true
        });
      }
    }else{
      const dialogRef = this.dialog.open(SeleccionarAgenteComponent, {
        data: {
          id : order.id,
          idTicket: order.idTicket,
          reportType: order.reportType,
          numberAssign : order.numberAssign,
          assginFromCode : order.asignedTo,
          quality : '',
          otherUserCode : order.otherUserCode,
          order : order
        },
      }).afterClosed().subscribe(() => {
           this.ngOnInit();
         });

    }
  }
  // entregarTrabajo(codigoCupon : string,tipo : string, numberAssign:number,assignedToCode:string, quality : string){
  //   const today = new Date();
  //   const dd = String(today.getDate()).padStart(2, '0');
  //   const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
  //   const yyyy = today.getFullYear();

  //   const startDateFormatted = dd + '/' + mm + '/' + yyyy;
  //   const endDateFormatted = startDateFormatted;
  //   const asign : Asignacion = {
  //     userFrom: this.userTo,
  //     userTo: "",
  //     assignedToCode: assignedToCode,
  //     assignedToName: '',
  //     startDateD: new Date(),
  //     endDateD: new Date(),
  //     references: false,
  //     observations: '',
  //     type: '',
  //     internal: false,
  //     balance: false,
  //     startDate: startDateFormatted,
  //     endDate: endDateFormatted,
  //     idTicket: parseInt(codigoCupon),
  //     numberAssign: numberAssign,
  //     assignedFromCode: assignedToCode,
  //     quality : this.quality !== '' ? this.quality : null
  //   }
  //   console.log(asign)
  //   Swal.fire({
  //     title: '¿Está seguro de entregar su trabajo?',
  //     text: "",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     cancelButtonText : 'No',
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Sí',
  //     width: '20rem',
  //     heightAuto : true
  //   }).then((result) => {
  //     if(result.value){
  //       this.ticketService.finishWord(asign).subscribe(
  //         (response) => {
  //           if(response.isSuccess === true && response.isWarning === false){
  //             Swal.fire({
  //               title: 'Se entrego el trabajo correctamente',
  //               text: "",
  //               icon: 'success',
  //               width: '20rem',
  //               heightAuto : true
  //             })
  //           }
  //         }
  //       ).add(
  //         () => {
  //           this.ngOnInit()
  //         }
  //       )

  //     }
  //   })
  // }
  listarProveedores(idTicket : number){
    const dialogRef = this.dialog.open(ReferenciasComercialesComponent, {
      data: {
        idTicket: idTicket
      },
    });
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
    dialogRef.afterClosed().subscribe(
      () => {
        this.ngOnInit
      }
    )

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
  eliminarPorId(id : number){
    console.log(id)
    Swal.fire({
      title: '¿El agente a entregado la información complementaria?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '30rem',
      heightAuto : true,
    }).then((result) => {
      if(result.value){
        this.ticketService.DeleteTicketHistoryById(id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title: 'Por favor, avisar al analista que la documentación ha sido actualizada.',
                text: "",
                icon: 'success',
                width: '20rem',
                heightAuto : true
              }).then(
                () => {
                  this.ngOnInit();
                }
              )
            }
          }
        )
      }
    })
  }
  eliminar(idTicket : number, asignedTo : string, numberAssign : number){
    console.log(idTicket)
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
      width: '30rem',
      heightAuto : true,
      html: `
      <hr>
      <div class='w-100 d-flex justify-content-center'>
      <div class='w-100'>
      <label for="devolucion"><h4><b>Motivo de devolución</b></h4></label>
      <textarea class='w-100 form-control shadow-lg' style='min-height:12rem;' id="devolucion"  placeholder="">--------------------------MENSAJE DE DEVOLUCIÓN DE ${asignedTo}--------------------------\n</textarea>
      </div>
      </div>

      `,
      preConfirm: () => {
        const motivo = (document.getElementById('devolucion') as HTMLTextAreaElement).value;
        console.log(motivo)
        return { motivo: motivo };
      }
    }).then((result) => {
      if(result.value){
        const motivoDevolucion = result.value.motivo;
        this.ticketService.deleteTicketHistory(idTicket,asignedTo,numberAssign,motivoDevolucion).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title: 'Se eliminó la asignación con exito',
                text: "",
                icon: 'success',
                width: '20rem',
                heightAuto : true
              }).then(
                () => {
                  this.ngOnInit();
                }
              )
            }
          }
        )
      }
    })

  }
}
