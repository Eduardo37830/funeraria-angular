import { Component } from '@angular/core';
import { ClienteService } from '../../../../servicios/parametros/cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteModel } from '../../../../modelos/cliente.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchivoModel } from '../../../../modelos/archivo.model';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';

@Component({
  selector: 'app-eliminar-cliente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './eliminar-cliente.component.html',
  styleUrl: './eliminar-cliente.component.css'
})
export class EliminarClienteComponent {
  nombreAchivoCargado: string = '';
  fGroup: FormGroup = new FormGroup({});
  CargarArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: boolean = false;
  recordId: number = 0;
  primerNombre: string = '';
  segundoNombre: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  correo: string = '';
  celular: string = '';
  foto: string = '';
  ciudadResidencia: string = '';
  direccion: string = '';
  fechaRegistro: string = '';
  activo: boolean = false;
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private fb: FormBuilder,
    private servicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.recordId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.BuscarRegistro();
    this.ConstruirFormularioArchivo();
  }

  BuscarRegistro() {
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (data: ClienteModel) => {
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
        this.fechaRegistro = data.fechaRegistro!.toString(); // Convert 'Date' type to string
        this.activo = data.activo!;
      },
      error: (error: any) => {
        alert('Registro no encontrado');
      }
    });  
  }

  EliminarRegistro() {
    this.servicio.EliminarRegistro(this.recordId).subscribe({
      next: (data: ClienteModel) => {
        alert('Registro eliminado correctamente');
        this.router.navigate(['/parametros/cliente-listar']);
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
}