import { TicketService } from 'app/services/pedidos/ticket.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Adjunto } from 'app/models/adjunto';
import Swal from 'sweetalert2';
import { TicketFile } from 'app/models/pedidos/ticket';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-adjuntar-archivos',
  templateUrl: './adjuntar-archivos.component.html',
  styleUrls: ['./adjuntar-archivos.component.scss']
})
export class AdjuntarArchivosComponent implements OnInit {

  idTicket = 0
  cupon = ""
  loading = false;
  attachments : Adjunto[] = []
  adjuntos : TicketFile[] = []

  constructor(public dialogRef: MatDialogRef<AdjuntarArchivosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ticketService : TicketService
  ) {
    if(data){
      this.idTicket = data.id;
      this.cupon = data.cupon;
    }
    console.log(data)
  }
  ngOnInit(): void {
    this.ticketService.getTicketFiles(this.idTicket).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.adjuntos = response.data
        }
      }
    )
  }

  borrarAttachment(id : number){
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
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
        Swal.fire({
          title :'¡Eliminado!',
          text : 'El registro se elimino correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        });
        this.attachments = this.attachments.filter(x => x.id !== id)

      }
    });
  }
  subirArchivo(){
      Swal.fire({
        title: 'Subir Archivo',
        html:
          '<input type="file" id="file" class="swal2-file">',
        confirmButtonText: 'Confirmar',
        focusConfirm: false,
        preConfirm: () => {
          const fileInput = document.getElementById('file') as HTMLInputElement;
          const file = fileInput.files ? fileInput.files[0] : null;
          if(file){
           this.loading=true;
            this.ticketService.uploadFile(this.idTicket, this.cupon, file).subscribe(
              (response) => {

                if(response.isSuccess === true && response.isWarning === false){
                  Swal.fire({
                    title: 'Archivo subido correctamente',
                    text: '',
                    icon : 'success',
                    width: '25rem'
                  })
                  this.loading=false;
                  this.ngOnInit();
                }

              }
            );
          }else{
            Swal.fire({
              title: 'Error al subir el archivo',
              text: 'Comunicarse con sistemas.',
              icon : 'error',
              width: '25rem'
            })
          }
        }
      });
    }

  cerrarDialog(){
    this.dialogRef.close()
  }

  descargarArchivo( file : string,filename:string){
    this.loading=true;

    let a =document.createElement('a');
    a.download=this.cupon+"_"+filename;
    a.target='_blank';
    a.href=file;
    a.click();
    this.loading = false
  }
  downloadFile(id : number, filename : string){
    const listaEmpresas = document.getElementById('loader-lista-cupon') as HTMLElement | null;
   this.loading=true;
    this.ticketService.downloadFile(id).subscribe(response=>{
      let blob : Blob = response.body as Blob;
      let a =document.createElement('a');

      a.download= filename;
      a.href=window.URL.createObjectURL(blob);
      a.click();
    }).add(
      () => {
        this.loading=false;
      }
    );
  }
  downloadZip() {
  this.loading=true;
    let zip = new JSZip();
    let zipBlob = new Blob();

    let count = 0;

    this.adjuntos.forEach(element => {
      this.ticketService.downloadFile(element.id).subscribe(response => {
        let blob: Blob = response.body as Blob;
        zip.file(element.name, blob);

        count++;

        if (count === this.adjuntos.length) {
          setTimeout(() => {
            zip.generateAsync({ type: 'blob' }).then(content => {
              zipBlob = content;
            }).then(() => {
              saveAs(zipBlob, 'adjuntos_'+this.cupon+'.zip');
             this.loading=false;
            });
          }, 5000);
        }
      });
    });
  }


}
