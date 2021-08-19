import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MembresiaService } from '../../services/membresia.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  public membresiaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private membresia: MembresiaService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.membresiaForm = this.fb.group({
      formLayout: ['horizontal'],
      tipo: [null, [Validators.required]],
      pct_dscto: [null, [Validators.required]],
      tarifa: [null, [Validators.required]],
      valorCredito: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.membresiaForm.controls) {
      if (this.membresiaForm.controls.hasOwnProperty(i)) {
        this.membresiaForm.controls[i].markAsDirty();
        this.membresiaForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.membresiaForm.valid){
      this.crearMembresia(this.membresiaForm.value);
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.membresiaForm.reset();
    for (const key in this.membresiaForm.controls) {
      if (this.membresiaForm.controls.hasOwnProperty(key)) {
        this.membresiaForm.controls[key].markAsPristine();
        this.membresiaForm.controls[key].updateValueAndValidity();
      }
    }
  }

  crearMembresia(membresiaData: any): void{
    const membership = new FormData();
    Swal.showLoading();
    membership.append('tipo', membresiaData.tipo);
    membership.append('pct_dscto', membresiaData.pct_dscto);
    membership.append('tarifa', membresiaData.tarifa);
    membership.append('valorCredito', membresiaData.valorCredito);
    membership.append('active', 'True');

    this.membresia.createMembresia(membership)
    .then((data: any) => {
      console.log(data);
      Swal.close();
      Swal.fire('La membresía se ha agregado correctamente.').then(() => {
        this.router.navigate(['/inicio/membresia']);
      });
    })
    .catch((error: any) => {
      console.log(error);
      Swal.close();
      Swal.fire('Hubo un error al actualizar. Intente nuevamente', 'error');
    })

  }
}
