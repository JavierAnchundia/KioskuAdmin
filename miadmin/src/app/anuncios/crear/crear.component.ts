import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
  providers: [DatePipe]
})
export class CrearComponent implements OnInit {
  public anuncioForm!: FormGroup;
  uploading = false;
  fileList: NzUploadFile[] = [];
  constructor(
    private anuncio: AnuncioService,
    private fb: FormBuilder,
    private router: Router,
    private datepipe: DatePipe,
  ) { }

  beforeUpload = (file: NzUploadFile): boolean => {
    //this.fileList = this.fileList.concat(file);
    return true;
  };

  ngOnInit(): void {
    this.anuncioForm = this.fb.group({
      formLayout: ['horizontal'],
      titulo: [null, [Validators.required]],
      descripcion: [null, [Validators.required, Validators.maxLength(250)]],
    });
  }

  submitForm(): void {
    for (const i in this.anuncioForm.controls) {
      if (this.anuncioForm.controls.hasOwnProperty(i)) {
        this.anuncioForm.controls[i].markAsDirty();
        this.anuncioForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.anuncioForm.valid && this.fileList.length > 0) {
      this.crearAnuncio(this.anuncioForm.value);
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.anuncioForm.reset();
    for (const key in this.anuncioForm.controls) {
      if (this.anuncioForm.controls.hasOwnProperty(key)) {
        this.anuncioForm.controls[key].markAsPristine();
        this.anuncioForm.controls[key].updateValueAndValidity();
      }
    }
  }

  crearAnuncio(anuncioData: any): void {
    const anuncioFD = new FormData();
    let file: File = this.fileList.pop()?.originFileObj!;
    console.log(file);
    Swal.showLoading();
    anuncioFD.append('titulo', anuncioData.titulo);
    anuncioFD.append('descripcion', anuncioData.descripcion);
    anuncioFD.append('banner', file);
    anuncioFD.append('dateCreated', this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm')!);

    this.anuncio.createanuncio(anuncioFD)
      .then((data: any) => {
        console.log(data);
        Swal.close();
        Swal.fire('El anuncio se ha creado correctamente.').then(() => {
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
