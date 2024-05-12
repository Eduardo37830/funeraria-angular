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

const routes: Routes = [
  {
    path: "plan-listar",
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
    path: "departamentos/:id/ciudads",
    component: ListarCiudadComponent,
  },
  {
    path: "departamentos/:id/ciudad-agregar",
    component: CrearCiudadComponent,
  },
  {
    path: "ciudad-listar",
    component: ListarCiudadComponent
  },
  {
    path: "ciudad-eliminar/:id",
    component: EliminarCiudadComponent
  },
  {
    path: "ciudad-editar/:id",
    component: EditarCiudadComponent
  },
  {
    path: "ciudads/:id/sede",
    component: ListarSedeComponent,
  },
  {
    path: "ciudads/:id/sede-agregar",
    component: CrearSedeComponent,
  },
  {
    path: "sede-listar",
    component: ListarSedeComponent
  },
  {
    path: "sedes/:id/salas",
    component: ListarSalaComponent,
  },
  {
    path: "sedes/:id/sala-agregar",
    component: CrearSalaComponent
  },
  {
    path: "sala-eliminar/:id",
    component: EliminarSalaComponent
  },
  {
    path: "sala-editar/:id",
    component: EditarSalaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
