import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../../../servicios/parametros/cliente.service';
import { ClienteModel } from '../../../../modelos/cliente.model';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ArchivoModel } from '../../../../modelos/archivo.model';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent {
  fGroup: FormGroup = new FormGroup({});
  nombreAchivoCargado: string = '';
  CargarArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: boolean = false;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.ContruirFormularioDatos();
    this.ConstruirFormularioArchivo();
  }

  ContruirFormularioDatos(): void {
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
      fechaRegistro: ['', [Validators.required]],
      activo: ['', [Validators.required]]
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: ClienteModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/cliente-listar']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      })
    }
  }

  obtenerRegistro(): ClienteModel {
    let model = new ClienteModel();
    model.primerNombre = this.obtenerFgDatos['primerNombre'].value;
    model.segundoNombre = this.obtenerFgDatos['segundoNombre'].value;
    model.primerApellido = this.obtenerFgDatos['primerApellido'].value;
    model.segundoApellido = this.obtenerFgDatos['segundoApellido'].value;
    model.correo = this.obtenerFgDatos['correo'].value;
    model.celular = this.obtenerFgDatos['celular'].value;
    model.foto = this.obtenerFgDatos['foto'].value;
    model.ciudadResidencia = this.obtenerFgDatos['ciudadResidencia'].value;
    model.direccion = this.obtenerFgDatos['direccion'].value;
    model.fechaRegistro = this.obtenerFgDatos['fechaRegistro'].value;
    model.activo = this.obtenerFgDatos['activo'].value;
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

