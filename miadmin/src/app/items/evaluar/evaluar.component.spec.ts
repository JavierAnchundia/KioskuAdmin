import { ComponentFixture, TestBed } from '@angular/core/testing';
import {SubCategoria} from '../../models/subcategoria';
import {ColumnItem} from '../../models/columnItem';
import Swal from 'sweetalert2'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoriaService } from '../../services/categoria.service';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { CiudadService } from '../../services/ciudad.service';
import { BodegaService } from '../../services/bodega.service';

import { BodegaCiudad } from 'src/app/models/bodegaCiudad';
import { Ciudad } from 'src/app/models/ciudad';

import { EvaluarComponent } from './evaluar.component';

describe('EvaluarComponent', () => {
  let component: EvaluarComponent;
  let fixture: ComponentFixture<EvaluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
