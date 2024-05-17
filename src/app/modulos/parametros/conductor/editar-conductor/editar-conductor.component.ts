import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConductorService } from '../../../../servicios/parametros/conductor.service';
import { ConductorModel } from '../../../../modelos/conductor.model';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ArchivoModel } from '../../../../modelos/archivo.model';

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
  nombreAchivoCargado: string = '';
  fGroup: FormGroup = new FormGroup({});
  CargarArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: boolean = false;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  recordId: number = 0;
  sedeId: number = 0;
  servicioFunerarioId: number = 0;

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
    this.ConstruirFormularioArchivo();
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
        this.nombreAchivoCargado = data.foto!;
        this.archivoCargado = true;
        this.obtenerFgDatos['ciudadResidencia'].setValue(data.ciudadResidencia);
        this.obtenerFgDatos['direccion'].setValue(data.direccion);
        this.obtenerFgDatos['responsabilidades'].setValue(data.responsabilidades);
        this.obtenerFgDatos['disponibilidad'].setValue(data.disponibilidad);
        this.obtenerFgDatos['sedeId'].setValue(data.sedeId);
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
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }

   /** Carga de Archivo */

   ConstruirFormularioArchivo(): void {
    this.CargarArchivoFG = this.fb.group({
      archivo: ['', []]
    });
  }

  get obtenerFgArchivo() {
    return this.CargarArchivoFG.controls;
  }

  CargarArchivo() {
    const formData = new FormData();
    formData.append('file', this.CargarArchivoFG.controls['archivo'].value);
    console.log(formData);
    this.servicio.CargarArchivo(formData).subscribe({
      next: (data: ArchivoModel) => {
        this.nombreAchivoCargado = data.file;
        this.obtenerFgDatos['foto'].setValue(this.nombreAchivoCargado);
        this.archivoCargado = true; 
        alert('Archivo cargado correctamente');
      },
      error: (error: any) => {
        alert('Error al cargar el archivo');
      }
    });
  }

  CuandoSeleccionaArchivo(event: any) {
    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      this.obtenerFgArchivo['archivo'].setValue(f);
    }
  }
}


