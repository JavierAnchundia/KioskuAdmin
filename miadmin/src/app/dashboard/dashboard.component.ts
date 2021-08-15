import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  public currentMonth!: Date;
  public generalStats = [];
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {};
  public lineChartColors: Color[] = [];
  public lineChartLegend: boolean = false;
  public lineChartPlugins = [];
  public lineChartType: ChartType = 'line';
  private dateCreatedData: any[] = [];
  private ordersByDay: any[] = [];
  public productsList: any[] = [];
  public itemsList: any[] = [];
  public statsLoaded = false;
  public chartLoaded = false;
  public tableLoaded = false;

  constructor(
    private datepipe: DatePipe,
    private statistics: StatisticsService,
  ) { }

  ngOnInit(): void {
    this.renderChart();
    this.currentMonth = new Date();
    this.loadStatistics();
    this.getRecentItems();
    this.getRecentProducts();
  }


  renderChart(): void {

    this.statistics.retrieveDailyOrders()
    .then((data: any) => {
      data.forEach((element: any) => {
        this.dateCreatedData.push(element?.dateCreated);
        this.ordersByDay.push(element?.count);
      });
      this.chartLoaded = true;
    })
    .catch((error:any) => {
      console.log(error)
    })
    this.lineChartData = [
      { data: this.ordersByDay, label: 'Compras por día' },
    ];

    this.lineChartLabels = this.dateCreatedData;
    this.lineChartOptions = {
      responsive: true,
    };
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: '#F7DB7B',
      },
    ];


  }

  loadStatistics(): void{
    this.statistics.retrieveStatistics()
    .then((stats: any) => {
      this.generalStats = stats;
      this.statsLoaded = true;
    })
    .catch((error: any) => console.log(error))
  }

  getRecentItems(): void{
    this.statistics.retrieveRecentItems()
    .then((data: any) => {
      this.itemsList = data;
    })
    .catch((error: any) => console.log(error))
  }

  getRecentProducts(): void{
    this.statistics.retrieveRecentProducts()
    .then((data: any) => {
      this.productsList = data[0].slice(0, 5);
      console.log(this.productsList.slice(0, 5));
      this.tableLoaded = true;
    })
    .catch((error: any) => console.log(error))
  }
}


