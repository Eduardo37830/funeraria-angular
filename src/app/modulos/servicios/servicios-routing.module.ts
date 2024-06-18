import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarServicioComponent } from './solicitar-servicio/solicitar-servicio.component';
import { GenerarServicioComponent } from './generar-servicio/generar-servicio.component';
import { AceptarSolicitudComponent } from './aceptar-solicitud/aceptar-solicitud.component';
import { ServicioDatosComponent } from './servicio-datos/servicio-datos.component';

const routes: Routes = [
  {
    path: 'solicitud-servicio-funerario/solicitud-servicios',
    component: SolicitarServicioComponent
  },
  {
    path: 'solicitud/:id/generar-servicio',
    component: GenerarServicioComponent,
  },
  {
    path: 'cliente/:id/aceptar-solicitud',
    component: AceptarSolicitudComponent
  },
  {
    path: 'datos-servicio',
    component: ServicioDatosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
