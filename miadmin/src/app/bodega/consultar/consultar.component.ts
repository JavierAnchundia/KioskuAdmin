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

  isModalCategoryVisible = false;
  isModalCategoryOkLoading = false;
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
    private _formBuilder: FormBuilder,

  ) {

   

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
      this.listOfDisplayData = this.listOfDisplayData.filter((item: BodegaCiudad) => item.nombre.toLowerCase().indexOf(this.searchValueName.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: BodegaCiudad) => item.nombre.toLowerCase().indexOf(this.searchValueName.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  searchAddress(): void {
    this.visibleDireccion = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: BodegaCiudad) => item.direccion.toLowerCase().indexOf(this.searchValueDireccion.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: BodegaCiudad) => item.direccion.toLowerCase().indexOf(this.searchValueDireccion.toLowerCase()) !== -1);
    }
    this.multiplefilter = true;
  }

  searchCity(): void {
    this.visibleCiudad = false;
    if(this.multiplefilter)
    {
      this.listOfDisplayData = this.listOfDisplayData.filter((item: BodegaCiudad) => item.ciudad_name.toLowerCase().indexOf(this.searchValueCiudad.toLowerCase()) !== -1);
    }
    else
    {
      this.listOfDisplayData = this.listOfData.filter((item: BodegaCiudad) => item.ciudad_name.toLowerCase().indexOf(this.searchValueCiudad.toLowerCase()) !== -1);
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

  public eliminarBodega = async (key:number, is_active:boolean) => {

    let titleSwal = is_active ? "¿Está seguro que desea eliminar esta bodega?" : "¿Está seguro que desea activar esta bodega?"
    let respuestaExitoSwal = is_active ? "¡Eliminado lógico de la bodega exitoso!" : "¡Activado lógico de la bodega exitoso!"
    let respuestaFallidaSwal = is_active ? "Ha ocurrido un error inesperado al eliminar lógicamente esta bodega" : "Ha ocurrido un error inesperado al activar lógicamente esta bodega"
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
        console.log(is_active)

        if(is_active)
        {
          console.log(is_active)
          formData.append('is_active', false as any as string);
        }
        else
        {
          formData.append('is_active', 'True');
        }

        this._bodega
        .actualizarBodega(formData,key)
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


   
    

    
    


    
    
  



}
