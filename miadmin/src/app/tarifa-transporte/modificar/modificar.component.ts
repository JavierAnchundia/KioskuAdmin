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
import { TarifaEntregaService } from '../../services/tarifa-entrega.service';

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
import { TarifaEntrega } from 'src/app/models/tarifaEntrega';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  
  tarifaEntregaForm:FormGroup;
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
  tarifaEntrega:TarifaEntrega = new TarifaEntrega(0,"","","");
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
    public _router: Router,
    private _route: ActivatedRoute,
    private _tarifaEntregaService:TarifaEntregaService,
    
  ) {
    this.tarifaEntregaForm = this._formBuilder.group({
      mismaCiudad: ["", [ Validators.required, Validators.pattern("^[0-9]{1,6}([.|,][0-9][0-9]?)?$")]],
      difCiudadMismaProvincia: ["", [ Validators.required, Validators.pattern("^[0-9]{1,6}([.|,][0-9][0-9]?)?$")]],
      difProvincia: ["", [ Validators.required, Validators.pattern("^[0-9]{1,6}([.|,][0-9][0-9]?)?$")]],
      remember: [true]

    });
  }

  ngOnInit(): void {

    this._route.queryParams.subscribe(
      params => {
        this.idProducto =  params['id'];
      }
    )
   
    this.cargarTarifaEntrega();
    
    
  }

  submitForm():void
   {
    for (const i in this.tarifaEntregaForm.controls) {
      if (this.tarifaEntregaForm.controls.hasOwnProperty(i)) {
        this.tarifaEntregaForm.controls[i].markAsDirty();
        this.tarifaEntregaForm.controls[i].updateValueAndValidity();
      }
    }
   }

   

  private async cargarTarifaEntrega(){
    await this._tarifaEntregaService.getTarifaEntrega()
    .subscribe( (resp:any) => {
      console.log(resp)

      this.tarifaEntrega.id = resp.id ;
      this.tarifaEntrega.mismaCiudad = resp.mismaCiudad ;
      this.tarifaEntrega.difCiudadMismaProvincia = resp.difCiudadMismaProvincia ;
      this.tarifaEntrega.difProvincia = resp.difProvincia ;
    
      this.tarifaEntregaForm.patchValue({
        mismaCiudad: this.tarifaEntrega.mismaCiudad,
        difCiudadMismaProvincia:  this.tarifaEntrega.difCiudadMismaProvincia,
        difProvincia: this.tarifaEntrega.difProvincia,
      })

    }
      )
      
  }

 

  public actualizarTarifaEntrega()
   {

   
    const formData = new FormData();
    formData.append('mismaCiudad',this.tarifaEntregaForm.value.mismaCiudad);
    formData.append('difCiudadMismaProvincia',this.tarifaEntregaForm.value.difCiudadMismaProvincia);
    formData.append('difProvincia',this.tarifaEntregaForm.value.difProvincia);
   

  
  
    this._tarifaEntregaService
       .updateTarifaEntrega(formData)
       .pipe(
        catchError((err) => {
          Swal.close();
          Swal.fire(
            "Ha ocurrido un error al actualizar las Tarifas de Entrega"
          );
          return throwError(err);
        })
      )
      .subscribe(
        async (resp: any) => {  
        
          
          Swal.fire({
            title:'¡Tarifas de entrega editadas exitosamente!'});
        
         
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
