import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosPorFechasComponent } from './registros-por-fechas.component';

describe('RegistrosPorFechasComponent', () => {
  let component: RegistrosPorFechasComponent;
  let fixture: ComponentFixture<RegistrosPorFechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosPorFechasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrosPorFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
