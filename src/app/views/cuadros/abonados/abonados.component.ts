import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pais } from 'app/models/combo';
import { AbonadoT } from 'app/models/mantenimiento/abonado';
import { ComboService } from 'app/services/combo.service';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import { ReportService } from 'app/services/report.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-abonados',
  templateUrl: './abonados.component.html',
  styleUrls: ['./abonados.component.scss'],
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
export class AbonadosComponent implements OnInit{
  years : number[] = []

  breadscrums = [
    {
      title: 'Reportes de Abonados',
      items: ['Reportes'],
      active: 'Abonados',
    },
  ];

  loading = false

  idQuery = 1

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private abonadoService : AbonadoService, private reportService : ReportService,
    private comboService: ComboService){

    this.filterPais = new Observable<Pais[]>()
  }

  ngOnInit(): void {
    this.abonadoService.getAbonados('','','').subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.DTQuery1_1.data = response.data
          this.DTQuery1_1.sort = this.sort
          this.DTQuery1_1.paginator = this.paginator

        }
      },(error) => {

      }
    )
    this.comboService.getPaises().subscribe((response) => {
      if (response.isSuccess == true) {
        this.paises = response.data;
      }
    })
    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    )
  }
  descargarDocumento(idQuery : number, format : string){
    switch(idQuery){
      case 1 :
        this.loading = true
        this.reportService.DownloadReport6_1_5(this.query1_1_idSubscriber, format).subscribe(response => {
          let blob : Blob = response.body as Blob;
          let a =document.createElement('a');
          a.download= "Ficha de Abonado - " +this.subcriberCode + (format === 'pdf' ? '.pdf' : '.xlsx');
          a.href=window.URL.createObjectURL(blob);
          a.click();
        }).add(
          () => {
            this.loading = false
          }
        );
      break;
      case 2:
        this.loading = true
        this.reportService.DownloadReport6_1_7(this.query1_2_orderBy, format).subscribe(response => {
          let blob : Blob = response.body as Blob;
          let a =document.createElement('a');
          a.download= "Lista de Abonado" + (format === 'pdf' ? '.pdf' : '.xlsx');
          a.href=window.URL.createObjectURL(blob);
          a.click();
        }).add(
          () => {
            this.loading = false
          }
        );
        break;
        case 3:
          this.loading = true
          this.reportService.DownloadReport6_1_14(this.query1_3_show, format).subscribe(response => {
            let blob : Blob = response.body as Blob;
            let a =document.createElement('a');
            a.download= "Informes Pendientes, Vencidos y Por Vencer" + (format === 'pdf' ? '.pdf' : '.xlsx');
            a.href=window.URL.createObjectURL(blob);
            a.click();
          }).add(
            () => {
              this.loading = false
            }
          );
          break;
          case 4:
            this.loading = true
            this.reportService.DownloadReport6_1_15(this.idCountry, format).subscribe(response => {
              let blob : Blob = response.body as Blob;
              let a =document.createElement('a');
              a.download= "Listado de Abonado Por País" + (format === 'pdf' ? '.pdf' : '.xlsx');
              a.href=window.URL.createObjectURL(blob);
              a.click();
            }).add(
              () => {
                this.loading = false
              }
            );
            break;
    }
  }

  private _filterPais(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paises.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  displayPais(pais: Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }

  DTQuery1_1 = new MatTableDataSource<AbonadoT>()
  columnsQuery1_1 : string[] = ['name','options']

  query1_1_idSubscriber = 0
  subcriberCode = ""

  query1_1_pdfSrc : any
  query1_1_pdfBlob: Blob = new Blob;

  quary1_1selectSubscriber(idSubscriber : number, code : string){
    this.loading = true
    this.reportService.DownloadReport6_1_5(idSubscriber, "pdf").subscribe(response => {
      this.query1_1_idSubscriber = idSubscriber
      this.subcriberCode = code
      this.query1_1_pdfBlob = response.body as Blob;
      let reader = new FileReader();
      reader.onloadend = () => {
        let dataUrl: string = reader.result as string;
        this.query1_1_pdfSrc = dataUrl;
      };
      reader.readAsDataURL(this.query1_1_pdfBlob);
    }).add(
      () => {
        this.loading = false
      }
    );
  }



  query1_2_orderBy = ''

  query1_2_pdfSrc : any
  query1_2_pdfBlob: Blob = new Blob;
  seleccionarOrden(orderBy : string){
    this.loading = true
    this.reportService.DownloadReport6_1_7(orderBy, "pdf").subscribe(response => {
      this.query1_2_orderBy = orderBy
      this.query1_2_pdfBlob = response.body as Blob;
      let reader = new FileReader();
      reader.onloadend = () => {
        let dataUrl: string = reader.result as string;
        this.query1_2_pdfSrc = dataUrl;
      };
      reader.readAsDataURL(this.query1_2_pdfBlob);
    }).add(
      () => {
        this.loading = false
      }
    );
  }


  query1_3_show = ""

  query1_3_pdfSrc : any
  query1_3_pdfBlob: Blob = new Blob;

  selectQuary1_3(type : string){
    this.loading = true
    this.reportService.DownloadReport6_1_14(type, "pdf").subscribe(response => {
      this.query1_3_pdfBlob = response.body as Blob;
      this.query1_3_show = type
      let reader = new FileReader();
      reader.onloadend = () => {
        let dataUrl: string = reader.result as string;
        this.query1_3_pdfSrc = dataUrl;
      };
      reader.readAsDataURL(this.query1_3_pdfBlob);
    }).add(
      () => {
        this.loading = false
      }
    );
  }

  idCountry = 0
  iconoSeleccionado = ""

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

  query1_4_pdfSrc : any
  query1_4_pdfBlob: Blob = new Blob;

  limpiarSeleccionPais() {
    this.controlPaises.reset();
    this.idCountry = 0
    this.iconoSeleccionado = ""
  }
  async cambioPais(pais: Pais) {
    if (pais !== null) {
      if (typeof pais === 'string' || pais === null || this.paisSeleccionado.id === 0) {
        this.msgPais = "Seleccione una opción."
        this.colorMsgPais = "red"
        this.iconoSeleccionado = ""
        this.idCountry = 0
      } else {
        this.msgPais = "Opción Seleccionada"
        this.colorMsgPais = "green"
        this.iconoSeleccionado = pais.bandera
        this.idCountry = pais.id

        this.loading = true
        this.reportService.DownloadReport6_1_15(this.idCountry, "pdf").subscribe(response => {
          this.query1_4_pdfBlob = response.body as Blob;
          let reader = new FileReader();
          reader.onloadend = () => {
            let dataUrl: string = reader.result as string;
            this.query1_4_pdfSrc = dataUrl;
          };
          reader.readAsDataURL(this.query1_4_pdfBlob);
        }).add(
          () => {
            this.loading = false
          }
        );
      }
    } else {
      this.idCountry = 0
      console.log(this.idCountry)
      this.msgPais = "Seleccione una opción."
      this.colorMsgPais = "red"
    }
  }
}
