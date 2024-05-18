import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiasUsuarioComponent } from './guias-usuario/guias-usuario.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { SoporteComponent } from './soporte/soporte.component';
import { AyudaComponent } from './ayuda/ayuda.component';

const routes: Routes = [
  {
    path: 'guia-usuario',
    component: GuiasUsuarioComponent
  },
  {
    path: 'preguntas-frecuentes',
    component: PreguntasFrecuentesComponent
  },
  {
    path: 'soporte',
    component: SoporteComponent
  },
  {
    path: 'ayuda',
    component: AyudaComponent
  },
  {
    path: '',
    redirectTo: 'ayuda',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AyudaRoutingModule { }
