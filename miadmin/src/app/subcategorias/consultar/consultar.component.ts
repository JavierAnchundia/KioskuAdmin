import { Component, OnInit } from '@angular/core';
import {SubCategoria} from '../../models/subcategoria';
import {ColumnItem} from '../../models/columnItem';
import Swal from 'sweetalert2'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoriaService } from '../../services/categoria.service';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  
  nombreCategoria = "" ;
  searchValue = '';
  visible = false;
  idcategoria:number = 0;
  form: FormGroup;
  subCategoriaForm:FormGroup;
  subcategoriaId:number = 0

  isModalSubVisible = false;
  isModalSubOkLoading = false;

  categoriaPadre:Categoria = new Categoria(0,"");
  listOfColumns: ColumnItem[] = [
    {
      name: 'Subcategoría',
      sortOrder: null,
      sortFn: (a: SubCategoria, b: SubCategoria) => a.nombre.localeCompare(b.nombre),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: SubCategoria) => list.some(nombre => item.nombre.indexOf(nombre) !== -1)
    },
    
  ];

  listOfData: SubCategoria[] = [];
  listOfDisplayData = [...this.listOfData];

  constructor(
    private _subcategoria: SubcategoriaService,
    private _route: ActivatedRoute,
    private _categoria:CategoriaService,
    public _router: Router,
    private _formBuilder: FormBuilder,
  ) {

    this.form = this._formBuilder.group({
      nombre: ["", [Validators.maxLength(25), Validators.required]],
      remember: [true]

    });

    this.subCategoriaForm = this._formBuilder.group({
      subcategoriaNombre: ["", [Validators.maxLength(30), Validators.required]],
      remember: [true]

    });

   }

  ngOnInit(): void {

    this._route.queryParams.subscribe(
      params => {
        this.idcategoria =  params['id'];
      }
    )
    this.cargarCategoria(this.idcategoria);
    this.cargarSubcategorias(this.idcategoria);
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
    this.listOfDisplayData = this.listOfData.filter((item: SubCategoria) => item.nombre.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
  }

  private cargarSubcategorias(id:number){
    this._subcategoria.getSubcategorias(id)
    .subscribe((resp:any)=>{
      this.listOfData = [];
      for (var i =0; i < resp.length; i++){       
        this.listOfData.push(resp[i]);        
      }
      
      this.listOfData = [... this.listOfData];
      this.listOfDisplayData = [...this.listOfData];
      //this.nombreCategoria = this.categoriaPadre.nombre;


    }
      )
      
  }

  private cargarCategoria(id:number){
    this._categoria.getCategoria(id)
    .subscribe((resp:any)=>{
      this.categoriaPadre.id = resp.id ;
      this.categoriaPadre.nombre = resp.nombre ;
      this.form.patchValue({
        nombre: this.categoriaPadre.nombre,
      })
    }
      )
      
  }

  public eliminarSubcategoria = async (key:number) => {
    
    Swal.fire({
      title: '¿Está seguro que desea eliminar esta subcategoría?',
      text: "¡No podrá deshacer esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        this._subcategoria
        .deleteSubcategoria(key)
        .pipe(
         catchError((err) => {
           Swal.close();
           Swal.fire(
             "Ha ocurrido un error inesperado al eliminar esa subcategoría"
           );
           return throwError(err);
         })
       )
       .subscribe(
         async (resp: any) => {
          Swal.close();
          
          Swal.fire('¡Subcategoría eliminada exitosamente!');
          
          this.cargarSubcategorias(this.idcategoria);
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
         "Ha ocurrido un error inesperado al eliminar esa categoría"
       );
       return throwError(err);
     })
   )
   .subscribe(
     async (resp: any) => {
      Swal.close();
          

      
      
      this.cargarSubcategorias(this.idcategoria);
       return true;
     },
     (error:any) => {
       console.error('Error:' + error);
       return throwError(error);
     },
     () => console.log('HTTP request completed.')
   );
   }

   test(){
     console.log(this.nombreCategoria);
   }


   public actualizarCategoria()
   {
    const formData = new FormData();
    formData.append('nombre',this.form.value.nombre);
    console.log(this.form.value.nombre);

    
  
    this._categoria
       .actualizarCategoria(formData,this.idcategoria)
       .pipe(
        catchError((err) => {
          Swal.close();
          Swal.fire(
            "Ha ocurrido un error  al actualizar esta categoría"
          );
          return throwError(err);
        })
      )
      .subscribe(
        async (resp: any) => {  
          console.log(resp);
          Swal.fire({
            title:'¡Categoría editada exitosamente!'})
            .then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.backdrop) {
              window.location.reload();
            }

            if (result.isConfirmed) {
              window.location.reload();
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

  //Metodo necesario para establecer las validaciones del formulario
   submitForm():void
   {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
   }

   //Metodo necesario para establecer las validaciones del formulario
   submitSubcategoriaForm():void
   {
    for (const i in this.subCategoriaForm.controls) {
      if (this.subCategoriaForm.controls.hasOwnProperty(i)) {
        this.subCategoriaForm.controls[i].markAsDirty();
        this.subCategoriaForm.controls[i].updateValueAndValidity();
      }
    }
   }

   //Metodo que permite mostrar el modal, ya sea por el boton de crear o de editar, aqui se setea la variable que le permite al metodo
   //handleOk determinar si es una creacion o una edicion
   showModal(key?:number, nombre?:string): void {
    this.isModalSubVisible = true;
    this.subcategoriaId = 0;
    if(key != null){
      this.subcategoriaId = key;
      this.subCategoriaForm.patchValue({
        subcategoriaNombre: nombre,
      });
      console.log(key)
    }
  }

  //Metodo que permite manejar cuando se da OK al boton del modal, esto puede crear o editar una subcategoria
  handleOk(): void {
    this.isModalSubOkLoading = true;
    const formData = new FormData();
    formData.append('nombre',this.subCategoriaForm.value.subcategoriaNombre);
    formData.append('categoria',this.idcategoria as any as string);


    //Si el id de la subcategoria es 0, quiere decir que esta creando una subcategoria ya que el modal se abrio desde el boton de crear.
    if(this.subcategoriaId == 0){
      this._subcategoria
      .createSubcategoria(formData)
      .pipe(
       catchError((err) => {
         Swal.close();
         Swal.fire(
           "Ha ocurrido un error inesperado al crear esa subcategoría"
         );
         return throwError(err);
       })
     )
     .subscribe(
       async (resp: any) => {
        this.isModalSubVisible = false;
        this.isModalSubOkLoading = false;
        this.subCategoriaForm.patchValue({
          subcategoriaNombre: "",
        });
        this.subCategoriaForm.reset();
        for (const key in this.subCategoriaForm.controls) {
          if (this.subCategoriaForm.controls.hasOwnProperty(key)) {
            this.subCategoriaForm.controls[key].markAsPristine();
            this.subCategoriaForm.controls[key].updateValueAndValidity();
          }
        }

        Swal.close();
        
        Swal.fire({
          title:'¡Subcategoría creada exitosamente!'})
          .then((result) => {
          if (result.dismiss === Swal.DismissReason.backdrop) {
            this.cargarSubcategorias(this.idcategoria);
          }

          if (result.isConfirmed) {
            this.cargarSubcategorias(this.idcategoria);
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

    //Si es diferente de 0, quiere decir que se abrio desde el boton de ver detalle, es decir que se esta editando una subcategoria
    else{
      this._subcategoria
      .actualizarSubcategoria(formData,this.subcategoriaId)
      .pipe(
       catchError((err) => {
         Swal.close();
         Swal.fire(
           "Ha ocurrido un error inesperado al actualizar esa subcategoría"
         );
         return throwError(err);
       })
     )
     .subscribe(
       async (resp: any) => {
        this.isModalSubVisible = false;
        this.isModalSubOkLoading = false;
        this.subCategoriaForm.patchValue({
          subcategoriaNombre: "",
        });
        this.subCategoriaForm.reset();

        for (const key in this.subCategoriaForm.controls) {
          if (this.subCategoriaForm.controls.hasOwnProperty(key)) {
            this.subCategoriaForm.controls[key].markAsPristine();
            this.subCategoriaForm.controls[key].updateValueAndValidity();
          }
        }
        
        Swal.close();
        
        Swal.fire({
          title:'¡Subcategoría actualizada exitosamente!'})
          .then((result) => {
          if (result.dismiss === Swal.DismissReason.backdrop) {
            this.cargarSubcategorias(this.idcategoria);
          }

          if (result.isConfirmed) {
            this.cargarSubcategorias(this.idcategoria);
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

  //Metodo que permite manejar cuando el modal de la subcategoria se cierra 
  handleCancel(): void {
    this.isModalSubVisible = false;
    this.subCategoriaForm.patchValue({
      subcategoriaNombre: "",
    });

    this.subCategoriaForm.reset();
    for (const key in this.subCategoriaForm.controls) {
      if (this.subCategoriaForm.controls.hasOwnProperty(key)) {
        this.subCategoriaForm.controls[key].markAsPristine();
        this.subCategoriaForm.controls[key].updateValueAndValidity();
      }
    }
  
  }
}
