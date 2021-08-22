import { Component, OnInit } from '@angular/core';
import {Categoria} from '../../models/categoria';
import {Item} from '../../models/items';
import {ItemEstado} from '../../models/itemsEstado';

import {ColumnItem} from '../../models/columnItem';
import Swal from 'sweetalert2'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { CategoriaService } from '../../services/categoria.service';
import { ItemsService } from '../../services/items.service';
import { BodegaService } from '../../services/bodega.service';

import { SubcategoriaService } from '../../services/subcategoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-misitems',
  templateUrl: './misitems.component.html',
  styleUrls: ['./misitems.component.css']
})
export class MisitemsComponent implements OnInit {

  searchValueTitulo = '';
  searchValueDescripcion = '';
  searchValueEntrega = '';
  searchValueEstado = '';
  searchValueFechaActualizacion = '';

  porEvaluar="por evaluar";
  
  visibleTitulo = false;
  visibleDescripcion = false;
  visibleEntrega = false;
  visibleEstado = false;
  visibleFechaActualizacion = false;

  multiplefilter = false;

  categoriaForm:FormGroup;
  isModalCategoryVisible = false;
  isModalCategoryOkLoading = false;
  admin_id:number = 0;
  listOfColumns: ColumnItem[] = [
    {
      name: 'Título',
      sortOrder: null,
      sortFn: (a: ItemEstado, b: ItemEstado) => a.titulo.localeCompare(b.titulo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: ItemEstado) => list.some(titulo => item.titulo.indexOf(titulo) !== -1)
    },

    {
      name: 'Descripción',
      sortOrder: null,
      sortFn: (a: ItemEstado, b: ItemEstado) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: ItemEstado) => list.some(descripcion => item.descripcion.indexOf(descripcion) !== -1)
    },

    {
      name: 'Modo de Entrega',
      sortOrder: null,
      sortFn: (a: ItemEstado, b: ItemEstado) => a.entrega.localeCompare(b.entrega),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: ItemEstado) => list.some(entrega => item.entrega.indexOf(entrega) !== -1)
    },

    {
      name: 'Estado',
      sortOrder: null,
      sortFn: (a: ItemEstado, b: ItemEstado) => a.estado_name.localeCompare(b.estado_name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: ItemEstado) => list.some(estado_name => item.estado_name.indexOf(estado_name) !== -1)
    },

    {
      name: 'Fecha de actualización del estado',
      sortOrder: null,
      sortFn: (a: ItemEstado, b: ItemEstado) => a.estado_date_updated.localeCompare(b.estado_date_updated),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: ItemEstado) => list.some(estado_date_updated => item.estado_date_updated.indexOf(estado_date_updated) !== -1)
    },
    
    
  ];

  listOfData: ItemEstado[] = [];
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
    this.admin_id = JSON.parse(localStorage.getItem('user')|| '{}').user_id; 
    this.cargarItemAssigned()  

  }


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

  resetEntrega(): void {
    this.searchValueEntrega = '';
    this.multiplefilter = false;
    this.searchEntrega();
  }

  resetEstado(): void {
    this.searchValueEstado = '';
    this.multiplefilter = false;
    this.searchEstado();
  }

  resetFechaActualizacion(): void {
    this.searchValueFechaActualizacion = '';
    this.multiplefilter = false;
    this.searchFechaActualizacion();
  }

  searchTitulo(): void {
    this.visibleTitulo = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: ItemEstado) => item.titulo.toLowerCase().indexOf(this.searchValueTitulo.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: ItemEstado) => item.titulo.toLowerCase().indexOf(this.searchValueTitulo.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  searchDescripcion(): void {
    this.visibleDescripcion = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: ItemEstado) => item.descripcion.toLowerCase().indexOf(this.searchValueDescripcion.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: ItemEstado) => item.descripcion.toLowerCase().indexOf(this.searchValueDescripcion.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  searchEntrega(): void {
    this.visibleEntrega = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: ItemEstado) => item.entrega.toLowerCase().indexOf(this.searchValueEntrega.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: ItemEstado) => item.entrega.toLowerCase().indexOf(this.searchValueEntrega.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  searchEstado(): void {
    this.visibleEstado = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: ItemEstado) => item.estado_name.toLowerCase().indexOf(this.searchValueEstado.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: ItemEstado) => item.estado_name.toLowerCase().indexOf(this.searchValueEstado.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  searchFechaActualizacion(): void {
    this.visibleFechaActualizacion = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: ItemEstado) => item.estado_date_updated.toLowerCase().indexOf(this.searchValueFechaActualizacion.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: ItemEstado) => item.estado_date_updated.toLowerCase().indexOf(this.searchValueFechaActualizacion.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  cargarItemAssigned(){

    this._itemsService.getItemAssigned(this.admin_id)
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
           this.cargarItemAssigned();
          }

          if (result.isConfirmed) {
            this.cargarItemAssigned();
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
            this.cargarItemAssigned();
          }

          if (result.isConfirmed) {
            this.cargarItemAssigned();
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
