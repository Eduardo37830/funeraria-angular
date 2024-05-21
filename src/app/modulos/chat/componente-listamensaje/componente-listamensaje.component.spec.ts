import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteListamensajeComponent } from './componente-listamensaje.component';

describe('ComponenteListamensajeComponent', () => {
  let component: ComponenteListamensajeComponent;
  let fixture: ComponentFixture<ComponenteListamensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteListamensajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponenteListamensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
