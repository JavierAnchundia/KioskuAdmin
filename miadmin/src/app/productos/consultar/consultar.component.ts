import { Component, OnInit } from '@angular/core';
import {Categoria} from '../../models/categoria';
import {Item} from '../../models/items';
import {Producto} from '../../models/producto';

import {ColumnItem} from '../../models/columnItem';
import Swal from 'sweetalert2'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import URL_SERVICIOS from 'src/app/config/config';

import { CategoriaService } from '../../services/categoria.service';
import { ItemsService } from '../../services/items.service';
import { BodegaService } from '../../services/bodega.service';
import { ProductoService } from '../../services/producto.service';

import { SubcategoriaService } from '../../services/subcategoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  searchValueTitulo = '';
  searchValueDescripcion = '';
  searchValueCantidad = '';
  searchValuePrecio = '';

  visibleTitulo = false;
  visibleDescripcion = false;
  visibleCantidad= false;
  visiblePrecio= false;

  multiplefilter = false;

  categoriaForm:FormGroup;
  isModalCategoryVisible = false;
  isModalCategoryOkLoading = false;
  url_backend: string = URL_SERVICIOS.url_static;

  listOfColumns: ColumnItem[] = [
    {
      name: 'Título',
      sortOrder: null,
      sortFn: (a: Producto, b: Producto) => a.titulo.localeCompare(b.titulo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], producto: Producto) => list.some(titulo => producto.titulo.indexOf(titulo) !== -1)
    },

    {
      name: 'Descripción',
      sortOrder: null,
      sortFn: (a: Producto, b: Producto) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], producto: Producto) => list.some(descripcion => producto.descripcion.indexOf(descripcion) !== -1)
    },

    {
      name: 'Cantidad',
      sortOrder: null,
      sortFn: (a: Producto, b: Producto) => a.cantidad.toString().localeCompare(b.cantidad.toString()),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], producto: Producto) => list.some(cantidad => producto.cantidad.toString().indexOf(cantidad.toString()) !== -1)
    },

    {
      name: 'Precio (Créditos)',
      sortOrder: null,  
      sortFn: (a: Producto, b: Producto) => a.cantidad.toString().localeCompare(b.cantidad.toString()),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], producto: Producto) => list.some(precio => producto.precio.toString().indexOf(precio.toString()) !== -1)
    },

    
    
  ];

  listOfData: Producto[] = [];
  listOfDisplayData = [...this.listOfData];

  constructor(
    private _bodega: BodegaService,
    private _subcategoria: SubcategoriaService,
    private _formBuilder: FormBuilder,
    private _categoria:CategoriaService,
    private _itemsService: ItemsService,  
    private _productoService: ProductoService,  

  ) {

    this.categoriaForm = this._formBuilder.group({
      categoriaNombre: ["", [Validators.maxLength(25), Validators.required]],
      remember: [true]

    });

   }

  ngOnInit(): void {
    this.cargarTodosLosProductos() 

   
     
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

  resetPrecio(): void {
    this.searchValuePrecio = '';
    this.multiplefilter = false;
    this.searchPrecio();
  }

  searchTitulo(): void {
    this.visibleTitulo = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((producto: Producto) => producto.titulo.toLowerCase().indexOf(this.searchValueTitulo.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((producto: Producto) => producto.titulo.toLowerCase().indexOf(this.searchValueTitulo.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  searchDescripcion(): void {
    this.visibleDescripcion = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((producto: Producto) => producto.descripcion.toLowerCase().indexOf(this.searchValueDescripcion.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((producto: Producto) => producto.descripcion.toLowerCase().indexOf(this.searchValueDescripcion.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  searchCantidad(): void {
    this.visibleCantidad = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((producto: Producto) => producto.cantidad.toString().toLowerCase().indexOf(this.searchValueCantidad.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((producto: Producto) => producto.cantidad.toString().toLowerCase().indexOf(this.searchValueCantidad.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  searchPrecio(): void {
    this.visiblePrecio = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((producto: Producto) => producto.precio.toString().toLowerCase().indexOf(this.searchValuePrecio.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((producto: Producto) => producto.precio.toString().toLowerCase().indexOf(this.searchValuePrecio.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  cargarTodosLosProductos(){
    this._productoService.getAllProducts()
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

  public eliminarBodega = async (key:number, is_active:boolean) => {

    let titleSwal = is_active ? "¿Está seguro que desea eliminar este producto?" : "¿Está seguro que desea activar este producto?"
    let respuestaExitoSwal = is_active ? "¡Eliminado lógico del producto exitoso!" : "¡Activado lógico del producto exitoso!"
    let respuestaFallidaSwal = is_active ? "Ha ocurrido un error inesperado al eliminar lógicamente este producto" : "Ha ocurrido un error inesperado al activar lógicamente este producto"
    let textoBotonSwal = is_active ? "Eliminar" : "Activar"

    Swal.fire({
      title: titleSwal,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6144ff',
      cancelButtonColor: '#d33',
      confirmButtonText: textoBotonSwal,
      cancelButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {

        const formData = new FormData();
        formData.append('is_active', (!is_active) as any as string);

       

        this._productoService
        .actualizarProducto(formData,key)
        .pipe(
         catchError((err) => {
           Swal.close();
           Swal.fire(
            respuestaFallidaSwal
           );
           return throwError(err);
         })
       )
       .subscribe(
         async (resp: any) => {
          Swal.close();
          
          Swal.fire(respuestaExitoSwal);
          
          this.cargarTodosLosProductos();
           return true;
         },
         (error:any) => {
           console.error('Error:' + error);
           return throwError(error);
         },
         () => console.log('HTTP request completed.')
       );
      }
    })  
   }
 
}
