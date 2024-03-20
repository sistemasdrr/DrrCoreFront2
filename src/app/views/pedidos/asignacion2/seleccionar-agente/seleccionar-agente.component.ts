import { Component, Inject, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TicketHistory } from 'app/models/pedidos/asignacion/ticketHistory';
import { PersonalAssignation } from 'app/models/pedidos/ticket';
import { PedidoService } from 'app/services/pedido.service';
import { TicketService } from 'app/services/pedidos/ticket.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

export interface Asignacion{
  userFrom : string
  userTo : string
  assignedToCode : string
  assignedToName : string
  startDate : string
  endDate : string
  balance : boolean
  references : boolean
  observations : string
  type : string
  internal : boolean
}

@Component({
  selector: 'app-seleccionar-agente',
  templateUrl: './seleccionar-agente.component.html',
  styleUrls: ['./seleccionar-agente.component.scss'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class SeleccionarAgenteComponent implements OnInit {
  activeList = 0
  estado = "agregar"
  idEditarAsignacion = 0
  idEditarTrabajador = 0
  fechaAsignacionDate : Date | null = null
  fechaVencimientoDate : Date | null = null

  dataSource : MatTableDataSource<Asignacion>
  columnas = ['assignedTo','assignationDate','endDate','balance','references']

  asignacion : Asignacion[] = []
  interno = false;
  idEmployee = 0;
  asignado = ""
  asignadoCodigo= ""
  asignadoNombre= ""
  precio = 0
  type = ""
  idTicket = 0
  balance = false
  referencias = false
  reportType = ''
  calidad = ""
  fechaAsignacion = ""
  fechaVencimiento = ""
  observaciones = ""
  userFrom = ''

  seleccionarTrabajador(codigo : string, nombre : string, idEmployee : number, internal : boolean){
    this.asignadoCodigo = codigo
    this.asignadoNombre =  nombre
    this.idEmployee = idEmployee
    this.asignado = codigo + ' || ' + nombre
    this.interno = internal
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
    @Inject(MAT_DIALOG_DATA) public data: any, private ticketService : TicketService){
      this.dataSource = new MatTableDataSource()
      console.log(data)
      this.idTicket = parseInt(data.idTicket)
      this.reportType = data.reportType
      if(this.reportType === "RV"){
        this.referencias = true
      }
      const auth = JSON.parse(localStorage.getItem('authCache')+'')
      this.userFrom = auth.idUser
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
  addAsignacion(){
    const asign : Asignacion = {
      userFrom : this.userFrom,
      userTo : this.idEmployee + "",
      assignedToCode : this.asignadoCodigo,
      assignedToName : this.asignadoNombre,
      startDate : this.fechaAsignacion,
      endDate : this.fechaVencimiento,
      balance : this.balance,
      references : this.referencias,
      observations : this.observaciones,
      type : this.type,
      internal : this.interno
    }
    this.asignacion.push(asign)
    this.dataSource.data = this.asignacion
    this.idEmployee = 0
    this.asignado = ""
    this.fechaAsignacion = ""
    this.fechaAsignacionDate = null
    this.fechaVencimiento = ""
    this.fechaVencimientoDate = null
    this.balance = false
    this.referencias = false
    this.observaciones = ""
    this.activeList = 0
    this.interno = false
    this.estado = 'agregar'
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
    const selectedDate = event.value!;
    if (moment.isMoment(selectedDate)) {
      this.fechaAsignacion = this.formatDate(selectedDate);
    }
  }
  selectFechaVencimiento(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value!;
    if (moment.isMoment(selectedDate)) {
      this.fechaVencimiento = this.formatDate(selectedDate);
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
    this.observaciones = ''
    this.datos = []
    this.activeList = 0
  }
  guardarCambios(){
    console.log(this.dataSource.data)
  }
}
