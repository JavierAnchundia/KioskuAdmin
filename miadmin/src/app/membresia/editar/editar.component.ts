import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Membresia } from 'src/app/models/membresia';
import { MembresiaService } from 'src/app/services/membresia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  private params: any = '';
  public currentMemb!: Membresia;
  public membresiaForm!: FormGroup;

  constructor(
    private membresia: MembresiaService,
    private nzMessageService: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.membresia) {
      this.getRouteParams();
    }
    this.membresiaForm = this.fb.group({
      formLayout: ['horizontal'],
      tipo: [null, [Validators.required]],
      pct_dscto: [null, [Validators.required]],
      tarifa: [null, [Validators.required]],
      valorCredito: [null, [Validators.required]]
    });
  }

  getRouteParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      this.getMembresiaInfo();
    });

  }

  getMembresiaInfo(): void{
    this.membresia.getMembresiasById(this.params.membresia)
    .then((data) => {
      this.currentMemb = data;
      this.membresiaForm.patchValue({
        tipo: this.currentMemb.tipo,
        pct_dscto: this.currentMemb.pct_dscto,
        tarifa: this.currentMemb.tarifa,
        valorCredito: this.currentMemb.valorCredito,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  submitForm(): void {
    for (const i in this.membresiaForm.controls) {
      if (this.membresiaForm.controls.hasOwnProperty(i)) {
        this.membresiaForm.controls[i].markAsDirty();
        this.membresiaForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.membresiaForm.valid){
      this.updateMembresia(this.membresiaForm.value);
    }
  }

  updateMembresia(membresiaData: any): void{
    const membership = new FormData();
    Swal.showLoading();
    membership.append('tipo', membresiaData.tipo);
    membership.append('pct_dscto', membresiaData.pct_dscto);
    membership.append('tarifa', membresiaData.tarifa);
    membership.append('valorCredito', membresiaData.valorCredito);

    this.membresia.editMembresias(String(this.currentMemb.id), membership)
    .then((data: any) => {
      console.log(data);
      Swal.close();
      Swal.fire('La membresía se ha actualizado correctamente.').then(() => {
        this.router.navigate(['/inicio/membresia']);
      });
    })
    .catch((error: any) => {
      console.log(error);
      Swal.fire('Hubo un error al actualizar. Intente nuevamente', 'error');
    })

  }
}
