import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TicketHistory } from 'app/models/pedidos/asignacion/ticketHistory';
import { PersonalAssignation } from 'app/models/pedidos/ticket';
import { PedidoService } from 'app/services/pedido.service';
import { TicketService } from 'app/services/pedidos/ticket.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seleccionar-agente',
  templateUrl: './seleccionar-agente.component.html',
  styleUrls: ['./seleccionar-agente.component.scss']
})
export class SeleccionarAgenteComponent implements OnInit {
  activeList = 0
  estado = "agregar"
  idEditarAsignacion = 0
  idEditarTrabajador = 0
  fechaAsignacionDate = new Date()
  fechaVencimientoDate = new Date()
  fechaEntregaDate = new Date()

  dataSource : MatTableDataSource<TicketHistory>
  columnas = ['assignedTo','assignationDate','endDate','balance','references']

  asignado = ""
  precio = 0
  type = ""
  idTicket = 0
  balance = false
  referencias = false
  reportType = ''
  calidad = ""
  fechaAsignacion = ""
  fechaVencimiento = ""
  fechaEntrega = ""
  observaciones = ""
  userTo = ''

  seleccionarTrabajador(codigo : string, nombre : string){
    this.asignado = codigo + ' || ' + nombre
  }
  datos : PersonalAssignation[] = []
  datos2 : PersonalAssignation[] = []
  datosPA : PersonalAssignation[] = [
    {
      id : 0,
      idEmployee : 21,
      fullname : 'KATIA BUSTAMANTE',
      type : 'PA',
      code : 'PA1',
      internal : true
    },
    {
      id : 0,
      idEmployee : 33,
      fullname : 'MARIELA ACOSTA',
      type : 'PA',
      code : 'PA2',
      internal : true
    },
    {
      id : 0,
      idEmployee : 37,
      fullname : 'MONICA YEPEZ',
      type : 'PA',
      code : 'PA3',
      internal : true
    },
    {
      id : 0,
      idEmployee : 38,
      fullname : 'RAFAEL DEL RISCO',
      type : 'PA',
      code : 'PA4',
      internal : true
    },
    {
      id : 0,
      idEmployee : 42,
      fullname : 'CECILIA RODRIGUEZ',
      type : 'PA',
      code : 'PA5',
      internal : true
    },
    {
      id : 0,
      idEmployee : 50,
      fullname : 'JESSICA LIAU',
      type : 'PA',
      code : 'PA6',
      internal : true
    },
    {
      id : 0,
      idEmployee : 23,
      fullname : 'CECILIA SAYAS',
      type : 'PA',
      code : 'PA7',
      internal : true
    },
  ]
  constructor(public dialogRef: MatDialogRef<SeleccionarAgenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private ticketService : TicketService, private pedidoService : PedidoService){
      this.dataSource = new MatTableDataSource()
      console.log(data)
      this.idTicket = parseInt(data.idTicket)
      this.reportType = data.reportType
      if(this.reportType === "RV"){
        this.referencias = true
      }
      const auth = JSON.parse(localStorage.getItem('authCache')+'')
      this.userTo = auth.idUser
  }

  ngOnInit(): void {
    this.ticketService.getPersonalAssignation().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.datos = response.data
          this.datosPA.forEach(element => {
            this.datos.push(element)
          });
        }
      }
    ).add(
      () => {
        this.ticketService.getAgentAssignation().subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              response.data.forEach(element => {
                this.datos.push(element)
              });
            }
          })
      }
    )
  }

  filtrarDatos(tipo : string){
    this.datos2 = this.datos.filter(x => x.type === tipo)
    this.datos2.sort((a, b) => {
      if (a.code < b.code) {
        return -1;
      }
      if (a.code > b.code) {
        return 1;
      }
      return 0;
    });
    this.asignado = ""
  }
  agregarAsignacion(codigo : string){
    let nuevaAsignacion : TicketHistory = {
      id : 0,
      userFrom : this.userTo,
      userTo : '',
      idStatusTicket : this.type === "PA" ? 12 : this.type === "RP" ? 4 : this.type === "AG" ? 3 : this.type === "RF" ? 13 : this.type === "DI" ? 5 : this.type === "TR" ? 6 : this.type === "SU" ? 7 : 12,
      asignedTo : '',
      flag : true,
      numberAssign : 1

    }
  }


  editarAsignacion(){

  }

  eliminarAsignacion(id : number){

  }

  cerrarDialog(){
    this.dialogRef.close()
  }

  formatDate(date: moment.Moment): string {
    const formattedDate = date.format('DD/MM/YYYY');
    return formattedDate;
  }

  selectFechaAsignacion(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (moment.isMoment(selectedDate)) {
      this.fechaAsignacion = this.formatDate(selectedDate);
    }
  }
  selectFechaVencimiento(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (moment.isMoment(selectedDate)) {
      this.fechaVencimiento = this.formatDate(selectedDate);
    }
  }
  selectFechaEntrega(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (moment.isMoment(selectedDate)) {
      this.fechaEntrega = this.formatDate(selectedDate);
    }
  }
  limpiar(){
    this.estado = 'agregar'
    this.asignado = ''
    this.precio = 0
    this.calidad = ''
    this.fechaAsignacion = ''
    this.fechaAsignacionDate = new Date()
    this.fechaVencimiento = ''
    this.fechaVencimientoDate = new Date()
    this.fechaEntrega = ''
    this.fechaEntregaDate = new Date()
    this.observaciones = ''
    this.datos = []
    this.activeList = 0
  }
}
