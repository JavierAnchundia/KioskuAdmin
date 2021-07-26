import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // Forms
  public loginForm!: FormGroup;

  // Variables
  private user: any;
  public userID: any;

  constructor(
    private fb: FormBuilder,
    private usuario: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
    this.user = {
      email: ' ',
      password: ' '
    };
  }

  submitForm(form: any): void {
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls[i].touched) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }

    this.loginUser(this.loginForm);
  }

  loginUser(form: any): void {

    if (form.invalid) {
      Swal.fire('Error en el inicio de sesión.', 'Complete los campos para iniciar sesión.', 'error');
    } else {
      Swal.showLoading();

      this.user.email = form.value.email;
      this.user.password = form.value.password;

      this.usuario.loginUser(this.user)
        .subscribe(async resp => {
          this.userID = this.usuario.getCurrentUserId();
          this.loadUserInfo();
        }, error => {
          console.log(error);
          Swal.fire('Correo o contraseña incorrectos.', 'Intente nuevamente');
        });
    }
  }

  loadUserInfo(): void{

    this.usuario.getUserInfo(this.userID).then(
      (data: any) => {
        this.user = data;
        localStorage.setItem('type', data.rol);
        this.router.navigate(['/inicio/']).then(
          () => {
          Swal.close();
      });
  });
}
}
