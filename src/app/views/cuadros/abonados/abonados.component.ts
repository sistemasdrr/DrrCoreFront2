import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AbonadoT } from 'app/models/mantenimiento/abonado';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import { ReportService } from 'app/services/report.service';

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

  constructor(private abonadoService : AbonadoService, private reportService : ReportService){

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
  }

  DTQuery1_1 = new MatTableDataSource<AbonadoT>()
  columnsQuery1_1 : string[] = ['name','options']

  query1_1_idSubscriber = 0

  query1_1_pdfSrc : any
  query1_1_pdfBlob: Blob = new Blob;

  quary1_1selectSubscriber(idSubscriber : number){
    this.loading = true
    this.reportService.DownloadReport6_1_5(idSubscriber).subscribe(response => {
      this.query1_1_idSubscriber = idSubscriber
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



  query1_2_orderBy = 'C'

  query1_2_pdfSrc : any
  query1_2_pdfBlob: Blob = new Blob;
  seleccionarOrden(orderBy : string){
    this.loading = true
    this.reportService.DownloadReport6_1_7(orderBy).subscribe(response => {
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
    this.reportService.DownloadReport6_1_14(type).subscribe(response => {
      this.query1_3_pdfBlob = response.body as Blob;
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
}
