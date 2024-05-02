import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validarSesionActivaGuard } from './validar-sesion-activa.guard';

describe('validarSesionActivaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validarSesionActivaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
