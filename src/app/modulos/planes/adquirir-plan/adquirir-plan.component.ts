import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { PlanModel } from '../../../modelos/plan.model';
import { PlanService } from '../../../servicios/parametros/plan.service';
import { ConfiguracionPaginacion } from '../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../config/configuracion.rutas.backend';
import { ClientePlanModel } from '../../../modelos/clientePlan.model';

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
  fGroup: FormGroup = new FormGroup({});
  planId: number = 0;
  clienteId: number = 0;

  constructor(
    private servicioPlanes: PlanService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe(params => {
      this.clienteId = +params['ids']; 
      this.planId = +params['id'];
    });
  }

  ngOnInit() {
    this.ListarRegistros();
    if (this.planId) {
      this.seleccionarPlanPorId(this.planId);
    }
  }

  ListarRegistros() {
    this.servicioPlanes.listarRegistrosPaginados(this.pag).subscribe({
      next: (datos) => {
        this.listaRegistros = datos.registros;
        this.total = datos.totalRegistros;
        if (this.planId) {
          this.seleccionarPlanPorId(this.planId);
        }
      },
      error: (error) => {
        alert('Error leyendo la información de la base de datos');
      }
    });
  }

  seleccionarPlanPorId(id: number) {
    this.planSeleccionado = this.listaRegistros.find(plan => plan.id === id) || null;
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

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicioPlanes.AgregarPlan(modelo).subscribe({
        next: (data: ClientePlanModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['parametros/clientes',this.clienteId ,'beneficiario-listar']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      });
    }
  }

  obtenerRegistro(): ClientePlanModel {
    let model = new ClientePlanModel();
    model.tarifa = this.planSeleccionado!.mensualidad
    model.fecha = new Date();
    model.cantidadBeneficiarios = this.planSeleccionado!.cantidadBeneficiarios;
    model.clienteId = this.clienteId;
    model.planId = this.planId;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}