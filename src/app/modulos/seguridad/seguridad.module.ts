import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdentificarUsuarioComponent } from './identificar-usuario/identificar-usuario.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { CrearClienteComponent } from '../parametros/cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from '../parametros/cliente/editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from '../parametros/cliente/listar-cliente/listar-cliente.component';
import { EliminarClienteComponent } from '../parametros/cliente/eliminar-cliente/eliminar-cliente.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    /* Esto lo hizo copilot */
    IdentificarUsuarioComponent,
    CambioClaveComponent,
    RecuperarClaveComponent,
    CerrarSesionComponent,
    RegistroUsuarioComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    ListarClienteComponent,
    EliminarClienteComponent
  ]
})
export class SeguridadModule { }
