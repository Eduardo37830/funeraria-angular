import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConductorService } from '../../../../servicios/parametros/conductor.service';
import { ConductorModel } from '../../../../modelos/conductor.model';

@Component({
  selector: 'app-editar-conductor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './editar-conductor.component.html',
  styleUrl: './editar-conductor.component.css'
})
export class EditarConductorComponent {
  fGroup: FormGroup = new FormGroup({});
  sedeId: number = 0;
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: ConductorService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.route.params.subscribe(params => {
      this.sedeId = +params['ids']; 
      this.recordId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.ContruirFormularioDatos();
    this.BuscarRegistro();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: ConductorModel) => {
        this.obtenerFgDatos['id'].setValue(data.id);
        this.obtenerFgDatos['primerNombre'].setValue(data.primerNombre);
        this.obtenerFgDatos['segundoNombre'].setValue(data.segundoNombre);
        this.obtenerFgDatos['primerApellido'].setValue(data.primerApellido);
        this.obtenerFgDatos['segundoApellido'].setValue(data.segundoApellido);
        this.obtenerFgDatos['correo'].setValue(data.correo);
        this.obtenerFgDatos['celular'].setValue(data.celular);
        this.obtenerFgDatos['foto'].setValue(data.foto);
        this.obtenerFgDatos['ciudadResidencia'].setValue(data.ciudadResidencia);
        this.obtenerFgDatos['direccion'].setValue(data.direccion);
        this.obtenerFgDatos['responsabilidades'].setValue(data.responsabilidades);
      },
      error: (error: any) => {
        alert('Registro no encontrado');
      }
    });  
  }

  ContruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      primerNombre: ['', [Validators.required]],
      segundoNombre: ['', [Validators.required]],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      ciudadResidencia: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      responsabilidades: ['', [Validators.required]],
      disponibilidad: ['', [Validators.required]],
      sedeId: [this.sedeId, [Validators.required]],
      servicioFunerarioId: [null, [Validators.required]]
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.EditarRegistro(modelo).subscribe({
        next: (data: ConductorModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/sedes', this.sedeId, 'conductor-listar']);
        },
        error: (error: any) => {
          alert('Error al editar el registro');
        }
      })
    }
  }

  obtenerRegistro(): ConductorModel {
    let model = new ConductorModel();
    model.id = parseInt(this.obtenerFgDatos['id'].value);
    model.primerNombre = this.obtenerFgDatos['primerNombre'].value;
    model.segundoNombre = this.obtenerFgDatos['segundoNombre'].value;
    model.primerApellido = this.obtenerFgDatos['primerApellido'].value;
    model.segundoApellido = this.obtenerFgDatos['segundoApellido'].value;
    model.correo = this.obtenerFgDatos['correo'].value;
    model.celular = this.obtenerFgDatos['celular'].value;
    model.foto = this.obtenerFgDatos['foto'].value;
    model.ciudadResidencia = this.obtenerFgDatos['ciudadResidencia'].value;
    model.direccion = this.obtenerFgDatos['direccion'].value;
    model.responsabilidades = this.obtenerFgDatos['responsabilidades'].value;
    model.disponibilidad = this.obtenerFgDatos['disponibilidad'].value;
    model.sedeId = this.obtenerFgDatos['sedeId'].value;
    model.servicioFunerarioId = this.obtenerFgDatos['servicioFunerarioId'].value;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}


