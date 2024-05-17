import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBeneficiarioComponent } from './listar-beneficiario.component';

describe('ListarBeneficiarioComponent', () => {
  let component: ListarBeneficiarioComponent;
  let fixture: ComponentFixture<ListarBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarBeneficiarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
