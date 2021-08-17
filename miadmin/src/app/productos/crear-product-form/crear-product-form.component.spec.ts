import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProductFormComponent } from './crear-product-form.component';

describe('CrearProductFormComponent', () => {
  let component: CrearProductFormComponent;
  let fixture: ComponentFixture<CrearProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProductFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
