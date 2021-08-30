import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ColumnItem } from 'src/app/models/columnItem';
import { Orden } from 'src/app/models/orden';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-misentregas',
  templateUrl: './misentregas.component.html',
  styleUrls: ['./misentregas.component.css'],
  providers: [DatePipe]
})
export class MisentregasComponent implements OnInit {

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
    this.userId = this.usuario.getCurrentUserId();
    this.loadOrdersData();
  }

  loadOrdersData(): void{
    this.ordenes.retrieveMyDeliveries(this.userId)
    .then((data: any) => {
      this.ordersList = data;
      this.loading = false;
    })
    .catch(err => console.log(err))
  }

  sortDateTime(date1: Date, date2: Date): number {
    return Math.round((new Date(new Date(date2)).setHours(12)-new Date(new Date(date1)).setHours(12))/8.64e7);
  }

  showConfirm(id: string): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '¿Está seguro que desea actualizar el estado de la compra?',
      nzContent: 'La orden se marcará como entregada.',
      nzOnOk: () => {this.updateOrder(id)}

    });
  }

  updateOrderDeliveryStatus(id: string): void{
    if (this.usuario.getUserRole() === 'transportista'){
        this.showConfirm(id);
    }
    else
    {
      this.error('Usuario no autorizado', 'Acción permitida sólo para transportistas.')
    }
  }

  updateOrder(id: string): void{
    Swal.showLoading();
    const deliveryMan = {estado: 'Entregado', dateUpdated: this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm')};
    this.ordenes.updateOrderStatus(id, deliveryMan)
        .then(() => {
          Swal.close();
          this.success('Orden actualizada.', 'La orden se actualizó con éxito.');
        })
        .catch(err => {
          console.log(err);
          this.error('Error en la operación.', 'No se pudo actualizar la orden. Intente más tarde.')
        })
  }

  error(title: string, message: string): void {
    const modalDlg = this.modal.error({
      nzTitle: title,
      nzContent: message
    });
    setTimeout(() => modalDlg.destroy(), 1800);
  }

  success(title: string, message: string): void {
    this.modal.success({
      nzTitle: title,
      nzContent: message
    }).afterClose.next(this.loadOrdersData());
  }
}
