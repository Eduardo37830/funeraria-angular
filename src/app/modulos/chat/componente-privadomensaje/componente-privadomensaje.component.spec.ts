import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentePrivadomensajeComponent } from './componente-privadomensaje.component';

describe('ComponentePrivadomensajeComponent', () => {
  let component: ComponentePrivadomensajeComponent;
  let fixture: ComponentFixture<ComponentePrivadomensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentePrivadomensajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentePrivadomensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
