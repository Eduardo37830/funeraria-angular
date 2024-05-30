import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarServicioComponent } from './generar-servicio.component';

describe('GenerarServicioComponent', () => {
  let component: GenerarServicioComponent;
  let fixture: ComponentFixture<GenerarServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarServicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
