import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { PlanModel } from '../../../modelos/plan.model';
import { PlanService } from '../../../servicios/parametros/plan.service';
import { ConfiguracionPaginacion } from '../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../config/configuracion.rutas.backend';

@Component({
  selector: 'app-adquirir-plan',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    
  ],
  templateUrl: './adquirir-plan.component.html',
  styleUrls: ['./adquirir-plan.component.css']
})
export class AdquirirPlanComponent implements OnInit {
  listaRegistros: PlanModel[] = [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  planSeleccionado: PlanModel | null = null;

  constructor(private servicioPlanes: PlanService) { }

  ngOnInit() {
    this.ListarRegistros();
  }

  ListarRegistros() {
    this.servicioPlanes.listarRegistrosPaginados(this.pag).subscribe({
      next: (datos) => {
        this.listaRegistros = datos.registros;
        this.total = datos.totalRegistros;
      },
      error: (error) => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }

  seleccionarPlan(event: Event) {
    const selectedPlanId = +(event.target as HTMLSelectElement).value;
    this.planSeleccionado = this.listaRegistros.find(plan => plan.id === selectedPlanId) || null;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.planSeleccionado) {
      console.log('Plan seleccionado:', this.planSeleccionado);
      // Aquí puedes manejar la lógica de la confirmación del plan
    } else {
      alert('Por favor, seleccione un plan antes de confirmar.');
    }
  }
}