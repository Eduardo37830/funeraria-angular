import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdquirirPlanComponent } from './adquirir-plan/adquirir-plan.component';

const routes: Routes = [
  {
    path: 'adquirir-plan',
    component: AdquirirPlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanesRoutingModule { }
