import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { AnuncioService } from 'src/app/services/anuncio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  public anuncioForm!: FormGroup;
  private params: any = '';
  public currentAdv!: Anuncio;

  constructor(
    private anuncio: AnuncioService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.anuncio) {
      this.getRouteParams();
    }
    this.anuncioForm = this.fb.group({
      formLayout: ['horizontal'],
      titulo: [null, [Validators.required]],
      descripcion: [null, [Validators.required, Validators.maxLength(250)]],
    });
  }

  getRouteParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      console.log(params);
      this.getAnuncioInfo();
    });

  }

  getAnuncioInfo(): void{
    this.anuncio.getAnuncioById(this.params.anuncio)
    .then((data) => {
      this.currentAdv = data;
      console.log(this.currentAdv);
      this.anuncioForm.patchValue({
        titulo: this.currentAdv.titulo,
        descripcion: this.currentAdv.descripcion,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
  submitForm(): void {
    for (const i in this.anuncioForm.controls) {
      if (this.anuncioForm.controls.hasOwnProperty(i)) {
        this.anuncioForm.controls[i].markAsDirty();
        this.anuncioForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.anuncioForm.valid) {
      this.editarAnuncio(this.anuncioForm.value);
    }

  }

  editarAnuncio(anuncioData: any): void {
    const anuncioFD = new FormData();
    Swal.showLoading();
    anuncioFD.append('titulo', anuncioData.titulo);
    anuncioFD.append('descripcion', anuncioData.descripcion);

    this.anuncio.editAnuncio(String(this.currentAdv.id), anuncioFD)
      .then((data: any) => {
        console.log(data);
        Swal.close();
        Swal.fire('El anuncio se ha editado correctamente.').then(() => {
          this.router.navigate(['/inicio/anuncios']);
        });
      })
      .catch((error: any) => {
        console.log(error);
        Swal.close();
        Swal.fire('Hubo un error. Intente nuevamente', 'error');
      })

  }
}


