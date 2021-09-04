import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import URL_SERVICIOS from 'src/app/config/config';
import { Anuncio } from 'src/app/models/anuncio';
import { ColumnItem } from 'src/app/models/columnItem';
import { AnuncioService } from 'src/app/services/anuncio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  public anunciosList: any[] = [];
  public loading = true;
  public url_backend = URL_SERVICIOS.url_backend;
  public listOfColumns: ColumnItem[] = [
    {
      name: 'Titulo',
      sortOrder: 'ascend',
      sortFn: (a: Anuncio, b: Anuncio) => a.titulo.localeCompare(b.titulo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: Anuncio) => list.some(name => item.titulo.indexOf(name) !== -1)
    },
    {
      name: 'Descripción',
      sortOrder: null,
      sortFn: (a: Anuncio, b: Anuncio) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: Anuncio) => list.some(name => item.descripcion.indexOf(name) !== -1)
    },
    {
      name: 'Fecha creación',
      sortOrder: 'descend',
      sortFn: (a: Anuncio, b: Anuncio) => this.sortDateTime(a.dateCreated, b.dateCreated),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    },
  ]

  constructor(
    private anuncio: AnuncioService,
    private nzMessageService: NzMessageService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.loadAnuncios();
  }

  loadAnuncios(): void{
    this.anuncio.getAnuncios()
    .then((data: any) => {
      this.anunciosList = data;
      this.loading = false;
    })
    .catch((error: any) => {
      this.loading = false;
      console.log(error);
    })
  }

  confirmDelete(id: string): void {
    Swal.showLoading();
    this.anuncio.deleteAnuncio(id)
    .then((data: any) => {
      Swal.close();
      this.nzMessageService.success('El anuncio se ha eliminado.');
      this.loadAnuncios();

    })
    .catch((error: any) => {
      Swal.close();
      this.nzMessageService.error('Hubo un error al eliminar. Intente nuevamente.');

      console.log(error);
    })
  }

  openEditAnuncio(anuncio: string): void{

    const navigationExtras: NavigationExtras = {
      queryParams: {
        anuncio,
      }
    };
    this.router.navigate(['/inicio/anuncios/editar'], navigationExtras);
  }

  sortDateTime(date1: Date, date2: Date): number {
    return Math.round((new Date(new Date(date2)).setHours(12)-new Date(new Date(date1)).setHours(12))/8.64e7);
  }
}
