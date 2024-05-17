import { Component } from '@angular/core';
import { SedeModel } from '../../../../modelos/sede.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { SedeService } from '../../../../servicios/parametros/sede.service';

@Component({
  selector: 'app-editar-sede',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './editar-sede.component.html',
  styleUrl: './editar-sede.component.css'
})
export class EditarSedeComponent {
  fGroup: FormGroup = new FormGroup({});
  ciudadId: number = 0;
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: SedeService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.route.params.subscribe(params => {
      this.ciudadId = +params['ids']; 
      this.recordId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.ContruirFormularioDatos();
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: SedeModel) => {
        this.obtenerFgDatos['id'].setValue(data.id);
        this.obtenerFgDatos['nombre'].setValue(data.nombre);
        this.obtenerFgDatos['direccion'].setValue(data.direccion);
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
      direccion: ['', [Validators.required]],
      ciudadId: [this.ciudadId, [Validators.required]],
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.EditarRegistro(modelo).subscribe({
        next: (data: SedeModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/ciudads', this.ciudadId, 'sede-listar']);
        },
        error: (error: any) => {
          alert('Error al editar el registro');
        }
      })
    }
  }

  obtenerRegistro(): SedeModel {
    let model = new SedeModel();
    model.id = parseInt(this.obtenerFgDatos['id'].value);
    model.nombre = this.obtenerFgDatos['nombre'].value;
    model.direccion = this.obtenerFgDatos['direccion'].value;
    model.ciudadId = parseInt(this.obtenerFgDatos['ciudadId'].value);
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}

