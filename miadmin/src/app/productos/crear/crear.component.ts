import { Component, OnInit } from '@angular/core';
import {Categoria} from '../../models/categoria';
import {Item} from '../../models/items';

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
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  searchValueTitulo = '';
  searchValueDescripcion = '';
  searchValueCantidad = '';

  visibleTitulo = false;
  visibleDescripcion = false;
  visibleCantidad= false;
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
      name: 'Cantidad',
      sortOrder: null,
      sortFn: (a: Item, b: Item) => a.cantidad.toString().localeCompare(b.cantidad.toString()),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: Item) => list.some(cantidad => item.cantidad.toString().indexOf(cantidad.toString()) !== -1)
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

  ) {

    this.categoriaForm = this._formBuilder.group({
      categoriaNombre: ["", [Validators.maxLength(25), Validators.required]],
      remember: [true]

    });

   }

  ngOnInit(): void {
    this.cargarItemUnassigned() 

   
     
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

  resetCantidad(): void {
    this.searchValueCantidad = '';
    this.multiplefilter = false;
    this.searchCantidad();
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

  searchCantidad(): void {
    this.visibleCantidad = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: Item) => item.entrega.toLowerCase().indexOf(this.searchValueCantidad.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: Item) => item.entrega.toLowerCase().indexOf(this.searchValueCantidad.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  cargarItemUnassigned(){
    this._itemsService.getItemsUserAccepted()
    .subscribe((resp:any)=>{
      console.log(resp);
      this.listOfData = [];
      for (var i =0; i < resp.length; i++){       
        console.log(resp[i])
        this.listOfData.push(resp[i]);        
      }
      
      this.listOfData = [... this.listOfData];
      this.listOfDisplayData = [...this.listOfData];
      

    }
      )
      
  }
 
}
