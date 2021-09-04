import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ColumnItem } from 'src/app/models/columnItem';
import { Orden } from 'src/app/models/orden';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-consulta-general',
  templateUrl: './consulta-general.component.html',
  styleUrls: ['./consulta-general.component.css'],
  providers: [DatePipe]
})

export class ConsultaGeneralComponent implements OnInit {

  public ordersList: any[] = [];
  public loading = true;
  public confirmModal?: NzModalRef;
  public userId: string = '';
  public listOfColumns: ColumnItem[] = [
    {
      name: 'Orden de compra',
      sortOrder: null,
      sortFn: (a: Orden, b: Orden) => a.id - b.id,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Lugar entrega',
      sortOrder: null,
      sortFn: (a: Orden, b: Orden) => a.ciudad.length - b.ciudad.length,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Comprador',
      sortOrder: null,
      sortFn: (a: Orden, b: Orden) => a.ciudad.length - b.ciudad.length,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Fecha',
      sortOrder: 'descend',
      sortFn: (a: Orden, b: Orden) => this.sortDateTime(a.dateCreated, b.dateCreated),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Estado',
      sortOrder: null,
      sortDirections: [null],
      sortFn: (a: Orden, b: Orden) => a.estadoCompra.length - b.estadoCompra.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'Por entregar', value: 'Por entregar' },
        { text: 'Procesando', value: 'Procesando' },
        { text: 'Entregado', value: 'Entregado' }
      ],
      filterFn: (estado: string, item: Orden) => item.estadoCompra.indexOf(estado) !== -1
    }
  ]

  constructor(
    private ordenes: OrdenesService,
    private usuario: UsuarioService,
    private modal: NzModalService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.loadOrdersData();
  }

  loadOrdersData(): void{
    this.ordenes.retrieveAllOrders()
    .then((data: any) => {
      this.ordersList = data;
      this.loading = false;
    })
    .catch(err => {
      console.log(err);
      this.loading = false;
    })
  }

  sortDateTime(date1: Date, date2: Date): number {
    return Math.round((new Date(new Date(date2)).setHours(12)-new Date(new Date(date1)).setHours(12))/8.64e7);
  }
}
