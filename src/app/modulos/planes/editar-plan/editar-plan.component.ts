import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ClientePlanModel } from '../../../modelos/clientePlan.model';
import { ClienteService } from '../../../servicios/parametros/cliente.service';
import { ClientePlanService } from '../../../servicios/parametros/cliente-plan.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClienteModel } from '../../../modelos/cliente.model';
import { ConfiguracionPaginacion } from '../../../config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from '../../../config/configuracion.rutas.backend';
import { HttpClient } from '@angular/common/http';
import { PlanVencidoDialogComponent } from '../../reportes/plan-vencido-dialog/plan-vencido-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-plan',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  templateUrl: './editar-plan.component.html',
  styleUrl: './editar-plan.component.css'
})
export class EditarPlanComponent {
  fGroup: FormGroup = new FormGroup({});
  recordId: number = 0;
  clienteId: number = 0;
  planId: number = 0;
  nombre: string = '';
  detalles: string = '';
  tarifa: number = 0;
  fechaAdquisicion: Date = new Date();
  fechaVencimiento: Date = new Date();
  cantidadBeneficiarios: number = 0;
  activo: boolean = false;
  
  descuentos: number[] = [0,10, 20, 30, 40, 50, 60, 70];

  constructor(
    private fb: FormBuilder,
    private servicio: ClientePlanService,
    private router: Router,
    private route: ActivatedRoute  ) {
  }

  ngOnInit(): void {
    this.recordId = Number(this.route.snapshot.paramMap.get('id'));
    this.ContruirFormularioDatos();
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: ClientePlanModel) => {
        this.recordId = data.id!;
        this.nombre = data.nombre!;
        this.detalles = data.detalles!;
        this.tarifa = data.tarifa!;
        this.cantidadBeneficiarios = data.cantidadBeneficiarios!;
        this.fechaAdquisicion = data.fechaAdquisicion!;
        this.fechaVencimiento = data.fechaVencimiento!;
        this.obtenerFgDatos['descuento'].value;
        this.clienteId = data.clienteId!;
        this.planId = data.planId!;
      },
      error: (error: any) => {
        alert('Registro no encontrado');
      }
    });  
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.EditarRegistro(modelo).subscribe({
        next: () => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/planes/planes-adquiridos']);
        },
        error: () => {
          alert('Error al editar el registro');
        }
      })
    }
  }

  obtenerRegistro(): ClientePlanModel {
    let model = new ClientePlanModel();
    model.id = parseInt(this.obtenerFgDatos['id'].value);
    model.nombre = this.obtenerFgDatos['nombre'].value;
    model.detalles = this.obtenerFgDatos['detalles'].value;
    model.tarifa = parseFloat(this.obtenerFgDatos['tarifa'].value);
    model.cantidadBeneficiarios = parseInt(this.obtenerFgDatos['cantidadBeneficiarios'].value);
    model.fechaAdquisicion = this.obtenerFgDatos['fechaAdquisicion'].value;
    model.fechaVencimiento = this.obtenerFgDatos['fechaVencimiento'].value;
    model.descuento = parseInt(this.obtenerFgDatos['descuento'].value);
    model.planId = this.obtenerFgDatos['planId'].value;
    model.clienteId = this.obtenerFgDatos['clienteId'].value;
    return model;
  }

  ContruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      detalles: ['', [Validators.required]],
      tarifa: ['', [Validators.required]],
      fechaAdquisicion: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
      cantidadBeneficiarios: ['', [Validators.required]],
      descuento: [0],
      planId: ['', [Validators.required]],
      clienteId: ['', [Validators.required]]
    });
  }

  obtenerClientePlan(): ClientePlanModel {
    let model = new ClientePlanModel();
    model.id = parseInt(this.obtenerFgDatos['id'].value);
    model.nombre = this.obtenerFgDatos['nombre'].value;
    model.detalles = this.obtenerFgDatos['detalles'].value;
    model.tarifa = parseFloat(this.obtenerFgDatos['tarifa'].value);
    model.fechaAdquisicion = new Date(this.obtenerFgDatos['fechaAdquisicion'].value);
    model.fechaVencimiento = new Date(this.obtenerFgDatos['fechaVencimiento'].value);
    model.cantidadBeneficiarios = parseInt(this.obtenerFgDatos['cantidadBeneficiarios'].value);
    model.descuento = parseInt(this.obtenerFgDatos['descuento'].value); // Añadir campo de descuento si es necesario
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}