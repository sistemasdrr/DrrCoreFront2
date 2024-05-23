import { Component, Inject, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceAgentList } from 'app/models/facturacion';
import { InvoiceService } from 'app/services/Facturacion/invoice.service';
import { ComboService } from 'app/services/combo.service';
import { TicketService } from 'app/services/pedidos/ticket.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-factura-agente',
  templateUrl: './editar-factura-agente.component.html',
  styleUrls: ['./editar-factura-agente.component.scss'],
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

export class EditarFacturaAgenteComponent implements OnInit{

  idTicket = 0
  idTicketHistory = 0
  requestedName = ""
  procedureType = ""
  shippingDate = ""
  shippingDateD : Date | null = null
  price = 0

  loading = false
  invoiceAgent : InvoiceAgentList[] = []

  constructor(public dialogRef: MatDialogRef<EditarFacturaAgenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private comboService : ComboService,
    private ticketHistory : TicketService, private invoiceService : InvoiceService) {
    if(data){
      console.log(data)
      this.idTicketHistory = data.idTicketHistory
      this.requestedName = data.requestedName
      this.procedureType = data.procedureType
      this.shippingDate = data.shippingDate
      this.price = data.price
    }
  }

  ngOnInit(): void {
    const date = this.shippingDate.split('/')
    if(date){
      this.shippingDateD = new Date(parseInt(date[2]),parseInt(date[1])-1, parseInt(date[0]))
    }
  }
  setDate(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (moment.isMoment(selectedDate)) {
      this.shippingDate = this.formatDate(selectedDate);
    }
  }

  formatDate(date: moment.Moment): string {
    const formattedDate = date.format('DD/MM/YYYY');
    return formattedDate;
  }
  cerrarDialog(){
    this.dialogRef.close({
      success : false,
      price : 0
    })
  }
  guardar(){
    console.log(this.idTicketHistory)
    console.log(this.requestedName)
    console.log(this.procedureType)
    console.log(this.shippingDate)
    Swal.fire({
      title: '¿Está seguro de actualizar este registro?',
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
      if (result.value) {
        this.loading = true
        this.invoiceService.UpdateAgentTicket(this.idTicketHistory, this.requestedName, this.procedureType, this.shippingDate).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title: 'Se actualizo los datos correctamente',
                text: '',
                icon : 'success',
                width: '25rem'
              }).then(
                () => {
                  this.loading = false
                  this.dialogRef.close({
                    success : true,
                    requestedName : this.requestedName,
                    procedureType : this.procedureType,
                    shippingDate : this.shippingDate,
                    price : this.price,

                  })
                }
              )
            }
          },
          (error) => {
            Swal.fire({
              title: 'Ocurrio un error al actualizar los datos',
              text: '',
              icon : 'error',
              width: '25rem'
            }).then(
              () => {
                this.loading = false
                this.dialogRef.close({
                  success : false,
                  price : 0
                })
              }
            )
          }
        )
      }
    })

  }
}
