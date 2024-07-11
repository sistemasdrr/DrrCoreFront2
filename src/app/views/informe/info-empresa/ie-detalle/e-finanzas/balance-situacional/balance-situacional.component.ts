import { Component, Inject, OnInit   } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComboData } from 'app/models/combo';
import { Balance } from 'app/models/informes/empresa/balance';
import { ComboService } from 'app/services/combo.service';
import { BalanceFinancieroService } from 'app/services/informes/empresa/balance-financiero.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { state, trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-balance-situacional',
  templateUrl: './balance-situacional.component.html',
  styleUrls: ['./balance-situacional.component.scss'],
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
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BalanceSituacionalComponent implements OnInit {


  agregar = false
  editar = false;
  balanceSeleccionado = 0
  listaBalances : ComboData[] = []
  listaMonedas : ComboData[] = []
  separator = ','
  modeloModificado : Balance[] = []

  //BALANCE
  id = 0
  idCompany = 0
  date = ""
  dateD : Date | null = null
  balanceType = "SITUACIONAL"
  duration = ""
  durationEng = ""
  idCurrency = 0
  exchangeRate = 0
  sales = 0
  utilities = 0
  //ACTIVOS
  totalAssets = 0
  //ACTIVOS CORRIENTES
  totalCurrentAssets = 0
  aCashBoxBank = 0
  aToCollect = 0
  aInventory = 0
  aOtherCurrentAssets = 0
  //ACTIVOS NO CORRIENTES
  totalNonCurrentAssets = 0
  aFixed = 0
  aOtherNonCurrentAssets = 0
  //PASIVOS
  totalLliabilities = 0
  //PASIVOS CORRIENTES
  totalCurrentLiabilities = 0
  lCashBoxBank = 0
  lOtherCurrentLiabilities = 0
  //PASIVOS NO CORRIENTES
  totalNonCurrentLiabilities = 0
  lLongTerm = 0
  lOtherNonCurrentLiabilities = 0
  //PATRIMONIO
  totalPatrimony = 0
  pCapital = 0
  pStockPile = 0
  pUtilities = 0
  pOther = 0

  totalLiabilitiesPatrimony = 0
  //RATIOS
  liquidityRatio = 0
  debtRatio = 0
  profitabilityRatio = 0
  workingCapital = 0


  constructor(private balanceService : BalanceFinancieroService, private comboService : ComboService,
    public dialogRef: MatDialogRef<BalanceSituacionalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
   ){
    console.log(data)
    if(data){
      this.idCompany = data
    }
  }

  ngOnInit(): void {
    this.comboService.getTipoMoneda().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning == false){
          this.listaMonedas = response.data
        }
      }
    ).add(
      () => {
        this.balanceService.getBalances(this.idCompany, 'SITUACIONAL').subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false && response.data !== null){
              this.listaBalances = response.data
              this.listaBalances.sort((b, a) => a.valor.localeCompare(b.valor));
            }
          }
        ).add(() => {
          this.balanceSeleccionado = this.listaBalances[0].id
          this.actualizarBalance(this.balanceSeleccionado)
        })
      }
    )
  }
  armarModelo(){
    this.modeloModificado[0] = {
      id : this.id,
      idCompany : this.idCompany,
      date : this.date,
      balanceType : this.balanceType,
      duration : this.duration,
      durationEng : this.durationEng,
      idCurrency : this.idCurrency,
      exchangeRate : this.exchangeRate,
      sales : this.sales,
      utilities : this.utilities,
      totalAssets : this.totalAssets,
      totalCurrentAssets: this.totalCurrentAssets,
      aCashBoxBank: this.aCashBoxBank,
      aToCollect: this.aToCollect,
      aInventory: this.aInventory,
      aOtherCurrentAssets: this.aOtherCurrentAssets,
      totalNonCurrentAssets: this.totalNonCurrentAssets,
      aFixed: this.aFixed,
      aOtherNonCurrentAssets: this.aOtherNonCurrentAssets,
      totalLliabilities: this.totalLliabilities,
      totalCurrentLiabilities: this.totalCurrentLiabilities,
      lCashBoxBank: this.lCashBoxBank,
      lOtherCurrentLiabilities: this.lOtherCurrentLiabilities,
      totalNonCurrentLiabilities: this.totalNonCurrentLiabilities,
      lLongTerm: this.lLongTerm,
      lOtherNonCurrentLiabilities: this.lOtherNonCurrentLiabilities,
      totalPatrimony: this.totalPatrimony,
      pCapital: this.pCapital,
      pStockPile: this.pStockPile,
      pOther: this.pOther,
      totalLiabilitiesPatrimony: this.totalLiabilitiesPatrimony,
      liquidityRatio: this.liquidityRatio,
      debtRatio: this.debtRatio,
      pUtilities: this.pUtilities,
      profitabilityRatio: this.profitabilityRatio,
      workingCapital: this.workingCapital,
    }
  }
  updActivoCorriente(){
    console.log(this.totalCurrentAssets)
    this.totalCurrentAssets = this.aCashBoxBank + this.aToCollect + this.aInventory + this.aOtherCurrentAssets
    this.totalAssets = this.totalCurrentAssets + this.totalNonCurrentAssets
    this.updRatios()
  }
  updActivoNoCorriente(){
    this.totalNonCurrentAssets = this.aFixed + this.aOtherNonCurrentAssets
    this.totalAssets = this.totalCurrentAssets + this.totalNonCurrentAssets
    this.updRatios()
  }

  updPasivoCorriente(){
    this.totalCurrentLiabilities = this.lCashBoxBank + this.lOtherCurrentLiabilities
    this.totalLliabilities = this.totalCurrentLiabilities + this.totalNonCurrentLiabilities
    this.totalLiabilitiesPatrimony = this.totalPatrimony + this.totalLliabilities
    this.updRatios()
  }
  updPasivoNoCorriente(){
    this.totalNonCurrentLiabilities = this.lLongTerm + this.lOtherNonCurrentLiabilities
    this.totalLliabilities = this.totalCurrentLiabilities + this.totalNonCurrentLiabilities
    this.totalLiabilitiesPatrimony = this.totalPatrimony + this.totalLliabilities
    this.updRatios()
  }

  updPatrimonio(){
    this.totalPatrimony = this.pCapital + this.pStockPile + this.pOther + this.pUtilities
    this.totalLiabilitiesPatrimony = this.totalPatrimony + this.totalLliabilities
    this.updRatios()
  }

  updRatios(){
    this.totalLiabilitiesPatrimony = this.totalPatrimony + this.totalLliabilities
    this.liquidityRatio = parseFloat((this.totalCurrentAssets / this.totalCurrentLiabilities).toFixed(2));
    this.debtRatio = parseFloat((this.totalPatrimony / this.totalCurrentLiabilities * 100).toFixed(2));
    this.profitabilityRatio = parseFloat((this.utilities / this.sales * 100).toFixed(2));
    this.workingCapital = parseFloat((this.totalCurrentAssets - this.totalCurrentLiabilities).toFixed(2));
    this.totalAssets = this.totalCurrentAssets + this.totalNonCurrentAssets
    this.totalLliabilities = this.totalCurrentLiabilities + this.totalNonCurrentLiabilities
  }

  formatDate(date: moment.Moment): string {
    const formattedDate = date.format('DD/MM/YYYY');
    return formattedDate;
  }

  agregarBalance(){
    this.agregar = true
    this.id = 0
    this.date = ""
    this.dateD = null
    this.balanceType = "SITUACIONAL"
    this.duration = ""
    this.durationEng = ""
    this.idCurrency = 0
    this.exchangeRate = 0
    this.sales = 0
    this.utilities = 0
    //ACTIVOS
    this.totalAssets = 0
    //ACTIVOS CORRIENTES
    this.totalCurrentAssets = 0
    this.aCashBoxBank = 0
    this.aToCollect = 0
    this.aInventory = 0
    this.aOtherCurrentAssets = 0
    //ACTIVOS NO CORRIENTES
    this.totalNonCurrentAssets = 0
    this.aFixed = 0
    this.aOtherNonCurrentAssets = 0
    //PASIVOS
    this.totalLliabilities = 0
    //PASIVOS CORRIENTES
    this.totalCurrentLiabilities = 0
    this.lCashBoxBank = 0
    this.lOtherCurrentLiabilities = 0
    //PASIVOS NO CORRIENTES
    this.totalNonCurrentLiabilities = 0
    this.lLongTerm = 0
    this.lOtherNonCurrentLiabilities = 0
    //PATRIMONIO
    this.totalPatrimony = 0
    this.pCapital = 0
    this.pStockPile = 0
    this.pUtilities = 0
    this.pOther = 0

    this.totalLiabilitiesPatrimony = 0
    //RATIOS
    this.liquidityRatio = 0
    this.debtRatio = 0
    this.profitabilityRatio = 0
    this.workingCapital = 0
    this.editar = false
  }
  selectFecha(event: MatDatepickerInputEvent<Date>) {
    this.dateD = event.value!
    if (moment.isMoment(this.dateD)) {
      this.date = this.formatDate(this.dateD);
    }
  }
  editarBalance(){
    this.agregar = true
  }
  confirmarAgregar(){
    this.armarModelo()
    console.log(this.modeloModificado[0])
    if(this.id === 0){
      Swal.fire({
        title: '¿Está seguro de agregar este balance?',
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
          this.balanceService.addOrUpdateBalance(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title :'¡Se agregó el balance correctamente!',
                  text : '',
                  icon : 'success',
                  width: '20rem',
                  heightAuto : true
                }).then(() => {
                  this.balanceService.getBalances(this.idCompany, 'SITUACIONAL').subscribe(
                    (response) => {
                      if(response.isSuccess === true && response.isWarning === false){
                        this.listaBalances = response.data
                        this.agregar = false
                      }
                    }
                  )
                });
              }
            }
          )
        }
      });
    }else if(this.id > 0){
      Swal.fire({
        title: '¿Está seguro de modificar este balance?',
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
          this.balanceService.addOrUpdateBalance(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title :'¡Se modificó el balance correctamente!',
                  text : '',
                  icon : 'success',
                  width: '20rem',
                  heightAuto : true
                }).then(() => {
                  this.balanceService.getBalances(this.idCompany, 'SITUACIONAL').subscribe(
                    (response) => {
                      if(response.isSuccess === true && response.isWarning === false){
                        this.listaBalances = response.data
                        this.agregar = false
                      }
                    }
                  )
                });
              }
            }
          )
        }
      });
    }

  }
  cancelarAgregarBalance(){
    this.agregar = false
    this.balanceSeleccionado = 0
    this.id = 0
  }
  actualizarBalance(id : number){
    this.balanceService.getBalanceById(id).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          const balance = response.data
          console.log(response.data)
          if(balance){
            this.id = balance.id
            if(balance.date !== null && balance.date !== ""){
              const fecha = balance.date.split("/")
              if(fecha.length > 0){
                this.dateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                this.date = balance.date
              }else{
                this.dateD = null
              }
            }
            this.balanceType = balance.balanceType
            this.duration = balance.duration
            this.durationEng = balance.durationEng
            this.idCurrency = balance.idCurrency
            this.exchangeRate = balance.exchangeRate
            this.sales = balance.sales
            this.utilities = balance.utilities
            this.totalAssets = balance.totalAssets
            this.totalCurrentAssets = balance.totalCurrentAssets
            this.aCashBoxBank = balance.aCashBoxBank
            this.aToCollect = balance.aToCollect
            this.aInventory = balance.aInventory
            this.aOtherCurrentAssets = balance.aOtherCurrentAssets
            this.totalNonCurrentAssets = balance.totalNonCurrentAssets
            this.aFixed = balance.aFixed
            this.aOtherNonCurrentAssets = balance.aOtherNonCurrentAssets
            this.totalLliabilities = balance.totalLliabilities
            this.totalCurrentLiabilities = balance.totalCurrentLiabilities
            this.lCashBoxBank = balance.lCashBoxBank
            this.lOtherCurrentLiabilities = balance.lOtherCurrentLiabilities
            this.totalNonCurrentLiabilities = balance.totalNonCurrentLiabilities
            this.lLongTerm = balance.lLongTerm
            this.lOtherNonCurrentLiabilities = balance.lOtherNonCurrentLiabilities
            this.totalPatrimony = balance.totalPatrimony
            this.pCapital = balance.pCapital
            this.pStockPile = balance.pStockPile
            this.pUtilities = balance.pUtilities
            this.pOther = balance.pOther
            this.totalLiabilitiesPatrimony = balance.totalLiabilitiesPatrimony
            this.liquidityRatio = balance.liquidityRatio
            this.debtRatio = balance.debtRatio
            this.profitabilityRatio = balance.profitabilityRatio
            this.workingCapital = balance.workingCapital
          }
        }
      }
    )
  }

  enter(event : any){
    console.log(event)
  }

  pintar(){
    console.log("balance mostrado")
  }
}
