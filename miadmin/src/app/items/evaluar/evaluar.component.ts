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

import { CategoriaService } from '../../services/categoria.service';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { CiudadService } from '../../services/ciudad.service';
import { BodegaService } from '../../services/bodega.service';

import { BodegaCiudad } from 'src/app/models/bodegaCiudad';
import { Ciudad } from 'src/app/models/ciudad';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.css']
})
export class EvaluarComponent implements OnInit {
  
  bodegaForm:FormGroup;
  listOfCities: Ciudad[] = [];
  idbodega:number = 0;
  selected:number[] = [];
  idCiudad:number = 1;
  disableInput = true;
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  url_backend: string = URL_SERVICIOS.url_static;
  ruta = '/MonsterHunterNintendoSwithc.jpg';
  idItem:number = 0;


  bodegaCiudad:BodegaCiudad = new BodegaCiudad(0,"","",0,"");
  //@ViewChild('myselect') myselect: ElementRef<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _ciudad: CiudadService,
    private _bodega: BodegaService, 
    public _router: Router,
    private _route: ActivatedRoute,

  ) {
    this.bodegaForm = this._formBuilder.group({
      nombreItem:[{ disabled: this.disableInput, value: "Nintendo Switch Monster Hunter"}],
      descripcionItem:[{ disabled: this.disableInput, value: "Este es el Nintendo Switch de la edicion limitada de Monster Hunter Risa"}],
      cantidadItem:[{ disabled: this.disableInput, value: "26"}],
      propietarioItem:[{ disabled: this.disableInput, value: "Carla Sanchez"}],
      modoEntrega:[{ disabled: this.disableInput, value: "Domicilio En Situ"}],

      nombre: ["", [Validators.maxLength(100), Validators.required], ],
      direccion: ["", [Validators.maxLength(100), Validators.required]],
      ciudad: ["", [Validators.maxLength(20), Validators.required]],

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
    this.cargarBodega(this.idbodega);
    
  }

  submitForm():void
   {
    for (const i in this.bodegaForm.controls) {
      if (this.bodegaForm.controls.hasOwnProperty(i)) {
        this.bodegaForm.controls[i].markAsDirty();
        this.bodegaForm.controls[i].updateValueAndValidity();
      }
    }
   }

   
   cargarCiudades(){
    this._ciudad.getCiudades()
    .subscribe((resp:any)=>{
      this.listOfCities = [];
      for (var i =0; i < resp.length; i++){       
        console.log(resp[i])
        this.listOfCities.push(resp[i]);        
      }
    }
    )
      
  }

  cargarBodegas(){
    this._bodega.getBodegas()
    .subscribe((resp:any)=>{
      this.listOfCities = [];
      for (var i =0; i < resp.length; i++){       
        console.log(resp[i])
        this.listOfCities.push(resp[i]);        
      }
    }
    )
      
  }

  private async cargarBodega(id:number){
    await this._bodega.getBodega(id)
    .subscribe( (resp:any) => {
      this.bodegaCiudad.id = resp.id ;
      this.bodegaCiudad.nombre = resp.nombre ;
      this.bodegaCiudad.ciudad = resp.ciudad ;
      this.bodegaCiudad.direccion = resp.direccion ;

      this.bodegaCiudad.ciudad_name = resp.ciudad_name ;
      //this.idCiudad = this.bodegaCiudad.ciudad;

      console.log(this.bodegaCiudad);
      console.log(this.bodegaCiudad.ciudad);

      this.bodegaForm.patchValue({
        nombre: this.bodegaCiudad.nombre,
        direccion: this.bodegaCiudad.direccion,
        //ciudad: this.bodegaCiudad.ciudad
      })
    }
      )
      
  }


   public actualizarBodega()
   {
    const formData = new FormData();
    formData.append('nombre',this.bodegaForm.value.nombre);
    formData.append('direccion',this.bodegaForm.value.direccion);

    if(this.bodegaForm.value.ciudad == "originalValue")
    {
      formData.append('ciudad',this.bodegaCiudad.ciudad as any as string);
    }

    else
    {
      formData.append('ciudad',this.bodegaForm.value.ciudad);

    }
    console.log(this.bodegaForm.value.ciudad);

    
  
    this._bodega
       .actualizarBodega(formData,this.idbodega)
       .pipe(
        catchError((err) => {
          Swal.close();
          Swal.fire(
            "Ha ocurrido un error  al actualizar esta bodega"
          );
          return throwError(err);
        })
      )
      .subscribe(
        async (resp: any) => {  
          console.log(resp);
          Swal.fire({
            title:'¡Bodega editada exitosamente!'})
            .then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.backdrop) {
              this._router.navigate(['/inicio/bodegas/consultar']);
            }

            if (result.isConfirmed) {
              this._router.navigate(['/inicio/bodegas/consultar']);
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
