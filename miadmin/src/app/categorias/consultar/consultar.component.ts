import { Component, OnInit } from '@angular/core';
import {Categoria} from '../../models/categoria';
import {ColumnItem} from '../../models/columnItem';
import Swal from 'sweetalert2'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { CategoriaService } from '../../services/categoria.service';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  searchValue = '';
  visible = false;
  categoriaForm:FormGroup;
  isModalCategoryVisible = false;
  isModalCategoryOkLoading = false;

  listOfColumns: ColumnItem[] = [
    {
      name: 'Categoría',
      sortOrder: null,
      sortFn: (a: Categoria, b: Categoria) => a.nombre.localeCompare(b.nombre),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: Categoria) => list.some(nombre => item.nombre.indexOf(nombre) !== -1)
    },
    
  ];

  listOfData: Categoria[] = [];
  listOfDisplayData = [...this.listOfData];

  constructor(
    private _categoria: CategoriaService,
    private _subcategoria: SubcategoriaService,
    private _formBuilder: FormBuilder,

  ) {

    this.categoriaForm = this._formBuilder.group({
      categoriaNombre: ["", [Validators.maxLength(25), Validators.required]],
      remember: [true]

    });

   }

  ngOnInit(): void {
    this.cargarCategorias();
  }


  public verDetallef = (key:number) => {
    let id:number = key;
    console.log(id);
  }


  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: Categoria) => item.nombre.indexOf(this.searchValue) !== -1);
  }

  cargarCategorias(){
    this._categoria.getCategorias()
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

  public eliminarCategoria = async (key:number) => {
    Swal.fire({
      title: '¿Está seguro que desea eliminar esta categoría?',
      text: "Las subcategorías de esta categoría también se borrarán ¡No podrá deshacer esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._categoria
        .deleteCategoria(key)
        .pipe(
         catchError((err) => {
           Swal.close();
           Swal.fire(
             "Ha ocurrido un error inesperado al eliminar esa categoría"
           );
           return throwError(err);
         })
       )
       .subscribe(
         async (resp: any) => {
          Swal.close();
          
          Swal.fire('¡Categoría eliminada exitosamente!');
          
          this.cargarCategorias();
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
         "Ha ocurrido un error inesperado al abrir esta categoría"
       );
       return throwError(err);
     })
   )
   .subscribe(
     async (resp: any) => {
      Swal.close();
      
      
      
      this.cargarCategorias();
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
            this.cargarCategorias();
          }

          if (result.isConfirmed) {
            this.cargarCategorias();
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
