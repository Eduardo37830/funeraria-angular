import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SalaModel } from '../../../../modelos/sala.model';
import { SalaService } from '../../../../servicios/parametros/sala.service';
import { validarHoras } from './validarHora';

@Component({
  selector: 'app-crear-sala',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
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
      horaEntradaCuerpo: [''],
      horaSalidaCuerpo: [''],
      disponible: [true, [Validators.required]],
      sedeId: [this.sedeId, [Validators.required]],
    }, { validators: validarHoras() });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: SalaModel) => {
          console.log(data);
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/sedes', this.sedeId, 'sala-listar']);
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
    model.capacidad = parseInt(this.obtenerFgDatos['capacidad'].value);
    model.horaEntradaCuerpo = new Date() 
    model.horaSalidaCuerpo = new Date()
    model.disponible = this.obtenerFgDatos['disponible'].value;
    model.sedeId = parseInt(this.obtenerFgDatos['sedeId'].value);
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}