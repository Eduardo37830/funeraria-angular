import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesMorososComponent } from './clientes-morosos/clientes-morosos.component';

const routes: Routes = [
  {
    path: 'clientes-morosos',
    component: ClientesMorososComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
