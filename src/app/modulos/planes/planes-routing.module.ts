import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdquirirPlanComponent } from './adquirir-plan/adquirir-plan.component';
import { RenovarPlanComponent } from './renovar-plan/renovar-plan.component';
import { ListarPlanComponent } from './listar-plan/listar-plan.component';
import { EliminarClientePlanComponent } from './eliminar-cliente-plan/eliminar-cliente-plan.component';
import { EditarPlanComponent } from './editar-plan/editar-plan.component';

const routes: Routes = [
  {
    path: 'cliente/:ids/adquirir-plan/:id',
    component: AdquirirPlanComponent
  },
  {
    path: 'cliente/:ids/renovar-plan/:id',
    component: RenovarPlanComponent
  
  },
  {
    path: 'cliente/:id/mis-planes',
    component: ListarPlanComponent
  },
  {
    path: 'descuento/:id',
    component: EditarPlanComponent
  },
  {
    path: 'planes-aquiridos',
    component: ListarPlanComponent
  },
  {
    path: 'cliente/:ids/eliminar-plan/:id',
    component: EliminarClientePlanComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanesRoutingModule { }
