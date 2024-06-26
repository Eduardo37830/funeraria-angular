import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCiudadComponent } from './listar-ciudad.component';

describe('ListarCiudadComponent', () => {
  let component: ListarCiudadComponent;
  let fixture: ComponentFixture<ListarCiudadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCiudadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
