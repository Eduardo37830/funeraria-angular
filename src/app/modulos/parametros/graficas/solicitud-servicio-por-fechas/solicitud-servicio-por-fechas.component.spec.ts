import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudServicioPorFechasComponent } from './solicitud-servicio-por-fechas.component';

describe('SolicitudServicioPorFechasComponent', () => {
  let component: SolicitudServicioPorFechasComponent;
  let fixture: ComponentFixture<SolicitudServicioPorFechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudServicioPorFechasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudServicioPorFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
