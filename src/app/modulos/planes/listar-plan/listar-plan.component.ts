import { Component } from '@angular/core';
import { ClientePlanModel } from '../../../modelos/clientePlan.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfiguracionPaginacion } from '../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../config/configuracion.rutas.backend';
import { ClienteModel } from '../../../modelos/cliente.model';
import { PlanService } from '../../../servicios/parametros/plan.service';
import { PlanModel } from '../../../modelos/plan.model';

@Component({
  selector: 'app-listar-plan',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './listar-plan.component.html',
  styleUrl: './listar-plan.component.css'
})
export class ListarPlanComponent {
  listaRegistros: PlanModel[] = [];
  pag = 1;
  total = 0;
  clientes: ClienteModel[] = [];
  plan: ClientePlanModel[] = [];
  clienteId: number | null = null;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private servicioPlanes: PlanService,
    private http: HttpClient,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void{
    this.ListarRegistros();
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.ListarRegistrosPlan();
    console.log('ClienteId:', this.clienteId);
    
    this.obtenerPlanCliente();
  }

  ListarRegistros() {
    this.servicioPlanes.listarRegistrosPagina(this.pag).subscribe({
      next: (datos) => {
        this.listaRegistros = datos.registros;
        this.total = datos.totalRegistros;
      },
      error: () => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }

  ListarRegistrosPlan() {
    this.servicioPlanes.listarRegistrosPagina(this.clienteId!).subscribe({
      next: (datos) => {
        this.listaRegistros = datos.registros;
        this.total = datos.totalRegistros;
      },
      error: () => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }

  obtenerPlanCliente(): void {
    if (this.clienteId !== null) {
      this.http.get<ClientePlanModel[]>(`${this.BASE_URL}clientes/${this.clienteId}/plans`)
        .subscribe(
          (planes) => {
            this.plan = planes;
            console.log('Plan obtenidos:', planes + "clie" + this.clienteId); // Verifica si se obtienen planes
          },
          (error) => {
            console.error('Error al obtener el plan:', error);
          }
        );
    }
  }
}