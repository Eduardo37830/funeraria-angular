import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificarUsuarioComponent } from './identificar-usuario/identificar-usuario.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';

const routes: Routes = [
  {
    path: 'identificar-usuario',
    component: IdentificarUsuarioComponent
  },
  {
    path: 'cambiar-clave',
    component: CambioClaveComponent
  },
  {
    path: 'recuperar-clave',
    component: RecuperarClaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
