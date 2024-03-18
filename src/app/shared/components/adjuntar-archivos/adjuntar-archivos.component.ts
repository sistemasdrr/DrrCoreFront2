import { TicketService } from 'app/services/pedidos/ticket.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Adjunto } from 'app/models/adjunto';
import { DialogData } from 'app/models/dialog-data';
import { PedidoService } from 'app/services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adjuntar-archivos',
  templateUrl: './adjuntar-archivos.component.html',
  styleUrls: ['./adjuntar-archivos.component.scss']
})
export class AdjuntarArchivosComponent {

  id = 0
  cupon = ""
  loading=false;
  attachments : Adjunto[] = []

  constructor(public dialogRef: MatDialogRef<AdjuntarArchivosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ticketService : TicketService
  ) {
    if(data){
      this.id = data.id;
      this.cupon = data.cupon;
    }
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
            const listaCuponLoader = document.getElementById('loader-lista-cupon') as HTMLElement | null;
                if(listaCuponLoader){
                  listaCuponLoader.classList.remove('hide-loader');
                }
            this.ticketService.uploadFile(this.id, this.cupon, file).subscribe(
              (response) => {

                if(response.isSuccess === true && response.isWarning === false){
                  Swal.fire({
                    title: 'Archivo subido correctamente',
                    text: '',
                    icon : 'success',
                    width: '25rem'
                  })
                }
                if(listaCuponLoader){
                  listaCuponLoader.classList.add('hide-loader');
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
}
