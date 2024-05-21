import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BeneficiarioService } from '../../../../servicios/parametros/beneficiario.service';
import { BeneficiarioModel } from '../../../../modelos/beneficiario.model';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ArchivoModel } from '../../../../modelos/archivo.model';

@Component({
  selector: 'app-crear-beneficiario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './crear-beneficiario.component.html',
  styleUrl: './crear-beneficiario.component.css'
})
export class CrearBeneficiarioComponent {
  fGroup: FormGroup = new FormGroup({});
  nombreAchivoCargado: string = '';
  CargarArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: boolean = false;
  clienteId: number | null = null;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private fb: FormBuilder,
    private servicio: BeneficiarioService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.ContruirFormularioDatos();
    this.ConstruirFormularioArchivo();
  }

  ContruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      primerNombre: ['', [Validators.required]],
      segundoNombre: [''],
      primerApellido: ['', [Validators.required]],
      segundoApellido: [''],
      correo: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      foto: [''],
      ciudadResidencia: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fechaRegistro: [new Date(), [Validators.required]],
      activo: [true, [Validators.required]],
      clienteId: [this.clienteId, [Validators.required]]
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      console.log(this.fGroup);
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      console.log(modelo);
      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: BeneficiarioModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/clientes', this.clienteId ,'beneficiario-listar']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      })
    }
  }

  obtenerRegistro(): BeneficiarioModel {
    let model = new BeneficiarioModel();
    model.primerNombre = this.obtenerFgDatos['primerNombre'].value;
    model.segundoNombre = this.obtenerFgDatos['segundoNombre'].value;
    model.primerApellido = this.obtenerFgDatos['primerApellido'].value;
    model.segundoApellido = this.obtenerFgDatos['segundoApellido'].value;
    model.correo = this.obtenerFgDatos['correo'].value;
    model.celular = this.obtenerFgDatos['celular'].value;
    model.foto = this.CargarArchivoFG.controls['archivo'].value;
    model.ciudadResidencia = this.obtenerFgDatos['ciudadResidencia'].value;
    model.direccion = this.obtenerFgDatos['direccion'].value;
    model.fechaRegistro = new Date();
    model.activo = true;
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

