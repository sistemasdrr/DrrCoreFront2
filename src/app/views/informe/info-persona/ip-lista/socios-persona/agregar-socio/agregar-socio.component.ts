import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComboData, ComboDataCode } from 'app/models/combo';
import { SociosEmpresa } from 'app/models/informes/empresa/socios-empresa';
import { Pais } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
import { SocioPersonaService } from 'app/services/informes/persona/socio-persona.service';
import { ListaEmpresasComponent } from 'app/views/pedidos/detalle/lista-empresas/lista-empresas.component';
import { Observable, map, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-agregar-socio',
  templateUrl: './agregar-socio.component.html',
  styleUrls: ['./agregar-socio.component.scss'],
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
export class AgregarSocioPersonaComponent implements OnInit {
  titulo = ""

  id = 0
  idCompany = 0
  idPerson = 0
  mainExecutive = false
  profession = ""
  professionEng = ""
  participation = 0
  startDate = ""
  startDateD : Date | null = null

  name = ""
  socialName = ""
  lastSearched = ""
  lastSearchedD : Date | null = null
  typeRegister = ""
  language = ""
  place = ""
  taxTypeName = ""
  taxTypeCode = ""
  idLegalRegisterSituation = 0
  idCountry = 0
  address = ""
  postalCode = ""

  controlSituacionRUC = new FormControl<string | ComboData>('');
  filterSituacionRuc: Observable<ComboData[]>
  situacionRuc: ComboData[] = []

  controlPaises = new FormControl<string | Pais>('')
  paises: Pais[] = []
  filterPais: Observable<Pais[]>
  iconoSeleccionado = ""
  msgPais = ""
  colorMsgPais = ""
  controlProfesion = new FormControl<string | ComboDataCode>('');
  filterProfesion: Observable<ComboDataCode[]>
  listaProfesion: ComboDataCode[] = []
  profesion: ComboDataCode = {
    id: 0,
    valor: '',
    valorEng: '',
    code: '',
  }
  msgProfesion = ""
  colorMsgProfesion = ""

  msgSituacionRuc = ""
  colorMsgSituacionRuc = ""

  situacionRucInforme: ComboData = {
    id: 0,
    valor: ''
  }
  paisSeleccionado: Pais = {
    id: 0,
    valor: '',
    abreviation: '',
    bandera: '',
    regtrib: '',
    codCel: '',
  }

  modeloNuevo : SociosEmpresa[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private datosEmpresaService: DatosEmpresaService,
  private comboService: ComboService, private dialog : MatDialog,
  private sociosPersonaService : SocioPersonaService, public dialogRef: MatDialogRef<AgregarSocioPersonaComponent>) {
    this.filterSituacionRuc = new Observable<ComboData[]>()
    this.filterProfesion = new Observable<ComboDataCode[]>()

    this.filterPais = new Observable<Pais[]>()
    if(data){
      this.id = data.id
      this.idPerson = data.idPerson

    }
    if(this.id !== 0){
      this.titulo = "Editar Socio"
    }else{
      this.titulo = "Agregar Socio"
    }
  }
  ngOnInit(): void {
    this.comboService.getOccupations().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaProfesion = response.data
        }
      }
    )
    this.comboService.getPaises().subscribe((response) => {
      if (response.isSuccess == true) {
        this.paises = response.data;
      }
    })
    this.comboService.getSituacionRUC().subscribe((response) => {
      if (response.isSuccess === true) {
        this.situacionRuc = response.data
        console.log(response.data)
      }
    })
    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    )

    this.filterSituacionRuc = this.controlSituacionRUC.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterSituacionRuc(name as string) : this.situacionRuc.slice()
      }),
    )
    if(this.id != 0){
      this.sociosPersonaService.getPersonPartner(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const socio = response.data
            if(socio){
              this.idCompany = socio.idCompany
              this.idPerson = socio.idPerson
              this.profession = socio.profession
              this.professionEng = socio.professionEng
              this.mainExecutive = socio.mainExecutive
              this.participation = socio.participation
              if(socio.startDate !== null && socio.startDate !== null){
                const fecha = socio.startDate.split("/")
                if(fecha.length > 0){
                  this.startDateD = new Date(parseInt(fecha[2]), parseInt(fecha[1])-1,parseInt(fecha[0]))
                  this.startDate = socio.startDate
                }
              }
            }
          }
        }
      ).add(
        () => {

          if(this.idCompany !== null && this.idCompany !== 0){
            this.datosEmpresaService.getDatosEmpresaPorId(this.idCompany).subscribe(
              (response) => {
                if(response.isSuccess === true && response.isWarning === false){
                  const empresa = response.data
                  console.log(response.data)
                  if(empresa){
                    this.name = empresa.name
                    this.socialName = empresa.socialName
                    this.typeRegister = empresa.typeRegister
                    this.language = empresa.language
                    this.address = empresa.address
                    this.taxTypeCode = empresa.taxTypeCode
                    this.taxTypeName = empresa.taxTypeName
                    this.place = empresa.place
                    this.postalCode = empresa.postalCode
                    this.idLegalRegisterSituation = empresa.idLegalRegisterSituation
                    this.idCountry = empresa.idCountry
                    if(empresa.lastSearched !== null && empresa.lastSearched !== ""){
                      const fecha = empresa.lastSearched.split("/")
                      if(fecha.length > 0){
                        this.lastSearchedD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                        this.lastSearched = empresa.lastSearched
                      }
                    }

                  }
                }
              }
            ).add(
              () => {
                if(this.idCountry !== null && this.idCountry !== 0){
                  this.paisSeleccionado = this.paises.filter(x => x.id === this.idCountry)[0]
                }
                if(this.idLegalRegisterSituation !== null && this.idLegalRegisterSituation !== 0){
                  this.situacionRucInforme = this.situacionRuc.filter(x => x.id === this.idLegalRegisterSituation)[0]
                }
              }
            )
          }
        }
      )
    }else{

    }
    this.filterProfesion = this.controlProfesion.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterProfesion(name as string) : this.listaProfesion.slice()
      }),
    )
  }
  private _filterProfesion(description: string): ComboDataCode[] {
    const filterValue = description.toLowerCase();
    return this.listaProfesion.filter(profesion => profesion.valor.toLowerCase().includes(filterValue));
  }

  private _filterPais(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paises.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  private _filterSituacionRuc(description: string): ComboData[] {
    const filterValue = description.toLowerCase();
    return this.situacionRuc.filter(situacionRuc => situacionRuc.valor.toLowerCase().includes(filterValue));
  }
  displayProfesion(profesion : ComboDataCode): string {
    return profesion && profesion.valor ? profesion.valor : '';
  }
  limpiarSeleccionProfesion() {
    this.controlProfesion.reset();
    this.profession = ""
    this.professionEng = ""
  }
  cambioProfesion(profesion: ComboDataCode) {
    if (typeof profesion === 'string' || profesion === null) {
      this.msgProfesion = "Seleccione una opción."
      this.profession = ""
      this.professionEng = ""
      this.colorMsgProfesion = "red"
    } else {
      this.msgProfesion = "Opción Seleccionada."
      this.profession = profesion.valor
      this.professionEng = profesion.valorEng
      this.colorMsgProfesion = "green"
    }
    console.log(this.profession)
  }
  displayPais(pais: Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }
  displaySituacionRuc(situacionRuc: ComboData): string {
    return situacionRuc && situacionRuc.valor ? situacionRuc.valor : '';
  }
  limpiarSeleccionPais() {
    this.controlPaises.reset();
    this.idCountry = 0
    this.iconoSeleccionado = ""
  }
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
  limpiarSeleccionSituacionRUC() {
    this.controlSituacionRUC.reset();
    this.idLegalRegisterSituation = 0
  }
  cambioSituacionRuc(situacionRuc: ComboData) {
    if (typeof situacionRuc === 'string' || situacionRuc === null) {
      this.msgSituacionRuc = "Seleccione una opción."
      this.idLegalRegisterSituation = 0
      this.colorMsgSituacionRuc = "red"
    } else {
      this.msgSituacionRuc = "Opción Seleccionada."
      this.idLegalRegisterSituation = situacionRuc.id
      this.colorMsgSituacionRuc = "green"
    }
  }
  selectFechaInforme(event: MatDatepickerInputEvent<Date>) {
    this.lastSearchedD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.lastSearched = this.formatDate(selectedDate);
    }
  }
  selectInstitucionInforme(institucionInforme: string) {
    this.typeRegister = institucionInforme;
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  selectIdioma(idioma: string) {
    this.language = idioma;
  }
  seleccionarEmpresa(){
    const dialogRef = this.dialog.open(ListaEmpresasComponent, {
      data : {
        idCompany : this.idCompany
      }
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        this.idCompany = data.idCompany
        if(this.idCompany !== null && this.idCompany !== 0){
          this.datosEmpresaService.getDatosEmpresaPorId(this.idCompany).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                const empresa = response.data
                console.log(response.data)
                if(empresa){
                  this.name = empresa.name
                  this.socialName = empresa.socialName
                  this.typeRegister = empresa.typeRegister
                  this.language = empresa.language
                  this.address = empresa.address
                  this.taxTypeCode = empresa.taxTypeCode
                  this.taxTypeName = empresa.taxTypeName
                  this.place = empresa.place
                  this.postalCode = empresa.postalCode
                  this.idLegalRegisterSituation = empresa.idLegalRegisterSituation
                  this.idCountry = empresa.idCountry
                  if(empresa.lastSearched !== null && empresa.lastSearched !== ""){
                    const fecha = empresa.lastSearched.split("/")
                    if(fecha.length > 0){
                      this.lastSearchedD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                      this.lastSearched = empresa.lastSearched
                    }
                  }

                }
              }
            }
          ).add(
            () => {
              if(this.idCountry !== null && this.idCountry !== 0){
                this.paisSeleccionado = this.paises.filter(x => x.id === this.idCountry)[0]
              }
              if(this.idLegalRegisterSituation !== null && this.idLegalRegisterSituation !== 0){
                this.situacionRucInforme = this.situacionRuc.filter(x => x.id === this.idLegalRegisterSituation)[0]
              }
            }
          )
        }
      }
    });
  }
  borrarSeleccion(){

  }
  selectFechaInicio(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.startDate = this.formatDate(selectedDate);
    }
  }
  armarModelo(){
    this.modeloNuevo[0] = {
      id : this.id,
      idCompany : this.idCompany,
      idPerson : this.idPerson,
      mainExecutive : this.mainExecutive,
      profession : this.profession,
      professionEng : this.professionEng,
      participation : this.participation,
      startDate : this.startDate
    }
  }
  guardar(){
    this.armarModelo()
    if(this.id > 0){
      console.log(this.modeloNuevo[0])
      Swal.fire({
        title: '¿Está seguro de guardar los cambios?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {
          const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
          if(loader){
            loader.classList.remove('hide-loader');
          }
          this.sociosPersonaService.addPersonPartner(this.modeloNuevo[0]).subscribe((response) => {
          if(response.isSuccess === true && response.isWarning === false){
            if(loader){
              loader.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Se guardaron los cambios correctamente',
              text: "",
              icon: 'success',
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto: true
            }).then(
              () => {
                this.dialogRef.close({
                  success : true
                })
              }
            )
          }else{
            if(loader){
              loader.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Ocurrió un problema.',
              text: 'Comunicarse con Sistemas',
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto : true
            }).then(() => {
            })
          }
          if(loader){
            loader.classList.add('hide-loader');
          }
        })
        }
      });
    }else{
      console.log(this.modeloNuevo[0])
      Swal.fire({
        title: '¿Está seguro de agregar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {
          const loader = document.getElementById('loader-lista-empresas') as HTMLElement | null;
          this.sociosPersonaService.addPersonPartner(this.modeloNuevo[0]).subscribe((response) => {
            if(loader){
              loader.classList.remove('hide-loader');
            }
            if(response.isSuccess === true && response.isWarning === false){
              if(loader){
                loader.classList.add('hide-loader');
              }
              Swal.fire({
                title: 'Se agregó el registro correctamente',
                text: "",
                icon: 'success',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
                width: '30rem',
                heightAuto: true
              }).then(() => {
                this.dialogRef.close({
                  success : true
                })
              })
            }else{
              if(loader){
                loader.classList.add('hide-loader');
              }
              Swal.fire({
                title: 'Ocurrió un problema.',
                text: 'Comunicarse con Sistemas',
                icon: 'warning',
                confirmButtonColor: 'blue',
                confirmButtonText: 'Ok',
                width: '30rem',
                heightAuto : true
              }).then(() => {
              })
            }
            if(loader){
              loader.classList.add('hide-loader');
            }
            console.log(response)
          }, (error) => {
            if(loader){
              loader.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Ocurrió un problema. Comunicarse con Sistemas',
              text: error,
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto : true
            }).then(() => {
            })
          })
        }
      });
    }
  }

  salir(){

  }
}
