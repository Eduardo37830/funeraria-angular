import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CiudadService } from '../../../../servicios/parametros/ciudad.service';
import { CiudadModel } from '../../../../modelos/ciudad.model';

@Component({
  selector: 'app-editar-ciudad',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './editar-ciudad.component.html',
  styleUrl: './editar-ciudad.component.css'
})
export class EditarCiudadComponent {
  fGroup: FormGroup = new FormGroup({});
  departamentoId: number = 0;
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: CiudadService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.route.params.subscribe(params => {
      this.departamentoId = +params['ids']; 
      this.recordId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.ContruirFormularioDatos();
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: CiudadModel) => {
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
      departamentoId: [this.departamentoId, [Validators.required]],
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.EditarRegistro(modelo).subscribe({
        next: (data: CiudadModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/departamentos', this.departamentoId, 'ciudads']);
        },
        error: (error: any) => {
          alert('Error al editar el registro');
        }
      })
    }
  }

  obtenerRegistro(): CiudadModel {
    let model = new CiudadModel();
    model.id = parseInt(this.obtenerFgDatos['id'].value);
    model.nombre = this.obtenerFgDatos['nombre'].value;
    model.departamentoId = parseInt(this.obtenerFgDatos['departamentoId'].value);
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}

