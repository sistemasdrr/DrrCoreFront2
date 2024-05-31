import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Query4_1 } from 'app/models/consulta';
import { ConsultaService } from 'app/services/Consultas/consulta.service';
import { PDFSource, PdfViewerComponent } from 'ng2-pdf-viewer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss']
})
export class FacturacionComponent implements OnInit{
  years : number[] = []

  breadscrums = [
    {
      title: 'Consultas de Facturación',
      items: ['Consultas'],
      active: 'Facturación',
    },
  ];

  subscribers : Query4_1[] = []

  pdfSrc: string | Uint8Array | PDFSource = ""
  pdfBlob: Blob;

  loading = false

  idQuery = 1
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  to = "one"
  idSubscriber = 0
  idUser = 0


  constructor(private consultaService : ConsultaService){
    this.pdfBlob = new Blob
    const auth = JSON.parse(localStorage.getItem('authCache')+'')
    if(auth){
      this.idUser = parseInt(auth.idUser)
    }
  }
  ngOnInit(): void {
    this.loading = true
    this.consultaService.DownloadQuery_Fact_ByBill("pdf").subscribe(response => {
      this.pdfBlob = response.body as Blob;
      let reader = new FileReader();
      reader.onloadend = () => {
        let dataUrl: string = reader.result as string;
        this.pdfSrc = dataUrl;
      };
      reader.readAsDataURL(this.pdfBlob);
    }).add(
      () => {
        this.loading = false
        this.consultaService.GetQuery4_1().subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.subscribers = response.data
            }
          }
        )
      }
    );


  }
  @ViewChild(PdfViewerComponent)
  private pdfComponent!: PdfViewerComponent;

  pdfQuery = ""
  searchQueryChanged(pdfQuery : string) {
    console.log(pdfQuery)
    const type = '';
    this.pdfComponent.eventBus.dispatch('find', {
      type,
      query: pdfQuery,
      highlightAll: true,
      caseSensitive: false,
      phraseSearch: true,
      // findPrevious: undefined,
    });
  }

  SendMail(){
    this.loading = true;
    this.consultaService.SendMailQuery_Fact_ByBill(this.to, this.to === 'one' ? this.idSubscriber : 0, this.idUser).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          Swal.fire({
            title: this.to === 'one' ? 'Se envio el correo al abonado correctamente' : 'Se enviaron los correos a todos los abonados correctamente',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText : 'No',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            width: '20rem',
            heightAuto : true
          }).then(
            () => {
              this.loading = false
            }
          )
        }
      },(error) => {
        this.loading = false
      }
    )
  }

}
