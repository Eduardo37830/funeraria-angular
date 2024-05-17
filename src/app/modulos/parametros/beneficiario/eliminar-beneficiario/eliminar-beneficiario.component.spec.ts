import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarBeneficiarioComponent } from './eliminar-beneficiario.component';

describe('EliminarBeneficiarioComponent', () => {
  let component: EliminarBeneficiarioComponent;
  let fixture: ComponentFixture<EliminarBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarBeneficiarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
