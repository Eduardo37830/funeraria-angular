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
  planId: number | null = null;
  clientePlan: ClientePlanModel | null = null;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private servicio: ClientePlanService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { 
    this.route.params.subscribe(params => {
      this.clienteId = +params['ids'];
      this.recordId = +params['id'];
    });
  }

  ngOnInit() {
    this.ContruirFormularioDatos();
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: ClientePlanModel) => {
        this.clientePlan = data;
        this.fGroup.patchValue(data);
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
      mesesAPagar: ['', [Validators.required]],
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
  
      let fechaVencimiento = new Date(this.obtenerFgDatos['fechaAdquisicion'].value);
      let mesActual = fechaVencimiento.getMonth();
      let mesesAPagar = this.obtenerFgDatos['mesesAPagar'].value;
  
      fechaVencimiento.setMonth(mesActual + parseInt(mesesAPagar));
  
      modelo.tarifa = parseFloat(this.obtenerFgDatos['tarifa'].value) * parseInt(mesesAPagar);
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
}
