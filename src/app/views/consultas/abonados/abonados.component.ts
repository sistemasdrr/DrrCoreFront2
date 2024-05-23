import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Query1_1, Query1_1ByMonth } from 'app/models/consulta';
import { ConsultaService } from 'app/services/Consultas/consulta.service';

@Component({
  selector: 'app-abonados',
  templateUrl: './abonados.component.html',
  styleUrls: ['./abonados.component.scss']
})
export class AbonadosComponent implements OnInit{

  breadscrums = [
    {
      title: 'Consultas de Abonados',
      items: ['Consultas'],
      active: 'Abonados',
    },
  ];

  loading = false

  idQuery = 0
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private consultaService : ConsultaService){

  }
  ngOnInit(): void {

  }

  //1
  query1_1_idSubscriber = 0
  query1_1_year = 2024
  query1_1_month = 1

  query1_1TotalInformesAtendidos = 0

  query1_1OR = 0
  query1_1RV = 0
  query1_1EF = 0

  query1_1CostoTotal = 0

  DTQuery1_1ByYear = new MatTableDataSource<Query1_1>()
  columnsQuery1_1ByYear : string[] = ['subscriberName','january','february','march','april','may','june','july','august','september','october','november','december','total','options']
  DTQuery1_1ByMonth = new MatTableDataSource<Query1_1ByMonth>()
  columnsQuery1_1ByMonth : string[] = ['requestedName','country','orderDate','dispatchDate','procedureType','reportType','price']
  searchQuery1_1ByYear(){
    this.consultaService.GetQuery1_1ByYear(this.query1_1_year).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.DTQuery1_1ByYear.data = response.data
          this.DTQuery1_1ByYear.paginator = this.paginator
          this.DTQuery1_1ByYear.sort = this.sort
          this.DTQuery1_1ByYear.data.forEach(element => {
            this.query1_1TotalInformesAtendidos+=element.total
          });
        }
      }
    )
  }
  searchQuery1_1ByMonth(){
    this.consultaService.GetQuery1_1ByMonth(this.query1_1_month,this.query1_1_idSubscriber).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.query1_1OR = 0
          this.query1_1RV = 0
          this.query1_1EF = 0
          this.query1_1CostoTotal = 0

          this.DTQuery1_1ByMonth.data = response.data
          this.DTQuery1_1ByMonth.sort = this.sort

          this.DTQuery1_1ByMonth.data.forEach(element => {
            if(element.reportType === 'OR'){
              this.query1_1OR++
            }else if(element.reportType === 'RV'){
              this.query1_1RV++
            }else if(element.reportType === 'EF'){
              this.query1_1EF++
            }
            this.query1_1CostoTotal += element.price
          });
        }
      }
    )
  }

  //2


}
