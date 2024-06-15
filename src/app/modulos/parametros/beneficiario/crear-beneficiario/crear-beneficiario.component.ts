import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BeneficiarioService } from '../../../../servicios/parametros/beneficiario.service';
import { BeneficiarioModel } from '../../../../modelos/beneficiario.model';
import { ConfiguracionRutasBackend } from '../../../../config/configuracion.rutas.backend';
import { ArchivoModel } from '../../../../modelos/archivo.model';
import { ClientePlanModel } from '../../../../modelos/clientePlan.model';
import { PlanVencidoDialogComponent } from '../../../reportes/plan-vencido-dialog/plan-vencido-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ClienteModel } from '../../../../modelos/cliente.model';

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
  styleUrls: ['./crear-beneficiario.component.css']
})
export class CrearBeneficiarioComponent {
  // Formulario para datos del beneficiario
  fGroup: FormGroup = new FormGroup({});
  // Nombre del archivo cargado
  nombreAchivoCargado: string = '';
  // Formulario para carga de archivo
  CargarArchivoFG: FormGroup = new FormGroup({});
  // Estado de carga de archivo
  archivoCargado: boolean = false;
  // ID del cliente actual
  clienteId: number | null = null;
  // Planes del cliente
  plan: ClientePlanModel[] = [];
  // Beneficiarios del cliente
  beneficiario: BeneficiarioModel[] = [];
  // URL base para solicitudes HTTP
  BASE_URL: string = ConfiguracionRutasBackend.urlNegocio;

  constructor(
    private fb: FormBuilder,
    private servicio: BeneficiarioService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerPlanCliente();
    this.ConstruirFormularioDatos();
    this.ConstruirFormularioArchivo();
    this.obtenerBeneficiarios();
  }

  /**
   * Construye el formulario para los datos del beneficiario.
   */
  ConstruirFormularioDatos(): void {
    this.fGroup = this.fb.group({
      primerNombre: ['', [Validators.required]],
      segundoNombre: [''],
      primerApellido: ['', [Validators.required]],
      segundoApellido: [''],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      foto: [''],
      ciudadResidencia: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fechaRegistro: [new Date(), [Validators.required]],
      activo: [true, [Validators.required]],
      clienteId: [this.clienteId, [Validators.required]]
    });
  }

  /**
   * Guarda el registro del beneficiario.
   * Verifica que no se supere el límite de beneficiarios antes de guardar.
   */
  GuardarRegistro() {
    if (this.fGroup.invalid) {
      console.log(this.fGroup);
      alert('Debe diligenciar todo el formulario');
    } else {
      let modelo = this.obtenerRegistro();
      console.log('Modelo:', modelo);

      if (!this.plan) {
        console.error('No se encontró el plan del cliente');
        return;
      }

      let clientePlan = this.plan.find(p => p.clienteId === this.clienteId);
      
      if (this.beneficiario.length >= clientePlan?.cantidadBeneficiarios!) {
        alert('Ha alcanzado el límite de beneficiarios permitidos para su plan. Por favor, contacte con el soporte para más información.');
        return;
      }

      this.servicio.AgregarRegistro(modelo).subscribe({
        next: (data: BeneficiarioModel) => {
          alert('Registro guardado correctamente');
          this.router.navigate(['/parametros/clientes', this.clienteId, 'beneficiario-listar']);
        },
        error: (error: any) => {
          alert('Error al guardar el registro');
        }
      });
    }
  }

  /**
   * Obtiene la lista de beneficiarios del cliente.
   */
  obtenerBeneficiarios(): void {
    if (this.clienteId !== null) {
      this.http.get<BeneficiarioModel[]>(`${this.BASE_URL}clientes/${this.clienteId}/beneficiarios`)
        .subscribe(
          (beneficiarios) => {
            this.beneficiario = beneficiarios;
          },
          (error) => {
            console.error('Error al obtener los beneficiarios:', error);
          }
        );
    }
  }

  /**
   * Crea un objeto BeneficiarioModel con los datos del formulario.
   */
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

  /**
   * Construye el formulario para la carga de archivos.
   */
  ConstruirFormularioArchivo(): void {
    this.CargarArchivoFG = this.fb.group({
      archivo: ['', []]
    });
  }

  get obtenerFgArchivo() {
    return this.CargarArchivoFG.controls;
  }

  /**
   * Carga un archivo al servidor.
   */
  CargarArchivo() {
    const formData = new FormData();
    formData.append('file', this.CargarArchivoFG.controls['archivo'].value);
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

  /**
   * Maneja la selección de un archivo.
   * @param event El evento de selección de archivo.
   */
  CuandoSeleccionaArchivo(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.obtenerFgArchivo['archivo'].setValue(file);
    }
  }

  /**
   * Obtiene los planes del cliente.
   */
  obtenerPlanCliente(): void {
    if (this.clienteId !== null) {
      this.http.get<ClientePlanModel[]>(`${this.BASE_URL}clientes/${this.clienteId}/plans`)
        .subscribe(
          (planes) => {
            this.plan = planes.filter(p => p.clienteId === this.clienteId);
            this.verificarPlanesVencidos();
          },
          (error) => {
            console.error('Error al obtener el plan:', error);
          }
        );
    }
  }

  /**
   * Verifica si los planes del cliente están vencidos.
   */
  verificarPlanesVencidos(): void {
    const fechaActual = new Date();
    this.plan.forEach((p) => {
      const fechaVencimiento = new Date(p.fechaVencimiento!);
      if (fechaVencimiento < fechaActual) {
        this.dialog.open(PlanVencidoDialogComponent, {
          data: { nombre: p.nombre }
        });
      }
    });
  }
}
