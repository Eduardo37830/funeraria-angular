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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
