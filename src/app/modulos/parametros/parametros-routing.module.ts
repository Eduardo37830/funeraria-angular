import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPlanComponent } from './plan/listar-plan/listar-plan.component';
import { CrearPlanComponent } from './plan/crear-plan/crear-plan.component';
import { EditarPlanComponent } from './plan/editar-plan/editar-plan.component';
import { EliminarPlanComponent } from './plan/eliminar-plan/eliminar-plan.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
