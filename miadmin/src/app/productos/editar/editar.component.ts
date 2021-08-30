import { Component, OnInit } from '@angular/core';
import {SubCategoria} from '../../models/subcategoria';
import {ColumnItem} from '../../models/columnItem';
import Swal from 'sweetalert2'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import URL_SERVICIOS from 'src/app/config/config';
import {Observable,of, from } from 'rxjs';

import { CategoriaService } from '../../services/categoria.service';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { CiudadService } from '../../services/ciudad.service';
import { BodegaService } from '../../services/bodega.service';
import { BodegaItemService } from '../../services/bodega-item.service';

import { ImagenProductoService } from '../../services/imagen-producto.service';

import { BodegaCiudad } from 'src/app/models/bodegaCiudad';
import { Ciudad } from 'src/app/models/ciudad';
import { Item } from 'src/app/models/items';
import { Producto } from 'src/app/models/producto';

import {  Categoria } from 'src/app/models/categoria';
import {  ProductoImagen } from 'src/app/models/productoImagen';

import { NzUploadFile } from 'ng-zorro-antd/upload';

import { ItemsService } from 'src/app/services/items.service';
import { ProductoService } from 'src/app/services/producto.service';
import { BodegaProductoService } from 'src/app/services/bodega-producto.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {


  
  productoForm:FormGroup;
  listOfBodegas: Ciudad[] = [];
  mensajeSubcategoria: string = "Por favor escoja primero una categoría";
  mensajeSinSubcategoria: string = "Esa categoría no tiene subcategorías";

  conSubcategoria: boolean = true;
  categoriaElegida:boolean = true;
  //{id:0, nombre:"Por favor escoja primero una categoría"}
  listOfSubCategorias:SubCategoria []=[];
  listOfCategorias:Categoria[] = [];
  idProducto:number = 0;
  selected:number[] = [];
  idCiudad:number = 1;
  productoInicial:Producto = new Producto(0,0,0,0,0,0,0,"","","",true,"","",0,0,true,"","","");
  listOfProductoImages: ProductoImagen[] = [];
  url_backend: string = URL_SERVICIOS.url_static;


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
    private _bodegaProducto:BodegaProductoService,
    
  ) {
    this.productoForm = this._formBuilder.group({
      nombre: ["", [Validators.maxLength(50), Validators.required]],
      descripcion: ["", [Validators.maxLength(200), Validators.required]],
      categoria: ["", [Validators.maxLength(25), Validators.required]],
      subcategoria: ["", [Validators.maxLength(30), Validators.required]],
      peso: ["", [ Validators.required, Validators.pattern("^[0-9]{1,6}([.|,][0-9][0-9]?)?$")]],
      dimensiones: ["", [Validators.maxLength(200), Validators.required]],
      material: ["", [Validators.maxLength(100), Validators.required]],
      precio: ["", [ Validators.required, Validators.pattern("^[0-9]{1,6}([.|,][0-9][0-9]?)?$")]],
      bodega: ["", [Validators.maxLength(100), Validators.required]],

      remember: [true]

    });
  }

  ngOnInit(): void {

    this._route.queryParams.subscribe(
      params => {
        this.idProducto =  params['id'];
      }
    )
    this.cargarBodegas();
    this.cargarProducto(this.idProducto);
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

   

  private async cargarProducto(id:number){
    await this._producto.getProductCategoriaSubcategoria(id)
    .subscribe( (resp:any) => {
      console.log(resp)

      this.productoInicial.id = resp.id ;
      this.productoInicial.estado = resp.estado ;
      this.productoInicial.item = resp.item ;
      this.productoInicial.subcategoria = resp.subcategoria.id ;
      this.productoInicial.categoria = resp.categoria.id ;
      this.productoInicial.peso = resp.peso ;
      this.productoInicial.precio = resp.precio ;
      this.productoInicial.descripcion = resp.descripcion ;
      this.productoInicial.dimensiones = resp.dimensiones ;
      this.productoInicial.material = resp.material ;
      this.productoInicial.disponible = resp.disponible ;
      this.productoInicial.titulo = resp.titulo ;
      this.productoInicial.thumbnail = resp.thumbnail ;
      this.productoInicial.cantidad = resp.cantidad ;
      this.productoInicial.bodega = resp.bodega.id ;
      this.productoInicial.is_active = resp.is_active ;
      this.productoInicial.subcategoria_name = resp.subcategoria.nombre ;
      this.productoInicial.categoria_name = resp.categoria.nombre ;
      this.productoInicial.bodega_name = resp.bodega.nombre ;

      this.productoForm.patchValue({
        nombre: this.productoInicial.titulo,
        descripcion:  this.productoInicial.descripcion,
        //categoria:  this.productoInicial.categoria,
        ///subcategoria: this.productoInicial.subcategoria,
        peso: this.productoInicial.peso,
        dimensiones: this.productoInicial.dimensiones,
        material: this.productoInicial.material,
        precio: this.productoInicial.precio,
        //bodega: this.productoInicial.bodega,
        //ciudad: this.bodegaCiudad.ciudad
      })

      this.cargarSubCategorias( this.productoInicial.categoria);
      this.cargarProductoImagenes(id);
    }
      )
      
  }


   public crearProducto()
   {
    const formData = new FormData();
    //formData.append('estado', '0');
    formData.append('item', this.idProducto as any as string);
    formData.append('subcategoria',this.productoForm.value.subcategoria);
    formData.append('categoria',this.productoForm.value.categoria);
    formData.append('peso',this.productoForm.value.peso);
    formData.append('precio',this.productoForm.value.precio);
    formData.append('descripcion',this.productoForm.value.descripcion);
    formData.append('dimensiones',this.productoForm.value.dimensiones);
    formData.append('material',this.productoForm.value.material);
    //formData.append('estado',this.itemInicial.estado as any as string);
    //formData.append('cantidad',this.itemInicial.cantidad as any as string)
    console.log(this.productoForm.value.bodega);
    formData.append('bodega',this.productoForm.value.bodega);

    //formData.append('disponible','True');
    formData.append('titulo',this.productoForm.value.nombre);
    //formData.append('bodega',this.productoForm.value.bodega);


    console.log(this.productoForm.value.categoria);
    console.log(this.productoForm.value.subcategoria);
    console.log(this.idProducto);

    
  
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
  
            Swal.fire({
              title:'El producto se ha creado con éxito.'})
              .then((result) => {
              if (result.dismiss === Swal.DismissReason.backdrop) {
                this._router.navigate(['/inicio/productos/crear']);
   
              }
   
              if (result.isConfirmed) {
                this._router.navigate(['/inicio/productos/crear']);
   
              }
            });
           
            this.productoForm.patchValue({
              nombre: '',
              descripcion: '',
              categoria: '',
              subcategoria: '',
              peso: '',
              dimensiones: '',
              material: '',
              precio: '',
              bodega: '',
            });
  
            for (let control in this.productoForm.controls) {
              this.productoForm.controls[control].setErrors(null);
            }
            this.fileList = [];
  
            return true;
           
          }
          )
          .catch(error => {
            console.log(error);
          })        }
         
                  
        },
        (error:any) => {
          console.error('Error:' + error);
          return throwError(error);
        },
       
      );
      

   }

   cargarBodegas(){
    this._bodega.getActiveBodegas()
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

  onChangeCreditos(value: any): void {

    /*if (value[0] !== undefined){
      console.log(value);
     
      if((value as any as string).indexOf('.') == -1){
        this.productoForm.get('peso')!.setValidators([Validators.required, Validators.maxLength(6), Validators.pattern("^\d{0,5}(\d\.\d?|\.\d)?\d?$")]);
        this.productoForm.get('peso')!.updateValueAndValidity();
      
      }
      else
      {
        this.productoForm.get('peso')!.setValidators([Validators.required, Validators.maxLength(9), Validators.pattern("^\d{0,5}(\d\.\d?|\.\d)?\d?$")]);
        this.productoForm.get('peso')!.updateValueAndValidity();

      }
    }*/
  }

  onChangePeso(value: any): void {

    /*if (value[0] !== undefined){
      console.log(value);
      console.log(value[0]);

      if((value as any as string).indexOf('.') == -1){
        this.productoForm.get('peso')!.setValidators([Validators.required, Validators.maxLength(6), Validators.pattern("^\d{0,5}(\d\.\d?|\.\d)?\d?$")]);
        this.productoForm.get('peso')!.updateValueAndValidity();
      
      }
      else
      {
      
        this.productoForm.get('peso')!.setValidators([Validators.required, Validators.maxLength(9), Validators.pattern("^\d{0,5}(\d\.\d?|\.\d)?\d?$")]);
        this.productoForm.get('peso')!.updateValueAndValidity();

      }
    }*/
  }

  onChangeCategory(value: any): void {
    

    if (value[0] !== undefined && value != "categoriaOriginalValue"){
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
      if(isNaN(Number(element.uid)) || element.uid >= this.listOfProductoImages.length 
      || this.listOfProductoImages[element.uid] == undefined || this.listOfProductoImages[element.uid].imagen == undefined
      || this.listOfProductoImages[element.uid].imagen.split('/')[3] == undefined
      || this.listOfProductoImages[element.uid].imagen.split('/')[3] != element.name  )
      {
          console.log("Im in")
          imagesList.push(
            {
              imagen: element.thumbUrl,
              name: element.name,
              producto: idProducto
            }
          )
      }
      

    })

    console.log(imagesList);
    
    return this._imagenProducto.createImagenProducto({imagesList})
  }


  private async cargarProductoImagenes(id:number){
    this._producto.getProductoImagenes(id)
    .pipe(
      catchError((err) => {
        Swal.close();
        Swal.fire(
          "Ha ocurrido un error  al cargar las imágenes del producto"
        );
        return throwError(err);
      })
    )
    .subscribe((resp:any)=>{
      this.listOfProductoImages = [];
      for (var i =0; i < resp.length; i++){       
        console.log(resp[i])
        this.listOfProductoImages.push(resp[i]);     
        
        this.beforeUpload({
          uid: i  as any as string,
          name: resp[i].imagen.split('/')[3],
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: this.url_backend + resp[i].imagen
        });
        
     
      }
      console.log(this.listOfProductoImages)
      console.log(this.fileList)
    }
    )
      
  }

  public actualizarProducto()
   {

    //Estos operadores ternarios lo que hacen es que miran si el valor original a cambiado (un string por defecto que se le coloco) y devuelve una respuesta en funcion de eso
    //Los valores originales no se pueden obtener como valores directamente del comboBox, por eso se lo debe hacer de esta forma
    let subcategoriaFinal = (this.productoForm.value.subcategoria == "subcategoriaOriginalValue")? this.productoInicial.subcategoria as any as string: this.productoForm.value.subcategoria;
    let categoriaFinal = (this.productoForm.value.categoria == "categoriaOriginalValue")? this.productoInicial.categoria as any as string: this.productoForm.value.categoria;
    let bodegaFinal = (this.productoForm.value.bodega == "bodegaOriginalValue")? this.productoInicial.bodega as any as string: this.productoForm.value.bodega;

    console.log(subcategoriaFinal)
    console.log(categoriaFinal)
    console.log(bodegaFinal)

    const formData = new FormData();
    //formData.append('estado', '0');
    formData.append('subcategoria',subcategoriaFinal);
    formData.append('categoria',categoriaFinal);
    formData.append('peso',this.productoForm.value.peso);
    formData.append('precio',this.productoForm.value.precio);
    formData.append('descripcion',this.productoForm.value.descripcion);
    formData.append('dimensiones',this.productoForm.value.dimensiones);
    formData.append('material',this.productoForm.value.material);
    //formData.append('estado',this.itemInicial.estado as any as string);
    //formData.append('cantidad',this.itemInicial.cantidad as any as string);
    formData.append('bodega',bodegaFinal);

    //formData.append('disponible','True');
    formData.append('titulo',this.productoForm.value.nombre);
    //formData.append('bodega',this.productoForm.value.bodega);

  
    this._producto
       .actualizarProducto(formData,this.productoInicial.id)
       .pipe(
        catchError((err) => {
          Swal.close();
          Swal.fire(
            "Ha ocurrido un error al actualizar este producto"
          );
          return throwError(err);
        })
      )
      .subscribe(
        async (resp: any) => {  
          
          this.addImageItem(this.productoInicial.id as any as string)
          .then(img => {
  
            
            /*this.listOfProductoImages.forEach((element: any) =>
            {
              this._producto
              .deleteIndividualImagesOfProduct(element.id)
        
            })*/

           
            console.log(resp);
            Swal.fire({
              title:'¡Producto editado exitosamente!'})
              .then((result) => {
              if (result.dismiss === Swal.DismissReason.backdrop) {
                this._router.navigate(['/inicio/productos/consultar']);
              }
  
              if (result.isConfirmed) {
                this._router.navigate(['/inicio/productos/consultar']);
              }
            });
           
            this.productoForm.patchValue({
              nombre: '',
              descripcion: '',
              categoria: '',
              subcategoria: '',
              peso: '',
              dimensiones: '',
              material: '',
              precio: '',
              bodega: '',
            });
  
            for (let control in this.productoForm.controls) {
              this.productoForm.controls[control].setErrors(null);
            }
            this.fileList = [];
  
            return true;
           
          }
          )
      

          return true;
        },
        (error:any) => {
          console.error('Error:' + error);
          return throwError(error);
        },
        () => console.log('HTTP request completed.')
      );
      

   }

  handleRemove = (file: any) =>  {

   

      /*await Swal.fire({
      title: "¿Está seguro que desea eliminar esta imagen?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6144ff',
      cancelButtonColor: '#d33',
      confirmButtonText: "Eliminar",
      cancelButtonText: 'Cancelar',

    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Holi22")

        if(!isNaN(Number(file.uid)) && file.uid < this.listOfProductoImages.length 
        && this.listOfProductoImages[file.uid] != undefined && this.listOfProductoImages[file.uid].id != undefined  )
        {
          console.log("Holi")
            this._producto
          .deleteIndividualImagesOfProduct(this.listOfProductoImages[file.uid].id)
          .pipe(
          catchError((err) => {
            Swal.close();
            Swal.fire(
              "Ha ocurrido un error al eliminar esta imagen"
            );
            return throwError(err);
          })
        )
        .subscribe(
          async (resp: any) => {
           // Swal.close();
            
           // Swal.fire("Imagen borrada con exito");
            
          },
          (error:any) => {
            console.error('Error:' + error);
            return throwError(error);
          },
          () => console.log('HTTP request completed.')
        );
        }
        console.log("Holi555")
        return true;
      
      }
      return true;
    });     */

    
    if(!isNaN(Number(file.uid)) && file.uid < this.listOfProductoImages.length 
    && this.listOfProductoImages[file.uid] != undefined && this.listOfProductoImages[file.uid].id != undefined  )
    {
      console.log("Holi")
        this._producto
      .deleteIndividualImagesOfProduct(this.listOfProductoImages[file.uid].id)
      .pipe(
      catchError((err) => {
        Swal.close();
        Swal.fire(
          "Ha ocurrido un error al eliminar esta imagen"
        );
        return throwError(err);
      })
    )
    .subscribe(
      async (resp: any) => {
     
        
      },
      (error:any) => {
        console.error('Error:' + error);
        return throwError(error);
      },
      () => console.log('HTTP request completed.')
    );
    }
    return true;
  
  }

 
}
