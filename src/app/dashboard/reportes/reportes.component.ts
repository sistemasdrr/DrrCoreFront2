import { Component, OnInit } from '@angular/core';
import { ComboDataName } from 'app/models/combo';
import { ComboService } from 'app/services/combo.service';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import { ReportService } from 'app/services/report.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  loading = false;
  constructor(private abonadoService: AbonadoService,
    private reportService: ReportService,
    private comboService: ComboService) { }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    this.query5_1_2_year = currentYear
    this.query6_3_10_year = currentYear
    for (let year = currentYear; year >= startYear; year--) {
      this.years.push(year);
    }

    this.selectQuery5_1_2()
    this.comboService.getAgents().subscribe(
      (response) => {
        if(response.isSuccess === true){
          this.listaAgentes = response.data
        }
      }
    )
  }

  years: number[] = [];

  breadscrums = [
    {
      title: 'Reportes de Gerencia',
      items: ['Reportes'],
      active: 'Gerencia',
    },
  ];

  descargarDocumento(idQuery: number, format: string) {
    switch (idQuery) {
      case 10:
        this.loading = true;
        this.reportService
          .DownloadReport6_1_22(
            this.query1_10_year,
            this.query1_10_orderBy,
            format
          )
          .subscribe((response) => {
            const blob: Blob = response.body as Blob;
            const a = document.createElement('a');
            a.download =
              'CUADRO ESTADISTICO DE INFORMES ATENDIDOS POR AÑO' +
              (format === 'pdf' ? '.pdf' : '.xlsx');
            a.href = window.URL.createObjectURL(blob);
            a.click();
          })
          .add(() => {
            this.loading = false;
          });
        break;
    }
  }
  idQuery = 1
  selectQuery(){
    switch(this.idQuery){
      case 1:
        this.selectQuery5_1_2()
        break;
      case 2:
        this.query6_1_7_type = 'To'
        this.selectQuery6_1_7()
        break;
      case 3 :
        this.query6_1_7_type = 'Na'
        this.selectQuery6_1_7()
        break;
      case 4 :
        this.query6_1_7_type = 'Am'
        this.selectQuery6_1_7()
        break;
      case 5 :
        this.query6_1_7_type = 'Eu'
        this.selectQuery6_1_7()
        break;
      case 6 :
        this.query6_1_7_type = 'As'
        this.selectQuery6_1_7()
        break;
      case 7 :
        this.query6_1_7_type = 'Af'
        this.selectQuery6_1_7()
        break;
      case 8 :
        this.query6_1_7_type = 'Oc'
        this.selectQuery6_1_7()
        break;
    }
  }

  query5_1_2_year = 0
  query5_1_2_pdfSrc: any;
  query5_1_2_pdfBlob: Blob = new Blob();
  selectQuery5_1_2(){
    this.loading = true;

    this.reportService
      .DownloadReport5_1_2(this.query5_1_2_year, 'pdf')
      .subscribe((response) => {
        this.query5_1_2_pdfBlob = response.body as Blob;
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl: string = reader.result as string;
          this.query5_1_2_pdfSrc = dataUrl;
        };
        reader.readAsDataURL(this.query5_1_2_pdfBlob);
      })
      .add(() => {
        this.loading = false;
      });
  }


  query6_1_7_orderBy = 'C';
  query6_1_7_type = 'To';
  query6_1_7_pdfSrc: any;
  query6_1_7_pdfBlob: Blob = new Blob();
  selectQuery6_1_7(){
    this.loading = true;

    this.reportService
      .DownloadReport6_1_7Ger(this.query6_1_7_orderBy, this.query6_1_7_type, 'pdf')
      .subscribe((response) => {
        this.query6_1_7_pdfBlob = response.body as Blob;
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl: string = reader.result as string;
          this.query6_1_7_pdfSrc = dataUrl;
        };
        reader.readAsDataURL(this.query6_1_7_pdfBlob);
      })
      .add(() => {
        this.loading = false;
      });
  }

  query1_10_year = 0;
  query1_10_orderBy = 'C';
  query1_10_pdfSrc: any;
  query1_10_pdfBlob: Blob = new Blob();
  query1_10Cambio() {
    this.loading = true;

    this.reportService
      .DownloadReport6_1_22(this.query1_10_year, this.query1_10_orderBy, 'pdf')
      .subscribe((response) => {
        this.query1_10_pdfBlob = response.body as Blob;
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl: string = reader.result as string;
          this.query1_10_pdfSrc = dataUrl;
        };
        reader.readAsDataURL(this.query1_10_pdfBlob);
      })
      .add(() => {
        this.loading = false;
      });
  }


  listaAgentes : ComboDataName[] = []


  query6_3_10_code = "";
  query6_3_10_year = 0;
  query6_3_10_pdfSrc: any;
  query6_3_10_pdfBlob: Blob = new Blob();
  query6_3_10() {
    this.loading = true;

    this.reportService
      .DownloadReport6_3_10(this.query6_3_10_code, this.query6_3_10_year,'pdf')
      .subscribe((response) => {
        this.query6_3_10_pdfBlob = response.body as Blob;
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl: string = reader.result as string;
          this.query6_3_10_pdfSrc = dataUrl;
        };
        reader.readAsDataURL(this.query6_3_10_pdfBlob);
      })
      .add(() => {
        this.loading = false;
      });
  }

}
