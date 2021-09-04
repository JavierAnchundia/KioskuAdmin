import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifaTransporteComponent } from './tarifa-transporte.component';

describe('TarifaTransporteComponent', () => {
  let component: TarifaTransporteComponent;
  let fixture: ComponentFixture<TarifaTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifaTransporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifaTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
