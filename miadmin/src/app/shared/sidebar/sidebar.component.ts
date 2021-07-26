import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { faAnkh } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isCollapsed: boolean = false;
  isHyperAdmin: boolean = false;
  faBell = faBell;
  faBoxOpen =  faBoxOpen;
  faListAlt = faListAlt;
  faUserCircle = faUserCircle;
  faAnkh = faAnkh;
  faEnvelopeOpenText = faEnvelopeOpenText;
  emailUser: String = "";
  tipoUsuario: String = "admin";

  constructor() { }

  ngOnInit(): void {
  }

  inicioPage(){
   
  }
}
