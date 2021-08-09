import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarseComponent } from './asignarse.component';

describe('AsignarseComponent', () => {
  let component: AsignarseComponent;
  let fixture: ComponentFixture<AsignarseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
