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
import { CiudadService } from '../../services/ciudad.service';
import { BodegaService } from '../../services/bodega.service';
import { ImagenProductoService } from '../../services/imagen-producto.service';

import { BodegaCiudad } from 'src/app/models/bodegaCiudad';
import { Ciudad } from 'src/app/models/ciudad';
import { Item } from 'src/app/models/items';
import {  Categoria } from 'src/app/models/categoria';
import { NzUploadFile } from 'ng-zorro-antd/upload';

import { ItemsService } from 'src/app/services/items.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-product-form',
  templateUrl: './crear-product-form.component.html',
  styleUrls: ['./crear-product-form.component.css']
})
export class CrearProductFormComponent implements OnInit {


  
  productoForm:FormGroup;
  listOfBodegas: Ciudad[] = [];
  mensajeSubcategoria: string = "Por favor escoja primero una categoría";
  mensajeSinSubcategoria: string = "Esa categoría no tiene subcategorías";

  conSubcategoria: boolean = true;
  categoriaElegida:boolean = false;
  //{id:0, nombre:"Por favor escoja primero una categoría"}
  listOfSubCategorias:SubCategoria []=[];
  listOfCategorias:Categoria[] = [];
  idItem:number = 0;
  selected:number[] = [];
  idCiudad:number = 1;
  itemInicial:Item = new Item(0,"","",0,"",0,"",0,0);


  //@ViewChild('myselect') myselect: ElementRef<any>;

    
  fileList: NzUploadFile[] = [];
  uploading = false;
  
  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
  
  constructor(
    private _formBuilder: FormBuilder,
    private _ciudad: CiudadService,
    private _bodega: BodegaService, 
    public _router: Router,
    private _route: ActivatedRoute,
    private _item: ItemsService,
    private _producto: ProductoService,
    private _categoria: CategoriaService,
    private _subcategoria:SubcategoriaService,
    private _imagenProducto:ImagenProductoService,

  ) {
    this.productoForm = this._formBuilder.group({
      nombre: ["", [Validators.maxLength(50), Validators.required]],
      descripcion: ["", [Validators.maxLength(200), Validators.required]],
      categoria: ["", [Validators.maxLength(25), Validators.required]],
      subcategoria: ["", [Validators.maxLength(30), Validators.required]],
      peso: ["", [Validators.maxLength(8), Validators.required]],
      dimensiones: ["", [Validators.maxLength(200), Validators.required]],
      material: ["", [Validators.maxLength(100), Validators.required]],
      precio: ["", [Validators.maxLength(8), Validators.required]],
      bodega: ["", [Validators.maxLength(100), Validators.required]],

      remember: [true]

    });
  }

  ngOnInit(): void {

    this._route.queryParams.subscribe(
      params => {
        this.idItem =  params['id'];
      }
    )
    this.cargarBodegas();
    this.cargarItem(this.idItem);
    this.cargarCategorias();
    
  }

  submitForm():void
   {
    for (const i in this.productoForm.controls) {
      if (this.productoForm.controls.hasOwnProperty(i)) {
        this.productoForm.controls[i].markAsDirty();
        this.productoForm.controls[i].updateValueAndValidity();
      }
    }
   }

   

  private async cargarItem(id:number){
    await this._item.getItem(id)
    .subscribe( (resp:any) => {
      this.itemInicial.id = resp.id ;
      this.itemInicial.titulo = resp.titulo ;
      this.itemInicial.descripcion = resp.descripcion ;
      this.itemInicial.cantidad = resp.cantidad ;
      this.itemInicial.entrega = resp.entrega ;
      this.itemInicial.creditos = resp.creditos ;
      this.itemInicial.thumbnail = resp.thumbnail ;
      this.itemInicial.estado = resp.estado ;
      this.itemInicial.propietario = resp.propietario ;
      
    }
      )
      
  }


