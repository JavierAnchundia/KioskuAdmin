import { Component, OnInit } from '@angular/core';
import { ColumnItem } from 'src/app/models/columnItem';
import { MembresiaService } from 'src/app/services/membresia.service';
import { Membresia } from '../../models/membresia';
import { NzMessageService } from 'ng-zorro-antd/message';
import Swal from 'sweetalert2';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  public membershipList: any[] = [];
  public loading = true;
  public listOfColumns: ColumnItem[] = [
    {
      name: 'Tipo',
      sortOrder: 'ascend',
      sortFn: (a: Membresia, b: Membresia) => a.tipo.localeCompare(b.tipo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: Membresia) => list.some(name => item.tipo.indexOf(name) !== -1)
    },
    {
      name: 'Pct. Descuento',
      sortOrder: null,
      sortFn: (a: Membresia, b: Membresia) => a.pct_dscto - b.pct_dscto,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: Membresia) => list.some(name => item.tipo.indexOf(name) !== -1)
    },
    {
      name: 'Tarifa',
      sortOrder: null,
      sortFn: (a: Membresia, b: Membresia) => a.tarifa - b.tarifa,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: Membresia) => list.some(name => item.tipo.indexOf(name) !== -1)
    },
    {
      name: 'Valor de crédito',
      sortOrder: null,
      sortFn: (a: Membresia, b: Membresia) => a.valorCredito - b.valorCredito,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: Membresia) => list.some(name => item.tipo.indexOf(name) !== -1)
    },
  ]
  constructor(
    private membresia: MembresiaService,
    private nzMessageService: NzMessageService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.loadMembresias();
  }

  loadMembresias(): void{
    this.membresia.getMembresias()
    .then((data: any) => {
      this.membershipList = data;
      this.loading = false;
    })
    .catch((error: any) => {
      console.log(error);
    })
  }


  confirmDelete(id: string): void {
    Swal.showLoading();
    this.membresia.editMembresias(id, {active: 'False'})
    .then((data: any) => {
      Swal.close();
      this.nzMessageService.success('La membresía se ha eliminado.');
      this.loadMembresias();

    })
    .catch((error: any) => {
      Swal.close();
      this.nzMessageService.error('Hubo un error al eliminar. Intente nuevamente.');

      console.log(error);
    })
  }

  openEditMembership(membresia: string): void{

    const navigationExtras: NavigationExtras = {
      queryParams: {
        membresia,
      }
    };
    this.router.navigate(['/inicio/membresia/editar'], navigationExtras);
  }
}
