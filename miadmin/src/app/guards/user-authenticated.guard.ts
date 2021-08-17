import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticatedGuard implements CanActivate {
  constructor(
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const hasAccess = (localStorage.getItem('type') === 'admin');
      const isValidToken = localStorage.getItem('token') != null && localStorage.getItem('token') !== '';

      if (isValidToken && hasAccess){
        return true;
      } else if (!isValidToken) {
        Swal.fire('Acceso denegado', 'Inicie sesión para acceder a está página.', 'error');

        this.router.navigateByUrl('/');
        return false;
      } else {
        Swal.fire('Acceso denegado', 'Usted no tiene permiso para acceder a está página.', 'error');

        this.router.navigateByUrl('/');
        return false;
      }
  }

}
