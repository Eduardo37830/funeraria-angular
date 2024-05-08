import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { PlanService } from '../../../../servicios/parametros/plan.service';
import { PlanModel } from '../../../../modelos/plan.model';

@Component({
  selector: 'app-crear-plan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './crear-plan.component.html',
  styleUrl: './crear-plan.component.css'
})
export class CrearPlanComponent {
  fGroup: FormGroup = new FormGroup({});
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private fb: FormBuilder,
    private servicio: PlanService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.ContruirFormularioDatos();
  }

  ContruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      detalles: ['', [Validators.required]],
      mensualidad: ['', [Validators.required]],
      cantidadBeneficiarios: ['', [Validators.required]]
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: PlanModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/plan-listar']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      })
    }
  }

  obtenerRegistro(): PlanModel {
    let model = new PlanModel();
    model.nombre = this.obtenerFgDatos['nombre'].value;
    model.detalles = this.obtenerFgDatos['detalles'].value;
    model.mensualidad = this.obtenerFgDatos['mensualidad'].value;
    model.cantidadBeneficiarios = this.obtenerFgDatos['cantidadBeneficiarios'].value;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}
