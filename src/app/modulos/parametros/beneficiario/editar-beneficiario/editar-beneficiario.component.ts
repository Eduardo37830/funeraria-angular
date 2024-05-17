import { Component } from '@angular/core';
import { BeneficiarioModel } from '../../../../modelos/beneficiario.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ArchivoModel } from '../../../../modelos/archivo.model';
import { CommonModule } from '@angular/common';
import { BeneficiarioService } from '../../../../servicios/parametros/beneficiario.service';

@Component({
  selector: 'app-editar-beneficiario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './editar-beneficiario.component.html',
  styleUrl: './editar-beneficiario.component.css'
})
export class EditarBeneficiarioComponent {
  nombreAchivoCargado: string = '';
  fGroup: FormGroup = new FormGroup({});
  CargarArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: boolean = false;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;
  recordId: number = 0;
  clienteId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: BeneficiarioService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.route.params.subscribe(params => {
      this.clienteId = +params['ids']; 
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
      next: (data: BeneficiarioModel) => {
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
        this.obtenerFgDatos['fechaRegistro'].setValue(data.fechaRegistro);
        this.obtenerFgDatos['activo'].setValue(data.activo);
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
      fechaRegistro: ['', [Validators.required]],
      activo: ['', [Validators.required]],
      clienteId: [this.clienteId, [Validators.required]]
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      this.servicio.EditarRegistro(modelo).subscribe({
        next: (data: BeneficiarioModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/clientes', this.clienteId ,'beneficiario-listar']);
        },
        error: (error: any) => {
          alert('Error al editar el registro');
        }
      })
    }
  }

  obtenerRegistro(): BeneficiarioModel {
    let model = new BeneficiarioModel();
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
    model.fechaRegistro = this.obtenerFgDatos['fechaRegistro'].value;
    model.activo = this.obtenerFgDatos['activo'].value;
    model.clienteId = parseInt(this.obtenerFgDatos['clienteId'].value);
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
