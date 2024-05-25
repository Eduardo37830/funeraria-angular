import { TestBed } from '@angular/core/testing';

import { PagoEpaycoService } from './pago-epayco.service';

describe('PagoEpaycoService', () => {
  let service: PagoEpaycoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoEpaycoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
