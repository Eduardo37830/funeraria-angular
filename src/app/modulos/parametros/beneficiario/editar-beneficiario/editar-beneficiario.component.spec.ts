import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBeneficiarioComponent } from './editar-beneficiario.component';

describe('EditarBeneficiarioComponent', () => {
  let component: EditarBeneficiarioComponent;
  let fixture: ComponentFixture<EditarBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarBeneficiarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
