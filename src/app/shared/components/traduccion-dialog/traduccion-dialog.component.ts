
import { Component, Inject, Output, EventEmitter,  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TraduccionData } from 'app/models/dialog-data';

@Component({
  selector: 'app-traduccion-dialog',
  templateUrl: './traduccion-dialog.component.html',
  styleUrls: ['./traduccion-dialog.component.scss']
})
export class TraduccionDialogComponent{

  empresa : string = ''
  //ENVIO DE COMENTARIO
  @Output()
  eventEnviarComentario = new EventEmitter<string>();
  comentario_es : string = ""
  comentario_en : string = ""

  titulo : string
  subtitulo : string

  tipo : string = ""
  constructor(
    public dialogRef: MatDialogRef<TraduccionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TraduccionData) {
    this.titulo = this.data.titulo
    this.subtitulo = this.data.subtitulo
    this.tipo = this.data.tipo
    this.comentario_es = this.data.comentario_es
    this.comentario_en = this.data.comentario_en
  }
  realizarEnvio() {
    this.dialogRef.close({
      comentario_es: this.comentario_es,
      comentario_en: this.comentario_en,
     });
  }
  //CKEDITOR
  public Editor: any = ClassicEditor;


  cerrarDialog(){
    this.dialogRef.close()
  }
}
