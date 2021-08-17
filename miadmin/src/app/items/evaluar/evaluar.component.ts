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
import { ItemsService } from '../../services/items.service';
import { UsuarioService } from '../../services/usuario.service';

import { BodegaCiudad } from 'src/app/models/bodegaCiudad';
import { Ciudad } from 'src/app/models/ciudad';
import { Item } from 'src/app/models/items';
import { Usuario } from 'src/app/models/usuario';
import { ItemImagen } from 'src/app/models/itemImagen';
import { EstadoService } from 'src/app/services/estado.service';
import { Estado } from 'src/app/models/estado';
import { BodegaItemService } from 'src/app/services/bodega-item.service';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.css']
})
export class EvaluarComponent implements OnInit {
  
  itemForm:FormGroup;
  listOfCities: Ciudad[] = [];
  listOfItemImages: ItemImagen[] = [];

  selected:number[] = [];
  idCiudad:number = 1;
  disableInput = true;
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  url_backend: string = URL_SERVICIOS.url_static;
  ruta = '/MonsterHunterNintendoSwithc.jpg';
  idItem:number = 0;

  itemInicial:Item = new Item(0,"","",0,"",0,"",0,0);
  usuarioInicial:Usuario = new Usuario(0,"","", false,"",0,0,0,0);
  estadoAdmitido:Estado = new Estado(0,'', new Date());
  estadoDescartado:Estado = new Estado(0,'', new Date())

