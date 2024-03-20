import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProveedorT } from 'app/models/informes/empresa/sbs-riesgo';
import { ComboService } from 'app/services/combo.service';
import { SbsRiesgoService } from 'app/services/informes/empresa/sbs-riesgo.service';
import Swal from 'sweetalert2';
import { DetalleProveedorComponent } from '../info-empresa/ie-detalle/e-sbs-riesgo/detalle-proveedor/detalle-proveedor.component';

@Component({
  selector: 'app-referencista',
  templateUrl: './referencista.component.html',
  styleUrls: ['./referencista.component.scss']
})
export class ReferencistaComponent implements OnInit {

  idCompany = 0
  idTicket = 0
  numCupon = ""

  dataSourceProveedor: MatTableDataSource<ProveedorT>
  columnsToDisplayProveedor = ['name', 'telephone', 'country', 'maximumAmount', 'timeLimit', 'compliance', 'date','productsTheySell', 'attendedBy','accion'];

  constructor(private dialog : MatDialog,private sbsService : SbsRiesgoService, private activatedRoute : ActivatedRoute, private comboService : ComboService){
    this.dataSourceProveedor = new MatTableDataSource()

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idCompany = 0
    } else {
      this.idCompany = parseInt(id + '')
    }

    const cupon = this.activatedRoute.snapshot.paramMap.get('cupon');
    if(cupon){
      this.numCupon = cupon
      console.log(this.numCupon)
    }
  }

  ngOnInit(): void {
    const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
    if(paginaDetalleEmpresa){
      paginaDetalleEmpresa.classList.remove('hide-loader');
    }
    this.sbsService.getProviderByIdCompany(this.idCompany).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSourceProveedor.data = response.data
        }
      }
    ).add(
      () => {
        if(paginaDetalleEmpresa){
          paginaDetalleEmpresa.classList.add('hide-loader');
        }
      }
    )
  }
//TABLA PROVEEDOR
agregarProveedor() {
  const dialogR1 = this.dialog.open(DetalleProveedorComponent, {
    data: {
      accion : 'AGREGAR',
      id : 0,
      idCompany : this.idCompany
      },
    });
    dialogR1.afterClosed().subscribe(() => {
      this.sbsService.getProviderByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceProveedor.data = response.data
          }
        }
      )
    });
  }
  editarProveedor(id : number) {
    const dialogR2 = this.dialog.open(DetalleProveedorComponent, {
      data: {
        accion : 'EDITAR',
        id : id,
        idCompany : this.idCompany
      },
    });
    dialogR2.afterClosed().subscribe(() => {
      this.sbsService.getProviderByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.dataSourceProveedor.data = response.data
          }
        }
      )
    });
  }
  eliminarProveedor(id : number){
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
        this.sbsService.deleteProvider(id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title :'¡Eliminado!',
                text : 'El registro se eliminó correctamente.',
                icon : 'success',
                width: '20rem',
                heightAuto : true
              })
            }
          }
        )
      }
    })
  }

  guardar(){
    
  }
}
