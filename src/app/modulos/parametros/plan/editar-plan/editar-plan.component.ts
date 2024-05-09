import { Component } from '@angular/core';
import { PlanModel } from '../../../../modelos/plan.model';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlanService } from '../../../../servicios/parametros/plan.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-plan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './editar-plan.component.html',
  styleUrl: './editar-plan.component.css'
})
export class EditarPlanComponent {
  fGroup: FormGroup = new FormGroup({});
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: PlanService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.recordId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.ContruirFormularioDatos();
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: PlanModel) => {
        this.obtenerFgDatos['id'].setValue(data.id);
        this.obtenerFgDatos['nombre'].setValue(data.nombre);
        this.obtenerFgDatos['detalles'].setValue(data.detalles);
        this.obtenerFgDatos['mensualidad'].setValue(data.mensualidad);
        this.obtenerFgDatos['cantidadBeneficiarios'].setValue(data.cantidadBeneficiarios);
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
      mensualidad: ['', [Validators.required]],
      cantidadBeneficiarios: ['', [Validators.required]]
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.EditarRegistro(modelo).subscribe({
        next: (data: PlanModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/plan-listar']);
        },
        error: (error: any) => {
          alert('Error al editar el registro');
        }
      })
    }
  }

  obtenerRegistro(): PlanModel {
    let model = new PlanModel();
    model.id = parseInt(this.obtenerFgDatos['id'].value);
    model.nombre = this.obtenerFgDatos['nombre'].value;
    model.detalles = this.obtenerFgDatos['detalles'].value;
    model.mensualidad = parseFloat(this.obtenerFgDatos['mensualidad'].value);
    model.cantidadBeneficiarios = parseInt(this.obtenerFgDatos['cantidadBeneficiarios'].value);
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}

