import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComboData, ComboDataCode } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';
import { SociosEmpresaService } from 'app/services/informes/empresa/socios-empresa.service';
import { Observable, map, startWith } from 'rxjs';
import { SeleccionarPersonaComponent } from './seleccionar-persona/seleccionar-persona.component';
import { DatosGeneralesService } from 'app/services/informes/persona/datos-generales.service';
import { SociosEmpresa } from 'app/models/informes/empresa/socios-empresa';
import Swal from 'sweetalert2';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AgregarSocioComponent implements OnInit {
  titulo = ""

  fullname = ""
  lastSearched = ""
  lastSearchedD : Date | null = null
  language = ""
  idPersonSituation = 0
  nationality = ""
  birthDate = ""
  birthDateD : Date | null = null
  idDocumentType = 0
  codeDocumentType = ""
  taxTypeName = ""
  taxTypeCode = ""
  idLegalRegisterSituation = 0

  id = 0
  idCompany = 0
  idPerson = 0
  mainExecutive = false
  profession = ""
  professionEng = ""
  participation = 0
  startDate = ""
  startDateD : Date | null = null;

  numeration = 0;
  print = true;

  loading = false;

  situacionPersona : ComboData[] = []
  tipoDocumento : ComboData[] = []

  controlSituacionRUC = new FormControl<string | ComboData>('');
  filterSituacionRuc: Observable<ComboData[]>
  situacionRuc: ComboData[] = []
  situacionRucInforme: ComboData = {
    id: 0,
    valor: ''
  }
  msgSituacionRuc = ""
  colorMsgSituacionRuc = ""

  controlProfesion = new FormControl<string | ComboData>('');
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

  modeloNuevo : SociosEmpresa[] = []

  constructor(private comboService : ComboService,
    private sociosEmpresaService : SociosEmpresaService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog : MatDialog,
    public dialogRef: MatDialogRef<AgregarSocioComponent>,
    private datosGeneralesService : DatosGeneralesService){
    if(data.id !== 0){
      this.id = data.id
    }
    this.idCompany = data.idCompany
    this.filterSituacionRuc = new Observable<ComboData[]>()
    this.filterProfesion = new Observable<ComboDataCode[]>()
  }
  ngOnInit(): void {
    this.loading = true;
    this.comboService.getOccupations().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaProfesion = response.data
        }
      }
    )
    this.comboService.getSituacionPersona().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.situacionPersona = response.data
        }
      }
    )
    this.comboService.getDocumentType().subscribe(

      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.tipoDocumento = response.data
        }
      }
    )
    this.comboService.getSituacionRUC().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.situacionRuc = response.data
        }
      }
    )
    if(this.id !== 0){
      this.titulo = "Editar Socio"
      this.sociosEmpresaService.getCompanyPartner(this.id).subscribe(
        (response) => {
          console.log(response.data)
          if(response.isSuccess === true && response.isWarning === false){
            const socio = response.data
            if(socio){
              this.idPerson = socio.idPerson
              this.mainExecutive = socio.mainExecutive
              this.profession = socio.profession
              if(socio.profession !== null && socio.profession !== ''){
                this.profesion = {
                  id : 0,
                  valor : socio.profession,
                  valorEng : socio.professionEng,
                  code : ''
                }
              }
              this.professionEng = socio.professionEng
              this.participation = socio.participation
              this.numeration = socio.numeration
              this.print = socio.print
              if(socio.startDate !== null && socio.startDate !== ""){
                const fecha = socio.startDate.split("/")
                if(fecha.length > 0){
                  this.startDateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                  this.startDate = socio.startDate
                }
              }
            }
          }
        }
      ).add(
        () => {
          if(this.idPerson !== null && this.idPerson !== 0){
            this.datosGeneralesService.getPersonaById(this.idPerson).subscribe(
              (response) => {
                if(response.isSuccess === true && response.isWarning === false){
                  const persona = response.data
                  if(persona){
                    this.fullname = persona.fullname
                    this.language = persona.language
                    this.idPersonSituation = persona.idPersonSituation
                    this.nationality = persona.nationality
                    this.idDocumentType = persona.idDocumentType
                    this.codeDocumentType = persona.codeDocumentType
                    this.taxTypeName = persona.taxTypeName
                    this.taxTypeCode = persona.taxTypeCode
                    this.idLegalRegisterSituation = persona.idLegalRegisterSituation
                    if(persona.lastSearched !== null && persona.lastSearched !== ""){
                      const fecha = persona.lastSearched.split("/")
                      if(fecha.length > 0){
                        this.lastSearchedD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                        this.lastSearched = persona.lastSearched
                      }
                    }
                    if(persona.birthDate !== null && persona.birthDate !== ""){
                      const fecha = persona.birthDate.split("/")
                      if(fecha.length > 0){
                        this.birthDateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                        this.birthDate = persona.birthDate
                      }
                    }
                  }
                }
              }
            ).add(
              () => {
                if(this.idLegalRegisterSituation !== null && this.idLegalRegisterSituation !== 0){
                  this.situacionRucInforme = this.situacionRuc.filter(x => x.id === this.idLegalRegisterSituation)[0]
                }
              }
            )
          }
        }
      )
    }else{
      this.titulo = "Agregar Socio"
    }

    this.loading = false;
    this.filterSituacionRuc = this.controlSituacionRUC.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterSituacionRuc(name as string) : this.situacionRuc.slice()
      }),
    )
    this.filterProfesion = this.controlProfesion.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterProfesion(name as string) : this.listaProfesion.slice()
      }),
    )
  }
  agregarTraduccion(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo : titulo,
        subtitulo : subtitulo,
        tipo : 'input',
        comentario_es : comentario_es,
        comentario_en : comentario_en
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        switch(input){
          case 'profesion':
            this.profession = data.comentario_es
            this.professionEng = data.comentario_en
          break
        }
      }
    });
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
      startDate : this.startDate,
      numeration : this.numeration,
      print : this.print
    }
  }
  newFormatDate() {
    let value = this.startDate.replace(/[^0-9]/g, '');

    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length >= 5) {
      value = value.substring(0, 5) + '/' + value.substring(5);
    }

    this.startDate = value;
  }
  selectIdioma(idioma: string) {
    this.language = idioma;
  }
  selectFechaInforme(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (moment.isMoment(selectedDate)) {
      this.lastSearched = this.formatDate(selectedDate);
    }
  }
  selectFechaNacimiento(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (moment.isMoment(selectedDate)) {
      this.birthDate = this.formatDate(selectedDate);
    }
  }
  selectFechaInicio(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (moment.isMoment(selectedDate)) {
      this.startDate = this.formatDate(selectedDate);
    }
  }
  formatDate(date: moment.Moment): string {
    const formattedDate = date.format('DD/MM/YYYY');
    return formattedDate;
  }
  private _filterSituacionRuc(description: string): ComboData[] {
    const filterValue = description.toLowerCase();
    return this.situacionRuc.filter(situacionRuc => situacionRuc.valor.toLowerCase().includes(filterValue));
  }

  displaySituacionRuc(situacionRuc : ComboData): string {
    return situacionRuc && situacionRuc.valor ? situacionRuc.valor : '';
  }
  limpiarSeleccionSituacionRUC() {
    this.controlSituacionRUC.reset();
    this.idLegalRegisterSituation = 0
  }
  cambioSituacionRuc(situacionRuc: ComboData) {
    console.log(situacionRuc)
    if (typeof situacionRuc === 'string' || situacionRuc === null) {
      this.msgSituacionRuc = "Seleccione una opción."
      this.idLegalRegisterSituation = 0
      this.colorMsgSituacionRuc = "red"
    } else {
      this.msgSituacionRuc = "Opción Seleccionada."
      this.idLegalRegisterSituation = situacionRuc.id
      this.colorMsgSituacionRuc = "green"
    }
    console.log(this.idLegalRegisterSituation)
  }
  private _filterProfesion(description: string): ComboDataCode[] {
    const filterValue = description.toLowerCase();
    return this.listaProfesion.filter(profesion => profesion.valor.toLowerCase().includes(filterValue));
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
    console.log(profesion)
    if (typeof profesion === 'string' || profesion === null) {
      this.msgProfesion = "Seleccione una opción."
      this.profession = profesion
      this.colorMsgProfesion = "red"
    } else {
      this.msgProfesion = "Opción Seleccionada."
      this.profession = profesion.valor
      this.professionEng = profesion.valorEng
      this.colorMsgProfesion = "green"
    }
    console.log(this.profession)
  }
  seleccionarPersona(){
    const dialogRef = this.dialog.open(SeleccionarPersonaComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.idPerson !== 0 && data !== undefined) {
        this.idPerson = data.idPerson
        console.log(data)
      }
    }).add(
      () => {
        if(this.idPerson !== 0){
          this.datosGeneralesService.getPersonaById(this.idPerson).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                const persona = response.data
                if(persona){
                  this.fullname = persona.fullname
                  this.language = persona.language
                  this.idPersonSituation = persona.idPersonSituation
                  this.nationality = persona.nationality
                  this.idDocumentType = persona.idDocumentType
                  this.codeDocumentType = persona.codeDocumentType
                  this.taxTypeName = persona.taxTypeName
                  this.taxTypeCode = persona.taxTypeCode
                  this.idLegalRegisterSituation = persona.idLegalRegisterSituation
                  if(persona.lastSearched !== null && persona.lastSearched !== ""){
                    const fecha = persona.lastSearched.split("/")
                    if(fecha.length > 0){
                      this.lastSearchedD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                      this.lastSearched = persona.lastSearched
                    }
                  }
                  if(persona.birthDate !== null && persona.birthDate !== ""){
                    const fecha = persona.birthDate.split("/")
                    if(fecha.length > 0){
                      this.birthDateD = new Date(parseInt(fecha[2]),parseInt(fecha[1])-1,parseInt(fecha[0]))
                      this.birthDate = persona.birthDate
                    }
                  }
                }
              }
            }
          ).add(
            () => {
              if(this.idLegalRegisterSituation !== null && this.idLegalRegisterSituation !== 0){
                this.situacionRucInforme = this.situacionRuc.filter(x => x.id === this.idLegalRegisterSituation)[0]
              }
            }
          )
        }
      }
    )
  }
  borrarSeleccion(){
    this.idPerson = 0
    this.fullname = ""
    this.language = ""
    this.idPersonSituation = 0
    this.nationality = ""
    this.idDocumentType = 0
    this.codeDocumentType = ""
    this.taxTypeCode = ""
    this.taxTypeName = ""
    this.idLegalRegisterSituation = 0
    this.situacionRucInforme = {
      id: 0,
      valor: ''
    }
  }
  salir(){
    this.dialogRef.close()
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

          this.loading = true
          this.sociosEmpresaService.addCompanyPartner(this.modeloNuevo[0]).subscribe((response) => {
            this.loading = false
            if(response.isSuccess === true && response.isWarning === false){

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
              Swal.fire({
                title: 'Ocurrió un problema.',
                text: 'Comunicarse con Sistemas',
                icon: 'warning',
                confirmButtonColor: 'blue',
                confirmButtonText: 'Ok',
                width: '30rem',
                heightAuto : true
              })
          }
         this.loading = false
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
          this.loading = true
          this.sociosEmpresaService.addCompanyPartner(this.modeloNuevo[0]).subscribe((response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.loading = false
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
              this.loading = false
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

            console.log(response)
          }, (error) => {
            this.loading = false
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
}
