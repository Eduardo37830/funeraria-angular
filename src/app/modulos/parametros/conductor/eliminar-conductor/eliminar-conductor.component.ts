import { Component } from '@angular/core';
import { ConductorModel } from '../../../../modelos/conductor.model';
import { ConductorService } from '../../../../servicios/parametros/conductor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ArchivoModel } from '../../../../modelos/archivo.model';

@Component({
  selector: 'app-eliminar-conductor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './eliminar-conductor.component.html',
  styleUrl: './eliminar-conductor.component.css'
})
export class EliminarConductorComponent {
  nombreAchivoCargado: string = '';
  fGroup: FormGroup = new FormGroup({});
  CargarArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: boolean = false;
  recordId: number = 0;
  sedeId: number = 0;
  primerNombre: string = '';
  segundoNombre: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  correo: string = '';
  celular: string = '';
  foto: string = '';
  ciudadResidencia: string = '';
  direccion: string = '';
  responsabilidades: string = '';
  disponibilidad: boolean = false;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

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
    this.BuscarRegistro();
    this.ConstruirFormularioArchivo();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: ConductorModel) => {
        this.recordId = data.id!;
        this.primerNombre = data.primerNombre!;
        this.segundoNombre = data.segundoNombre!;
        this.primerApellido = data.primerApellido!;
        this.segundoApellido = data.segundoApellido!;
        this.correo = data.correo!;
        this.celular = data.celular!;
        this.foto = data.foto!;
        this.nombreAchivoCargado = data.foto!;
        this.archivoCargado = true;
        this.ciudadResidencia = data.ciudadResidencia!;
        this.direccion = data.direccion!;
        this.responsabilidades = data.responsabilidades!;
        this.disponibilidad = data.disponibilidad!;
        this.sedeId = data.sedeId!;
      },
      error: (error: any) => {
        alert('Registro no encontrado');
      }
    });  
  }

  EliminarRegistro() {
    this.servicio.EliminarRegistro(this.recordId).subscribe({
      next: (data: ConductorModel) => {
        alert('Registro eliminado correctamente');
        this.router.navigate(['/parametros/sedes', this.sedeId, 'conductor-listar']);
      },
      error: (error: any) => {
        alert('Error al eliminar el registro');
      }
    });
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

