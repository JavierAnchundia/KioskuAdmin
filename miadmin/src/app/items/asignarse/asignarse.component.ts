import { Component, OnInit } from '@angular/core';
import {Categoria} from '../../models/categoria';
import {Item} from '../../models/items';
import { Router} from '@angular/router';

import {ColumnItem} from '../../models/columnItem';
import Swal from 'sweetalert2'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import URL_SERVICIOS from 'src/app/config/config';

import { CategoriaService } from '../../services/categoria.service';
import { ItemsService } from '../../services/items.service';
import { BodegaService } from '../../services/bodega.service';

import { SubcategoriaService } from '../../services/subcategoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-asignarse',
  templateUrl: './asignarse.component.html',
  styleUrls: ['./asignarse.component.css']
})
export class AsignarseComponent implements OnInit {

  searchValueTitulo = '';
  searchValueDescripcion = '';
  searchValueEntrega = '';

  evaluador_role = 'evaluador'
  es_evaluador = false;
  tipo_user: any;

  visibleTitulo = false;
  visibleDescripcion = false;
  visibleEntrega = false;
  multiplefilter = false;

  categoriaForm:FormGroup;
  isModalCategoryVisible = false;
  isModalCategoryOkLoading = false;
  url_backend: string = URL_SERVICIOS.url_static;

  listOfColumns: ColumnItem[] = [
    {
      name: 'Título',
      sortOrder: null,
      sortFn: (a: Item, b: Item) => a.titulo.localeCompare(b.titulo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: Item) => list.some(titulo => item.titulo.indexOf(titulo) !== -1)
    },

    {
      name: 'Descripción',
      sortOrder: null,
      sortFn: (a: Item, b: Item) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: Item) => list.some(descripcion => item.descripcion.indexOf(descripcion) !== -1)
    },

    {
      name: 'Modo de Entrega',
      sortOrder: null,
      sortFn: (a: Item, b: Item) => a.entrega.localeCompare(b.entrega),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: Item) => list.some(entrega => item.entrega.indexOf(entrega) !== -1)
    },
    
  ];

  listOfData: Item[] = [];
  listOfDisplayData = [...this.listOfData];

  constructor(
    private _bodega: BodegaService,
    private _subcategoria: SubcategoriaService,
    private _formBuilder: FormBuilder,
    private _categoria:CategoriaService,
    private _itemsService: ItemsService,  
    private router:Router, 
  ) {

    this.categoriaForm = this._formBuilder.group({
      categoriaNombre: ["", [Validators.maxLength(25), Validators.required]],
      remember: [true]

    });

   }

  ngOnInit(): void {
    this.cargarItemUnassigned()  
    this.tipo_user =  localStorage.getItem('type');
    this.es_evaluador =  (this.tipo_user == this.evaluador_role);
  }


  public verDetallef = (key:number) => {
    let id:number = key;
  }


  resetTitulo(): void {
    this.searchValueTitulo = '';
    this.multiplefilter = false;
    this.searchTitulo();
  }

  resetDescripcion(): void {
    this.searchValueDescripcion = '';
    this.multiplefilter = false;
    this.searchDescripcion();
  }

  resetEntrega(): void {
    this.searchValueEntrega = '';
    this.multiplefilter = false;
    this.searchEntrega();
  }

  searchTitulo(): void {
    this.visibleTitulo = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: Item) => item.titulo.toLowerCase().indexOf(this.searchValueTitulo.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: Item) => item.titulo.toLowerCase().indexOf(this.searchValueTitulo.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  searchDescripcion(): void {
    this.visibleDescripcion = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: Item) => item.descripcion.toLowerCase().indexOf(this.searchValueDescripcion.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: Item) => item.descripcion.toLowerCase().indexOf(this.searchValueDescripcion.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  searchEntrega(): void {
    this.visibleEntrega = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: Item) => item.entrega.toLowerCase().indexOf(this.searchValueEntrega.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: Item) => item.entrega.toLowerCase().indexOf(this.searchValueEntrega.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  cargarItemUnassigned(){
    this._itemsService.getItemUnassigned()
    .subscribe((resp:any)=>{
      this.listOfData = [];
      for (var i =0; i < resp.length; i++){       
        this.listOfData.push(resp[i]);        
      }
      
      this.listOfData = [... this.listOfData];
      this.listOfDisplayData = [...this.listOfData];
      

    }
      )
      
  }

  

   submitCategoriaForm():void
   {
    for (const i in this.categoriaForm.controls) {
      if (this.categoriaForm.controls.hasOwnProperty(i)) {
        this.categoriaForm.controls[i].markAsDirty();
        this.categoriaForm.controls[i].updateValueAndValidity();
      }
    }
   }

   //Metodo que permite mostrar el modal para poder crear una categoria
   showModal(): void {
    this.isModalCategoryVisible = true;

  }

  asignarse(key:number): void 
  {
    const formData = new FormData();
    let admin_id = ''
    admin_id = JSON.parse(localStorage.getItem('user')|| '{}').user_id; 
    formData.append('item', key as any as string);
    formData.append('admin',  admin_id);

    if(!this.es_evaluador)
    {
      Swal.fire({
        title:'¡No tiene permisos para usar esta acción!'})
        .then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.backdrop) {
          this.router.navigate(['/inicio/dashboard']);
        }
  
        if (result.isConfirmed) {
          this.router.navigate(['/inicio/dashboard']);
        }
      });
    }
    

    else
    {
      this._itemsService
      .asignaradminItem(formData)
      .pipe(
       catchError((err) => {
         Swal.close();
         Swal.fire(
           "Ha ocurrido un error inesperado al asignarte este item"
         );
         return throwError(err);
       })
     )
     .subscribe(
       async (resp: any) => {
       
       

        Swal.close();
        
        Swal.fire({
          title:'¡Item asignado exitosamente!'})
          .then((result) => {
          if (result.dismiss === Swal.DismissReason.backdrop) {
            this.cargarItemUnassigned();
          }

          if (result.isConfirmed) {
            this.cargarItemUnassigned();
          }
        });
        
        
         return true;
       },
       (error:any) => {
         console.error('Error:' + error);
         return throwError(error);
       },
       () => console.log('HTTP request completed.')
     );
    }
    
   
  }

}
