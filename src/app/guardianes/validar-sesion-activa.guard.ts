import { CanActivateFn } from '@angular/router';

export const validarSesionActivaGuard: CanActivateFn = (route, state) => {
  return true;
};
