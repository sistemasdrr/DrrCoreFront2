import { Component, Inject, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TicketHistory } from 'app/models/pedidos/asignacion/ticketHistory';
import { PersonalAssignation } from 'app/models/pedidos/ticket';
import { TicketService } from 'app/services/pedidos/ticket.service';
import * as moment from 'moment';

export interface Asignacion{
  userFrom : string
  userTo : string
  assignedToCode : string
  assignedToName : string
  startDateD : Date|null
  endDateD :Date|null
  startDate : string
  endDate : string
  balance : boolean
  references : boolean
  observations : string
  idTicket:number,
  type : string
  internal : boolean,
  numberAssign:number,
  assignedFromCode:string
  quality:string | null
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
  fechaAsignacionString: string=new Date().toLocaleDateString('en-GB')
  fechaVencimientoString: string=new Date().toLocaleDateString('en-GB')

  dataSource : MatTableDataSource<Asignacion>
  columnas = ['assignedTo','assignationDate','endDate','balance','references']

  asignacion : Asignacion[] = []
  interno = false;
  idUserLogin = 0;
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
  numberAssign:number = 0
  loading=false;
  assginFromCode: any;
  quality = ""

  seleccionarTrabajador(codigo : string, nombre : string, idUserLogin : number, internal : boolean){
    this.asignadoCodigo = codigo
    this.asignadoNombre =  nombre
    this.idUserLogin = idUserLogin
    this.asignado = codigo + ' || ' + nombre
    this.interno = internal
  }
  datos : PersonalAssignation[] = []
  datos2 : PersonalAssignation[] = []
  datosPA : PersonalAssignation[] = [
    {
      id : 0,
      idEmployee : 21,
      idUserLogin : 21,
      fullname : 'KATIA BUSTAMANTE',
      type : 'PA',
      code : 'PA1',
      internal : true
    },
    {
      id : 0,
      idEmployee : 33,
      idUserLogin : 33,
      fullname : 'MARIELA ACOSTA',
      type : 'PA',
      code : 'PA2',
      internal : true
    },
    {
      id : 0,
      idEmployee : 37,
      idUserLogin : 37,
      fullname : 'MONICA YEPEZ',
      type : 'PA',
      code : 'PA3',
      internal : true
    },
    {
      id : 0,
      idEmployee : 38,
      idUserLogin : 38,
      fullname : 'RAFAEL DEL RISCO',
      type : 'PA',
      code : 'PA4',
      internal : true
    },
    {
      id : 0,
      idEmployee : 42,
      idUserLogin : 42,
      fullname : 'CECILIA RODRIGUEZ',
      type : 'PA',
      code : 'PA5',
      internal : true
    },
    {
      id : 0,
      idEmployee : 50,
      idUserLogin : 50,
      fullname : 'JESSICA LIAU',
      type : 'PA',
      code : 'PA6',
      internal : true
    },
    {
      id : 0,
      idEmployee : 23,
      idUserLogin : 23,
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
      this.numberAssign=data.numberAssign
      this.quality=data.quality
      this.assginFromCode=data.assginFromCode
      this.referencias = true
      this.fechaAsignacionDate=new Date()
      this.fechaVencimientoDate=new Date()
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
          }).add(
            () => {
              console.log(this.datos)
            }
          )
      }
    )
  }

  filtrarDatos(tipo : string){
    if (tipo === "DI" || tipo === "TR") {
      const crodriguez = this.datos.find(x => x.type === tipo && x.code.includes("D15") ||x.type === tipo && x.code.includes("T14") );
      this.datos2 = this.datos.filter(x => x.type === tipo);
      this.datos2.sort((a, b) => {
        if (a.code < b.code) {
          return -1;
        }
        if (a.code > b.code) {
          return 1;
        }
        return 0;
      });

      if (crodriguez) {
        this.datos2 = this.datos2.filter(x => x !== crodriguez);
        this.datos2.unshift(crodriguez);
      }
    }
    else{
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
    }

    this.asignado = ""
  }
  addAsignacion(){
    console.log(this.fechaVencimientoString);
    const asign : Asignacion = {
      userFrom: this.userFrom,
      userTo: this.idUserLogin + "",
      assignedToCode: this.asignadoCodigo,
      assignedToName: this.asignadoNombre,
      startDateD: this.fechaAsignacionDate,
      endDateD: this.fechaVencimientoDate,
      references: this.referencias,
      observations: this.observaciones,
      type: this.type,
      internal: this.interno,
      balance: false,
      startDate: this.fechaAsignacionString,
      endDate: this.fechaVencimientoString,
      idTicket: this.idTicket,
      numberAssign: this.numberAssign,
      assignedFromCode:this.assginFromCode,
      quality:this.quality !== '' ? this.quality : null
    }
    this.asignacion.push(asign)
    this.dataSource.data = this.asignacion
    this.idUserLogin = 0
    this.asignado = ""
    this.fechaAsignacion = ""
    this.fechaVencimiento = ""
    this.fechaAsignacionDate=new Date()
    this.fechaVencimientoDate=new Date()
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
      this.fechaAsignacionString = this.formatDate(selectedDate);
    }
  }
  selectFechaVencimiento(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value!;
    if (moment.isMoment(selectedDate)) {
      this.fechaVencimientoString = this.formatDate(selectedDate);
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
    this.loading=true;
    this.ticketService.sendAssignation(this.asignacion).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dialogRef.close()
          this.loading=false;
        }
      }
    )
  }
}
