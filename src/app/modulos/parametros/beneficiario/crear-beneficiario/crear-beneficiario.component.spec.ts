import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBeneficiarioComponent } from './crear-beneficiario.component';

describe('CrearBeneficiarioComponent', () => {
  let component: CrearBeneficiarioComponent;
  let fixture: ComponentFixture<CrearBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearBeneficiarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