   public crearProducto()
   {
    const formData = new FormData();
    //formData.append('estado', '0');
    formData.append('item', this.idItem as any as string);
    formData.append('subcategoria',this.productoForm.value.subcategoria);
    formData.append('categoria',this.productoForm.value.categoria);
    formData.append('peso',this.productoForm.value.peso);
    formData.append('precio',this.productoForm.value.precio);
    formData.append('descripcion',this.productoForm.value.descripcion);
    formData.append('dimensiones',this.productoForm.value.dimensiones);
    formData.append('material',this.productoForm.value.material);
    //formData.append('disponible','True');
    formData.append('titulo',this.productoForm.value.nombre);
    //formData.append('bodega',this.productoForm.value.bodega);


    console.log(this.productoForm.value.categoria);
    console.log(this.productoForm.value.subcategoria);
    console.log(this.idItem);

    
  
    this._producto
       .crearProducto(formData)
       .catch(error => {
          Swal.close();
          Swal.fire(
          "Ha ocurrido un error al crear este producto"
          );
          return throwError(error);
      })
       .then(async (producto:any) => {
        
        if(producto)
        {
          this.addImageItem(producto.id)
            .then(img => {
             /* Swal.close();
              this.openSnackBar('El ítem se ha creado con éxito.', 'Cerrar');
              this.itemForm.patchValue({
                nombre: '',
                descripcion: '',
                entrega: null,
              });
              for (let control in this.itemForm.controls) {
                this.itemForm.controls[control].setErrors(null);
              }
              this.fileList = [];*/
            }
            )
            .catch(error => {
              console.log(error);
            })
        }
         
                  
        },
        (error:any) => {
          console.error('Error:' + error);
          return throwError(error);
        },
       
      );
      

   }

   cargarBodegas(){
    this._bodega.getBodegas()
    .subscribe((resp:any)=>{
      this.listOfBodegas = [];
      for (var i =0; i < resp.length; i++){       
        console.log(resp[i])
        this.listOfBodegas.push(resp[i]);        
      }
    }
    )
      
  }

  cargarCategorias(){
    this._categoria.getCategorias()
    .subscribe((resp:any)=>{
      this.listOfCategorias = [];
      for (var i =0; i < resp.length; i++){       
        console.log(resp[i])
        this.listOfCategorias.push(resp[i]);        
      }
    }
    )
      
  }

  cargarSubCategorias(categoriaKey:number){
    this._subcategoria.getSubcategorias(categoriaKey)
    .subscribe((resp:any)=>{
      this.listOfSubCategorias = [];
      for (var i =0; i < resp.length; i++){       
        this.listOfSubCategorias.push(resp[i]);        
      }

      console.log(this.listOfSubCategorias.length == 0)
      if(this.listOfSubCategorias.length == 0){
        this.productoForm.get('subcategoria')!.clearValidators();
        this.productoForm.get('subcategoria')!.updateValueAndValidity();
        this.conSubcategoria = false;
      
      }
      else
      {
        this.productoForm.get('subcategoria')!.setValidators([Validators.required, Validators.maxLength(30)]);
        this.productoForm.get('subcategoria')!.updateValueAndValidity();
        this.conSubcategoria = true;

      }

    

      console.log(this.productoForm.value.subcategoria);
    }
    )
      
  }


  onChangeCategory(value: any): void {
  

    if (value[0] !== undefined){
      console.log(this.productoForm.value.subcategoria);
      this.categoriaElegida = true;
      this.productoForm.get('subcategoria')!.reset();
      this.cargarSubCategorias(value[0]);
    }
  }

  addImageItem(idProducto: string): Promise<any>{
    
    this.uploading = true;
    const imagesList:any[] = [];
    this.fileList.forEach((element: any) =>
    {
      imagesList.push(
        {
          imagen: element.thumbUrl,
          name: element.name,
          producto: idProducto
        }
      )

    })

    console.log(imagesList);
    
    return this._imagenProducto.createImagenProducto({imagesList})
  }

  /*addEstado(): Promise<any>{
    const estado = new FormData();

    estado.append('estado', 'Por evaluar');

    return this.estado.createEstado(estado)
  }


  addItem(form: any): Promise<any>{
    const item = new FormData();

    item.append('titulo',form.nombre);
    item.append('descripcion',form.descripcion);
    item.append('cantidad', form.cantidad);
    item.append('propietario', this.usuario.getCurrentUserId());
    item.append('entrega',form.entrega);
    item.append('estado', idEstado);

    return this._producto.crearProducto(item);
  }*/

   
}
