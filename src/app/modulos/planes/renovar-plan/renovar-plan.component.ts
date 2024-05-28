import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ClientePlanModel } from '../../../modelos/clientePlan.model';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientePlanService } from '../../../servicios/parametros/cliente-plan.service';
import { ConfiguracionPaginacion } from '../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-renovar-plan',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  templateUrl: './renovar-plan.component.html',
  styleUrl: './renovar-plan.component.css'
})
export class RenovarPlanComponent {
  fGroup: FormGroup = new FormGroup({});
  pag = 1;
  total = 0;
  recordId: number = 0;
  clienteId: number | null = null;
  clientePlan: ClientePlanModel[] = [];
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private servicio: ClientePlanService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { 
    this.route.params.subscribe(params => {
      this.clienteId = +params['ids'];
      this.recordId = +params['id'];
    });
  }

  ngOnInit() {
    this.ContruirFormularioDatos();
    console.log(this.ContruirFormularioDatos())
    this.BuscarRegistro();
    this.obtenerPlanCliente();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: ClientePlanModel) => {
        this.obtenerFgDatos['id'].setValue(data.id);
        this.obtenerFgDatos['nombre'].setValue(data.nombre);
        this.obtenerFgDatos['detalles'].setValue(data.detalles);
        this.obtenerFgDatos['tarifa'].setValue(data.tarifa);
        this.obtenerFgDatos['cantidadBeneficiarios'].setValue(data.cantidadBeneficiarios);
        this.obtenerFgDatos['fechaAdquisicion'].setValue(data.fechaAdquisicion);
        this.obtenerFgDatos['fechaVencimiento'].setValue(data.fechaVencimiento);
        this.obtenerFgDatos['activo'].setValue(data.activo);
        this.obtenerFgDatos['planId'].setValue(data.planId);
        this.obtenerFgDatos['clienteId'].setValue(data.clienteId);
      },
      error: (error: any) => {
        alert('Registro no encontrado');
      }
    });  
  }

  ContruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      detalles: ['', [Validators.required]],
      tarifa: ['', [Validators.required]],
      cantidadBeneficiarios: ['', [Validators.required]],
      fechaAdquisicion: [new Date(), [Validators.required]],
      fechaVencimiento: [''],
      activo: [],
      planId: [],
      clienteId: [this.clienteId, [Validators.required]],
      mesesAPagar: [1, [Validators.required]],
      metodoPago: [''],
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
      console.log(this.fGroup);
    } else if (!this.recordId) {
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

      let fechaVencimiento = new Date();
      let mesActual = fechaVencimiento.getMonth();
      let mesesAPagar = this.obtenerFgDatos['mesesAPagar'].value;
      fechaVencimiento.setMonth(mesActual + mesesAPagar);

      modelo.tarifa = parseFloat(this.obtenerFgDatos['tarifa'].value) * mesesAPagar;
      modelo.fechaVencimiento = fechaVencimiento;
      console.log(modelo);
      this.servicio.EditarRegistro(modelo).subscribe({
        next: (data: ClientePlanModel) => {
          alert('Registro guardado correctamente');
        },
        error: (error) => {
          alert('Error al guardar el registro');
        }
      });
    }
  }

  obtenerRegistro(): ClientePlanModel {
    let model = new ClientePlanModel();
    model.id = parseInt(this.obtenerFgDatos['id'].value);
    model.nombre = this.obtenerFgDatos['nombre'].value;
    model.detalles = this.obtenerFgDatos['detalles'].value;
    model.tarifa = parseFloat(this.obtenerFgDatos['tarifa'].value);
    model.fechaAdquisicion = new Date();
    model.cantidadBeneficiarios = parseInt(this.obtenerFgDatos['cantidadBeneficiarios'].value);
    model.activo = true;
    model.planId = this.obtenerFgDatos['planId'].value;
    model.clienteId = this.clienteId!;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
  obtenerPlanCliente(): void {
    if (this.clienteId !== null) {
      this.http.get<ClientePlanModel[]>(`${this.BASE_URL}clientes/${this.clienteId}/plans`)
        .subscribe(
          (plan) => {
            this.clientePlan = plan;
          },
          (error) => {
            console.error('Error al obtener el plan:', error);
          }
        );
    }
  }
}