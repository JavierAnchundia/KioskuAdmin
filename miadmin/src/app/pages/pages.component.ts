import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  isCollapsed = false;
  nombre = "Jefferson Guitierritos";
  public currentUserInfo: any = null;
  public currentUserId: string = '';
  public isAdmin = false;
  public isEval = false;
  public isTransp = false;

  constructor(
    private usuario: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.usuario.getCurrentUserId();
    this.loadUserInfo();
  }

  loadUserInfo(): void{
    this.usuario.getUserInfo(this.currentUserId)
    .then((userInfo: any) => {
      this.currentUserInfo = userInfo;
      this.isTransp = this.currentUserInfo.rol === 'transportista';
      this.isAdmin = this.currentUserInfo.rol === 'admin';
      this.isEval = this.currentUserInfo.rol === 'evaluador';

    })
    .catch((error: any) => console.log(error))
  }

  logOut(): void{
    this.usuario.logoutUser();
  }

}
