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
    this.cargarItemUnassigned()  }


  public verDetallef = (key:number) => {
    let id:number = key;
    console.log(id);
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
      this.listOfDisplayData = this.listOfDisplayData.filter((item: Item) => item.titulo.indexOf(this.searchValueTitulo) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: Item) => item.titulo.indexOf(this.searchValueTitulo) !== -1);
    }
    this.multiplefilter = true;
  }

  searchDescripcion(): void {
    this.visibleDescripcion = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: Item) => item.descripcion.indexOf(this.searchValueDescripcion) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: Item) => item.descripcion.indexOf(this.searchValueDescripcion) !== -1);
    }
    this.multiplefilter = true;
  }

  searchCantidad(): void {
    this.visibleCantidad = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: Item) => item.entrega.indexOf(this.searchValueCantidad) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: Item) => item.entrega.indexOf(this.searchValueCantidad) !== -1);
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

  /*public eliminarBodega = async (key:number) => {
    Swal.fire({
      title: '¿Está seguro que desea eliminar esta bodega?',
      text: "¡No podrá deshacer esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._bodega
        .deleteBodega(key)
        .pipe(
         catchError((err) => {
           Swal.close();
           Swal.fire(
             "Ha ocurrido un error inesperado al eliminar esa bodega"
           );
           return throwError(err);
         })
       )
       .subscribe(
         async (resp: any) => {
          Swal.close();
          
          Swal.fire('Bodega eliminada exitosamente!');
          
          this.cargarBodegas();
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
  
   }*/


   /*public verDetalle = async (key:number) => {
      
    this._subcategoria
    .getSubcategorias(key)
    .pipe(
     catchError((err) => {
       Swal.close();
       Swal.fire(
         "Ha ocurrido un error inesperado al abrir esta bodega"
       );
       return throwError(err);
     })
   )
   .subscribe(
     async (resp: any) => {
      Swal.close();
      
      
      
      this.cargarBodegas();
       return true;
     },
     (error:any) => {
       console.error('Error:' + error);
       return throwError(error);
     },
     () => console.log('HTTP request completed.')
   );
   }*/

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

  //Metodo que permite manejar cuando se da OK al boton del modal
  handleOk(): void {
    this.isModalCategoryOkLoading = true;
    const formData = new FormData();
    formData.append('nombre',this.categoriaForm.value.categoriaNombre);


      this._categoria
      .crearCategoria(formData)
      .pipe(
       catchError((err) => {
         Swal.close();
         Swal.fire(
           "Ha ocurrido un error inesperado al crear esa Categoría"
         );
         return throwError(err);
       })
     )
     .subscribe(
       async (resp: any) => {
        this.isModalCategoryVisible = false;
        this.isModalCategoryOkLoading = false;

        this.categoriaForm.patchValue({
          categoriaNombre: "",
        });
        
        this.categoriaForm.reset();
        for (const key in this.categoriaForm.controls) {
          if (this.categoriaForm.controls.hasOwnProperty(key)) {
            this.categoriaForm.controls[key].markAsPristine();
            this.categoriaForm.controls[key].updateValueAndValidity();
          }
        }
        Swal.close();
        
        Swal.fire({
          title:'¡Categoría creada exitosamente!'})
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

  //Metodo que permite manejar cuando el modal de la subcategoria se cierra 
  handleCancel(): void {
    this.isModalCategoryVisible = false;
    this.categoriaForm.patchValue({
      categoriaNombre: "",
    });

    this.categoriaForm.reset();
    for (const key in this.categoriaForm.controls) {
      if (this.categoriaForm.controls.hasOwnProperty(key)) {
        this.categoriaForm.controls[key].markAsPristine();
        this.categoriaForm.controls[key].updateValueAndValidity();
      }
    }
  
  }

  asignarse(key:number): void 
  {
    const formData = new FormData();
    let admin_id = ''
    admin_id = JSON.parse(localStorage.getItem('user')|| '{}').user_id; 
    formData.append('item', key as any as string);
    formData.append('admin',  admin_id);



    
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
