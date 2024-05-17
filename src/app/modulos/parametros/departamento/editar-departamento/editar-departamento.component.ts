import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DepartamentoService } from '../../../../servicios/parametros/departamento.service';
import { DepartamentoModel } from '../../../../modelos/departamento.model';
import { PlanModel } from '../../../../modelos/plan.model';

@Component({
  selector: 'app-editar-departamento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './editar-departamento.component.html',
  styleUrl: './editar-departamento.component.css'
})
export class EditarDepartamentoComponent {
  fGroup: FormGroup = new FormGroup({});
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: DepartamentoService,
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
      next: (data: DepartamentoModel) => {
        this.obtenerFgDatos['id'].setValue(data.id);
        this.obtenerFgDatos['nombre'].setValue(data.nombre);
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
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.EditarRegistro(modelo).subscribe({
        next: (data: DepartamentoModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/departamento-listar']);
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
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}

