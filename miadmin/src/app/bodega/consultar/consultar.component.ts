import { Component, OnInit } from '@angular/core';
import {BodegaCiudad} from '../../models/bodegaCiudad';
import {Categoria} from '../../models/categoria';

import {ColumnItem} from '../../models/columnItem';
import Swal from 'sweetalert2'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { BodegaService } from '../../services/bodega.service';
import { CategoriaService } from '../../services/categoria.service';

import { SubcategoriaService } from '../../services/subcategoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  searchValueName = '';
  searchValueDireccion = '';
  searchValueCiudad = '';

  visibleName = false;
  visibleDireccion = false;
  visibleCiudad = false;
  multiplefilter = false;

  categoriaForm:FormGroup;
  isModalCategoryVisible = false;
  isModalCategoryOkLoading = false;
  listOfMenus = ["Menu1","Menu2","Menu3"];
  listOfColumns: ColumnItem[] = [
    {
      name: 'Bodega',
      sortOrder: null,
      sortFn: (a: BodegaCiudad, b: BodegaCiudad) => a.nombre.localeCompare(b.nombre),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: BodegaCiudad) => list.some(nombre => item.nombre.indexOf(nombre) !== -1)
    },

    {
      name: 'Dirección',
      sortOrder: null,
      sortFn: (a: BodegaCiudad, b: BodegaCiudad) => a.direccion.localeCompare(b.direccion),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: BodegaCiudad) => list.some(direccion => item.direccion.indexOf(direccion) !== -1)
    },

    {
      name: 'Ciudad',
      sortOrder: null,
      sortFn: (a: BodegaCiudad, b: BodegaCiudad) => a.ciudad_name.localeCompare(b.ciudad_name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: BodegaCiudad) => list.some(ciudad_name => item.ciudad_name.indexOf(ciudad_name) !== -1)
    },
    
  ];

  listOfData: BodegaCiudad[] = [];
  listOfDisplayData = [...this.listOfData];

  constructor(
    private _bodega: BodegaService,
    private _subcategoria: SubcategoriaService,
    private _formBuilder: FormBuilder,
    private _categoria:CategoriaService,

  ) {

    this.categoriaForm = this._formBuilder.group({
      categoriaNombre: ["", [Validators.maxLength(25), Validators.required]],
      remember: [true]

    });

   }

  ngOnInit(): void {
    this.cargarBodegas();
  }


  public verDetallef = (key:number) => {
    let id:number = key;
    console.log(id);
  }


  resetName(): void {
    this.searchValueName = '';
    this.multiplefilter = false;
    this.searchName();
  }

  resetAddress(): void {
    this.searchValueDireccion = '';
    this.multiplefilter = false;
    this.searchAddress();
  }

  resetCity(): void {
    this.searchValueCiudad = '';
    this.multiplefilter = false;
    this.searchCity();
  }

  searchName(): void {
    this.visibleName = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: BodegaCiudad) => item.nombre.indexOf(this.searchValueName) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: BodegaCiudad) => item.nombre.indexOf(this.searchValueName) !== -1);
    }
    this.multiplefilter = true;
  }

  searchAddress(): void {
    this.visibleDireccion = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: BodegaCiudad) => item.direccion.indexOf(this.searchValueDireccion) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: BodegaCiudad) => item.direccion.indexOf(this.searchValueDireccion) !== -1);
    }
    this.multiplefilter = true;
  }

  searchCity(): void {
    this.visibleCiudad = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: BodegaCiudad) => item.ciudad_name.indexOf(this.searchValueCiudad) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: BodegaCiudad) => item.ciudad_name.indexOf(this.searchValueCiudad) !== -1);
    }
    this.multiplefilter = true;
  }

  cargarBodegas(){
    this._bodega.getBodegas()
    .subscribe((resp:any)=>{
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

  public eliminarBodega = async (key:number) => {
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
  
   }


   public verDetalle = async (key:number) => {
      
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
            this.cargarBodegas();
          }

          if (result.isConfirmed) {
            this.cargarBodegas();
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

}
