import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SedeService } from '../../../../servicios/parametros/sede.service';
import { SedeModel } from '../../../../modelos/sede.model';

@Component({
  selector: 'app-crear-sede',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './crear-sede.component.html',
  styleUrl: './crear-sede.component.css'
})
export class CrearSedeComponent {
  ciudadId: number | null = null;
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicio: SedeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ciudadId = Number(this.route.snapshot.paramMap.get('id'));
    this.ConstruirFormularioDatos();
  }

  ConstruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudadId: [this.ciudadId, [Validators.required]]
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: SedeModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/ciudads', this.ciudadId, 'sede-listar']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      });
    }
  }

  obtenerRegistro(): SedeModel {
    let model = new SedeModel();
    model.nombre = this.obtenerFgDatos['nombre'].value;
    model.direccion = this.obtenerFgDatos['direccion'].value;
    model.ciudadId = this.obtenerFgDatos['ciudadId'].value;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}