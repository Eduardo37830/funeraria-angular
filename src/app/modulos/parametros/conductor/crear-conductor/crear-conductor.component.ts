import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConductorModel } from '../../../../modelos/conductor.model';
import { ConductorService } from '../../../../servicios/parametros/conductor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-conductor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './crear-conductor.component.html',
  styleUrl: './crear-conductor.component.css'
})
export class CrearConductorComponent {
  sedeId: number | null = null;
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicio: ConductorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sedeId = Number(this.route.snapshot.paramMap.get('id'));
    this.ConstruirFormularioDatos();
  }

  ConstruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
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
      disponibilidad: [true, [Validators.required]],
      sedeId: [this.sedeId, [Validators.required]]
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: ConductorModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/sedes', this.sedeId, 'conductor-listar']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      });
    }
  }

  obtenerRegistro(): ConductorModel {
    let model = new ConductorModel();
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
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}