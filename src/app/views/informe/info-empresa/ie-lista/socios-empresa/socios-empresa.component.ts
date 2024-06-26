import { SociosEmpresaService } from './../../../../../services/informes/empresa/socios-empresa.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComboData } from 'app/models/combo';
import { AccionistasEmpresaT, SociosEmpresaT } from 'app/models/informes/empresa/socios-empresa';
import { AgregarSocioComponent } from './agregar-socio/agregar-socio.component';
import { AgregarAccionistaComponent } from './agregar-accionista/agregar-accionista.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-socios-empresa',
  templateUrl: './socios-empresa.component.html',
  styleUrls: ['./socios-empresa.component.scss'],
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
export class SociosEmpresaComponent implements OnInit{

  loading = false;
  idCompany = 0

  dataSourcePartners : MatTableDataSource<SociosEmpresaT>
  dataSourceShareHolder : MatTableDataSource<AccionistasEmpresaT>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  columnasPartners : string[] = ['name','nationality','birthDate','identificationDocument','mainExecutive','profession','participation','startDate','acciones']
  columnasShareHolder : string[] = ['name','country','taxTypeCode','relation','participation','startDate','acciones']

  constructor(private dialog : MatDialog,private sociosEmpresaService : SociosEmpresaService,@Inject(MAT_DIALOG_DATA) public data: any){
    this.dataSourcePartners = new MatTableDataSource()
    this.dataSourceShareHolder = new MatTableDataSource()
    if(data){
      this.idCompany = data.idCompany
    }
  }
  ngOnInit(): void {
    this.loading = true
    this.sociosEmpresaService.getListCompanyPartner(this.idCompany).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSourcePartners.data = response.data
          this.dataSourcePartners.sort = this.sort
        }
      },(error) => {
        console.log(error)
      }
    ).add(
      () => {
        this.loading = false
      }
    )
    this.sociosEmpresaService.getListCompanyShareHolder(this.idCompany).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSourceShareHolder.data = response.data
          this.dataSourceShareHolder.sort = this.sort
        }
      },(error) => {
        console.log(error)
      }
    )
  }
  agregarSociosEmpresa(){
    const dialogRef = this.dialog.open(AgregarSocioComponent, {
      data: {
        id : 0,
        idCompany : this.idCompany
      },
    });
    dialogRef.afterClosed().subscribe(
      () => {
        this.sociosEmpresaService.getListCompanyPartner(this.idCompany).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.dataSourcePartners.data = response.data
              this.dataSourcePartners.sort = this.sort
            }
          },(error) => {
            console.log(error)
          }
        )
      }
    )
  }
  editarSociosEmpresa(id : number){
    const dialogRef = this.dialog.open(AgregarSocioComponent, {
      data: {
        id : id,
        idCompany : this.idCompany
      },
    });
    dialogRef.afterClosed().subscribe(
      () => {
        this.sociosEmpresaService.getListCompanyPartner(this.idCompany).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.dataSourcePartners.data = response.data
              this.dataSourcePartners.sort = this.sort
            }
          },(error) => {
            console.log(error)
          }
        )
      }
    )
  }
  eliminarSociosEmpresa(id : number){

  }
  agregarAccionistasEmpresa(){
    console.log(this.idCompany)
    const dialogRef = this.dialog.open(AgregarAccionistaComponent, {
      data: {
        id : 0,
        idCompany : this.idCompany
      },
    });
    dialogRef.afterClosed().subscribe(
      () => {
        this.sociosEmpresaService.getListCompanyShareHolder(this.idCompany).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.dataSourceShareHolder.data = response.data
              this.dataSourceShareHolder.sort = this.sort
            }
          },(error) => {
            console.log(error)
          }
        )
      }
    )
  }
  editarAccionistasEmpresa(id : number){
    const dialogRef = this.dialog.open(AgregarAccionistaComponent, {
      data: {
        id : id,
        idCompany : this.idCompany
      },
    });
    dialogRef.afterClosed().subscribe(
      () => {
        this.sociosEmpresaService.getListCompanyShareHolder(this.idCompany).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.dataSourceShareHolder.data = response.data
              this.dataSourceShareHolder.sort = this.sort
            }
          },(error) => {
            console.log(error)
          }
        )
      }
    )
  }
  eliminarAccionistasEmpresa(id : number){

  }
  salir(){
    this.dialog.closeAll()
  }
}
