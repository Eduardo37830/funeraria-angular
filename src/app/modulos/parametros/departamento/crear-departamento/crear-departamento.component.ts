import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DepartamentoService } from '../../../../servicios/parametros/departamento.service';
import { DepartamentoModel } from '../../../../modelos/departamento.model';

@Component({
  selector: 'app-crear-departamento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './crear-departamento.component.html',
  styleUrl: './crear-departamento.component.css'
})
export class CrearDepartamentoComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicio: DepartamentoService,
    private router: Router  ) {}

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
  }

  ConstruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: DepartamentoModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/departamento-listar']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      });
    }
  }

  obtenerRegistro(): DepartamentoModel {
    let model = new DepartamentoModel();
    model.nombre = this.obtenerFgDatos['nombre'].value;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}