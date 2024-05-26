import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPlanComponent } from './plan/listar-plan/listar-plan.component';
import { CrearPlanComponent } from './plan/crear-plan/crear-plan.component';
import { EditarPlanComponent } from './plan/editar-plan/editar-plan.component';
import { EliminarPlanComponent } from './plan/eliminar-plan/eliminar-plan.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ListarSedeComponent } from './sede/listar-sede/listar-sede.component';
import { ListarSalaComponent } from './sala/listar-sala/listar-sala.component';
import { CrearSalaComponent } from './sala/crear-sala/crear-sala.component';
import { EliminarSalaComponent } from './sala/eliminar-sala/eliminar-sala.component';
import { EditarSalaComponent } from './sala/editar-sala/editar-sala.component';
import { ListarDepartamentoComponent } from './departamento/listar-departamento/listar-departamento.component';
import { CrearDepartamentoComponent } from './departamento/crear-departamento/crear-departamento.component';
import { EliminarDepartamentoComponent } from './departamento/eliminar-departamento/eliminar-departamento.component';
import { EditarDepartamentoComponent } from './departamento/editar-departamento/editar-departamento.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { EliminarCiudadComponent } from './ciudad/eliminar-ciudad/eliminar-ciudad.component';
import { CrearSedeComponent } from './sede/crear-sede/crear-sede.component';
import { EditarSedeComponent } from './sede/editar-sede/editar-sede.component';
import { EliminarSedeComponent } from './sede/eliminar-sede/eliminar-sede.component';
import { ListarSolicitudComponent } from './solicitudServicioFunerario/listar-solicitud/listar-solicitud.component';
import { InicioComponent } from './admin/inicio/inicio.component';
import { RegistrosPorFechasComponent } from './graficas/registros-por-fechas/registros-por-fechas.component';
import { ListarBeneficiarioComponent } from './beneficiario/listar-beneficiario/listar-beneficiario.component';
import { CrearBeneficiarioComponent } from './beneficiario/crear-beneficiario/crear-beneficiario.component';
import { EliminarBeneficiarioComponent } from './beneficiario/eliminar-beneficiario/eliminar-beneficiario.component';
import { EditarBeneficiarioComponent } from './beneficiario/editar-beneficiario/editar-beneficiario.component';
import { ListarConductorComponent } from './conductor/listar-conductor/listar-conductor.component';
import { CrearConductorComponent } from './conductor/crear-conductor/crear-conductor.component';
import { EliminarConductorComponent } from './conductor/eliminar-conductor/eliminar-conductor.component';
import { EditarConductorComponent } from './conductor/editar-conductor/editar-conductor.component';
import { PagoEpaycoComponent } from '../pago-epayco/pago-epayco.component';

const routes: Routes = [
  {
    path: "plan-listar",
    component: ListarPlanComponent
  },
  {
    path: "plan-listar/:id",
    component: ListarPlanComponent
  },
  {
    path: "plan-agregar",
    component: CrearPlanComponent
  },
  {
    path: "plan-eliminar/:id",
    component: EliminarPlanComponent
  },
  {
    path: "plan-editar/:id",
    component: EditarPlanComponent
  },
  {
    path: "cliente-listar",
    component: ListarClienteComponent
  },
  {
    path: "cliente-agregar",
    component: CrearClienteComponent
  },
  {
    path: "cliente-eliminar/:id",
    component: EliminarClienteComponent
  },
  {
    path: "cliente-editar/:id",
    component: EditarClienteComponent
  },
  {
    path: "clientes/:id/beneficiario-listar",
    component: ListarBeneficiarioComponent
  },
  {
    path: "clientes/:id/beneficiario-agregar",
    component: CrearBeneficiarioComponent
  },
  {
    path: "clientes/:ids/beneficiario-eliminar/:id",
    component: EliminarBeneficiarioComponent
  },
  {
    path: "clientes/:ids/beneficiario-editar/:id",
    component: EditarBeneficiarioComponent
  },
  {
    path: "sedes/:id/conductor-listar",
    component: ListarConductorComponent
  },
  {
    path: "sedes/:id/conductor-agregar",
    component: CrearConductorComponent
  },
  {
    path: "sedes/:ids/conductor-eliminar/:id",
    component: EliminarConductorComponent
  },
  {
    path: "sedes/:ids/conductor-editar/:id",
    component: EditarConductorComponent
  },
  {
    path: "departamento-listar",
    component: ListarDepartamentoComponent
  },
  {
    path: "departamento-agregar",
    component: CrearDepartamentoComponent
  },
  {
    path: "departamento-eliminar/:id",
    component: EliminarDepartamentoComponent
  },
  {
    path: "departamento-editar/:id",
    component: EditarDepartamentoComponent
  },
  {
    path: "departamentos/:id/ciudad-listar",
    component: ListarCiudadComponent,
  },
  {
    path: "departamentos/:id/ciudad-agregar",
    component: CrearCiudadComponent,
  },
  {
    path: "departamentos/:ids/ciudad-eliminar/:id",
    component: EliminarCiudadComponent
  },
  {
    path: "departamentos/:ids/ciudad-editar/:id",
    component: EditarCiudadComponent
  },
  {
    path: "ciudads/:id/sede-listar",
    component: ListarSedeComponent,
  },
  {
    path: "ciudads/:id/sede-agregar",
    component: CrearSedeComponent,
  },
  {
    path: "ciudads/:ids/sede-eliminar/:id",
    component: EliminarSedeComponent,
  },
  {
    path: "ciudads/:ids/sede-editar/:id",
    component: EditarSedeComponent,
  },
  {
    path: "sedes/:id/sala-listar",
    component: ListarSalaComponent,
  },
  {
    path: "sedes/:id/sala-agregar",
    component: CrearSalaComponent
  },
  {
    path: "sedes/:ids/sala-eliminar/:id",
    component: EliminarSalaComponent
  },
  {
    path: "sedes/:ids/sala-editar/:id",
    component: EditarSalaComponent
  },
  {
    path: "solicitud-listar",
    component: ListarSolicitudComponent
  
  },
  {
    path: "admin-inicio",
    component: InicioComponent
  },
  {
    path: "registros-por-fechas",
    component: RegistrosPorFechasComponent
  },
  {
    path: "pago-epayco",
    component: PagoEpaycoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
