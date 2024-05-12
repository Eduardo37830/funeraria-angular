import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDepartamentoComponent } from './listar-departamento.component';

describe('ListarDepartamentoComponent', () => {
  let component: ListarDepartamentoComponent;
  let fixture: ComponentFixture<ListarDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarDepartamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
