import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { CiudadService } from '../../../../servicios/parametros/ciudad.service';
import { CiudadModel } from '../../../../modelos/ciudad.model';

@Component({
  selector: 'app-crear-ciudad',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './crear-ciudad.component.html',
  styleUrl: './crear-ciudad.component.css'
})
export class CrearCiudadComponent {
  DepartamentoId: number | null = null;
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicio: CiudadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.DepartamentoId = Number(this.route.snapshot.paramMap.get('id'));
    this.ConstruirFormularioDatos();
  }

  ConstruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      departamentoId: [this.DepartamentoId, [Validators.required]]
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: CiudadModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/departamentos', this.DepartamentoId, 'ciudads']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      });
    }
  }

  obtenerRegistro(): CiudadModel {
    let model = new CiudadModel();
    model.nombre = this.obtenerFgDatos['nombre'].value;
    model.departamentoId = this.obtenerFgDatos['departamentoId'].value;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}