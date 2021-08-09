import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisitemsComponent } from './misitems.component';

describe('MisitemsComponent', () => {
  let component: MisitemsComponent;
  let fixture: ComponentFixture<MisitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisitemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
