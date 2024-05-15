import { InvoiceSubcriberList } from './../../../../models/facturacion';
import { InvoiceService } from './../../../../services/Facturacion/invoice.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pais } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

export interface dataAbonado{
  id : number
  code : string
  name : string
}
export interface dataPedido{
  id : number
  cupon : string
  name : string
  orderDate : string
  dispatchDate : string
  procedureType : string
  country : string
  price : number
}

@Component({
  selector: 'app-facturacion-mensual',
  templateUrl: './facturacion-mensual.component.html',
  styleUrls: ['./facturacion-mensual.component.scss']
})
export class FacturacionMensualComponent implements OnInit {
  breadscrums = [
    {
      title: 'Facturación Mensual de Abonado',
      items: ['Facturación'],
      active: 'Abonado',
    },
  ];

  loading = false
  paises : Pais[] = []
  datos : InvoiceSubcriberList[] = []
  dataSource = new MatTableDataSource<InvoiceSubcriberList>
  dataSourcePedido = new MatTableDataSource<InvoiceSubcriberList>()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  columnsDS : string[] = ['subscriberCode','subscriberName','opciones']
  columnsDSP : string[] = ['ticket','name','orderDate','dispatchDate','procedureType', 'country','price']

  fechaDesde : Date | null = new Date()
  fechaHasta : Date = new Date()

  //FACTURACION
  invoiceNumber = ""
  invoiceDate : Date | null = null
  name = ""
  code = ""
  address = ""
  taxTypeCode = ""
  attendedByName = ""
  attendedByEmail = ""
  idCountry = 0
  bandera = ""
  idCurrency = 0
  language = ""
  exchangeRateSD = 0
  exchangeRateED = 0
  observations = ""
  additionalAmount = false
  concept = ""
  amount = 0

  //MODIFICACIONES
  import = 0
  orderDate : Date | null = null
  dispatchDate : Date | null = null
  procedureType = ""
  salesCheck = false
  reportName = ""

  //FILTRAR
  //POR FACTURAR
  range = new FormGroup({
    start: new FormControl<Date | null>(new Date),
    end: new FormControl<Date | null>(new Date),
  });
  date = new Date()
  startDate = this.date.getDay()+"/"+(this.date.getMonth()+1)+"/"+this.date.getFullYear()
  endDate = this.date.getDay()+"/"+(this.date.getMonth()+1)+"/"+this.date.getFullYear()

  //POR COBRAR
  monthPC = 1
  yearPC = 2024

  //COBRADAS
  monthC = 1
  yearC = 2024

  constructor(private invoiceService : InvoiceService, private abonadoService : AbonadoService,
    private comboService : ComboService
  ){
    this.dataSource = new MatTableDataSource()
    this.dataSource.sort = this.sort

  }
  ngOnInit(): void {
    this.loading = true
    this.comboService.getPaises().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.paises = response.data
        }
      }
    ).add(
      () => {
        this.loading = false
      }
    )
  }
  formatDate(date: moment.Moment): string {
    const formattedDate = date.format('DD/MM/YYYY');
    return formattedDate;
  }
  private filterByDistinctSubscriber(invoices: InvoiceSubcriberList[]): InvoiceSubcriberList[] {
    const uniqueSubscribers = new Set();
    const distinctInvoices = [];

    for (const invoice of invoices) {
      if (!uniqueSubscribers.has(invoice.idSubscriber)) {
        uniqueSubscribers.add(invoice.idSubscriber);
        distinctInvoices.push(invoice);
      }
    }
    return distinctInvoices;
  }
  selectStartDate(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (moment.isMoment(selectedDate)) {
      this.startDate = this.formatDate(selectedDate);
    }
  }
  selectEndDate(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (moment.isMoment(selectedDate)) {
      this.endDate = this.formatDate(selectedDate);
    }
  }
  selectSubscriber(idSubscriber : number){
    this.dataSourcePedido.data = this.datos.filter(x => x.idSubscriber === idSubscriber)
    this.abonadoService.getAbonadoPorId(idSubscriber).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.name = response.data.name
          this.code = response.data.code
          this.address = response.data.address
          this.taxTypeCode = response.data.taxRegistration
          this.language = response.data.language
          this.idCurrency = response.data.idCurrency
          this.idCountry = response.data.idCountry
          this.attendedByName = response.data.sendInvoiceToName
          this.attendedByEmail = response.data.sendInvoiceToEmail
        }
      }
    )
    console.log(idSubscriber)
    console.log(this.datos)
  }
  buscarPorFacturar(){
    this.loading = true
    this.invoiceService.GetInvoiceSubscriberList(this.startDate,this.endDate,0,0,1).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.datos = response.data
          if(this.datos !== null){
            this.dataSource = new MatTableDataSource<InvoiceSubcriberList>(this.filterByDistinctSubscriber(this.datos))
          }else{
            this.dataSource.data = []
          }
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        }
      },(error) => {
        this.loading = false
      }
    ).add(
      () => {
        this.loading = false
      }
    )
  }
  buscarPorCobrar(){
    this.loading = true
    this.invoiceService.GetInvoiceSubscriberList(this.startDate,this.endDate,this.monthPC,this.yearPC,2).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.datos = response.data
          if(this.datos !== null){
            this.dataSource = new MatTableDataSource<InvoiceSubcriberList>(this.filterByDistinctSubscriber(this.datos))

          }else{
            this.dataSource.data = []
          }
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
        }
      },
      (error) => {
        this.loading = false
      }
    ).add(
      () => {
        this.loading = false
      }
    )
  }
  buscarCobradas(){
    this.loading = true
    this.invoiceService.GetInvoiceSubscriberList(this.startDate,this.endDate,this.monthC,this.yearC,3).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.datos = response.data
          if(this.datos !== null){
            this.dataSource.data = this.filterByDistinctSubscriber(this.datos);
          }else{
            this.dataSource.data = []
          }
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        }
      },
      (error) => {
        this.loading = false
      }
    ).add(
      () => {
        this.loading = false
      }
    )
  }
  clear(index : number){
    this.datos = []
    this.dataSource.data = []
    this.dataSourcePedido.data = []
    this.name = ""
    this.code = ""
    this.address = ""
    this.attendedByName = ""
    this.attendedByEmail = ""
    this.idCountry = 0
    this.bandera = ""
    this.idCurrency = 0
    this.language = ""
    this.exchangeRateSD = 0
    this.exchangeRateED = 0
    this.observations = ""
    this.additionalAmount = false
    this.concept = ""
    this.amount = 0
  }
}
