import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pais } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.scss']
})
export class HistorialPedidosComponent implements OnInit{

  breadscrums = [
    {
      title: 'Historial de Pedidos Online',
      items: ['Historial'],
      active: 'Pedidos Online',
    },
  ];

  //FORMULARIO DE BUSQUEDA
  idSubscriber = 0
  name = ""
  range = new FormGroup({
    start: new FormControl<Date | null>(new Date),
    end: new FormControl<Date | null>(new Date),
  });
  dateFrom = new Date()
  dateUntil = new Date()
  idCountry = 0

  controlPaises = new FormControl<string | Pais>('')
  paises: Pais[] = []
  filterPais: Observable<Pais[]>
  msgPais = ""
  colorMsgPais = ""
  paisSeleccionado: Pais = {
    id: 0,
    valor: '',
    abreviation: '',
    bandera: '',
    regtrib: '',
    codCel: '',
  }
  constructor(private comboService : ComboService){

    this.filterPais = new Observable<Pais[]>()

  }
  ngOnInit(): void {
    this.comboService.getPaises().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.paises = response.data
        }
      }
    )

    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    )
  }
  private _filterPais(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paises.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  displayPais(pais: Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }
  buscar(){

  }
  limpiarSeleccionPais() {
    this.controlPaises.reset();
    this.idCountry = 0
    this.iconoSeleccionado = ""
  }
  iconoSeleccionado: string = ""
  cambioPais(pais: Pais) {
    if (pais !== null) {
      if (typeof pais === 'string' || pais === null || this.paisSeleccionado.id === 0) {
        this.msgPais = "Seleccione una opción."
        this.colorMsgPais = "red"
        this.iconoSeleccionado = ""
        this.idCountry = 0
      } else {
        this.msgPais = "Opción Seleccionada"
        this.colorMsgPais = "green"
        this.iconoSeleccionado =pais.bandera
        this.idCountry = pais.id
      }
    } else {
      this.idCountry = 0
      console.log(this.idCountry)
      this.msgPais = "Seleccione una opción."
      this.colorMsgPais = "red"
    }
  }
  limpiar(){
    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    this.name = ""
  }
}
