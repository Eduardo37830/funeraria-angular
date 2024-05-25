import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoEpaycoComponent } from './pago-epayco.component';

describe('PagoEpaycoComponent', () => {
  let component: PagoEpaycoComponent;
  let fixture: ComponentFixture<PagoEpaycoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoEpaycoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoEpaycoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
