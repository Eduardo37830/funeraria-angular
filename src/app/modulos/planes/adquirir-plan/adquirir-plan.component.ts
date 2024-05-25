import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  planId: number | null = null;
  clienteId: number | null = null;

  constructor(
    private servicioPlanes: PlanService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.route.params.subscribe(params => {
      this.clienteId = +params['ids']; 
      this.planId = +params['id'];
    });
  }

  ngOnInit() {
    this.ConstruirFormularioDatos();
    this.ListarRegistros();
    if (this.planId) {
      this.seleccionarPlanPorId(this.planId);
    }
  }

  ConstruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      tarifa: ['', [Validators.required]],
      fechaAdquisicion: [new Date(), [Validators.required]],
      fechaVencimiento: [''],
      cantidadBeneficiarios: ['', [Validators.required]],
      clienteId: [this.clienteId, [Validators.required]],
      planId: [this.planId, [Validators.required]],
      mesesAPagar: [1, [Validators.required]],
      metodoPago: ['']
    });
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
    if (this.planSeleccionado) {
      this.fGroup.patchValue({
        tarifa: this.planSeleccionado.mensualidad,
        cantidadBeneficiarios: this.planSeleccionado.cantidadBeneficiarios
      });
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else if (!this.planSeleccionado) {
      alert('Por favor, seleccione un plan antes de confirmar.');
    } else {
      this.GuardarRegistro();
    }
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      console.log(modelo);
      let fechaVencimiento = new Date(modelo.fechaAdquisicion!);
  
      // Obtén el mes actual y suma los meses a pagar
      let mesActual = new Date().getMonth();
      let mesesAPagar = this.obtenerFgDatos['mesesAPagar'].value;
      fechaVencimiento.setMonth(mesActual + mesesAPagar);

      modelo.fechaVencimiento = fechaVencimiento;
      this.servicioPlanes.AgregarPlan(modelo).subscribe({
        next: (data: ClientePlanModel) => {
          alert('Registro guardado correctamente');
          console.log('Procesando pago...');
          setTimeout(() => {
            this.mostrarModalPagoExitoso();
            setTimeout(() => {
              this.cerrarModal();
              this.router.navigate(['parametros/clientes', this.clienteId, 'beneficiario-listar']);
            }, 3000);
          }, 2000);
        },
        error: (error) => {
          alert('Error al guardar el registro');
        }
      });
    }
  }

  obtenerRegistro(): ClientePlanModel {
    let model = new ClientePlanModel();
    let mesesAPagar = this.fGroup.value.mesesAPagar;
  
    model.tarifa = this.planSeleccionado!.mensualidad! * mesesAPagar;
    model.fechaAdquisicion = new Date();
    model.cantidadBeneficiarios = this.planSeleccionado!.cantidadBeneficiarios;
    model.clienteId = this.clienteId!;
    model.planId = this.planId!;
    
    return model;
  }

  mostrarModalPagoExitoso() {
    const modal = document.getElementById('modalPagoExitoso');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  cerrarModal() {
    const modal = document.getElementById('modalPagoExitoso');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}