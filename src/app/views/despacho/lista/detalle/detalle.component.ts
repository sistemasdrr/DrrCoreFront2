import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pais } from 'app/models/combo';
import { PedidoService } from 'app/services/pedido.service';
import { PaisService } from 'app/services/pais.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
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
export class DetalleComponent implements OnInit{

  nombreInforme = ""
  fechaIngresoDate = new Date()
  fechaVencimientoDate = new Date()
  fechaDespachoDate = new Date()
  fechaDespacho = ""
  direccionInforme = ""
  tipoRT = ""
  codigoRT = ""
  paisInforme = 0
  balanceInforme = ""
  calidad = ""
  tipoInforme = ""
  tipoTramite = ""
  precioInforme = 0

  paises : Pais[] = []

  constructor(public dialogRef: MatDialogRef<DetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private pedidoService : PedidoService, private paisService : PaisService){

  }
  ngOnInit(): void {
    this.paisService.getPaises().subscribe(response => {
      if(response.isSuccess == true && response.isWarning == false){
        this.paises = response.data;
      }
    });
    // this.nombreInforme = order.informe
    // this.direccionInforme = order.direccion
    // this.tipoRT = order.tipoRT
    // this.codigoRT = order.codigoRT
  }
  paisSeleccionado : Pais = {
    id: 0,
    valor: '',
    bandera: '',
    regtrib: '',
    codCel: '',
  }
  iconoSeleccionado: string = ""
  actualizarSeleccion(obj : Pais) {
    const paisSeleccionadoObj = this.paises.find((pais) => pais.id === obj.id);
    if (paisSeleccionadoObj) {
      this.paisSeleccionado = paisSeleccionadoObj;
      this.iconoSeleccionado = paisSeleccionadoObj.bandera;
    }
  }
  salir(){
    this.dialogRef.close()
  }
}
