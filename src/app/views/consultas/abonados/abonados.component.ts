import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Query1_1, Query1_1ByMonth, Query1_2ByYear, Query1_3BySubscriber, Query1_4, Query1_4Country, Query1_4Procedure, Query1_4ReportType, Query1_4Subscriber } from 'app/models/consulta';
import { Abonado, AbonadoT } from 'app/models/mantenimiento/abonado';
import { ConsultaService } from 'app/services/Consultas/consulta.service';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';

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

  constructor(private consultaService : ConsultaService, private abonadoService : AbonadoService){

  }
  ngOnInit(): void {
    this.abonadoService.getAbonados('','','').subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.DTQuery1_3.data = response.data
          this.DTQuery1_3.sort = this.sort
          this.DTQuery1_3.paginator = this.paginator

        }
      },(error) => {

      }
    )
    this.consultaService.GetQuery1_4Subscribers().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.DTQuery1_4.data = response.data
          this.DTQuery1_4.sort = this.sort
          this.DTQuery1_4.paginator = this.paginator
        }
      }
    )
  }

  clear(){

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

  query1_1totals : any = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
    total: 0
  };
  query1_1CalculateTotals(): void {
    this.query1_1totals = this.DTQuery1_1ByYear.data.reduce((acc, item) => {
      acc.january += item.january;
      acc.february += item.february;
      acc.march += item.march;
      acc.april += item.april;
      acc.may += item.may;
      acc.june += item.june;
      acc.july += item.july;
      acc.august += item.august;
      acc.september += item.september;
      acc.october += item.october;
      acc.november += item.november;
      acc.december += item.december;
      acc.total += item.total;
      return acc;
    }, {
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
      total: 0
    });
  }
  DTQuery1_1ByYear = new MatTableDataSource<Query1_1>()
  columnsQuery1_1ByYear : string[] = ['subscriberName','january','february','march','april','may','june','july','august','september','october','november','december','total','%','options']
  DTQuery1_1ByMonth = new MatTableDataSource<Query1_1ByMonth>()
  columnsQuery1_1ByMonth : string[] = ['requestedName','country','orderDate','dispatchDate','procedureType','reportType','price']

  searchQuery1_1ByYear(){
    this.loading = true
    this.consultaService.GetQuery1_1ByYear(this.query1_1_year).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){

          response.data.sort((a, b) => b.total - a.total);
          this.query1_1TotalInformesAtendidos = 0
          this.DTQuery1_1ByYear.data = response.data
          this.DTQuery1_1ByYear.paginator = this.paginator
          this.DTQuery1_1ByYear.sort = this.sort
          this.DTQuery1_1ByYear.data.forEach(element => {
            this.query1_1TotalInformesAtendidos+=element.total
          });
          this.query1_1CalculateTotals()
        }
      },(error) => {
        this.loading = false
      }
    ).add(
      () => {
        this.loading = false
      }
    )
  }
  searchQuery1_1ByMonth(){
    this.loading = true
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
      },(error) => {
        this.loading = false
      }
    ).add(
      () => {
        this.loading = false
      }
    )
  }

  //2
  query1_2_year = 2024

  query1_2TotalCountries = 0
  query1_2totalReports = 0
  query1_2totals : any = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
    total: 0
  };
  query1_2CalculateTotals(): void {
    this.query1_2totals = this.DTQuery1_2ByYear.data.reduce((acc, item) => {
      acc.january += item.january;
      acc.february += item.february;
      acc.march += item.march;
      acc.april += item.april;
      acc.may += item.may;
      acc.june += item.june;
      acc.july += item.july;
      acc.august += item.august;
      acc.september += item.september;
      acc.october += item.october;
      acc.november += item.november;
      acc.december += item.december;
      acc.total += item.total;
      return acc;
    }, {
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
      total: 0
    });
  }
  DTQuery1_2ByYear = new MatTableDataSource<Query1_2ByYear>()
  columnsQuery1_2ByYear : string[] = ['country','january','february','march','april','may','june','july','august','september','october','november','december','total','%']

  searchQuery1_2ByYear(){
    this.loading = true
    this.consultaService.GetQuery1_2ByYear(this.query1_2_year).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          response.data.sort((a, b) => b.total - a.total);
          this.query1_2TotalCountries = 0
          this.query1_2totalReports = 0

          this.DTQuery1_2ByYear.data = response.data
          this.DTQuery1_2ByYear.sort = this.sort

          this.DTQuery1_2ByYear.data.forEach(element => {
            this.query1_2TotalCountries++;
            this.query1_2totalReports += element.total
          })

          this.query1_2CalculateTotals()
        }
      },(error) => {
        this.loading = false
      }
    ).add(
      () => {
        this.loading = false
      }
    )
  }

  //3
  query1_3_year = 2024

  query1_3_idSubscriber = 0

  query1_3TotalCountries = 0
  query1_3totalReports = 0

  query1_3totals : any = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
    total: 0
  };
  query1_3CalculateTotals(): void {
    this.query1_3totals = this.DTQuery1_3ByYear.data.reduce((acc, item) => {
      acc.january += item.january;
      acc.february += item.february;
      acc.march += item.march;
      acc.april += item.april;
      acc.may += item.may;
      acc.june += item.june;
      acc.july += item.july;
      acc.august += item.august;
      acc.september += item.september;
      acc.october += item.october;
      acc.november += item.november;
      acc.december += item.december;
      acc.total += item.total;
      return acc;
    }, {
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
      total: 0
    });
  }

  DTQuery1_3 = new MatTableDataSource<AbonadoT>()
  columnsQuery1_3 : string[] = ['name','options']

  DTQuery1_3ByYear = new MatTableDataSource<Query1_3BySubscriber>()
  columnsQuery1_3ByYear : string[] = ['country','january','february','march','april','may','june','july','august','september','october','november','december','total','%']

  searchQuery1_3ByYear(){
    this.loading = true
    this.consultaService.GetQuery1_3BySubscriber(this.query1_3_idSubscriber, this.query1_3_year).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.query1_3TotalCountries = 0
          this.query1_3totalReports = 0

          this.DTQuery1_3ByYear.data = response.data
          this.DTQuery1_3ByYear.sort = this.sort

          this.DTQuery1_3ByYear.data.forEach(element => {
            this.query1_3TotalCountries++;
            this.query1_3totalReports += element.total
          })
          this.query1_3CalculateTotals()
        }
      },(error) => {
        this.loading = false
      }
    ).add(
      () => {
        this.loading = false
      }
    )
  }

  //4
  query1_4_year = 2024

  query1_4_idSubscriber = 0

  query1_4TotalCountries = 0
  query1_4totalReports = 0

  DTQuery1_4 = new MatTableDataSource<Query1_4Subscriber>()
  columnsQuery1_4 : string[] = ['name','options']

  query1_4totalsCountry : any = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
    total: 0
  };
  query1_4CalculateTotalsCountry(): void {
    this.query1_4totalsCountry = this.DTQuery1_4Country.data.reduce((acc, item) => {
      acc.january += item.january;
      acc.february += item.february;
      acc.march += item.march;
      acc.april += item.april;
      acc.may += item.may;
      acc.june += item.june;
      acc.july += item.july;
      acc.august += item.august;
      acc.september += item.september;
      acc.october += item.october;
      acc.november += item.november;
      acc.december += item.december;
      acc.total += item.total;
      return acc;
    }, {
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
      total: 0
    });
  }
  query1_4totalsProcedure : any = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
    total: 0
  };
  query1_4CalculateTotalsProcedure(): void {
    this.query1_4totalsProcedure = this.DTQuery1_4Procedure.data.reduce((acc, item) => {
      acc.january += item.january;
      acc.february += item.february;
      acc.march += item.march;
      acc.april += item.april;
      acc.may += item.may;
      acc.june += item.june;
      acc.july += item.july;
      acc.august += item.august;
      acc.september += item.september;
      acc.october += item.october;
      acc.november += item.november;
      acc.december += item.december;
      acc.total += item.total;
      return acc;
    }, {
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
      total: 0
    });
  }
  query1_4totalsReport : any = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
    total: 0
  };
  query1_4CalculateTotalsReport(): void {
    this.query1_4totalsReport = this.DTQuery1_4Report.data.reduce((acc, item) => {
      acc.january += item.january;
      acc.february += item.february;
      acc.march += item.march;
      acc.april += item.april;
      acc.may += item.may;
      acc.june += item.june;
      acc.july += item.july;
      acc.august += item.august;
      acc.september += item.september;
      acc.october += item.october;
      acc.november += item.november;
      acc.december += item.december;
      acc.total += item.total;
      return acc;
    }, {
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
      total: 0
    });
  }
  DTQuery1_4Country = new MatTableDataSource<Query1_4Country>()
  columnsQuery1_4Country : string[] = ['country','january','february','march','april','may','june','july','august','september','october','november','december','total','%']
  DTQuery1_4Procedure = new MatTableDataSource<Query1_4Procedure>()
  columnsQuery1_4Procedure : string[] = ['procedureType','january','february','march','april','may','june','july','august','september','october','november','december','total','%']
  DTQuery1_4Report = new MatTableDataSource<Query1_4ReportType>()
  columnsQuery1_4Report : string[] = ['reportType','january','february','march','april','may','june','july','august','september','october','november','december','total','%']


  searchQuery1_4(){
    this.loading = true
    this.consultaService.GetQuery1_4(this.query1_4_idSubscriber, this.query1_4_year).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.query1_4TotalCountries = 0
          this.query1_4totalReports = 0

          this.DTQuery1_4Country.data = response.data.query1_4ByCountries
          this.DTQuery1_4Country.sort = this.sort
          this.DTQuery1_4Procedure.data = response.data.query1_4ByProcedureType
          this.DTQuery1_4Procedure.sort = this.sort
          this.DTQuery1_4Report.data = response.data.query1_4ByReportType
          this.DTQuery1_4Report.sort = this.sort

          this.DTQuery1_4Country.data.forEach(element => {
            this.query1_4TotalCountries++;
            this.query1_4totalReports += element.total
          })
          this.DTQuery1_4Country.data.forEach(element => {
          })
          this.query1_4CalculateTotalsCountry()
          this.query1_4CalculateTotalsProcedure()
          this.query1_4CalculateTotalsReport()
        }
      },(error) => {
        this.loading = false
      }
    ).add(
      () => {
        this.loading = false
      }
    )
  }

  //5
  startDate = ""
  startDateD = new Date()
  endDate = ""
  endDateD = new Date()

  query1_5TotalReports = 0
  query1_5TotalPrice = 0


}
