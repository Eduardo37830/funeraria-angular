import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSolicitudComponent } from './listar-solicitud.component';

describe('ListarSolicitudComponent', () => {
  let component: ListarSolicitudComponent;
  let fixture: ComponentFixture<ListarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
