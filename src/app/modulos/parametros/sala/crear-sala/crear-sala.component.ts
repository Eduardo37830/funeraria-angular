import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ConfiguracionPaginacion } from '../../../../config/configuracion.paginacion';
import { SalaModel } from '../../../../modelos/sala.model';
import { SalaService } from '../../../../servicios/parametros/sala.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-sala',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './crear-sala.component.html',
  styleUrl: './crear-sala.component.css'
})
export class CrearSalaComponent {
  sedeId: number | null = null;
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicio: SalaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sedeId = Number(this.route.snapshot.paramMap.get('id'));
    this.ConstruirFormularioDatos();
  }

  ConstruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      capacidad: ['', [Validators.required]],
      horaEntradaCuerpo: ['', [Validators.required]],
      horaSalidaCuerpo: ['', [Validators.required]],
      disponible: [true, [Validators.required]],
      sedeId: [this.sedeId, [Validators.required]]
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: SalaModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/sedes', this.sedeId, 'salas']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      });
    }
  }

  obtenerRegistro(): SalaModel {
    let model = new SalaModel();
    model.nombre = this.obtenerFgDatos['nombre'].value;
    model.tipo = this.obtenerFgDatos['tipo'].value;
    model.capacidad = this.obtenerFgDatos['capacidad'].value;
    model.horaEntradaCuerpo = this.obtenerFgDatos['horaEntradaCuerpo'].value;
    model.horaSalidaCuerpo = this.obtenerFgDatos['horaSalidaCuerpo'].value;
    model.disponibilidad = true;
    model.sedeId = this.sedeId!;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}