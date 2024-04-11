import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import { ComboData } from 'app/models/combo';
import { AddTicketObservations, EmployeesAssignated, GetTicketObservations } from 'app/models/pedidos/ticket';
import { ComboService } from 'app/services/combo.service';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import { TicketService } from 'app/services/pedidos/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-observacion-pedido',
  templateUrl: './observacion-pedido.component.html',
  styleUrls: ['./observacion-pedido.component.scss']
})
export class ObservacionPedidoComponent implements OnInit{

  idTicket = 0
  cupon = ""
  informe = ""
  abonado = ""
  list : EmployeesAssignated[] = []

  id = 0
  about = ""
  idCompany = 0
  idPerson = 0
  idSubscriber = 0
  idReason = 0
  message = ""
  conclusion = ""
  idStatusTicketObservation = 0
  cc = ""
  observationDate = new Date()
  asignedDate = new Date()
  endDate = this.addDays(2,new Date())
  solutionDate : Date | null = null

  listReason : ComboData[] = []

  add = false;
  edit = false;

  dataSource = new MatTableDataSource<GetTicketObservations>()
  columnsToDisplay = ['id','asignedDate','endDate','acciones']

  modelo : AddTicketObservations[] = []

  @ViewChild('personalList') personalList!: MatSelectionList;

  constructor(public dialogRef: MatDialogRef<ObservacionPedidoComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,private ticketService : TicketService,
    private comboService : ComboService, private abonadoService : AbonadoService){
      if(data){
        this.idTicket = parseInt(data.idTicket)
        console.log(this.idTicket)
      }
  }
  ngOnInit(): void {
    this.ticketService.GetEmployeesAssignated(this.idTicket).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.list = response.data
        }
      }
    )
    this.ticketService.GetTicketObservations(this.idTicket).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSource.data = response.data
        }
      }
    )
    this.ticketService.getById(this.idTicket).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.cupon = response.data.number.toString().padStart(6, '0')
          this.informe = response.data.busineesName
          this.about = response.data.about
          this.idSubscriber = response.data.idSubscriber
          this.idCompany = response.data.idCompany
          this.idPerson = response.data.idPerson
        }
      }
    ).add(
      () => {
        this.abonadoService.getAbonadoPorId(this.idSubscriber).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.abonado = response.data.code
            }
          }
        )
      }
    )
    this.comboService.getReason().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listReason = response.data
        }
      }
    )
  }
  formatearFecha(date : Date | null) {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }
  seleccionarObservacion(obj : GetTicketObservations){

    this.personalList.deselectAll()
    this.id = obj.id
    this.message = obj.message
    this.conclusion = obj.conclusion
    this.idStatusTicketObservation = obj.idStatusTicketObservation
    this.idReason = obj.idReason
    this.cc = obj.cc
    this.observationDate = obj.observationDate
    this.asignedDate = obj.asignedDate
    this.endDate = obj.endDate
    this.solutionDate = obj.solutionDate
    obj.employeesObservated.forEach(element => {
      const optionToSelect = this.personalList.options.find(option => option.value.code === element.code);
      if (optionToSelect) {
        optionToSelect.selected = true;
      }
     });
     this.edit = true
     this.add = false
  }
  eliminarObservacion(id : number){

  }
  agregar(){
    this.id = 0
    this.idReason = 0
    this.message = ""
    this.conclusion = ""
    this.cc = ""
    this.add = true
    this.edit = false
    this.personalList.deselectAll()
    console.log(this.personalList.selectedOptions.selected.map(option => option.value))
  }
  armarModelo(){
    this.modelo[0] = {
      id : this.id,
      idTicket : this.idTicket,
      about : this.about,
      idCompany : this.idCompany,
      idPerson : this.idPerson,
      idSubscriber : this.idSubscriber,
      idReason : this.idReason,
      message : this.message,
      conclusion : this.conclusion,
      idStatusTicketObservation : this.idStatusTicketObservation,
      cc : this.cc,
      observationDate : this.observationDate,
      asignedDate : this.asignedDate,
      endDate : this.endDate,
      solutionDate : this.solutionDate,
      employeesObservated : this.personalList.selectedOptions.selected.map(option => option.value)
    }
    console.log(this.modelo)
  }
  agregarObservacion(){
    this.armarModelo();
    if(this.personalList.selectedOptions.select.length === 0){
      Swal.fire({
        title: 'Seleccione 1 Personal como minimo',
        text: "",
        icon: 'info',
        width: '30rem',
        heightAuto : true
      })
    }else{
      if(this.id === 0){
        Swal.fire({
          title: '¿Está seguro de agregar este registro?',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText : 'No',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí',
          width: '30rem',
          heightAuto : true
        }).then((result) => {
          if (result.value) {
            this.ticketService.AddTicketObservations(this.modelo[0]).subscribe(
              (response) => {
                if(response.isSuccess === true && response.isWarning === false){
                  Swal.fire({
                    title: 'Se agregó el registro correctamente',
                    text: "",
                    icon: 'success',

                    width: '30rem',
                    heightAuto : true
                  }).then(
                    () => {
                      this.ticketService.GetTicketObservations(this.idTicket).subscribe(
                        (response) => {
                          if(response.isSuccess === true && response.isWarning === false){
                            this.dataSource.data = response.data
                          }
                        }
                      )
                    }
                  )
                }
              }
            )
          }
        })
      }else{
        Swal.fire({
          title: '¿Está seguro de editar este registro?',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText : 'No',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí',
          width: '30rem',
          heightAuto : true
        }).then((result) => {
          if (result.value) {
            this.ticketService.AddTicketObservations(this.modelo[0]).subscribe(
              (response) => {
                if(response.isSuccess === true && response.isWarning === false){
                  Swal.fire({
                    title: 'Se editó el registro correctamente',
                    text: "",
                    icon: 'success',

                    width: '30rem',
                    heightAuto : true
                  }).then(
                    () => {
                      this.ticketService.GetTicketObservations(this.idTicket).subscribe(
                        (response) => {
                          if(response.isSuccess === true && response.isWarning === false){
                            this.dataSource.data = response.data
                          }
                        }
                      )
                    }
                  )
                }
              }
            )
          }
        })
      }
    }


  }
  enviarObservacion(){

  }
  salir(){
    this.dialogRef.close()
  }
  addDays(noOfDaysToAdd:number,orderDate:Date){
    let endDate : Date=new Date, count = 0;
    while(count < noOfDaysToAdd){
        endDate = new Date(orderDate.setDate(orderDate.getDate() + 1));
        if(endDate.getDay() != 0 && endDate.getDay() != 6){
           count++;
        }
    }
    return endDate;
  }
}
