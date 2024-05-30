import { TestBed } from '@angular/core/testing';

import { ServicioFunerarioService } from './servicio-funerario.service';

describe('ServicioFunerarioService', () => {
  let service: ServicioFunerarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioFunerarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
