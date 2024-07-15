import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketService } from 'app/services/pedidos/ticket.service';

@Component({
  selector: 'app-complemento',
  templateUrl: './complemento.component.html',
  styleUrls: ['./complemento.component.scss']
})
export class ComplementoComponent implements OnInit {

  loading = false
  idTicket = 0

  supervisor = ''

  digitado = false
  archivo = false
  userFrom = ""
  observations = ""

  constructor(public dialogRef: MatDialogRef<ComplementoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private ticketService : TicketService){
      if(data){
        this.idTicket = parseInt(data.idTicket)
        console.log(this.idTicket)
      }
      const auth = JSON.parse(localStorage.getItem('authCache')+'')
    this.userFrom = auth.idUser
  }
  ngOnInit(): void {
    this.ticketService.GetSupervisorTicket(this.idTicket).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.supervisor = response.data
        }
      }
    )

  }
  salir(){
    this.dialogRef.close()
  }

}
