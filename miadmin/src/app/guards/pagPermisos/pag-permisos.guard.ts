import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service'

@Injectable({
  providedIn: 'root'
})
export class PagPermisosGuard implements CanActivate {

  tipo_user: any;
  ruta_actual:any;
  transportista_role = 'transportista';
  admin_role = 'admin'
  evaluador_role = 'evaluador'
  constructor(
    private router:Router, 
    private auth: UsuarioService,
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.auth.getToken()){

      

      this.tipo_user =  localStorage.getItem('type');
      this.ruta_actual = route.data.titulo;

      //Anuncios
      if(this.tipo_user != this.admin_role &&  this.ruta_actual == 'Anuncios'){
        this.invokeSwal();      
        return false
      }

      //Este vendria a ser Usuarios
      if(this.tipo_user != this.admin_role &&  this.ruta_actual == 'Welcome'){
        this.invokeSwal();      
        return false
      }


      if(this.tipo_user != this.admin_role &&  this.ruta_actual == 'Welcome2'){
        this.invokeSwal();      
        return false
      }
      

      //Productos
      if(this.tipo_user != this.admin_role &&  this.ruta_actual == 'Productos'){
        this.invokeSwal();      
        return false
      }

      // Compras - Ordenes sin asignar
      if(this.tipo_user == this.evaluador_role &&  this.ruta_actual == 'Ordenes/Sin asignar'){
        this.invokeSwal();      
        return false
      }

        // Compras - Historial de Ordenes
      if(this.tipo_user == this.evaluador_role &&  this.ruta_actual == 'Ordenes/Historial'){
          this.invokeSwal();      
          return false
      }
      
      //Compras - Entregas
      if(this.tipo_user != this.transportista_role &&  this.ruta_actual == 'Ordenes/Entregas'){
        this.invokeSwal();      
        return false
      }

      //Configuraciones
      if(this.tipo_user != this.admin_role &&  this.ruta_actual == 'Categorias'){
        this.invokeSwal();      
        return false
      }

      if(this.tipo_user != this.admin_role &&  this.ruta_actual == 'Subcategorias'){
        this.invokeSwal();      
        return false
      }

      if(this.tipo_user != this.admin_role &&  this.ruta_actual == 'Tarifa Transporte'){
        this.invokeSwal();      
        return false
      }

      //Items - Sin aginar
      if(this.tipo_user == this.transportista_role &&  this.ruta_actual == 'Items/Asignar'){
        this.invokeSwal();      
        return false
      }

      //Items - Mis items
      if(this.tipo_user != this.evaluador_role &&  this.ruta_actual == 'Items/Mis Items'){
        this.invokeSwal();      
        return false
      }

        //Items - Evaluar
      if(this.tipo_user != this.evaluador_role &&  this.ruta_actual == 'Items/Evaluar'){
          this.invokeSwal();      
          return false
      }

      //Membresias
      if(this.tipo_user != this.admin_role &&  this.ruta_actual == 'Membresia'){
        this.invokeSwal();      
        return false
      }

      //Bodegas
      if(this.tipo_user != this.admin_role &&  this.ruta_actual == 'Bodegas'){
        this.invokeSwal();      
        return false
      }
      


     



      console.log(this.tipo_user)
      console.log("Holi")

     
    }

    return true;
  }

  invokeSwal()
  {
    Swal.fire({
      title:'¡No tiene permisos para usar esa página!'})
      .then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.backdrop) {
        this.router.navigate(['/inicio/dashboard']);
      }

      if (result.isConfirmed) {
        this.router.navigate(['/inicio/dashboard']);
      }
    });
  }
  
}
