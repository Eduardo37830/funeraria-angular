import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SalaModel } from '../../../../modelos/sala.model';
import { SalaService } from '../../../../servicios/parametros/sala.service';

@Component({
  selector: 'app-editar-sala',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './editar-sala.component.html',
  styleUrl: './editar-sala.component.css'
})
export class EditarSalaComponent {
  fGroup: FormGroup = new FormGroup({});
  sedeId: number = 0;
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: SalaService,
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
      next: (data: SalaModel) => {
        this.obtenerFgDatos['id'].setValue(data.id);
        this.obtenerFgDatos['nombre'].setValue(data.nombre);
        this.obtenerFgDatos['tipo'].setValue(data.tipo);
        this.obtenerFgDatos['capacidad'].setValue(data.capacidad);
        this.obtenerFgDatos['horaEntradaCuerpo'].setValue(data.horaEntradaCuerpo);
        this.obtenerFgDatos['horaSalidaCuerpo'].setValue(data.horaSalidaCuerpo);
        this.obtenerFgDatos['disponible'].setValue(data.disponible);
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
      tipo: ['', [Validators.required]],
      capacidad: ['', [Validators.required]],
      horaEntradaCuerpo: ['', [Validators.required]],
      horaSalidaCuerpo: [''],
      disponible: ['', [Validators.required]],
      sedeId: [this.sedeId, [Validators.required]],
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      modelo.horaSalidaCuerpo = new Date(modelo.horaEntradaCuerpo!); // Asignar la fecha de salida como 3 horas después de la entrada
      modelo.horaSalidaCuerpo.setHours(modelo.horaSalidaCuerpo.getHours() + 3);
      this.servicio.EditarRegistro(modelo).subscribe({
        next: (data: SalaModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/sedes', this.sedeId, 'sala-listar']);
        },
        error: (error: any) => {
          alert('Error al editar el registro');
        }
      })
    }
  }

  obtenerRegistro(): SalaModel {
    let model = new SalaModel();
    model.id = parseInt(this.obtenerFgDatos['id'].value);
    model.nombre = this.obtenerFgDatos['nombre'].value;
    model.tipo = this.obtenerFgDatos['tipo'].value;
    model.capacidad = parseInt(this.obtenerFgDatos['capacidad'].value);
    model.horaEntradaCuerpo = this.obtenerFgDatos['horaEntradaCuerpo'].value;
    model.horaSalidaCuerpo = this.obtenerFgDatos['horaSalidaCuerpo'].value;
    model.disponible = this.obtenerFgDatos['disponible'].value;
    model.sedeId = parseInt(this.obtenerFgDatos['sedeId'].value);
    return model;
  }
  

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}


