import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteEntradamensajeComponent } from './componente-entradamensaje.component';

describe('ComponenteEntradamensajeComponent', () => {
  let component: ComponenteEntradamensajeComponent;
  let fixture: ComponentFixture<ComponenteEntradamensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteEntradamensajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponenteEntradamensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
