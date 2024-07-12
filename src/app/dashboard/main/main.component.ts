import { PendingTask, ObservedTickets } from './../../models/pedidos/ticket';
import { TicketService } from 'app/services/pedidos/ticket.service';
import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTooltip,
  ApexPlotOptions,
  ApexDataLabels,
  ApexYAxis,
  ApexXAxis,
  ApexLegend,
  ApexResponsive,
  ApexFill,
  ApexStroke,
  ApexGrid,
  ApexTitleSubtitle,
  ApexStates,
} from 'ng-apexcharts';
import { Router } from '@angular/router';
import { DashboardService } from 'app/services/Dashboard/dashboard.service';
import { SeriesDashboard } from 'app/models/dashboard';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  colors: string[];
  legend: ApexLegend;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  states: ApexStates;
  fill: ApexFill;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  numPendingTask = 0
  pendingTask : PendingTask[] = []
  pendingTaskStr = ""
  dailyProduction = 0
  monthlyProduction = 0
  observedTickets : ObservedTickets[] = []
  observedTicketsStr = ""

  idUser = ''
  idEmployee = 0

  public areaChartOptions!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  public smallBarChart!: Partial<ChartOptions>;
  public smallAreaChart!: Partial<ChartOptions>;
  public smallColumnChart!: Partial<ChartOptions>;
  public smallLineChart!: Partial<ChartOptions>;


  public sampleData = [
    31, 40, 28, 44, 60, 55, 68, 51, 42, 85, 77, 31, 40, 28, 44, 60, 55,
  ];

  breadscrums = [
    {
      title: 'Dashboard',
      items: ['Home'],
      active: 'Dashboard',
    },
  ];
  constructor(private ticketService : TicketService, private router: Router, private dashboardService : DashboardService) {
    const auth = JSON.parse(localStorage.getItem('authCache')+'')
    if(auth){
      this.idUser = auth.idUser
      this.idEmployee = parseInt(auth.idEmployee)
    }
  }

  ngOnInit() {
    this.chart1();
    this.chart2();
    this.dashboardService.PendingTask(this.idUser).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.pendingTask = response.data
          this.pendingTask.forEach(element => {
            this.numPendingTask += element.count
            if(element == this.pendingTask[this.pendingTask.length-1]){
              this.pendingTaskStr += element.asignedTo + '→' + element.count
            }else{
              this.pendingTaskStr += element.asignedTo + '→' + element.count + ' || '
            }
          })
        }
      }
    )
    this.dashboardService.DailyProduction(this.idUser).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dailyProduction = response.data
        }
      }
    )
    this.dashboardService.MonthlyProduction(this.idUser).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.monthlyProduction = response.data
        }
      }
    )
    this.dashboardService.ObservedTickets(this.idEmployee).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.observedTickets = response.data
          this.observedTickets.forEach(element => {
            if(element == this.observedTickets[this.observedTickets.length-1]){
              this.observedTicketsStr += element.asignedTo + '→' + element.ticket
            }else{
              this.observedTicketsStr += element.asignedTo + '→' + element.ticket + ' || '
            }
          })
        }
      }
    ).add(
      () => {

    this.chart2Rel()
      }
    )


  }
  redirigir(){
    this.router.navigate(['/pedidos/asignacion-empleados']);
  }
  produccionDiaria(){
    this.router.navigate(['/dashboard/produccion/diaria']);
  }
  produccionMensual(){
    this.router.navigate(['/dashboard/produccion/mensual']);
  }
  private cardChart1() {
    this.smallBarChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
        },
      },
      series: [
        {
          name: 'income',
          data: this.sampleData,
        },
      ],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {},
        marker: {
          show: false,
        },
      },
    };
  }
  private cardChart2() {
    this.smallAreaChart = {
      series: [
        {
          name: 'order',
          data: this.sampleData,
        },
      ],
      chart: {
        type: 'area',
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'straight',
      },
      colors: ['#00E396'],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        marker: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
    };
  }
  private cardChart3() {
    this.smallColumnChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
        },
      },
      series: [
        {
          name: 'income',
          data: this.sampleData,
        },
      ],

      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {},
        marker: {
          show: false,
        },
      },
    };
  }
  private cardChart4() {
    this.smallLineChart = {
      series: [
        {
          name: 'Users',
          data: this.sampleData,
        },
      ],
      chart: {
        type: 'line',
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'straight',
        colors: ['#FEB019'],
        width: 4,
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        marker: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
    };
  }

  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: 'New Clients',
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: 'Old Clients',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#FC8380', '#6973C6'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19',
          '2018-09-20',
          '2018-09-21',
          '2018-09-22',
          '2018-09-23',
          '2018-09-24',
          '2018-09-25',
        ],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'T1',
          data: [44, 55, 41, 37],
        },
        {
          name: 'T2',
          data: [53, 32, 33, 52],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        foreColor: '#9aa0ac',
      },
      colors: ['#5048e5', '#f43f5e', '#3c6494', '#a5a5a5'],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: ['OR', 'RV', 'EF', 'DF'],//OR RV EF DF
        labels: {
          /*formatter: function (val: string) {
            return val + 'K';
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        y: {
          /*formatter: function (val: number) {
            return val + 'K';
          },*/
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
  }
  seriesDashboard : SeriesDashboard[] = []
  private chart2Rel() {
    this.dashboardService.SeriesDashboard().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.seriesDashboard[0] = response.data
          console.log(response.data)
          console.log(this.seriesDashboard[0])
        }
      }
    ).add(
      () => {
        this.barChartOptions = {
          series: this.seriesDashboard[0].series,
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            foreColor: '#9aa0ac',
          },
          colors: ['#5048e5', '#f43f5e', '#3c6494', '#a5a5a5'],
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          stroke: {
            width: 1,
            colors: ['#fff'],
          },
          xaxis: {
            categories: this.seriesDashboard[0].categories,//OR RV EF DF
            labels: {
              /*formatter: function (val: string) {
                return val + 'K';
              },*/
            },
          },
          yaxis: {
            title: {
              text: undefined,
            },
          },
          grid: {
            show: true,
            borderColor: '#9aa0ac',
            strokeDashArray: 1,
          },
          tooltip: {
            theme: 'dark',
            marker: {
              show: true,
            },
            y: {
              /*formatter: function (val: number) {
                return val + 'K';
              },*/
            },
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40,
          },
        };
      }
    )

  }
}
