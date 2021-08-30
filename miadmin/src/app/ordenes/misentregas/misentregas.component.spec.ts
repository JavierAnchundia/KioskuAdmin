import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisentregasComponent } from './misentregas.component';

describe('MisentregasComponent', () => {
  let component: MisentregasComponent;
  let fixture: ComponentFixture<MisentregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisentregasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisentregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