  //@ViewChild('myselect') myselect: ElementRef<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _ciudad: CiudadService,
    private _bodega: BodegaService, 
    public _router: Router,
    private _route: ActivatedRoute,
    private _item: ItemsService,
    private _user: UsuarioService,
    private _estado: EstadoService,
    private _bodegaItem: BodegaItemService,



  ) {
    this.itemForm = this._formBuilder.group({
      nombreItem:[{ disabled: this.disableInput, value: ""}],
      descripcionItem:[{ disabled: this.disableInput, value: ""}],
      cantidadItem:[{ disabled: this.disableInput, value: ""}],
      propietarioItem:[{ disabled: this.disableInput, value: ""}],
      modoEntrega:[{ disabled: this.disableInput, value: ""}],
      ciudadUsuario:[{ disabled: this.disableInput, value: ""}],
      direccionUsuario:[{ disabled: this.disableInput, value: ""}],

      creditos: ["", [Validators.maxLength(100), Validators.required, Validators.pattern("^[0-9]*$"),], ],
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
    this.cargarEstadoAdmitido();
    this.cargarEstadoDescartado();

    this.cargarItem(this.idItem);
    
    
  }

  submitForm():void
   {
    for (const i in this.itemForm.controls) {
      if (this.itemForm.controls.hasOwnProperty(i)) {
        this.itemForm.controls[i].markAsDirty();
        this.itemForm.controls[i].updateValueAndValidity();
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
    .pipe(
      catchError((err) => {
        Swal.close();
        Swal.fire(
          "Ha ocurrido un error  al cargar los datos de las bodegas"
        );
        return throwError(err);
      })
    )
    .subscribe((resp:any)=>{
      this.listOfCities = [];
      for (var i =0; i < resp.length; i++){       
        console.log(resp[i])
        this.listOfCities.push(resp[i]);        
      }
    }
    )
      
  }

 

  private async cargarItem(id:number){
    await this._item.getItem(id)
    .pipe(
      catchError((err) => {
        Swal.close();
        Swal.fire(
          "Ha ocurrido un error  al cargar los datos del item"
        );
        return throwError(err);
      })
    )
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
      

      this.itemForm.patchValue({
        nombreItem: this.itemInicial.titulo,
        descripcionItem: this.itemInicial.descripcion,
        cantidadItem: this.itemInicial.cantidad,
        //propietarioItem: this.itemInicial.propietario,
        modoEntrega: this.itemInicial.entrega,

        //ciudad: this.bodegaCiudad.ciudad
      })
      console.log(resp);
      this.cargarItemImagenes(this.itemInicial.id)
      this.cargarUser(this.itemInicial.propietario);
    }
      )
      
  }

  private async cargarUser(id:number){
    await this._user.getUserInfo(id as any as string)
    .catch(error => console.log(error))
    .then( (resp:any) => {
      this.usuarioInicial.id = resp.id ;
      this.usuarioInicial.name = resp.name ;
      this.usuarioInicial.email = resp.email ;
      this.usuarioInicial.is_active = resp.is_active ;
      this.usuarioInicial.address = resp.address ;
      this.usuarioInicial.saldo = resp.saldo ;
      this.usuarioInicial.provincia = resp.provincia.nombre ;
      this.usuarioInicial.ciudad = resp.ciudad.nombre ;
      this.usuarioInicial.membresia = resp.membresia ;
      
      console.log(resp)
      console.log(this.usuarioInicial)
      this.itemForm.patchValue({
        propietarioItem: this.usuarioInicial.name,
        ciudadUsuario: this.usuarioInicial.ciudad,
        direccionUsuario: this.usuarioInicial.address,
      })
    }
      )
      
  }

  private async cargarItemImagenes(id:number){
    this._item.getItemImagenes(id)
    .pipe(
      catchError((err) => {
        Swal.close();
        Swal.fire(
          "Ha ocurrido un error  al cargar las imágenes del item"
        );
        return throwError(err);
      })
    )
    .subscribe((resp:any)=>{
      this.listOfItemImages = [];
      for (var i =0; i < resp.length; i++){       
        console.log(resp[i])
        this.listOfItemImages.push(resp[i]);        
      }
    }
    )
      
  }

  private async cargarEstadoAdmitido()
  {
    
    await this._estado.getEstado('Admitido')
    .pipe(
      catchError((err) => {
        Swal.close();
        Swal.fire(
          "Ha ocurrido un error  al cargar los datos de los estados"
        );
        return throwError(err);
      })
    )
    .subscribe( (resp:any) => {
      this.estadoAdmitido.id = resp.id ;
      this.estadoAdmitido.estado = resp.estado ;
    
    }
      )
      
  }

  private async cargarEstadoDescartado()
  {
    
    await this._estado.getEstado('Descartado')
    .pipe(
      catchError((err) => {
        Swal.close();
        Swal.fire(
          "Ha ocurrido un error  al cargar los datos de los estados"
        );
        return throwError(err);
      })
    )
    .subscribe( (resp:any) => {
      this.estadoDescartado.id = resp.id ;
      this.estadoDescartado.estado = resp.estado ;
    
    }
      )
      
  }

   public actualizarItemAdmitido()
   {
    const formData = new FormData();
    formData.append('creditos',this.itemForm.value.creditos);
    formData.append('estado',this.estadoAdmitido.id as any as string);

    this._item
       .actualizarItem(formData,this.idItem)
       .pipe(
        catchError((err) => {
          Swal.close();
          Swal.fire(
            "Ha ocurrido un error al admitir este ítem"
          );
          return throwError(err);
        })
      )
      .subscribe(
        async (resp: any) => {  
          console.log(resp);
          this.crearBodegaItem();

          return true;
        },
        (error:any) => {
          console.error('Error:' + error);
          return throwError(error);
        },
        () => console.log('HTTP request completed.')
      );
      

   }

   public actualizarItemDescartado()
   {
    const formData = new FormData();
    formData.append('estado',this.estadoDescartado.id as any as string);

    this._item
       .actualizarItem(formData,this.idItem)
       .pipe(
        catchError((err) => {
          Swal.close();
          Swal.fire(
            "Ha ocurrido un error al descartar este ítem"
          );
          return throwError(err);
        })
      )
      .subscribe(
        async (resp: any) => {  
          console.log(resp);

          Swal.fire({
            title:'¡Item descartado exitosamente!'})
            .then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.backdrop) {
              this._router.navigate(['/inicio/items/mis-items']);
            }

            if (result.isConfirmed) {
              this._router.navigate(['/inicio/items/mis-items']);
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

   public crearBodegaItem()
   {
    const formData = new FormData();
    formData.append('item', this.idItem as any as string);
    formData.append('bodega',this.itemForm.value.bodega);
    formData.append('cantidad',this.itemInicial.cantidad as any as string);

    console.log(this.itemForm.value.bodega);

    
  
    this._bodegaItem
       .crearBodegaItem(formData)
       .pipe(
        catchError((err) => {
          Swal.close();
          Swal.fire(
            "Ha ocurrido un error  al crear la Bodega-Item"
          );
          return throwError(err);
        })
      )
      .subscribe(
        async (resp: any) => {  
          console.log(resp);
          Swal.fire({
            title:'¡Item admitido exitosamente!'})
            .then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.backdrop) {
              this._router.navigate(['/inicio/items/mis-items']);
            }

            if (result.isConfirmed) {
              this._router.navigate(['/inicio/items/mis-items']);
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
